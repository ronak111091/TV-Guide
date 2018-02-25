/// <reference path= "../../Scripts/knockout-3.4.2.js" />
/// <reference path= "../../Scripts/jquery-3.1.1.js" />
/// <reference path= "../../Scripts/jquery-ui-1.12.1" />
/// <reference path="dataService.js" />
/// <reference path="namespace.js" />

$(function () {
    console.log("discover.js loaded!");
    //Creating viewModel which will be binded to the elements on the screen.
    my.discoverViewModel = (function () {

        var sortBy = ko.observable();
        var year = ko.observable();
        var genres = ko.observableArray([]);
        var keyword = ko.observable("").extend({
            rateLimit:1500
        });

        var isMovie = ko.observable(true);
        var isTvShow = ko.observable(false);
        var movies = ko.observableArray([]);
        var tvShows = ko.observableArray([]);

        var page = ko.observable(1);
        var totalResults = ko.observable();
        var totalPages = ko.observable();

        var formatGenres = function () {
            if (genres()) {
                var str = "";
                var len = genres().length;
                $(genres()).each(function (i, e) {
                    str += e;
                    if (i < len - 1) {
                        str += ",";
                    }
                });
                return str;
            } else {
                return null;
            }
        };

        var reset = function () {
            page(1);
            sortBy("popularity.desc");
            genres([]);
            keyword("");
            isMovie(true);
            isTvShow(false);
            totalResults(null);
            totalPages(null);
        };

        var resetFilters = function(){
            page(1);
            //sortBy("popularity.desc");
            //genres([]);
            //keyword("");
            //year(null);
            movies([]);
            tvShows([]);
            totalResults(null);
            totalPages(null);
            loadData();
        }

        var selectMovieListener = function () {
            console.log("selectMovieListener called!");
            isMovie(true);
            isTvShow(false);
            $("#movieTab").addClass("active");
            $("#tvTab").removeClass("active");
            resetFilters();
        }

        var selectTvShowListener = function () {
            console.log("selectTvShowListener called!");
            isTvShow(true);
            isMovie(false);
            $("#tvTab").addClass("active");
            $("#movieTab").removeClass("active");
            resetFilters();
        }

        var loadData = function () {
            if (isMovie) {
                dataService.disvoverMovies({
                    page: page(),
                    genres: formatGenres(),
                    keywords: keyword(),
                    sortBy: sortBy(),
                    year: year()
                }).done(function (data) {
                    movies(data.results);
                    //page(data.page);
                    totalResults(data.total_results);
                    totalPages(data.total_pages);
                }).fail(function () {
                    console.error("error while fetching discover movies!!!!")
                });
            } else if(isTvShow) {
                //not implemented
            }
        }

        var goToNextPage = function () {
            page(page() + 1);
            loadData();
            var body = $("html, body");
            body.stop().animate({ scrollTop: 0 }, '500', 'swing');
        };

        var goToPreviousPage = function () {
            page(page() - 1);
            loadData();
            var body = $("html, body");
            body.stop().animate({ scrollTop: 0 }, '500', 'swing');
        };

        var getGenres = function (genreIds) {
            var genres = "";
            $(genreIds).each(function (i, e) {
                var t = dataService.getMovieGenreNameFromId(e);
                if (t && t.length>0) {
                    genres += t[0].name;
                    if (i < genreIds.length - 1) {
                        genres += ", ";
                    }
                }
            });
            return genres;
        }

        var constructImageUrl = function (data) {

            return dataService.getImageBaseUrlPoster() + data.poster_path;
        }

        var redirectToMovieDetails = function (data) {
            localStorage.setItem("movie_id", data.id);
            $(location).attr("href", "movieDetails.html");
        }

        var getPageDetails = function () {
            return "Currently on page: " + page() + " of " + totalPages() + " (" + totalResults() + " results)";
        }


        return {
            sortBy: sortBy,
            year: year,
            genres: genres,
            keyword: keyword,

            isMovie: isMovie,
            isTvShow: isTvShow,
            movies: movies,

            page: page,
            totalPages: totalPages,
            totalResults: totalResults,

            loadData: loadData,
            reset: reset,
            resetFilters: resetFilters,
            selectMovieListener: selectMovieListener,
            selectTvShowListener: selectTvShowListener,

            yearOptions: my.years,
            sortByOptions: my.data.sortBy,
            genresOptions: my.data.genres,

            getGenres: getGenres,
            constructImageUrl: constructImageUrl,
            redirectToMovieDetails: redirectToMovieDetails,
            getPageDetails: getPageDetails,
            goToNextPage: goToNextPage,
            goToPreviousPage: goToPreviousPage
        }

    })();

    my.discoverViewModel.year.subscribe(function () {
        this.loadData();
    }, my.discoverViewModel);

    my.discoverViewModel.keyword.subscribe(function () {
        this.loadData();
    }, my.discoverViewModel);

    my.discoverViewModel.genres.subscribe(function () {
        this.loadData();
    }, my.discoverViewModel);

    my.discoverViewModel.sortBy.subscribe(function () {
        this.loadData();
    }, my.discoverViewModel);

    //my.discoverViewModel.page.subscribe(function () {
    //    this.loadData();
    //}, my.discoverViewModel);

    //$("#tab").tabs();

    my.discoverViewModel.loadData();

    ko.applyBindings(my.discoverViewModel);
});