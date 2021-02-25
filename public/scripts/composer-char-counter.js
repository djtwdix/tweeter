/**
 * event listener on input of text area in new tweet form
 * charCounter() captures amount of characters typed
 * counter element on page displays difference between max characters and characters typed
 * counter element displays red if user has gone over 140 characters
 */

$(document).ready(() => {
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
})

