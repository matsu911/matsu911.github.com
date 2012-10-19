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
Mac OSを触るようになって初めて知ったのですが、Mac OSのバイナリ形式は他のUnixと異なり、ELFではなく、[Mach-O](https://developer.apple.com/library/mac/#documentation/developertools/conceptual/MachORuntime/Reference/reference.html)と呼ばれるファイル形式です。
そのため、LD_PRELOADは使えず、代わりにDYLD_INSERT_LIBRARIESを使う必要があります。

# サンプルコード
まずは以下のように今回使用するサンプルコードを書きます。

{% higlight c %}
#include <stdio.h>

int main()
{
  char * s = "aaa\n";
  printf(s);
  return 0;
}
{% endhighlight %}

コンパイル、実行して動作することを確認します。

{% higlight console %}
$ gcc main.c 
$ ./a.out
aaa
{% endhiglight %}
