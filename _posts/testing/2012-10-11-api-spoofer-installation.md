---
layout: post
title: "API Spooferのインストール"
description: "APIのインストール方法について解説します"
category: Testing
tags: [LD_PRELOAD, API Spoofer]
keywords: [LD_PRELOAD,テスト,APIスプーフィング,API Spoofer,インストール]
---
{% include JB/setup %}

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

[API Spoofer](http://github.com/matsu911/api_spoofer)の[v0.0.4](https://github.com/matsu911/api_spoofer/zipball/v0.0.4)をダウンロードします。
ダウンロードしたら解凍し、インストールを行います。

{% highlight console %}
$ curl https://nodeload.github.com/matsu911/api_spoofer/tarball/v0.0.4 | tar xvzf -
$ cd matsu911-api_spoofer-99b66df/
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
