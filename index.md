---
layout: page
title: Shigeaki Matsumura
tagline: Legacy Code Consultant
---
{% include JB/setup %}

CEO of [Backflip180, LLC.](http://backflip180.jp).
Legacy Code Consultant especially for C/C++.

## Projects
+ [API Spoofer](https://github.com/matsu911/api_spoofer)
+ [Code Metrics Tool](https://github.com/matsu911/code_metrics)
+ [The Waf Book Japanese Translation](https://github.com/matsu911/waf_book_ja)
+ [SLIME swank server for Lua](https://github.com/matsu911/swank-lua)
+ [Emacs major mode for SPIM](https://github.com/matsu911/spim-mode)
+ [Common Lisp for finance](https://github.com/matsu911/cl-finance)
+ [pyQ: Python Q Binding](https://github.com/matsu911/pyQ)
+ [pyELF: Python ELF Binding](https://github.com/matsu911/pyELF)
+ [JVM on CL: Java VM on Common Lisp](https://github.com/matsu911/jvm-on-cl)
+ [Simple Sinatra Project Generatgor](https://github.com/matsu911/sinatra_pg)

## Forked Projects
+ [SLIME swank server for Clojure](https://github.com/matsu911/swank-clojure)
+ [Org Google CL](https://github.com/matsu911/org-googlecl)
+ [luabind: C++ binding for Lua](https://github.com/matsu911/luabind)
+ [clojure-mode](https://github.com/matsu911/clojure-mode)
+ [jekyll-s3](https://github.com/matsu911/jekyll-s3)

## Web Applications
+ [Black Scholes Calculator](app/blackscholes/)
+ [ネイルナビ: 現在地からネイルサロンを検索](http://nailnavi.heroku.com)
+ [姓名判断横断検索](http://seimeihandan.heroku.com)
+ [品川区立図書館新刊一覧](http://library-new-books.herokuapp.com)

## Posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
