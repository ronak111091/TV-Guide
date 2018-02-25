/// <reference path= "../../Scripts/knockout-3.4.2.js" />
/// <reference path= "../../Scripts/jquery-3.1.1.js" />
/// <reference path= "../../Scripts/jquery-ui-1.12.1" />

var my = my || {};
my.data = {
    moviesCategories: [
        {   key: "PO",
            name: "Popular",
            title: "Popular Movies"
        },
        {
            key: "TR",
            name: "Top Rated",
            title: "Top Rated Movies"
        },
        {
            key: "UP",
            name: "Upcoming",
            title: "Upcoming Movies"
         },
         {
             key: "NP",
             name: "Now Playing",
             title: "Now Playing Movies"
         }
    ],

    images: {
        "base_url": "http://image.tmdb.org/t/p/",
        "secure_base_url": "https://image.tmdb.org/t/p/",
        "backdrop_sizes": [
          "w300",
          "w780",
          "w1280",
          "original"
        ],
        "logo_sizes": [
          "w45",
          "w92",
          "w154",
          "w185",
          "w300",
          "w500",
          "original"
        ],
        "poster_sizes": [
          "w92",
          "w154",
          "w185",
          "w342",
          "w500",
          "w780",
          "original"
        ],
        "profile_sizes": [
          "w45",
          "w185",
          "h632",
          "original"
        ],
        "still_sizes": [
          "w92",
          "w185",
          "w300",
          "original"
        ]
    },
  "genres": [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
  ],
  sortBy: [
      {
          key: "popularity.asc",
          value:"Popularity Ascending"
      },
      {
          key: "popularity.desc",
          value: "Popularity Descending"
      },
      {
          key: "release_date.asc",
          value: "Release Date Ascending"
      },
      {
          key: "release_date.desc",
          value: "Release Date Descending"
      },
      {
          key: "vote_average.asc",
          value: "Rating Ascending"
      },
      {
          key: "vote_average.desc",
          value: "Rating Descending"
      },
      {
          key: "original_title.asc",
          value: "Title [A-Z]"
      },
      {
          key: "original_title.desc",
          value: "Title [Z-A]"
      }
  ]
};

my.formatNumber = function (n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

my.years = (function (startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;

    while (startYear <= currentYear) {
        years.push(startYear++);
    }

    return years.reverse();
})(1900);