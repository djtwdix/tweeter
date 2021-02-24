/** 
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  /**
   * createTweetElement() returns HTML markup
   * based on the passed-in tweet data object
   */
  const createTweetElement = (tweetData) => {
    const dateCreated = new Date(tweetData.created_at);
    const dateNow = new Date(Date.now());
    const timeSinceTweet = timeSinceCreated(dateNow, dateCreated);
    const dateArray = dateCreated.toGMTString().split(" ").slice(0, 4).join(" ");
    const $tweet = $(`<article>
    <header>
      <div class="tweet-header-left">
        <img src=${tweetData.user.avatars}>
        ${tweetData.user.name}
      </div>
      <div class="handle tweet-header-left">
        ${tweetData.user.handle}
      </div>
    </header>
    <div class="tweet-text">
      ${tweetData.content.text}
    </div>
    <footer>
      <div>
        ${timeSinceTweet}
      </div>
      <div>
        <i class="far fa-flag icon"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
      </div>
    </footer>
    </article>`);
    return $tweet;
  }

  /**
  * renderTweets() loops through array of tweet data objects
  * calls createTweetElement on each tweet
  * appends result to tweet section of index.html
  */
  const renderTweets = (tweetArray) => {
    for (let tweet of tweetArray) {
      $("#tweet").append(createTweetElement(tweet))
    }
  }

 /*  renderTweets(tweetData); */

 /**
  * Ajax post request from new tweet form
 */
  const $submit = $('#tweet-form');
  $submit.on('submit', function (event) {
    event.preventDefault()
    console.log('Tweet submitted, performing ajax call...');
    const content = $(this).serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: content
    })
      .done(data => {
        console.log("Tweet submitted")
        loadTweets();
      })
      .fail(err => {
        console.log(err)
      })
      .always()
  });
  
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
    .done(data => {
      console.log(data);
      renderTweets(data);
    })
    .fail(err => {
      console.log(err);
    })
  };

  loadTweets();
})

function timeSinceCreated(current, previous) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    const secondsSince = Math.round(elapsed / 1000);
    if (secondsSince === 1) {
      return  secondsSince + ' second ago';
    } else {
      return  secondsSince + ' seconds ago';
    }
  }

  else if (elapsed < msPerHour) {
    const minutesSince = Math.round(elapsed / msPerMinute);
    if (minutesSince === 1) {
      return minutesSince + ' minute ago'
    } else {
      return  minutesSince + ' minutes ago';
    }
  }

  else if (elapsed < msPerDay) {
    const hoursSince = Math.round(elapsed / msPerHour);
    if (hoursSince === 1) {
      return  hoursSince + ' hour ago';
    } else {
      return  hoursSince + ' hours ago';
    }
  }

  else if (elapsed < msPerMonth) {
    const daysSince = Math.round(elapsed / msPerDay);
    if (daysSince === 1) {
      return daysSince + " day ago"
    } else {
      return  daysSince + ' days ago';
    }
  }

  else if (elapsed < msPerYear) {
   const monthsSince = Math.round(elapsed / msPerMonth);
   if (monthsSince === 1) {
     return monthsSince + ' month ago'
   } else {
     return  monthsSince + ' months ago';
   }
  }

  else {
    const yearsSince = Math.round(elapsed / msPerYear);
    if (yearsSince === 1) {
      return  + ' year ago';
    } else {
      return  + ' year ago';
    }
  }
}