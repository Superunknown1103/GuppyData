$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyCWAtuC37VK-Q8LgUMjLOiDajBa-sBf1d8",
    authDomain: "newsdata-9adee.firebaseapp.com",
    databaseURL: "https://newsdata-9adee.firebaseio.com",
    projectId: "newsdata-9adee",
    storageBucket: "",
    messagingSenderId: "185557876255"
  };

   firebase.initializeApp(config);
   var database = firebase.database().ref();
// WSJ append

var authKey = "8d824788aca2453e9aefe8e0b37a7097";
var queryWSJURLBase = "https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=" + authKey;
var articleNum = 0;


function runQuery(queryURL){
	event.preventDefault();

	$.ajax({
			 url: queryWSJURLBase,
			 method: "GET"})
		.done(function(WSJData) {

			console.log(WSJData);

			for (var i=0; i<10; i++) {

					articleNum++;

					var wellSection = $("<div>");
					wellSection.addClass('well');
					wellSection.attr('id', 'articleWell-' + articleNum)
					$('#wellSection').append(wellSection);


					$("#articleWell-"+ articleNum).append('<h3><strong>' + WSJData.articles[i].title + "</strong></h3>");
					$("#articleWell-"+ articleNum).append('<h5>' + WSJData.articles[i].publishedAt + "</h5>");
					$("#articleWell-"+ articleNum).append('<h5>' + WSJData.articles[i].description + "</h5>");
					$("#articleWell-"+ articleNum).append("<a href='" + WSJData.articles[i].url + "'>" + WSJData.articles[i].url + "</a>");

					var database = firebase.database().ref().push({

					title: WSJData.articles[i].title,
					publishedAt: WSJData.articles[i].publishedAt,
					description: WSJData.articles[i].description,
					url: WSJData.articles[i].url

					});
			}

		});
}

function grabTime(callback) {

			database.on("value", function(snapshot){
					timeStamp = snapshot.val().timeStamp;
					callback(timeStamp);
				});
}

var timeStamp = grabTime(function(output) {
console.log(output);
});


// Bloomberg news onclick
var authKey = "6ac1fc31cd6c43dbb77f4d339e4d86ab";
var queryBloomberg = "https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=" + authKey;


function runQuery2(queryURL2){



	$.ajax({
			 url: queryBloomberg,
			 method: "GET"})
		.done(function(bloomberg) {
			console.log(bloomberg);



			for (var i=0; i<10; i++) {



					articleNum++

					var wellSection2 = $("<div>");
					wellSection2.addClass('well');
					wellSection2.attr('id', 'articleWell-' + articleNum)
					$('#wellSection2').append(wellSection2);


						$("#articleWell-"+ articleNum).append('<h3><strong> ' + bloomberg.articles[i].title + "</strong></h3>");
						$("#articleWell-"+ articleNum).append('<h5>' + bloomberg.articles[i].publishedAt + "</h5>");
						$("#articleWell-"+ articleNum).append('<h5>' + bloomberg.articles[i].description + "</h5>");
						$("#articleWell-"+ articleNum).append("<a href='" + bloomberg.articles[i].url + "'>" + bloomberg.articles[i].url + "</a>");


					var database = firebase.database().ref().push({
					title: bloomberg.articles[i].title,
					publishedAt: bloomberg.articles[i].publishedAt,
					description: bloomberg.articles[i].description,
					url: bloomberg.articles[i].url


					});
			}
		});
}

	database.on("child_added", function(childSnapshot){


	      var fireTitle = childSnapshot.val().title;
	      var firePublishAt = childSnapshot.val().publishedAt;
	      var fireDescription = childSnapshot.val().description;
	      var fireUrl = childSnapshot.val().url;

     });





window.onload = function(){
		queryURL = queryWSJURLBase;
		runQuery(queryURL);
   		queryURL2 = queryBloomberg;
		runQuery2(queryURL2);

	};

});
