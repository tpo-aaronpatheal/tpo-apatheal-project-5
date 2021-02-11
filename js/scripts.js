/*Getting started. Will first need to fetch an image, first and las name, email, and city/location from the API. Then will need to add functionality to 
the webpage by creating a modal window which displays an image, name, email, city and location, cell number, detailed address, and birthday. Will also need 
ensure that the modal window can be closed. Will need to utilize regex to correctly format the user's cell number when the information is fetched. */


let modalWindow;
const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');
const searchContainer = document.querySelector('search-container');
const userUrl = 'https://randomuser.me/api/?results=12';
let generateUserProfile;
//console.log();




//Fetch request that will request the random users for the page. 
    fetch (userUrl)
    //.then(checkStatus)
    .then((res) => res.json()) //json string
    //.then(data => console.log(data.results))
    .then(data => userInfo(data.results))


    function userInfo(parseData) {
        console.log(parseData);
        const generateUserProfile = parseData.map((user) => { 
        return `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    </div>`;
        });
        gallery.insertAdjacentHTML('beforeend', generateUserProfile);
       // console.log(generateUserProfile)
    }





    //Helper functions
    /*function checkStatus(response) {
        if(response.ok){
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      }*/