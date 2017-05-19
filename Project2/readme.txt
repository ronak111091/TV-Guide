-API Used
I have used the following API - https://developers.themoviedb.org/3

-Methods invoked
I have mainly used APIs from the /movies section.
But I have also used APIs from other sections like /discover, /credits, /genres

-Plugins used
Jquery plugins:
	dialog
	tab
	animate
	rateyo (3rd party plugin to display the star ratings, http://rateyo.fundoocode.ninja/)
	
-How to use your site
I intended to build a movie/TV DB app where you can browse through movies and tv shows, but I was not able to implement the functionalities for TV shows in time.
So my app does not have functionalities/retrieve data for TV shows as of now. But the screens have UI elements related to TV show for presentation purpose.
The site has 3 tabs and a home button.
In the home screen you will find latest TV shows and Movies
Discover tab allows you to search movies according to selected categories. (You might get some unexpected data but thats how the api is sending data back, keyword option does not work, issue with the API)
In Movies tab you can select popular, upcoming, now playing and top rated categories to browse movies.
You can select any movie to see details.

-Why you went above and beyond "B" work?
I have used knockout.js to implement MVVM architecture. http://knockoutjs.com/index.html
Knockout.js provides:
	Clear separation of concerns
	Two way data binding
	Dependency tracking

I have also used the revealing module design pattern to better structure the code. check discover.js and movies.js
	
-Link to hosted application
I have submitted it as a zip file

-future work
I intend to continue working on the app as a side project and finish the TV show features and may be add new functionalities like search for actors.