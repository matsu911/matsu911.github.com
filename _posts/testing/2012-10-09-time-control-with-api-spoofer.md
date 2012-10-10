---
layout: post
title: "API Spooferによる時刻の制御"
description: "APIをスプーフィングするツールAPI Spooferを使って、アプリケーションの時刻を制御します"
category: Testing
tags: [LD_PRELOAD, API Spoofer]
keywords: [LD_PRELOAD,テスト,APIスプーフィング,API Spoofer]
---
{% include JB/setup %}

# はじめに
ここでは、[API Spoofer](http://github.com/matsu911/api_spoofer)を使ってdateコマンドが返す時刻を制御します。
通常、dateコマンドが返す時刻を制御するには、root権限でdateコマンドを実行してシステムの時刻を変更する必要があります。
root権限がない状況ではこの方法を使い辛いでしょう。
しかし、今から紹介する[API Spoofer](http://github.com/matsu911/api_spoofer)を使った方法はユーザー権限で行えるため、使い勝手がよい便利な方法です。

# API Spooferについて
[API Spoofer](http://github.com/matsu911/api_spoofer)は実行形式に対してスプーフィングするためのコードを自動生成します。
ある実行形式が共有ライブラリに依存している関数（API）を抜き出し、それらの関数のラッパー用のコードを生成します。
生成されたコードは、各関数がデフォルトで元の関数を呼び出すようになっているため、該当する関数のコード書き換えることで、任意のデータをアプリケーションに流し込んだり、取得することが可能になります。

# API Spooferのインストール
まず、[Python](http://www.python.org/)の2.7.xがインストールされていることを確認します。

{% highlight console %}
$ python -V
Python 2.7.3
{% endhighlight %}

[API Spoofer](http://github.com/matsu911/api_spoofer)の[v0.0.2](https://github.com/matsu911/api_spoofer/zipball/v0.0.2)をダウンロードします。
ダウンロードしたら解凍し、インストールを行います。

{% highlight console %}
$ curl https://nodeload.github.com/matsu911/api_spoofer/tarball/v0.0.2 | tar xvzf -
$ cd matsu911-api_spoofer-c97e315/
$ python setup.py install
{% endhighlight %}

インストールに失敗する場合には、[sudo](http://linuxjm.sourceforge.jp/html/sudo/man8/sudo.8.html)でinstallを実行する必要があるかもしれません。
インストールに成功しているか、次のコマンドで確認しましょう。

{% highlight console %}
$ which api_spoofer
/usr/local/share/python/api_spoofer
{% endhighlight %}

このように、api_spooferコマンドがインストールされたパスが表示されれば成功です。
環境によっては、環境変数PATHにapi_spooferがインストールされたパスを追加する必要があるかもしれません。

# dateコマンドの時刻を制御する
ここでは、[API Spoofer](http://github.com/matsu911/api_spoofer)を使ってdateコマンドが返す時刻を制御します。
まず、dateコマンドを実行してみましょう。

{% highlight console %}
$ date
2012年 10月10日 水曜日 10時49分19秒 JST
{% endhighlight %}

このように実行したときの時刻が表示されます。
この表示される時刻を任意の時刻に制御できるようにします。
最初にdateコマンドのパスを確認しておきます。

{% highlight console %}
$ which date
/bin/date
{% endhighlight %}

/bin/dateがdateコマンドのパスであることがわかります。
次に、スプーフィングを行うためのコードテンプレートを生成します。

{% highlight console %}
$ api_spoofer /bin/date > date_spoofer.c
{% endhighlight %}

そして、OSが提供する時刻を返すAPIであるclock_gettimeを次のように変更します。

{% highlight c %}
int clock_gettime (clockid_t __clock_id, struct timespec *__tp)
{
  __tp->tv_sec  = 0;
  __tp->tv_nsec = 0;
  return 0;
}
{% endhighlight %}

編集後、date_spoofer.cをコンパイルし、共有ライブラリを作成します。

{% highlight console %}
$ gcc -fPIC -shared date_spoofer.c -o date_spoofer.so
{% endhighlight %}

この作成したdate_spoofer.soを環境変数LD_PRELOADに設定することで、clock_gettimeを上書きすることができます。
つまり、clock_gettimeを上書きすることで、任意の設定した時刻をアプリケーション側に認識させることができます。

{% highlight console %}
$ LD_PRELOAD=date_spoofer.so date
1970年  1月  1日 木曜日 09:00:00 JST
{% endhighlight %}

