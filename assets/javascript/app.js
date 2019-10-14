$(document).ready(function () {

    var search;
    var results;
    var image;
    var button;
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

        if (topics.includes(search.toLowerCase())) {
            $("#duplicate").css({
                "visibility": "visible",
                "display": "block"
            });
            $("#search-input").val("");

        }

        else {
            topics.push(search);
            console.log(topics);
            $("#duplicate").css({
                "visibility": "hidden",
                "display": "none"
            });

            //adding sessionStorage??


            renderButtons();
            displayGifs();

        }


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
                image.attr("src", results[i].images.fixed_height_still.url);
                image.addClass("img-thumbnail image");
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("data-state", "still");
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
                image.attr("src", results[i].images.fixed_height_still.url);
                image.addClass("img-thumbnail image");
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("data-state", "still");
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





    $(document).on("click", ".image", function () {
        console.log("image clicked");

        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still")

        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }

        if (state === "animate") {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    });

});

