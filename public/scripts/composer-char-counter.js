$(document).ready(() => {
  console.log("This is a test");
  $("#tweet-text").on("input", function () {
    characters = $(this).val().length;
    charactersLeft = 140 - characters
    $(".counter").text(charactersLeft);
    const parent = $(this).parent();
    if (charactersLeft < 0) {
      $(parent).find(".counter").css({ "color": "red" });
    } else {
      $(parent).find(".counter").css({ "color": "#545149" });
    }
  })
})

