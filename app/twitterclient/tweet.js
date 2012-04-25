// -*- mode: js2; tab-width: 2; indent-tabs-mode: nil; js2-basic-offset: 2 -*-

(function($) {
   var updateTwitterFeed = function() {
     var $page = $("#pageTweetList");

     var strUrl = "http://search.twitter.com/search.json?callback=?&rpp=";
     strUrl += $page.data("rpp");
     strUrl += "&q=from:" + $page.data("twitterUser");

     $.ajax({
              url: strUrl,
              dataType: 'json',
              success: function(data, textStatus, jqXHR) {
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
                  $list.find("a:last").data("tweetJSON", JSON.stringify(data.results[i]));

                }
                $list.listview();
                $list.find("a").click(function() {
                                        var $this = $(this);
                                        $("#pageTweetDetail").data("tweetJSON", $this.data("tweetJSON"));
                                      });
              },
              error: function() {
                var $page = $("#pageError .content");
                var strHtml = "<h3>更新に失敗しました</h3>";
                strHtml += "<p>Twitterフィードを更新できませんでした。リトライしてください</p>";
                $page.html(strHtml);
                $("#show-error-page").click();
              }
            });
   };

   var methods = {
     initMainPage : function() {
       var $page = $("#pageTweetList");

       $page.data("rpp", 20);
       $page.data("twitterUser", "jreid01");
       $page.data("boolUpdate", false);

       updateTwitterFeed();
       $page.bind("pageshow", function(event, ui) {
                    if($page.data("boolUpdate")) {
                      updateTwitterFeed();
                      $page.data("boolUpdate", false);
                    }
                  });
     },
     initDetailPage : function() {
       var $page = $("#pageTweetDetail");
       $page.bind("pageshow", function(event, ui) {
                    var objTweet = JSON.parse($page.data("tweetJSON"));
                    var strHtml = '<p><img src="' + objTweet.profile_image_url + '">';
                    strHtml += objTweet.text + '</p>';
                    $page.find(".container-tweet").html(strHtml);
                  });
     },
     initSettigsPage : function() {
       var $page = $("#pageSettings");
       var $datapage = $("#pageTweetList");
       $page.find("#username").change(function(){
                                        var newvVal = $(this).val();
                                        $datapage.data("twitterUser", newvVal);
                                        $datapage.data("boolUpdate", true);
                                      });
       $page.bind("pagebeforehide", function(event, ui){
                    var sliderValue = $page.find("#slider").val();
                    if(parseInt(sliderValue, 10) != paseIn($datapage.data("rpp"), 10)) {
                      $datapage.data("rpp", sliderValue);
                      $datapage.data("boolUpdate", true);
                    }});
       $page.bind("pageshow", function(event, ui) {
                    $page.find("#slider").val($datapage.data("rpp")).slider("refresh");
                    $page.find("#username").val($datapage.data("twitterUser"));
                  });
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
