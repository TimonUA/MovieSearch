$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchMovie = $('#searchText').val();
        runSearch(searchMovie);
        e.preventDefault();
    });
});
let selectGenres = document.getElementById("selectGenres");
let selectCollection = document.getElementById("selectCollection");
let baseURL='https://api.themoviedb.org/3/';
let configData = 'w300';
let baseImageURL = 'http://image.tmdb.org/t/p/' ;
let movieLanguage ='en-US';
let APIKEY='f7fae4e159c02dce183099b33d708df6';
setGenres();
let startURL=''.concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=', movieLanguage,'&page=');;
runLoad("",startURL,"");

function runLoad(page,url,urlSecondary){
    let tempurl;
    // if(page){
    //     tempurl = ''.concat(url, page, genre);
    // }
    // else{
    //     tempurl = ''.concat(url,  genre);
    // }
    tempurl = ''.concat(url, page, urlSecondary);
    console.log("tempurl: ",tempurl);
    fetch(tempurl)
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
// function runLoad(page,genre){
//     let url;
//     if(page){
//         url = ''.concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=', movieLanguage , '&page=', page, genre);
//     }
//     else{
//         url = ''.concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=', movieLanguage , genre);
//     }
//     console.log("tempurl: ",url);
//     fetch(url)
//     .then(result=>result.json())
//     .then((data)=>{
//         console.log(data);
//         let movies = data.results;
//         let output = '';
//         $.each(movies,(index,movie) => {
//             let imgURL;
//             if(movie.poster_path){
//                 imgURL = ''.concat(baseImageURL, configData, movie.poster_path);
//             }
//             else{
//                 imgURL="images/movie_icon.png";
//             }           
//             output+= `
//             <div class="col-md-4">
//             <a onclick="moreInfo('${movie.id}')"  href="#">
//                 <div class="well text-center justify-content-md-center">
//                       <img src="${imgURL}" style="size:300px"">
//                       <h5 class="lead align-middle text-center" style="color:white;  ">${movie.title}</h5>
//                 </div>
//             </a> 
//             </div>
//             `;
//         });
//         $('#movies').html(output);
//     })
//     .catch((err)=>{
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
 };

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
        // let videoURL = ''.concat(baseURL , 'movie/' , movieId , 'videos?api_key=' , APIKEY , '&language=' , movieLanguage);
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
 };

 selectGenres.onchange = function () {
    if (this.selectedIndex == 0)
        return;
    selectCollection.selectedIndex = 0;    
    let genreId = this.options[this.selectedIndex].getAttribute("data-idGenre");
    console.log("genreID:",genreId)  
    let url= ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=', movieLanguage , '&sort_by=popularity.desc&include_adult=false&include_video=false&page=');  
    console.log("URL:",url)  
    let urlSecondary = '&with_genres=' + genreId;
    console.log("urlSecondary:",urlSecondary)  
    runLoad(1,url,urlSecondary); 
};

selectCollection.onchange = function () {
    if (this.selectedIndex == 0)
        return;
    selectGenres.selectedIndex = 0;
    activePage = 1;
    let url = "";
    switch (this.options[this.selectedIndex].text) {
        case "Popular":
            url = ''.concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=', movieLanguage , '&page=');
            break;
        case "Top Rated":
            url = ''.concat(baseURL, 'movie/top_rated?api_key=', APIKEY, '&language=', movieLanguage , '&page=');
            break;
        default:
            url = ''.concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=', movieLanguage , '&page=');
    }
    runLoad(1, url, "");
}

async function setGenres() {
    let urlGenres = ''.concat(baseURL, 'genre/movie/list?api_key=', APIKEY, '&language=', movieLanguage);
    let response = await fetch(urlGenres);
    let commits = await response.json();

    for (let genre of commits.genres) {
        let option = document.createElement("option");
        option.text = genre.name;
        option.setAttribute("data-idGenre", genre.id);
        selectGenres.add(option);
    }
};