/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
  user: {
  name: "Newton",
  avatars: "https://i.imgur.com/73hZDYK.png",
  handle: "@SirIsaac"
  },
  content: {
  text: "If I have seen further it is by standing on the shoulders of giants"
  },
  created_at: 1613994657067
  },
  {
  user: {
  name: "Descartes",
  avatars: "https://i.imgur.com/nlhLi3I.png",
  handle: "@rd"
  },
  content: {
  text: "Je pense , donc je suis"
  },
  created_at: 1614081057067
  }
  ]

$(document).ready(() => {
  /**
   * createTweetElement() returns HTML markup
   * based on the passed-in tweet data object
   */
  const createTweetElement = (tweetData) => {
    const dateCreated = new Date(tweetData.created_at);
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
        ${dateArray}
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

  renderTweets(tweetData);
})

/* $(function () {
  const $submit = $('#tweet-form');
  $submit.on('submit', function () {
    console.log('Tweet submitted, performing ajax call...');
    $.ajax('initial-tweets.JSON', { method: 'POST' })
      .then(function (morePostsHtml) {
        console.log('Success: ', morePostsHtml);
        $button.replaceWith(morePostsHtml);
      });
  });
}); */