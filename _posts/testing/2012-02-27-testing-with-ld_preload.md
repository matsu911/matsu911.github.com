---
layout: post
title: LD_PRELOADを使ったテスト(C言語編)
category: Testing
tags: [LD_PRELOAD, Testing]
---
{% include JB/setup %}

# 困難なテスト
一般に、テストを自動化する場合、テスト対象のプログラムやコードに対するインプットとアウトプットを制御する必要があります。  
コードが綺麗に抽象化され、テストデータを外部から入力しやすいインターフェースが用意されていれば、ユニットテストのコードを書くことができますが、そうではないケースも多いのではないでしょうか。  
その場合、テストコードを書けるようにリファクタリングを行うことになるのでしょうが、テストコードなしでのリファクタリングが必要になり、一般に困難な作業になります。  
ここでは、共有ライブラリとLD_PRELOADという環境変数を使うことで、コードに手を加えることなく外部から対象のプログラムの挙動を制御する方法を紹介します。

# dateコマンド
それでは例として、dateコマンドで表示される日時を制御することを考えてみましょう。  
まず、dateコマンドを実行すると次のように日時が表示されます。

{% highlight console %}
$ date
2012年  2月 27日 月曜日 07:57:56 JST
{% endhighlight %}

この日時はシステムの時刻を変更することで変えることは可能ですが、実行する度に時刻が変わるので、特に時刻に依存したテストを行うケースでは不便です。  
この時刻を簡単に制御することができれば、時刻に依存したテストも簡単に実行することができるようになります。

