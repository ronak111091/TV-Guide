/// <reference path= "../../Scripts/knockout-3.4.2.js" />
/// <reference path= "../../Scripts/jquery-3.1.1.js" />
/// <reference path= "../../Scripts/jquery-ui-1.12.1" />
/// <reference path="namespace.js" />

//api key bb985894bb5421e085e1ded7b8feb337

var dataService = (function () {

    const apiKeyValue = "api_key=bb985894bb5421e085e1ded7b8feb337";
    const mainUrl = "https://api.themoviedb.org/3";

    var getPopularMovies = function (params) {
        var url = "/movie/popular";
        return $.getJSON(mainUrl +url + "?" + apiKeyValue + "&language=en-US&page=" + params.page);
    };

    var getNowPlayingMovies = function (params) {
        var url = "/movie/now_playing";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue + "&language=en-US&page=" + params.page);
    };

    var getTopRatedMovies = function (params) {
        var url = "/movie/top_rated";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue + "&language=en-US&page=" + params.page);
    };

    var getUpcomingMovies = function (params) {
        var url = "/movie/upcoming";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue + "&language=en-US&page=" + params.page);
    };

    var getMoviesByCategory = function (category, params) {
        switch (category) {
            case "PO":
                return getPopularMovies(params);
            case "TR":
                return getTopRatedMovies(params);
            case "UP":
                return getUpcomingMovies(params);
            case "NP":
                return getNowPlayingMovies(params);
            default:
                return null;
        }
    };
    
    var getAiringTodayTVShows = function (params) {
        var url = "/tv/airing_today";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue + "&language=en-US&page=" + params.page);
    };

    var getOnTheAirTVShows = function (params) {
        var url = "/tv/on_the_air";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue + "&language=en-US&page=" + params.page);
    };

    var getPopularTVShows = function (params) {
        var url = "/tv/popular";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue + "&language=en-US&page=" + params.page);
    };

    var getTopRatedTVShows = function (params) {
        var url = "/tv/top_rated";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue + "&language=en-US&page=" + params.page);
    };

    var getImageBaseUrlPoster = function () {
        return my.data.images.base_url + my.data.images.poster_sizes[3];
    };

    var getImageBaseUrlPosterForSimilarMovies = function () {
        return my.data.images.base_url + my.data.images.poster_sizes[1];
    };

    var getImageBaseUrlBackdrop = function () {
        return my.data.images.base_url + my.data.images.backdrop_sizes[2];
    };
    var getImageBaseUrlProfile = function () {
        return my.data.images.base_url + my.data.images.profile_sizes[1];
    };

    var constructImageUrl = function (params) {
        switch (params.type) {
            case "poster":
                return getImageBaseUrlPoster() + params.path;
            case "backdrop":
                return getImageBaseUrlBackdrop() + params.path;
            case "profile":
                return getImageBaseUrlProfile() + params.path;
            default:
                return null;
        }
    };

    var getMovieGenreNameFromId = function (id) {
        return $.grep(my.data.genres, function (e, i) {
            return e.id == id;
        });
    };

    var getMovieDetails = function (params) {
        var url = "/movie/" + params.id;
        return $.getJSON(mainUrl + url + "?" + apiKeyValue + "&language=en-US");
    };

    var getMovieCredits = function (params) {
        var url = "/movie/" + params.id + "/credits";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue);
    };

    var getMovieKeywords = function (params) {
        var url = "/movie/" + params.id + "/keywords";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue);
    };

    var getMovieVideos = function (params) {
        var url = "/movie/" + params.id + "/videos";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue);
    };

    var getMovieReviews=function(params){
        var url = "/movie/" + params.id + "/reviews";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue);
    };

    var getSimilarMovies = function (params) {
        var url = "/movie/" + params.id + "/similar";
        return $.getJSON(mainUrl + url + "?" + apiKeyValue);
    };

    var constructImageUrlsForHomePage = function (params) {
        return my.data.images.base_url + my.data.images.backdrop_sizes[params.size]+"/"+params.path;
    };

    var disvoverMovies = function (params) {
        console.log(params);
        var url = "/discover/movie?" + apiKeyValue + "&language=en-US&include_adult=false&include_video=false&page="
            + params.page
        if (params.sortBy) {
            url = url + "&sort_by=" + params.sortBy;
        }
        if(params.year){
            url = url + "&year=" + params.year;
        }
        if (params.genres) {
            url = url + "&with_genres=" + params.genres;
        }
        if (params.keywords) {
            url = url + "&with_keywords=" + params.keywords;
        }
        url = mainUrl + url;
        console.log(url);

        return $.getJSON(url);
        
    }

    return {
        getPopularMovies: getPopularMovies,
        getNowPlayingMovies: getNowPlayingMovies,
        getTopRatedMovies: getTopRatedMovies,
        getUpcomingMovies: getUpcomingMovies,
        getAiringTodayTVShows: getAiringTodayTVShows,
        getOnTheAirTVShows: getOnTheAirTVShows,
        getPopularTVShows: getPopularTVShows,
        getTopRatedTVShows: getTopRatedTVShows,
        getMoviesByCategory: getMoviesByCategory,
        getImageBaseUrlPoster: getImageBaseUrlPoster,
        getImageBaseUrlBackdrop: getImageBaseUrlBackdrop,
        getImageBaseUrlProfile: getImageBaseUrlProfile,
        getMovieGenreNameFromId: getMovieGenreNameFromId,
        getMovieDetails: getMovieDetails,
        constructImageUrl: constructImageUrl,
        getMovieCredits: getMovieCredits,
        getMovieKeywords: getMovieKeywords,
        getMovieVideos: getMovieVideos,
        getMovieReviews: getMovieReviews,
        getSimilarMovies: getSimilarMovies,
        getImageBaseUrlPosterForSimilarMovies: getImageBaseUrlPosterForSimilarMovies,
        constructImageUrlsForHomePage: constructImageUrlsForHomePage,
        disvoverMovies: disvoverMovies
    };
})();