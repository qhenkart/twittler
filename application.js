
$(document).ready(function(){
  var $tweets = $('.tweets');
  $tweets.html('');
  var tweetCounter = 0;

  var index = streams.home.length - 1;


  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<li></li>');
    var $profile = $()
    $tweet.appendTo($tweets);

    var hash = tweet.message.match(/#\w+/);
    if (hash != undefined) tweet.message = tweet.message.replace(hash, '');



    var following = $("<p class='stats'>"+userCount+"</p>")
    var username=   $("<div class='twitpicborder'><img class='twitpic' src='images/"+tweet.user+".jpg'/></div> <p class='username'>"+tweet.user+'</p>');
    var twitterid=  $("<p class='twitterid'>@"+tweet.user+ " :: "+ tweet.created_at.fromNow() +"</p>");
    var message =   $("<br><br><p class='message'>" + tweet.message+ "</p>");
    var hashtag =   $("<a HREF='#'>"+hash+"</a>")

    $(".tweets").find("li").last().prepend(username);
    $(".tweets").find("li").last().find("p").after(twitterid);
    $(".tweets").find("li").last().find("p").last().after(message)
    if (hash != undefined) $(".tweets").find("li").last().find("p").last().append(hashtag);

    index -= 1;
  }



  var userCount = users.length;

  $("#jquerystats").children('li').first().text(tweetCounter);
  $("#jquerystats").children("li").first().next().text(userCount);
  $("#jquerystats").children("li").last().text(userCount);

});

