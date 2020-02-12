$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchMovie = $('#searchText').val();
        runSearch(searchMovie);
        e.preventDefault();
    });
});
let baseURL='https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;
let APIKEY='f7fae4e159c02dce183099b33d708df6';
let getConfig = function(){
    let url = "".concat(baseURL, 'configuration?api_key=',APIKEY);
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
     baseImageURL = data.images.secure_base_url;
     configData = data.images;
     console.log('config:',data);
     console.log('success config get');   
    })
    .catch(function(err){
        console.log(err);
    });
};
function runSearch(searchMovie){
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', searchMovie);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
    });
};