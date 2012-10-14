---
layout: post
title: "API Spooferによる乱数の制御"
description: "APIをスプーフィングするツールAPI Spooferを使って、乱数を制御します"
category: Testing
tags: [LD_PRELOAD, API Spoofer]
keywords: [LD_PRELOAD,テスト,APIスプーフィング,API Spoofer,乱数の制御]
---
{% include JB/setup %}

# はじめに
ここでは、[API Spoofer](http://github.com/matsu911/api_spoofer)を使って乱数を制御します。
乱数を使うアプリケーションでは、実行結果が予測可能ではないため、テストを行うのが困難です。
そこで、乱数を制御して決まった値を返すようにすることで、テストをやりやすくします。

# API Spooferのインストール
インストール方法については[API Spooferのインストール](http://matsu911.github.com/Testing/2012/10/11/api-spoofer-installation/)を参照してください。

# 乱数を使ったアプリケーション
ここでは、乱数の値を３つ表示するだけの簡単なアプリケーションを使います。
ソースは次のようになります。

{% highlight c %}
#include <stdlib.h>
#include <stdio.h>
#include <time.h>

int main(void)
{
  srand((unsigned) time(NULL));

  printf("%d\n", rand());
  printf("%d\n", rand());
  printf("%d\n", rand());

  return 0;
}
{% endhighlight %}

このコードをコンパイルし、何度か実行してみます。

{% highlight console %}
$ gcc test.c
$ ./a.out 
1913766507
1688256889
1376930303
$ ./a.out 
1611767276
430798400
957049420
$ ./a.out 
230746457
238110194
1602118775
{% endhighlight %}

毎回実行結果が違うことが確認できます。

# API Spooferを使って乱数を制御する
それでは[API Spoofer](http://github.com/matsu911/api_spoofer)を使って乱数を制御してみましょう。
次のようにapi_spooferコマンドを実行し、コードを生成します。

{% highlight console %}
$ api_spoofer a.out > rand_spoofer.c
$ gcc -ldl -shared -fPIC rand_spoofer.c -o rand_spoofer.so
{% endhighlight %}

無事にrand_spoofer.soが生成されたらLD_PRELOADにrand_spoofer.soを指定して実行してみます。

{% highlight console %}
$ LD_PRELOAD=rand_spoofer.so ./a.out
1536164458
389977121
200945937
$ LD_PRELOAD=rand_spoofer.so ./a.out
1233129365
1276903885
1928278290
$ LD_PRELOAD=rand_spoofer.so ./a.out
1233129365
1276903885
1928278290
{% endhighlight %}

このように、以前と変わらず乱数が表示されることを確認します。
次に、rand_spoofer.cのsrandを書き換えることで初期化するシードを毎回同じにします。

{% highlight c %}
void srand(unsigned int __seed)
{
  typedef void (*ftype)(unsigned int);
  ((ftype)dlsym(RTLD_NEXT, "srand"))(1);
}
{% endhighlight %}

コンパイルして再度実行します。

{% highlight console %}
$ gcc -fPIC -shared rand_spoofer.c -ldl -o rand_spoofer.so
$ LD_PRELOAD=rand_spoofer.so ./a.out
1804289383
846930886
1681692777
$ LD_PRELOAD=rand_spoofer.so ./a.out
1804289383
846930886
1681692777
$ LD_PRELOAD=rand_spoofer.so ./a.out
1804289383
846930886
1681692777
{% endhighlight %}

毎回同じ結果になることがわかります。
今度は直接randの戻り値を上書きしてみます。

{% highlight c %}
int rand()
{
  return 10;
}
{% endhighlight %}

同様にコンパイルして実行してみます。

{% highlight console %}
$ gcc -fPIC -shared rand_spoofer.c -ldl -o rand_spoofer.so
$ LD_PRELOAD=rand_spoofer.so ./a.out
10
10
10
$ LD_PRELOAD=rand_spoofer.so ./a.out
10
10
10
$ LD_PRELOAD=rand_spoofer.so ./a.out
10
10
10
{% endhighlight %}

このように、上書きした値が常に返るようになっていることがわかります。

# まとめ
今回は[API Spoofer](http://github.com/matsu911/api_spoofer)を使って、srandやrandを上書きすることで、実行ファイルに手を加えることなく、乱数を制御する方法を紹介しました。
このテクニックを応用することで、乱数を使ったアプリケーションの実行結果を制御することが可能になります。
