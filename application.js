
var visitor = 'questhenkart'
$(document).ready(function(){
  //initialize
  var $tweets = $('.tweets');
  var myTweets = 0;
  var tweetCounter= 0;
  var myMessage =''; 

//Tweet Machine populates the Tweet area
  var tweetMachine = function(){
    $tweets.html('');

    var index = streams.home.length - 1;
    tweetCounter = index;

    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<li></li>');
      var $profile = $()
      $tweet.appendTo($tweets);

      var hash = tweet.message.match(/#\w+/);
      if (hash != undefined) tweet.message = tweet.message.replace(hash, '');



      var following = $("<p class='stats'>"+users.length+"</p>")
      var username=   $("<div class='twitpicborder'><img class='twitpic' src='images/"+tweet.user+".jpg'/></div> <p class='username'>"+tweet.user+'</p>');
      var timestamp;
      if(!tweet.created_at) {
        timestamp = moment().fromNow()
      }else{
        timestamp = tweet.created_at.fromNow()
      }
      var twitterid=  $("<p class='twitterid'>@"+tweet.user+ " :: "+ timestamp +"</p>");
      var message =   $("<br><br><p class='message'>" + tweet.message+ "</p>");
      var hashtag =   $("<a HREF='#'>"+hash+"</a>")

      $(".tweets").find("li").last().prepend(username);
      $(".tweets").find("li").last().find("p").after(twitterid);
      $(".tweets").find("li").last().find("p").last().after(message)
      if (hash != undefined) $(".tweets").find("li").last().find("p").last().append(hashtag);

      index -= 1;
    }

    //displays profile stats
    $("#jquerystats").children('li').first().text(myTweets);
    $("#jquerystats").children("li").first().next().text(users.length);
    $("#jquerystats").children("li").last().text(users.length);
  }
  //initial call
  tweetMachine();




//handles the show new tweets button
  $(".checkTweets").children('p').text("Check for new Tweets");
  $("body").on('mouseover', function(){
      $(".checkTweets").children('p').text("View "+(streams.home.length - tweetCounter)+ " new Tweets");
  });
  $(".checkTweets").hover(function(){
      $(this).css({"background-color": "#DAEBEB"})
  }, function(){
      $(this).css({"background-color": "#f5f8fa"})

  });

  $(".checkTweets").on("click",function(){
    tweetMachine();
  });

//create Tweets
  $("button").click(function(){
    myMessage = $("#tweeter").val();
    streams.users.questhenkart = [];
    writeTweet(myMessage);
    myTweets++;
    tweetMachine();
    delete streams.users.questhenkart
  });
      




});

