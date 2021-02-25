/**
 * showArrowOnScroll() fades scroll up arrow in or out
 * depending on current scroll top postion
 */

const showArrowOnScroll = () => {
  var y = $(this).scrollTop();
  if (y > 100) {
    $('#scroll-up-arrow').fadeIn();
    $(".nav-right").fadeOut();
  } else {
    $('#scroll-up-arrow').fadeOut();
    $(".nav-right").fadeIn();
  }
}

/**
 * scrollUp() scrolls to top of page
 * reveals tweet form with focus
 * hides error message if present
 */

const scrollUp = () => {
  $("#tweet-text").focus();
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  $("#tweet-form").slideDown("slow");
  $("#input-error").slideUp("slow");
}

/**
 * scrollUp() toggles tweet form with focus
 * hides error message if present
 */

const tweetToggle = () => {
  $("#tweet-form").slideToggle("slow");
  $("#tweet-text").focus();
  $("#input-error").slideUp("slow");
}

$(document).ready(() => {

  /**
 * listens on input and registers length
 * displays remaining characters on page
 * turns red if limit exceeded
 */

  $("#tweet-text").on("input", function () {
    characters = $(this).val().length;
    charactersLeft = 140 - characters
    const parent = $(this).parent();
    $(parent).find(".counter").text(charactersLeft);
    if (charactersLeft < 0) {
      $(parent).find(".counter").css({ "color": "rgb(255, 57, 57)" });
    } else {
      $(parent).find(".counter").css({ "color": "#545149" });
    }
  });


  $("#tweet-reveal").on("click", function () {
   tweetToggle();
  });

  $(document).scroll(function () {
    showArrowOnScroll();
  });;

  $('#scroll-up-arrow').on("click", function () {
    scrollUp();
  });

  
});

