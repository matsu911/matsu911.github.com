---
layout: post
title: "wafによるビルド環境構築"
description: "Python製の汎用ビルドツールwafを使ってビルド環境を構築します"
category: Testing
tags: [waf,build]
keywords: [waf,build,ビルド,autoconf,automake,make,Python]
---
{% include JB/setup %}

# wafについて
[waf](http://code.google.com/p/waf/)はPython製の汎用ビルドシステムです。
[automake](http://www.gnu.org/software/automake)や[autoconf](http://www.gnu.org/software/autoconf/)とは異なり、ビルドファイルの記述は独自の記法ではなくPythonで行います。
つまり、ビルドファイルの記述はPython言語内でのDSLで書ける、というわけです。
さらに、makeのようにディレクトリ階層ごとにビルドファイルを用意する必要はなく、プロジェクトのトップディレクトリにwscriptという名前の用意するだけで済み、メンテナンス性に優れます。

# wafのインストール
さっそくwafをインストールしてみましょう。
2012年10月21日現在、最新版は1.7.5ですので、1.7.5oをインストールします。

{% highlight console %}
$ wget http://waf.googlecode.com/files/waf-1.7.5 -O ~/local/bin/waf
$ chmod +x local/bin/waf
$ waf --version
waf 1.7.5 (a7e69d6b81b04729804754c4d5214da063779a65)
{% endhighlight %}

このようにバージョン番号が表示さればインストールは成功です。

# NNGS用のwscriptを用意する
ここでは[NNGS](http://sourceforge.net/projects/nngs/)用のwscriptを用意し、configure, makeに替わるビルド環境を構築します。
次のようなwscriptを用意します。

{% highlight python %}
# -*- mode: python -*-

top = '.'

def options(opt):
    opt.load('compiler_c')

def configure(conf):
    conf.load('compiler_c')
    for header in ['time.h',
                   'sys/types.h',
                   'sys/stat.h',
                   'dirent.h',
                   'ctype.h',
                   'arpa/telnet.h',
                   'errno.h',
                   'fcntl.h',
                   'gdbm.h',
                   "inttypes.h",
                   "memory.h",
                   "ndbm.h",
                   "netdb.h",
                   "netinet/in.h",
                   "signal.h",
                   "stdint.h",
                   "stdio.h",
                   "stdlib.h",
                   "strings.h",
                   "string.h",
                   "sys/socket.h",
                   "sys/time.h",
                   "term.h",
                   "unistd.h",
                   "utime.h"]:
        conf.check(header_name=header, features='c cprogram')

    for fname, header in [('ftruncate', 'unistd.h'),
                          ('usleep', 'unistd.h'),
                          ('gettimeofday', 'sys/time.h'),
                          ('pclose', 'stdio.h'),
                          ('popen', 'stdio.h'),
                          ('random', 'stdlib.h'),
                          ('snprintf', 'stdio.h'),
                          ('vsnprintf', 'stdio.h')]:
        conf.check_cc(function_name=fname, header_name=header, mandatory=True) 

    conf.check_cc(lib='m', cflags='-Wall') 

    conf.check_cc(fragment='''
                        #include <stdio.h>
                        int main() { printf("%d", sizeof(int)); return 0; } ''',
                  define_name = "SIZEOF_INT",
                  execute     = True,
                  define_ret  = True,
                  msg         = "Checking for sizeof(int)") 
    conf.check_cc(fragment='''
                        #include <stdio.h>
                        int main() { printf("%d", sizeof(long)); return 0; } ''',
                  define_name = "SIZEOF_LONG",
                  execute     = True,
                  define_ret  = True,
                  msg         = "Checking for sizeof(long)") 

    conf.define("AHELP_DIR", "NONE/nngssrv/ahelp")
    conf.define("CGAME_DIR", "NONE/nngssrv/cgames")
    conf.define("EMOTES_FILE", "NONE/nngssrv/emotestr")
    conf.define("FIND_FILE", "NONE/nngssrv/find.out")
    conf.define("GAME_DIR", "NONE/nngssrv/games")
    conf.define("GNU_PACKAGE", "nngssrv")
    conf.define("HELP_DIR", "NONE/nngssrv/help")
    conf.define("INFO_DIR", "NONE/nngssrv/info")
    conf.define("INTERGO_FILE", "NONE/nngssrv/intergo/intergo")
    conf.define("LADDER19_FILE", "NONE/nngssrv/ladder/ladder19")
    conf.define("LADDER9_FILE", "NONE/nngssrv/ladder/ladder9")
    conf.define("LIST_DIR", "NONE/nngssrv/lists")
    conf.define("LOGONS_FILE", "NONE/nngssrv/stats/logons")
    conf.define("LOG_FILE", "NONE/nngssrv/stats/logfile")
    conf.define("MAILPROGRAM", "/usr/bin/mail")
    conf.define("MESSAGE_DIR", "NONE/nngssrv/messages")
    conf.define("MESS_AMOTD", "admotd")
    conf.define("MESS_LOGIN", "login")
    conf.define("MESS_LOGOUT", "logout")
    conf.define("MESS_MOTD", "motd")
    conf.define("MESS_UNREGISTERED", "unregistered")
    conf.define("MESS_WELCOME", "welcome")
    conf.define("NEWS_DIR", "NONE/nngssrv/news")
    conf.define("NOTE_FILE", "NONE/nngssrv/note")
    conf.define("NRATINGS_FILE", "NONE/nngssrv/ratdb")
    conf.define("NRESULTS_FILE", "NONE/nngssrv/nresults")
    conf.define("PACKAGE", "nngssrv")
    conf.define("PACKAGE_BUGREPORT", "")
    conf.define("PACKAGE_NAME", "")
    conf.define("PACKAGE_STRING", "")
    conf.define("PACKAGE_TARNAME", "")
    conf.define("PACKAGE_VERSION", "")
    conf.define("PLAYER_DIR", "NONE/nngssrv/players")
    conf.define("PROBLEM_DIR", "NONE/nngssrv/problems")
    conf.define("RATINGS_FILE", "NONE/nngssrv/results-rated")
    conf.define("RESULTS_FILE", "NONE/nngssrv/results")
    conf.define("SPOOL_DIR", "NONE/nngssrv/spool")
    conf.define("STATS_DIR", "NONE/nngssrv/stats")
    conf.define("STDC_HEADERS", 1)
    conf.define("TIME_WITH_SYS_TIME", 1)
    conf.define("VERSION", "1.1.22")
    conf.define("ulong", "unsigned long")

    conf.write_config_header('config.h')

    conf.define('HAVE_CONFIG_H', 1)

def build(bld):
    bld.stlib(source=bld.path.ant_glob('mlrate/src/*.c'),
              target='mlrate')
    bld.program(source=bld.path.ant_glob('src/*.c'),
                use='mlrate',
                includes='. build',
                target='nngsrv')
{% endhighlight %}

このファイルひとつでconfigureもビルドもできます。

{% highlight console %}
$ waf configure build
Setting top to                           : /Users/matsu911/nngs-1.1.22 
Setting out to                           : /Users/matsu911/nngs-1.1.22/build 
Checking for 'gcc' (c compiler)          : /usr/bin/gcc 
Checking for header time.h               : yes 
Checking for header sys/types.h          : yes 
Checking for header sys/stat.h           : yes 
Checking for header dirent.h             : yes 
Checking for header ctype.h              : yes 
Checking for header arpa/telnet.h        : yes 
Checking for header errno.h              : yes 
Checking for header fcntl.h              : yes 
Checking for header gdbm.h               : yes 
Checking for header inttypes.h           : yes 
Checking for header memory.h             : yes 
Checking for header ndbm.h               : yes 
Checking for header netdb.h              : yes 
Checking for header netinet/in.h         : yes 
Checking for header signal.h             : yes 
Checking for header stdint.h             : yes 
Checking for header stdio.h              : yes 
Checking for header stdlib.h             : yes 
Checking for header strings.h            : yes 
Checking for header string.h             : yes 
Checking for header sys/socket.h         : yes 
Checking for header sys/time.h           : yes 
Checking for header term.h               : yes 
Checking for header unistd.h             : yes 
Checking for header utime.h              : yes 
Checking for function ftruncate          : yes 
Checking for function usleep             : yes 
Checking for function gettimeofday       : yes 
Checking for function pclose             : yes 
Checking for function popen              : yes 
Checking for function random             : yes 
Checking for function snprintf           : yes 
Checking for function vsnprintf          : yes 
Checking for library m                   : yes 
Checking for sizeof(int)                 : yes 
Checking for sizeof(long)                : yes 
'configure' finished successfully (3.742s)
Waf: Entering directory `/Users/matsu911/nngs-1.1.22/build'
[ 1/52] c: mlrate/src/anchor.c -> build/mlrate/src/anchor.c.1.o
[ 2/52] c: mlrate/src/circular.c -> build/mlrate/src/circular.c.1.o
[ 3/52] c: mlrate/src/cmd.c -> build/mlrate/src/cmd.c.1.o
[ 4/52] c: mlrate/src/error.c -> build/mlrate/src/error.c.1.o
[ 5/52] c: mlrate/src/game.c -> build/mlrate/src/game.c.1.o
[ 6/52] c: mlrate/src/hdbm.c -> build/mlrate/src/hdbm.c.1.o
[ 7/52] c: mlrate/src/ilog2.c -> build/mlrate/src/ilog2.c.1.o
[ 8/52] c: mlrate/src/itime.c -> build/mlrate/src/itime.c.1.o
[ 9/52] c: mlrate/src/list.c -> build/mlrate/src/list.c.1.o
[10/52] c: mlrate/src/mlr.c -> build/mlrate/src/mlr.c.1.o
[11/52] c: mlrate/src/mlrate.c -> build/mlrate/src/mlrate.c.1.o
[12/52] c: mlrate/src/old2newres.c -> build/mlrate/src/old2newres.c.1.o
[13/52] c: mlrate/src/oldresult.c -> build/mlrate/src/oldresult.c.1.o
[14/52] c: mlrate/src/player.c -> build/mlrate/src/player.c.1.o
[15/52] c: mlrate/src/rank.c -> build/mlrate/src/rank.c.1.o
[16/52] c: mlrate/src/rdbm.c -> build/mlrate/src/rdbm.c.1.o
[17/52] c: mlrate/src/rdbmtool.c -> build/mlrate/src/rdbmtool.c.1.o
../mlrate/src/rdbmtool.c: In function ‘main’:
../mlrate/src/rdbmtool.c:118: warning: format ‘%5u’ expects type ‘unsigned int’, but argument 2 has type ‘size_t’
../mlrate/src/rdbmtool.c:118: warning: format ‘%5u’ expects type ‘unsigned int’, but argument 2 has type ‘size_t’
[18/52] c: mlrate/src/result.c -> build/mlrate/src/result.c.1.o
[19/52] c: mlrate/src/rhistory.c -> build/mlrate/src/rhistory.c.1.o
[20/52] c: mlrate/src/shash.c -> build/mlrate/src/shash.c.1.o
[21/52] c: mlrate/src/t2res.c -> build/mlrate/src/t2res.c.1.o
[22/52] c: mlrate/src/weight.c -> build/mlrate/src/weight.c.1.o
[23/52] c: mlrate/src/xdbm.c -> build/mlrate/src/xdbm.c.1.o
[24/52] c: src/adminproc.c -> build/src/adminproc.c.2.o
[25/52] c: src/alias.c -> build/src/alias.c.2.o
[26/52] c: src/bm.c -> build/src/bm.c.2.o
[27/52] c: src/censor.c -> build/src/censor.c.2.o
[28/52] c: src/channel.c -> build/src/channel.c.2.o
../src/adminproc.c: In function ‘com_anews’:
../src/adminproc.c:165: warning: format ‘%d’ expects type ‘int *’, but argument 3 has type ‘time_t *’
../src/adminproc.c:165: warning: format ‘%d’ expects type ‘int *’, but argument 3 has type ‘time_t *’
[29/52] c: src/chkaddr.c -> build/src/chkaddr.c.2.o
[30/52] c: src/command.c -> build/src/command.c.2.o
[31/52] c: src/comproc.c -> build/src/comproc.c.2.o
[32/52] c: src/conffile.c -> build/src/conffile.c.2.o
[33/52] c: src/emote2.c -> build/src/emote2.c.2.o
[34/52] c: src/gamedb.c -> build/src/gamedb.c.2.o
../src/gamedb.c: In function ‘game_write_complete’:
../src/gamedb.c:990: warning: format not a string literal and no format arguments
[35/52] c: src/gameproc.c -> build/src/gameproc.c.2.o
[36/52] c: src/ip_ban.c -> build/src/ip_ban.c.2.o
[37/52] c: src/ladder.c -> build/src/ladder.c.2.o
[38/52] c: src/language.c -> build/src/language.c.2.o
[39/52] c: src/legal.c -> build/src/legal.c.2.o
[40/52] c: src/mailer.c -> build/src/mailer.c.2.o
../src/language.c: In function ‘find_format’:
../src/language.c:92: warning: passing argument 1 of ‘__builtin___sprintf_chk’ discards qualifiers from pointer target type
[41/52] c: src/mink.c -> build/src/mink.c.2.o
../src/mailer.c: In function ‘mail_tempnam’:
../src/mailer.c:139: warning: format not a string literal and no format arguments
[42/52] c: src/multicol.c -> build/src/multicol.c.2.o
[43/52] c: src/network.c -> build/src/network.c.2.o
../src/mink.c:50:1: warning: "snprintf" redefined
In file included from /usr/include/stdio.h:499,
                 from ../src/mink.h:19,
                 from ../src/mink.c:46:
/usr/include/secure/_stdio.h:57:1: warning: this is the location of the previous definition
[44/52] c: src/nngsmain.c -> build/src/nngsmain.c.2.o
[45/52] c: src/pending.c -> build/src/pending.c.2.o
[46/52] c: src/plan.c -> build/src/plan.c.2.o
[48/52] c: src/udp_commands.c -> build/src/udp_commands.c.2.o
[48/52] c: src/playerdb.c -> build/src/playerdb.c.2.o
[49/52] c: src/utils.c -> build/src/utils.c.2.o
../src/utils.c: In function ‘statstr_trim’:
../src/utils.c:1249: warning: passing argument 1 of ‘statstr_dup’ makes pointer from integer without a cast
[50/52] c: src/variable.c -> build/src/variable.c.2.o
../src/playerdb.c: In function ‘player_write’:
../src/playerdb.c:1154: warning: format ‘%d’ expects type ‘int’, but argument 3 has type ‘size_t’
../src/playerdb.c:1154: warning: format ‘%d’ expects type ‘int’, but argument 3 has type ‘size_t’
../src/playerdb.c:1159: warning: format ‘%d’ expects type ‘int’, but argument 3 has type ‘size_t’
../src/playerdb.c:1159: warning: format ‘%d’ expects type ‘int’, but argument 3 has type ‘size_t’
[51/52] cstlib: build/mlrate/src/anchor.c.1.o build/mlrate/src/circular.c.1.o build/mlrate/src/cmd.c.1.o build/mlrate/src/error.c.1.o build/mlrate/src/game.c.1.o build/mlrate/src/hdbm.c.1.o build/mlrate/src/ilog2.c.1.o build/mlrate/src/itime.c.1.o build/mlrate/src/list.c.1.o build/mlrate/src/mlr.c.1.o build/mlrate/src/mlrate.c.1.o build/mlrate/src/old2newres.c.1.o build/mlrate/src/oldresult.c.1.o build/mlrate/src/player.c.1.o build/mlrate/src/rank.c.1.o build/mlrate/src/rdbm.c.1.o build/mlrate/src/rdbmtool.c.1.o build/mlrate/src/result.c.1.o build/mlrate/src/rhistory.c.1.o build/mlrate/src/shash.c.1.o build/mlrate/src/t2res.c.1.o build/mlrate/src/weight.c.1.o build/mlrate/src/xdbm.c.1.o -> build/libmlrate.a
[52/52] cprogram: build/src/adminproc.c.2.o build/src/alias.c.2.o build/src/bm.c.2.o build/src/censor.c.2.o build/src/channel.c.2.o build/src/chkaddr.c.2.o build/src/command.c.2.o build/src/comproc.c.2.o build/src/conffile.c.2.o build/src/emote2.c.2.o build/src/gamedb.c.2.o build/src/gameproc.c.2.o build/src/ip_ban.c.2.o build/src/ladder.c.2.o build/src/language.c.2.o build/src/legal.c.2.o build/src/mailer.c.2.o build/src/mink.c.2.o build/src/multicol.c.2.o build/src/network.c.2.o build/src/nngsmain.c.2.o build/src/pending.c.2.o build/src/plan.c.2.o build/src/playerdb.c.2.o build/src/udp_commands.c.2.o build/src/utils.c.2.o build/src/variable.c.2.o -> build/nngsrv
Waf: Leaving directory `/Users/matsu911/nngs-1.1.22/build'
'build' finished successfully (4.968s)
{% endhighlight %}

build以下にnngsrvが生成されたことが確認できます。

{% highlight console %}
$ ls build/nngsrv 
build/nngsrv
{% endhighlight %}

上で示したように、[autoconf](http://www.gnu.org/software/autoconf/)や[automake](http://www.gnu.org/software/automake)を使う場合と比べ、非常に簡単にビルド環境を構築できることがわかります。
