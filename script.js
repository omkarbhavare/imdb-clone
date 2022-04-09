//SettingUp API
const API_KEY = 'api_key=c667b635ffd5c27a0bd2d47a749fc1cd';
const baseURL = "https://api.themoviedb.org/3";
const apiURL = baseURL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const imgURL = 'https://image.tmdb.org/t/p/w500';
const searchURL = baseURL + '/search/movie?' + API_KEY;

// genres fetched from:- https://api.themoviedb.org/3/genre/movie/list?api_key=c667b635ffd5c27a0bd2d47a749fc1cd
const genres = [
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
]




//fetching Element 
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const filmikeeda = document.querySelector('.site-logo');


 //clearing all search item when clicked on Filmikeeda

filmikeeda.addEventListener('click',()=>{
    location.reload();
});


getMovies(apiURL);   //calling Function getMovies

function getMovies(url) {
    //fetching API
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length != 0){
        showMovies(data.results);
        }else{
            main.innerHTML = `<h1 class="no-results">No Results Found &#128580;</h1>`
        }
    })
}

function showMovies(data) {
    console.log(data);
    //settingUp data in main id Section
    main.innerHTML = '';

    data.forEach(movie => {                //forEach() calls a function for each element in an array
        const { title, poster_path, vote_average, overview, id } = movie;
        const movies = document.createElement('div');              //document.createElement() to create a new HTML element
        movies.classList.add('movie');      //classList property is read-only, but you can use add() and remove() methods to add or remove CSS classes
        //Here movie is class used in style.css
        //movies.innerHTML sets content in selected movies id
        movies.innerHTML = `        
             <img src="${poster_path ? imgURL + poster_path : "https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg"}" alt="${title}">
             
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3>Overview</h3>
                ${overview}
                <br/> 
                
            </div>
        
        `

        main.appendChild(movies);      //.appendchild()-->method is used to attach the div to the document without it div class is not created
    })
}


//Setting Up getcolor function inline-->37
function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(apiURL);
    }
})