# dateコマンドの挙動
dateコマンドの挙動を調べてみましょう。  
まず、[ldd](http://linuxjm.sourceforge.jp/html/ld.so/man1/ldd.1.html)コマンドでdateコマンドが使う共有ライブラリを調べます。

{% highlight console %}
$ ldd $(which date)
    librt.so.1 => /lib64/librt.so.1 (0x000000332e800000)
    libc.so.6 => /lib64/libc.so.6 (0x000000332d400000)
    libpthread.so.0 => /lib64/libpthread.so.0 (0x000000332e000000)
    /lib64/ld-linux-x86-64.so.2 (0x000000332d000000)
{% endhighlight %}

/lib64/librt.so.1、/lib64/libc.so.6、/lib64/libpthread.so.0を共有ライブラリとして使用することがわかります。  
これらの共有ライブラリに含まれるAPIが制御する候補となります。  
ちなみに/lib64/ld-linux-x86-64.so.2はローダーなので今回の目的では特に気にする必要はありません。  
次にltraceを用いて実行時のライブラリ呼び出しのトレースを取得します。

{% highlight console %}
$ ltrace date
__libc_start_main(0x401b90, 1, 0x7fff0c04b1e8, 0x407c10, 0x407c00 <unfinished ...>
setlocale(6, "")                                 = "ja_JP.UTF-8"
bindtextdomain("coreutils", "/usr/share/locale") = "/usr/share/locale"
textdomain("coreutils")                          = "coreutils"
__cxa_atexit(0x403c70, 0, 0, 0x736c6974756572, 4) = 0
getopt_long(1, 0x7fff0c04b1e8, "d:f:I::r:Rs:u", 0x60a920, NULL) = -1
nl_langinfo(131180, 0x7fff0c04b1e8, 1, 0, 1)     = 0x2aed1d58b555
clock_gettime(0, 0x7fff0c04b0b0, 0x332d75210c, 2, 1) = 0
localtime(0x7fff0c04af80)                        = 0x332d756cc0
fwrite("2012", 4, 1, 0x332d752780)               = 1
strlen("\345\271\264 %b %e\346\227\245 %A %H:%M:%S %Z") = 27
mbrtowc(0, 0x2aed1d58b557, 28, 0x7fff0c04af30, 0xfefefefefefefeff) = 3
mbsinit(0x7fff0c04af30, 24180, 3, 11, 0x7fff0c04a9e4) = 1
fwrite("\345\271\264 %b %e\346\227\245 %A %H:%M:%S %Z", 3, 1, 0x332d752780) = 1
fputc(' ', 0x332d752780)                         = 32
strftime("", 47197887963889, NULL, 0x889ce632)   = 6
fwrite(" 2\346\234\210", 5, 1, 0x332d752780)     = 1
fputc(' ', 0x332d752780)                         = 32
fwrite("27", 2, 1, 0x332d752780)                 = 1
mbrtowc(0, 0x2aed1d58b560, 19, 0x7fff0c04af30, 0x2aed1b177f30) = 3
mbsinit(0x7fff0c04af30, 26085, 3, 11, 0x7fff0c04a9e4) = 1
fwrite("\346\227\245 %A %H:%M:%S %Z", 3, 1, 0x332d752780) = 1
fputc(' ', 0x332d752780)                         = 32
strftime("", 47197887963827, NULL, 0xa597e69c9be6889c) = 10
fwrite("\346\234\210\346\233\234\346\227\245", 9, 1, 0x332d752780) = 1
fputc(' ', 0x332d752780)                         = 32
fputc('0', 0x332d752780)                         = 48
fwrite("7", 1, 1, 0x332d752780)                  = 1
fputc(':', 0x332d752780)                         = 58
fwrite("58", 2, 1, 0x332d752780)                 = 1
fputc(':', 0x332d752780)                         = 58
fwrite("44", 2, 1, 0x332d752780)                 = 1
fputc(' ', 0x332d752780)                         = 32
strlen("JST")                                    = 3
fwrite("JST", 3, 1, 0x332d752780)                = 1
__overflow(0x332d752780, 10, 0, 0, 0x2aed1b177f302012年  2月 27日 月曜日 07:58:44 JST
) = 10
exit(0 <unfinished ...>
__fpending(0x332d752780, 0, 0x332d7532f0, -1, 0xffffffff) = 0
fclose(0x332d752780)                             = 0
+++ exited (status 0) +++
{% endhighlight %}

ここで[clock_gettime](http://linuxjm.sourceforge.jp/html/LDP_man-pages/man2/clock_gettime.2.html)に注目します。  
dateコマンドはclock_gettimeを呼び出してシステムの時刻を取得していることがわかります。  
これはclock_gettimeの挙動を制御することでdateコマンドの実行結果を制御できることを意味します。

# 共有オブジェクトの作成
では、clock_gettimeの関数宣言を見てみましょう。  
clock_gettimeはtime.hで宣言されています。  
次はclock_gettimeの宣言をtime.hから抜粋したものです。

{% highlight c %}
/* Get current value of clock CLOCK_ID and store it in TP.  */
extern int clock_gettime (clockid_t __clock_id, struct timespec *__tp) __THROW;
{% endhighlight %}

このインターフェスと同じ型で同じ名前(シンボル)の関数を作り、第2引数で与えられたポインタの実態に任意の時刻を設定する関数を書きます。  
ファイルclock_gettime.cを作成し、次のように記述します。

{% highlight c %}
#include <time.h>

int clock_gettime (clockid_t __clock_id, struct timespec *__tp)
{
  __tp->tv_sec  = 0;
  __tp->tv_nsec = 0;
  return 0;
}
{% endhighlight %}

ここではtv_secおよびtv_nsecに0を代入します。  
このファイルをコンパイルし、共有ライブラリを作成します。  
ここでは共有ライブラリのファイル名をclock_gettime.soとします。

{% highlight console %}
$ gcc -fPIC -shared clock_gettime.c -o clock_gettime.so
{% endhighlight %}

次に、作成された共有ラリブラリにシンボルclock_gettimeが含まれていることを確認します。

{% highlight console %}
$ nm clock_gettime.so 
00000000002005e0 a _DYNAMIC
0000000000200778 a _GLOBAL_OFFSET_TABLE_
                 w _Jv_RegisterClasses
00000000002005b8 d __CTOR_END__
00000000002005b0 d __CTOR_LIST__
00000000002005c8 d __DTOR_END__
00000000002005c0 d __DTOR_LIST__
00000000000005a8 r __FRAME_END__
00000000002005d0 d __JCR_END__
00000000002005d0 d __JCR_LIST__
0000000000200798 A __bss_start
                 w __cxa_finalize@@GLIBC_2.2.5
0000000000000510 t __do_global_ctors_aux
0000000000000430 t __do_global_dtors_aux
00000000002005d8 d __dso_handle
                 w __gmon_start__
0000000000200798 A _edata
00000000002007a8 A _end
0000000000000548 T _fini
00000000000003d0 T _init
0000000000000410 t call_gmon_start
00000000000004dc T clock_gettime
00000000002007a0 b completed.6145
0000000000200798 b dtor_idx.6147
00000000000004b0 t frame_dummy
{% endhighlight %}

# LD_PRELOADを設定して実行
それでは実際に環境変数LD_PRELOADにclock_gettime.soを指定してdateコマンドを実行してみましょう。

{% highlight console %}
$ LD_PRELOAD=clock_gettime.so date
1970年  1月  1日 木曜日 09:00:00 JST
{% endhighlight %}

Posix Timeの開始時刻になっていることが確認できます。
ちなみにタイムゾーンがJST(GMT+9：00)なので9時となっています。

# 元の関数の呼び出し
以上の方法で、自分で再定義した関数が元の関数の替わりに呼び出されるようになったのですが、再定義した関数から元の関数を呼び出したい場合があります。  
現在の時刻の1時間後の時刻を返すようにしたいケースを考えます。  
次のように[dlsym](http://linuxjm.sourceforge.jp/html/LDP_man-pages/man3/dlsym.3.html#lbAG)の第1引数にRTLD_NEXTを指定してシンボルを取得すると元の関数のアドレスを取得できます。

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define __USE_GNU
#include <dlfcn.h>

int clock_gettime (clockid_t __clock_id, struct timespec *__tp)
{
  void *handle = dlsym(RTLD_NEXT, "clock_gettime");
  if(handle == NULL)
  {
    fprintf(stderr, "failed to get symbol 'clock_gettime'");
    exit(1);
  }
  int (*func)(clockid_t, struct timespec *) = handle;
  int ret = func(__clock_id, __tp);
  __tp->tv_sec += 3600;
  return ret;
}
{% endhighlight %}

元の関数を呼び出し、その結果に3600秒加えて1時間後の値を返します。  
コンパイルでは新たにフラグ-ldlを追加します。

{% highlight console %}
$ gcc -fPIC -shared clock_gettime.c -ldl -o clock_gettime.so
{% endhighlight %}

次のように1時間後の値が得られることがわかります。

{% highlight console %}
$ date; LD_PRELOAD=clock_gettime.so date
2012年  2月 27日 月曜日 08:09:49 JST
2012年  2月 27日 月曜日 09:09:49 JST
{% endhighlight %}

# 解説
本稿では環境変数LD_PRELOADを用いることで、既存のコードを変更することなく挙動を変更する方法を示しました。  
環境変数LD_PRELOADで設定された共有ライブラリはローダーによって前もってロードされ、実行形式や依存するライブラリよりも前のメモリ上のアドレスに配置されます。  
共有ライブラリの関数を呼び出す場合、シンボル名をキーとして、メモリの先頭から検索して最初に該当するシンボルのアドレスを呼び出します。  
そのため、LD_PRELOADで指定された共有ライブラリで定義された関数が元の関数の替わりに呼び出されます。  
元の関数は、LD_PRELOADで指定された共有ライブラリの関数より後のアドレスに配置されているので、dlsymで現在のアドレス以降のメモリからシンボルを検索することで得られます。  
この仕組みにより、共有ライブラリで定義されている関数と同じインターフェースの関数を作ることで、本稿で述べたように任意のデータを既存のプログラムにインプットとして与えることができます。
