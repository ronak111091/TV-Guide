/// <reference path= "../../Scripts/knockout-3.4.2.js" />
/// <reference path= "../../Scripts/jquery-3.1.1.js" />
/// <reference path= "../../Scripts/jquery-ui-1.12.1" />
/// <reference path="dataService.js" />
/// <reference path="namespace.js" />

$(function () {
    console.log("home.js loaded!!");


    //creating a viewModel which will be binded with the elements on the screen
    my.homePageViewModel = {};
    var vmData = my.homePageViewModel;

    //Below I have nested ajax calls because I needed all the data before I could render it.
    //So I have nested the next ajax call into the done block of the previous ajax call.
    dataService.getOnTheAirTVShows({
        page: 1
    }).done(function (data) {
        console.log(data);
        vmData.tvShows = $(data.results).slice(0, 3);
        
        dataService.getNowPlayingMovies({
            page: 1
        }).done(function (data) {
            console.log(data);
            vmData.movies = $(data.results).slice(0, 3);
            ko.applyBindings({
                movies: vmData.movies,
                tvShows: vmData.tvShows,
                constructImageURL: constructImageURL,
                redirectToMovieDetails: redirectToMovieDetails
            })
        }).fail(function () {
            console.error("error while fetching now playing movies!!");
        });

    }).fail(function () {
        console.error("error while fetching on air tv shows!!");
    });

    function constructImageURL(path,size) {
        return dataService.constructImageUrlsForHomePage({
            size: size,
            path:path
        })
    }

    function redirectToMovieDetails(data) {
        console.log("redirectToMovieDetails called")
        localStorage.setItem("movie_id", data.id);
        $(location).attr("href", "movieDetails.html");
    }
});