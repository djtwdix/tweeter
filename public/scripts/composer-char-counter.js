/**
 * event listener on input of text area in new tweet form
 * charCounter() captures amount of characters typed
 * counter element on page displays difference between max characters and characters typed
 * counter element displays red if user has gone over 140 characters
 */

$(document).ready(() => {

  //count characters in tweet form and display remaining characters

  $("#tweet-text").on("input", function charCounter() {
    characters = $(this).val().length;
    charactersLeft = 140 - characters
    const parent = $(this).parent();
    $(parent).find(".counter").text(charactersLeft);
    if (charactersLeft < 0) {
      $(parent).find(".counter").css({ "color": "rgb(255, 57, 57)" });
    } else {
      $(parent).find(".counter").css({ "color": "#545149" });
    }
  })

  //toggle tweet form on click of write new tweet

  $("#tweet-reveal").on("click", function () {
    $("#tweet-form").slideToggle("slow");
    $("#tweet-text").focus();
    $("#input-error").slideUp("slow");
  })

  $(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 100) {
      $('#scroll-up-arrow').fadeIn();
      $(".nav-right").fadeOut();
    } else {
      $('#scroll-up-arrow').fadeOut();
      $(".nav-right").fadeIn();
    }
  })

  $('#scroll-up-arrow').on("click", function () {
    $("#tweet-text").focus();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $("#tweet-form").slideDown("slow");
    $("#input-error").slideUp("slow");
  })

  $("#flag").on("click", function(){
    $("#flag").css({"color": "red"})
  })
})



