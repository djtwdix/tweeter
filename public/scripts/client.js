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

    const handleClick = (event) => {
      $(event.target).toggleClass("clicked");
    }

    const $tweet = $(`<article>`)
    const $header = $(`<header>
      <div class="tweet-header-left">
        <img src=${tweetData.user.avatars}>
        ${tweetData.user.name}
      </div>
      <div class="handle tweet-header-left">
        ${tweetData.user.handle}
      </div>
    </header>`)
    const $text = $(`<div class="tweet-text">
          ${escape(tweetData.content.text)}
      </div>`)
    const $footer = $(`<footer>
      <div>
        ${timeSinceTweet}
      </div>
    </footer>`)
    const $icons = $(`<div>`).addClass("icons")
    const $flag = $(`<i class="far fa-flag flag"></i>`)
    const $retweet = $(`<i class="fas fa-retweet retweet retweet"></i>`)
    const $heart = $(`<i class="far fa-heart heart heart"></i>`)

    //toggles icon color to red and back on click
    $flag.click(handleClick);
    $retweet.click(handleClick);
    $heart.click(handleClick);

    $icons.append($flag)
    $icons.append($retweet)
    $icons.append($heart)

    $footer.append($icons)

    $tweet.append($header)
    $tweet.append($text)
    $tweet.append($footer)

    return $tweet;
  }

  /**
  * renderTweets() loops through array of tweet data objects
  * calls createTweetElement on each tweet
  * prepends result to tweet section of index.html
  */

  const renderTweets = (tweetArray) => {
    for (let tweet of tweetArray) {
      $("#tweet").prepend(createTweetElement(tweet))
    }
  }

  /**
   * Ajax post request from new tweet form
  */

  const $submit = $('#tweet-form');
  $submit.on('submit', function (event) {
    event.preventDefault()
    const content = $(this).serialize();
    const notSerializedContent = $(this).children("#tweet-text").val();
    $("#input-error").slideUp("slow", () => {
      if (validateForm(notSerializedContent)) {
        $("#input-error").slideDown("slow")
        $("#quote").text(validateForm(notSerializedContent)[0]);
        $("#quote-name").text(validateForm(notSerializedContent)[1]);
        $("#error-message").text(validateForm(notSerializedContent)[2]);
      } else {
        console.log('Performing ajax call...');
        //clear textarea
        $(this).children("#tweet-text").val("");
        $(".counter").text(140)
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
            console.log(err.message)
          })
          .always()
      }
    })
  });

  /**
   * Ajax get request fetches tweets from db
   * renders them to page with renderTweets()
   */

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .done(data => {
        $("#tweet").empty();
        renderTweets(data);
      })
      .fail(err => {
        console.log(err.message);
      })
  };

  loadTweets();

})

/**
 * timeSinceCreated() takes in current date and date tweet was created
 * returns string indicating time since tweet
 * custom returns for seconds, minutes, hours, days, years
 */

const timeSinceCreated = (current, previous) => {

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    const secondsSince = Math.round(elapsed / 1000);
    if (secondsSince === 1) {
      return secondsSince + ' second ago';
    } else {
      return secondsSince + ' seconds ago';
    }
  }

  else if (elapsed < msPerHour) {
    const minutesSince = Math.round(elapsed / msPerMinute);
    if (minutesSince === 1) {
      return minutesSince + ' minute ago';
    } else {
      return minutesSince + ' minutes ago';
    }
  }

  else if (elapsed < msPerDay) {
    const hoursSince = Math.round(elapsed / msPerHour);
    if (hoursSince === 1) {
      return hoursSince + ' hour ago';
    } else {
      return hoursSince + ' hours ago';
    }
  }

  else if (elapsed < msPerMonth) {
    const daysSince = Math.round(elapsed / msPerDay);
    if (daysSince === 1) {
      return daysSince + " day ago";
    } else {
      return daysSince + ' days ago';
    }
  }

  else if (elapsed < msPerYear) {
    const monthsSince = Math.round(elapsed / msPerMonth);
    if (monthsSince === 1) {
      return monthsSince + ' month ago';
    } else {
      return monthsSince + ' months ago';
    }
  }

  else {
    const yearsSince = Math.round(elapsed / msPerYear);
    if (yearsSince === 1) {
      return + ' year ago';
    } else {
      return + ' year ago';
    }
  }
}

/**
 * validateForm() takes in user input string
 * returns false if not empty and under 140 characters
 * returns specific message if either requirement is not met
 */

const validateForm = (formInput) => {
  if (!formInput) {
    return ['"Either write something worth reading or do something worth writing"', "Benjamin Franklin", "Tweet cannot be empty"];
  } else if (formInput.length > 140) {
    return ['"Brevity is the soul of wit"', "William Shakespeare", "Character limit exceeded"];
  }
  return false;
}

/**
 * escape() takes in user input string
 * creates temporary div containing user input
 * return innerHTML
 */

const escape = function (userInput) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(userInput));
  return div.innerHTML;
}