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
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', searchMovie);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        console.log(data);
        let movies = data.results;
        let output = '';
        $.each(movies,(index,movie) => {
            let imgURL
            if(movie.poster_path){
                imgURL = ''.concat(baseImageURL, configData, movie.poster_path);
            }
            else{
                imgURL="images/movie_icon.png";
            }           
            output+= `
            <div class="col-md-4">
                <div class="well text-center justify-content-md-center">
                      <img src="${imgURL}" style="size:300px"">
                      <h5 class="lead align-middle text-center" style="color:white;  ">${movie.title}</h5>
                </div>
            </div>
            `;
        });
        $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });
};