/// <reference path="../html/movieDetails.html" />
/// <reference path="../html/movieDetails.html" />
/// <reference path="../html/movieDetails.html" />
/// <reference path= "../../Scripts/knockout-3.4.2.js" />
/// <reference path= "../../Scripts/jquery-3.1.1.js" />
/// <reference path= "../../Scripts/jquery-ui-1.12.1" />
/// <reference path="namespace.js" />
/// <reference path="dataService.js" />


$(function () {
    console.log("moviesDetails.js loaded!!");

    var movieId = localStorage.getItem("movie_id");
    //localStorage.removeItem("movie_id");

    console.log("movie_id:" + movieId);

    //Creating viewModel which will be binded to the elements on the screen.
    my.movieDetailsViewModel = {};
    var vmData = my.movieDetailsViewModel;


    //Below I have nested ajax calls because I needed all the data before I could render it.
    //So I have nested the next ajax call into the done block of the previous ajax call.
    dataService.getMovieDetails({
        id: movieId,
    }).done(function (data) {

        vmData.details = data;
        console.log(vmData.details);

        var backgroundImageUrl = dataService.constructImageUrl({
            type: "backdrop",
            path: vmData.details.backdrop_path
        });
        $(".bg").css({
            "background-image": "url(" + backgroundImageUrl + ")",
            "background-attachment": "fixed",
            "background-repeat": "no-repeat",
            "background-size": "cover"
        });

        $("#ratingDiv").rateYo({
            numStars:10,
            rating: vmData.details.vote_average/2,
            starWidth: "14px",
            precision:2,
            readOnly:true
        });

        vmData.constructPosterImageUrl = function (poster_path) {
            console.log(poster_path);
            return dataService.getImageBaseUrlPoster() + poster_path;
        };

        vmData.formatCurrency = function (number) {
            return my.formatNumber(number);
        }

        dataService.getMovieCredits({
            id:movieId
        }).done(function (data) {
            vmData.cast = $(data.cast).slice(0,6);
            vmData.crew = data.crew;

            vmData.constructProfileImageUrl = function (path) {
                console.log(path);
                return dataService.constructImageUrl({
                    type: "profile",
                    path: path
                });
            }

            dataService.getMovieKeywords({
                id:movieId
            }).done(function (data) {
                vmData.keywords = data.keywords;

                dataService.getMovieVideos({
                    id: movieId
                }).done(function (data) {
                    var results = data.results;
                    console.log(results);
                    vmData.videos = $.grep(results, function (e, i) {
                        return e.site == "YouTube" && e.type=="Trailer";
                    });
                    console.log("videos:" + vmData.videos);
                    vmData.playTrailer = function () {
                        console.log("playTrailer called!")
                        $("#playTrailerDialog").dialog({
                            open:function(event){
                                $("#trailerFrame").attr("src","https://www.youtube.com/embed/"+vmData.videos[0].key+"?autoplay=1");
                            },
                            close:function (event) {
                                console.log("stoping video!");
                                $("#trailerFrame").attr("src","");
                            }
                        });
                    }

                    dataService.getMovieReviews({
                        id: movieId,
                        page:1
                    }).done(function (data) {
                        var pageNo = data.pageNo;
                        var results = data.results;
                        vmData.movieReviews = results;

                        dataService.getSimilarMovies({
                            id: movieId
                        }).done(function (data) {
                            vmData.similarMovies =$(data.results).slice(0, 6);;
                            ko.applyBindings({
                                details: vmData.details,
                                constructPosterImageUrl: vmData.constructPosterImageUrl,
                                cast: vmData.cast,
                                crew: vmData.crew,
                                constructProfileImageUrl: vmData.constructProfileImageUrl,
                                formatCurrency: vmData.formatCurrency,
                                keywords: vmData.keywords,
                                videos: vmData.videos,
                                playTrailer: vmData.playTrailer,
                                movieReviews: vmData.movieReviews,
                                similarMovies: vmData.similarMovies,
                                constructImageUrlForSimilarMovies: constructImageUrlForSimilarMovies,
                                redirectToAnotherMovie: redirectToAnotherMovie
                            });
                        }).fail(function () {

                        });

                    }).fail(function () {
                        console.error("error while fetching movie reviews");
                    });

                }).fail(function () {
                    console.log("Error while fetching movie videos")
                });

                
            }).fail(function () {
                console.error("error while fetching movie keywords!")
            });

            
        }).fail(function () {
            console.error("error occurred while fetching movie credits")
        })
       
    }).fail(function () {
        console.log("error while fetching movie details!");
    });

    function constructImageUrlForSimilarMovies(path) {

        return dataService.getImageBaseUrlPosterForSimilarMovies()+"/" + path;
    }

    function redirectToAnotherMovie(data) {
        localStorage.setItem("movie_id", data.id);
        $(location).attr("href", "movieDetails.html");
    }

});