---
layout: post
title: "Mac OSで関数をフックする方法"
description: "LD_PRELOADの使えないMac OSで関数をフックする方法を示します"
category: Testing
tags: [DYLD_INSERT_LIBRARIES, API Spoofer]
keywords: [DYLD_INSERT_LIBRARIES,DYLD_FORCE_FLAT_NAMESPACE,テスト,APIスプーフィング,API Spoofer]
---
{% include JB/setup %}

# 概要
Mac OSを触るようになって初めて知ったのですが、Mac OSのバイナリ形式は他のUnixと異なり、[ELF](http://ja.wikipedia.org/wiki/Executable_and_Linkable_Format)ではなく、[Mach-O](https://developer.apple.com/library/mac/#documentation/developertools/conceptual/MachORuntime/Reference/reference.html)と呼ばれるファイル形式です。
そのため、LD_PRELOADは使えず、代わりにDYLD_INSERT_LIBRARIESを使う必要があります。

# サンプルコード
まずは以下のように今回使用するサンプルコードを書きます。

{% highlight c %}
#include <stdio.h>

int main()
{
  char * s = "aaa\n";
  printf(s);
  return 0;
}
{% endhighlight %}

コンパイル、実行して動作することを確認します。

{% highlight console %}
$ gcc main.c 
$ ./a.out
aaa
{% endhighlight %}

"aaa"が表示されていることが確認されます。

# フック用コード
ここでは先程のコードのprintf関数をフックし、"aaa"を"bbb"に置き換えるコードを作成します。

{% highlight c %}
#include <dlfcn.h>
#include <stdio.h>

int printf(const char * _restrict, ...)
{
  typedef int (*ftype)(const char *, ...);
  return ((ftype)dlsym(RTLD_NEXT, "printf"))("bbb\n");
}
{% endhighlight %}

コンパイルし、dylibファイルを作成します。

{% highlight console %}
$ gcc -ldl -dynamiclib printf.c -o printf.dylib
{% endhighlight %}

# DYLD_INSERT_LIBRARIESとDYLD_FORCE_FLAT_NAMESPACEを設定してフック
先程作成したdylibファイルを読み込ませて関数をフックしたいのですが、上述のとおりLD_PRELOADは使えません。
代わりにDYLD_INSERT_LIBRARIESが使えます。
しかし、ここで注意が必要なのが、同時にDYLD_FORCE_FLAT_NAMESPACE=YESを設定する必要がある、ということです。

{% highlight console %}
$ DYLD_INSERT_LIBRARIES=printf.dylib DYLD_FORCE_FLAT_NAMESPACE=YES ./a.out
bbb
{% endhighlight %}

"bbb"と表示されることが確認されました。
この手法を応用すればMac OSでHappy Hackingライフを送れるでしょう。
