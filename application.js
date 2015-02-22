
var visitor = 'questhenkart'

$(document).ready(function(){
  //initialize
  var $tweets = $('.tweets');
  var myTweets = 0;
  var tweetCounter= 0;
  var myMessage =''; 
  var iFollowing = users.length
  var folksToFollow = ['burningman', 'sfweekly', 'elonmusk', 'hackreactor', 'nytimes'];
  var trends = 0;


//Tweet Machine populates the Tweet area, takes a parameter to populate the newsfeed with one user
  var tweetMachine = function(username){
    //clears the newsfeed
    $tweets.html('');

    var index = username == undefined ? streams.home.length - 1 : streams.users[username].length-1
    if (username == undefined) tweetCounter = index;


    while(index >= 0){
      var tweet = username == undefined ? streams.home[index] : streams.users[username][index];
      var $tweet = $('<li></li>');
      var $profile = $()
      $tweet.appendTo($tweets);

      var hash = tweet.message.match(/#\w+/);
      if (hash != undefined) tweet.message = tweet.message.replace(hash, '');

      var following = $("<p class='stats'>"+users.length+"</p>")


      var user=   $("<div class='twitpicborder'><img class='twitpic' src='images/"+tweet.user+".jpg'/></div> <p class='username' data-name='"+tweet.user+"'>"+tweet.user+'</p>');
      var timestamp;
      if(!tweet.created_at) {
        timestamp = moment().fromNow()
      }else{
        timestamp = tweet.created_at.fromNow()
      }
      var twitterid=  $("<p class='twitterid'>@"+tweet.user+ " :: "+ timestamp +"</p>");
      var message =   $("<br><br><p class='message'>" + tweet.message+ "</p>");
      var hashtag =   $("<a HREF='#'>"+hash+"</a>")

      $(".tweets").find("li").last().prepend(user);
      $(".tweets").find("li").last().find("p").after(twitterid);
      $(".tweets").find("li").last().find("p").last().after(message)
      if (hash != undefined) {
        $(".tweets").find("li").last().find("p").last().append(hashtag);
        $('<li></li>').appendTo($("#trending"));
        if (trends < 10) $("#trending").find("li").last().append(hashtag);
        trends++;
      }

      index -= 1;
    }

    //displays profile stats
    $("#jquerystats").children('li').first().text(myTweets);
    $("#jquerystats").children("li").first().next().text(users.length);
    $("#jquerystats").children("li").last().text(iFollowing);
  }
  //initial call
  tweetMachine();
  populate()




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
   // delete streams.users.questhenkart
    $('#tweetinput').trigger("reset");
  });
      
      //shows the personal timeline upon clicking a username
  $(".tweets").on('click', 'li', function(){
    var user = $(this).find('p').first().data("name");
    tweetMachine(user);
    
  });


  //adds new people to the random tweet list
  $(".follows").on('click', '#followbutton', function(){
    var user=$(this).data('name');
    streams.users[user] = [];
    window.users.push(user)
    folksToFollow.splice(folksToFollow.indexOf(user), 1);
    populate();
    $("#jquerystats").children("li").first().next().text(users.length);

  });


  //folks to follow
   function populate(){
    $(".follows").html('');

      var index = folksToFollow.length -1;

      while(index >= 0){
        var $tweet = $('<li></li>');
        $tweet.appendTo(".follows");

        var user=         $("<div class='twitpicborder'><img class='twitpic' src='images/"+folksToFollow[index]+".jpg'/></div> <p class='username' data-name='"+folksToFollow[index]+"'>"+folksToFollow[index]+'</p>');
        var twitterid=    $("<p class='twitterid'>@"+folksToFollow[index]+"</p>");
        var followbutton= $("<img id='followbutton' data-name='"+folksToFollow[index]+"' src='images/followbutton.png'/>")

        $(".follows").find("li").last().prepend(user);
        $(".follows").find("li").last().find("p").after(twitterid);
        $(".follows").find("li").last().find("p").last().after(followbutton);
        index -= 1;
    }
  }


});

