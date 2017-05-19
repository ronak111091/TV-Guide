/// <reference path= "../../Scripts/knockout-3.4.2.js" />
/// <reference path= "../../Scripts/jquery-3.1.1.js" />
/// <reference path= "../../Scripts/jquery-ui-1.12.1" />
/// <reference path="dataService.js" />
/// <reference path="namespace.js" />

$(function () {
    console.log("movies.js loaded!!");
    
    //$("#moviesTabs").tabs();

    //Creating viewModel which will be binded to the elements on the screen.
    my.moviesViewModel = (function () {
        
        var selectedCategory = ko.observable("PO");

        var movieListTitle = ko.observable("Popular Movies");

        var pageNo = ko.observable(1);
        var totalPages = ko.observable(1);
        var totalResults = ko.observable(1);

        var movieList = ko.observableArray([]);

        var loadMovies = function () {
            console.log("in loadMovies")
            dataService.getMoviesByCategory(selectedCategory(), {
                page: pageNo()
            }).done(function (data) {
                console.log(data);
                movieList(data.results);
                pageNo(data.page);
                totalPages(data.total_pages);
                totalResults(data.total_results);
            }).fail(function () {
                console.log("error while fetching movie list!")
            });
        };

        var changeTitle = function () {
            var title = "";
            switch(selectedCategory()){
                case "PO":
                    title = "Popular Movies";
                    break;
                case "UP":
                    title = "Upcoming Movies";
                    break;
                case "TR":
                    title = "Top Rated Movies";
                    break;
                case "NP":
                    title = "Now Playing Movies";
                    break;
                default:
                    title = "Movies";
                    break;
            }
            movieListTitle(title);
        }

        var constructImageUrl = function (data) {
            
            return dataService.getImageBaseUrlPoster() + data.poster_path;
        }

        var getGenres = function (genreIds) {
            var genres = "";
            $(genreIds).each(function (i, e) {
                var t = dataService.getMovieGenreNameFromId(e);
                if(t){
                    genres += t[0].name;
                    if (i < genreIds.length - 1) {
                        genres += ", ";
                    }
                }                
            });
            return genres;
        }

        var getPageDetails = function () {
            return "Currently on page: " + pageNo() + " of " + totalPages() + " (" + totalResults() + " results)";
        }

        var goToNextPage = function () {
            console.log("goToNextPage called!")
            pageNo(pageNo() + 1);
            loadMovies();
            var body = $("html, body");
            body.stop().animate({ scrollTop: 0 }, '500', 'swing');
        }

        var goToPreviousPage = function () {
            console.log("goToPreviousPage called!")
            pageNo(pageNo() - 1);
            loadMovies();

            var body = $("html, body");
            body.stop().animate({ scrollTop: 0 }, '500', 'swing');
        }

        var redirectToMovieDetails = function (data) {
            localStorage.setItem("movie_id", data.id);
            $(location).attr("href", "movieDetails.html");
        }

        return {
            categories: my.data.moviesCategories,
            selectedCategory: selectedCategory,
            movieList: movieList,
            pageNo: pageNo,
            totalPages: totalPages,
            totalResults:totalResults,
            loadMovies: loadMovies,
            movieListTitle: movieListTitle,
            changeTitle: changeTitle,
            constructImageUrl: constructImageUrl,
            getGenres: getGenres,
            getPageDetails: getPageDetails,
            goToNextPage: goToNextPage,
            goToPreviousPage: goToPreviousPage,
            redirectToMovieDetails: redirectToMovieDetails
        };
    })();

    my.moviesViewModel.loadMovies();
    
    my.moviesViewModel.selectedCategory.subscribe(function () {
        this.pageNo(1);
        this.loadMovies();
        this.changeTitle();
    }, my.moviesViewModel);


    //my.moviesViewModel.pageNo.subscribe(function () {
    //    this.loadMovies();
    //}, my.moviesViewModel);

    ko.applyBindings(my.moviesViewModel);
});