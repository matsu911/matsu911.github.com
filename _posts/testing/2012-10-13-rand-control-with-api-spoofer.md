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


