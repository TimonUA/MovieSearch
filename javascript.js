$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchMovie = $('#searchText').val();
        runSearch(searchMovie);
        e.preventDefault();
    });
});
let baseURL='https://api.themoviedb.org/3/';
let configData = 'w300';
let baseImageURL = 'http://image.tmdb.org/t/p/' ;
let movieLanguage ='en-US';
let APIKEY='f7fae4e159c02dce183099b33d708df6';
// let getConfig = function(){
//     let url = ''.concat(baseURL, 'configuration?api_key=',APIKEY);
//     fetch(url)
//     .then((result)=>{
//         return result.json();
//     })
//     .then((data)=>{
//      baseImageURL = data.images.secure_base_url;
//      configData = data.images;
//      console.log('config:',data);
//      console.log('success config get');   
//     })
//     .catch(function(err){
//         console.log(err);
//     });
// };
function runSearch(searchMovie){
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&language=', movieLanguage , '&query=', searchMovie);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        console.log(data);
        let movies = data.results;
        let output = '';
        $.each(movies,(index,movie) => {
            let imgURL;
            if(movie.poster_path){
                imgURL = ''.concat(baseImageURL, configData, movie.poster_path);
            }
            else{
                imgURL="images/movie_icon.png";
            }           
            output+= `
            <div class="col-md-4">
            <a onclick="moreInfo('${movie.id}')"  href="#">
                <div class="well text-center justify-content-md-center">
                      <img src="${imgURL}" style="size:300px"">
                      <h5 class="lead align-middle text-center" style="color:white;  ">${movie.title}</h5>
                </div>
            </a> 
            </div>
            `;
        });
        $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });
 };

 function moreInfo(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
 }

 function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    let url = ''.concat(baseURL , 'movie/' , movieId , '?api_key=' , APIKEY , '&language=' , movieLanguage);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        console.log(data);
        let movie = data;
        document.title=movie.title;
        let imgURL;
        if(movie.poster_path){
            imgURL = ''.concat(baseImageURL, configData, movie.poster_path);
        }
        else{
            imgURL="images/movie_icon.png";
        }          
        let output = `
        <div class="movieInfo">
        <div class="row">
            <div class="col-md-4">
            <img src="${imgURL}" style="size:300px" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${movie.title}</h2>
                <ul class="list-group">   
                    <li class="list-group-item"><b>Genre:</b> ${movie.genres}</li>
                    <li class="list-group-item"><b>Released:</b> ${movie.release_date}</li>
                    <li class="list-group-item"><b>Budget:</b> ${movie.budget}</li>
                    <li class="list-group-item"><b>Rated:</b> ${movie.popularity}%</li>
                    <li class="list-group-item"><b>Averege vote:</b> ${movie.vote_average}</li>
                </ul>
            </div>
        </div>
        <div class="row" style="padding-left:15px; padding-top:25px; color:white">
            <div class="well">
                <h3>Overwiew:</h3>
                
                <p class="lead">${movie.overview}</p
                <hr>
                <a href="https://www.themoviedb.org/movie/${movie.id}"  role="button" class="btn btn-info">Go To MovieDB</a>
                <a href="index.html" class="btn btn-dark">Go Back</a>
            </div>
        </div>
        </div>
        `;
        $('#movie').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });
 }