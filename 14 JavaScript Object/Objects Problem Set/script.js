var movies = [];

var movie1 = {
	name: "In Bruges",
	rating: 5,
	isWatched: true
}
var movie2 = {
	name: "Frozen",
	rating: 4.5,
	isWatched: false
}
var movie3 = {
	name: "Mad Max Fury Road",
	rating: 5,
	isWatched: true
}
var movie4 = {
	name: "Les Miserables",
	rating: 3.5,
	isWatched: false
}

movies.push(movie1);
movies.push(movie2);
movies.push(movie3);
movies.push(movie4);

// you can also create function to build the string to make code more readable
movies.forEach(function(movie) {
	if(movie.isWatched) {
		console.log("You have watched \"" + movie.name + "\" - " + movie.rating + " stars");
	} else {
		console.log("You have not watched \"" + movie.name + "\" - " + movie.rating + " stars");
	}
})

