var search;
var results;
var image;
var button;
var buttonName;
var topics = ["dog", "cat", "horse"];

function renderButtons() {
    $("#button-area").empty();

    for (i = 0; i < topics.length; i++) {
        button = $("<button>");
        button.addClass("button");
        button.addClass("btn btn-dark custom");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#button-area").append(button);

    }
}
renderButtons();

$("#search-button").on("click", function () {
    event.preventDefault();
    search = $("#search-input").val().trim();

    topics.push(search);
    console.log(topics);

    renderButtons();
    displayGifs();
});

function displayGifs() {
    $("#gif-area").empty();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=2F6f6YK7pYyVPEbz2QtQ6BIvW5yW2PhV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        results = response.data;

        for (i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");
            gifDiv.attr("id", "gif-div");
            var p = $("<p>");

            p.append("Rating : " + results[i].rating);
            image = $("<img>");
            image.attr("src", results[i].images.fixed_height.url);
            image.addClass("img-thumbnail");
            image.attr("id", "gif-image");
            gifDiv.append(p);
            gifDiv.append(image);
            $("#gif-area").append(gifDiv);

        }

    })
    $("#search-input").val("");
};

$(".button").on("click", function () {
    $("#gif-area").empty();
    search = $(this).attr("data-name");
    console.log(search);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=2F6f6YK7pYyVPEbz2QtQ6BIvW5yW2PhV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        results = response.data;

        for (i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");
            gifDiv.attr("id", "gif-div");
            var p = $("<p>");

            p.append("Rating : " + results[i].rating);
            image = $("<img>");
            image.attr("src", results[i].images.fixed_height.url);
            image.addClass("img-thumbnail");
            image.attr("id", "gif-image");
            gifDiv.append(p);
            gifDiv.append(image);
            $("#gif-area").append(gifDiv);
        }

    })
});


$('#search-input').keyup(function (e) {
    if (e.which == 13) {
        $('#search-button').click();
    }
});

//var stillImage = results[i].images.fixed_height_still.url


$("#gif-image").on("click", function () {
    var imageVal = $(this).attr("data-name");

});