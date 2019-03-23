var ballers = [
  "steve nash",
  "steph curry",
  "kobe bryant",
  "allen iverson",
  "tracy mcgrady",
  "vince carter",
  "lebron james"
];

function renderButtons() {
  $("#display-buttons").empty();

  for (var i = 0; i < ballers.length; i++) {
    var newButton = $("<button>");
    newButton.attr("class", "btn btn-danger player-button");
    newButton.attr("id", "input");
    newButton.attr("data-name", ballers[i]);
    newButton.text(ballers[i]);
    $("#display-buttons").append(newButton);
  }
}

renderButtons();

$("#submitButton").on("click", function() {
  var player = $("#player-input")
    .val()
    .trim();
  ballers.push(player);
  renderButtons();
  return false;
});

function displayGifs() {
  var player = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    player +
    "&limit=9&api_key=PFbgUCvjN28IrhFCLms9fG93526kHqed";


  $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
    console.log(response.data);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class=gifs>");
      var showGif = $("<img>");
      showGif.attr("src", results[i].images.fixed_height_still.url);
      showGif.attr("title", "Rating: " + results[i].rating);
      var p = $("<p>").text("Rating: " + results[i].rating);
      showGif.attr("data-still", results[i].images.fixed_height_still.url);
      showGif.attr("data-state", "still");
      showGif.addClass("gif");
      showGif.attr("data-animate", results[i].images.fixed_height.url);
      gifDiv.append(showGif);
      $("#gifs-display").prepend(gifDiv);
    }
  });
}
$(document).on("click", ".player-button", displayGifs);

$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});

