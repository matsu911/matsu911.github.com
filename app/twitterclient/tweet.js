// -*- mode: js2; tab-width: 2; indent-tabs-mode: nil; js2-basic-offset: 2 -*-

(function($) {
   var updateTwitterFeed = function() {
     var $page = $("#pageTweetList");
     var strUrl = "http://search.twitter.com/search.json?callback=?&rpp=";
     strUrl += $page.data("rpp");
     strUrl += "&q=from:" + $page.data("twitterUser");
     alert(strUrl);

     $.ajax({
              url: strUrl,
              dataType: 'json',
              success: function(data) {
                $page.find(".content").empty();
                $page.find(".content").html("<ul></ul>");
                var $list = $page.find(".content ul");
                for(var i = 0; i < data.results.length; i++) {
                  var strHtml = '<li><a href="#pageTweetDetail">';
                  strHtml += '<img src="' + data.results[i].profile_image_url + '">';
                  strHtml += data.results[i].text;
                  strHtml += '</a></li>\n';
                  var tweet = $(strHtml);
                  $list.append(tweet);
                  $list.find("a:list").data("tweetJSON", JSON.stringify(data.results[i]));

                }
                $list.listview();
                $list.find("a").click(function() {
                                        var $this = $(this);
                                        $("#pageTweetDetail").data("tweetJSON", $this.data("tweetJSON"));
                                      });
              },
              error: function() {
                alert("エラーが発生しました。リトライしてください");
              }
            });
   };

   var methods = {
     initMainPage : function() {
       var $page = $("#pageTweetList");

       $page.data("rpp", 20);
       $page.data("twitterUser", "jreid01");
       $page.data("boolUpdate", false);
       alert($page.data("rpp"));
       alert($page.data("twitterUser"));
       alert($page.data("boolUpdate"));

       updateTwitterFeed();
       $page.bind("pageshow", function(event, ui) {
                    if($page.datga("boolUpdate")) {
                      updateTwitterFeed();
                      $page.data("boolUpdate", false);
                    }
                  });
     },
     initDetailPage : function() {
     },
     initSettigsPage : function() {
     },
     initAll : function() {
       $().initApp("initMainPage");
       $().initApp("initDetailPage");
       $().initApp("initSettigsPage");
     }
   };

   $.fn.initApp = function(method) {
     if(methods[method]) {
       return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
     } else if(typeof method == 'object' || ! method) {
       return methods.initAll.apply(this, arguments);
     } else  {
       $.error('メソッド' + method + 'は存在しません');
       return false;
     }
   };
 })(jQuery);

// jQuery().initApp();
