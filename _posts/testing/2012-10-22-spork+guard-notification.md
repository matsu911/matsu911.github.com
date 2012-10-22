---
layout: post
title: "spork+guard+test/unitでgrowlにnotifyされるようにする"
description: "rubyでspork+guardを使って自動テスト実行環境を構築した際にgrowlにテスト結果をnotifyする方法です。"
category: Testing
tags: [ruby]
keywords: [ruby,spork,quard,test/unit,growl,notify,drb]
---
{% include JB/setup %}

先日、[spork](https://github.com/sporkrb/spork)と[guard](https://github.com/guard/guard)でtest/unitで書かれたテストコードを自動実行する環境を構築したのですが、なぜかgrowlにnotifyされません。
Guardfileには次のように:drdオプションを指定しています。

{% highlight ruby %}
notification :growl

guard :test, :drb => true do
  ...
end
{% endhighlight %}

ネット上にもあまり情報がないようなので、コードを追って解決策を捻り出しました。
test/test_helper.rbのSpork.preforkに次のようなコードを追加します。

{% highlight ruby %}
Spork.prefork do
  ...

  require 'guard/test/notifier'
  require 'test/unit/ui/console/testrunner'

  class Test::Unit::UI::Console::TestRunner
    alias :old_finished :finished
    def finished(elapsed_time)
      send :old_finished, elapsed_time
      ::Guard::Test::Notifier.notify(@result, elapsed_time)
    end 
  end
end
{% endhighlight %}

Test::Unit::UI::Console::TestRunnerクラスをオープンしてfinishedメソッドの最後に実行結果をnotifyするようにします。
これでgrowlにnotifyされるようになりました。
