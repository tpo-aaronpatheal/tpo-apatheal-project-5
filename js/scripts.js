/*Getting started. Will first need to fetch an image, first and las name, email, and city/location from the API. Then will need to add functionality to 
the webpage by creating a modal window which displays an image, name, email, city and location, cell number, detailed address, and birthday. Will also need 
ensure that the modal window can be closed. Will need to utilize regex to correctly format the user's cell number when the information is fetched. */


//let modalWindow;
const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');
const searchContainer = document.querySelector('search-container');
const userUrl = 'https://randomuser.me/api/?results=12&nat=us';
let index = 0
let allCards = [];
//let generateUserProfile;
//console.log();




//Fetch request that will request the random users for the page. 
fetch (userUrl)
  .then((res) => res.json()) //json string
  .then(data => {
    userInfo(data.results);
    clickCard(data.results);
    //closeModalWindow(data.results);
  });

function userInfo(parseData) {
        //console.log(parseData);
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

  
    function createModal(user){
      //console.log(user);
      let employeePhone = formatTelephoneNumber(`${user.phone}`);
      const modal = `
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${user.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${employeePhone}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${user.dob.date}</p>
            </div>
        </div>`;
      gallery.insertAdjacentHTML('beforeend', modal);
    }

    //Event listeners
    function clickCard(employeeInfo){
      let userCards = document.querySelectorAll('.card');
      for(let i = 0; i< userCards.length; i++){
        allCards.push(userCards[i]);
      }
      allCards.forEach(card => {
        card.addEventListener('click',() => {
            index = allCards.indexOf(card);
            createModal(employeeInfo[index]);
        });
      });
    }

    //  function closeModalWindow(){
    //   const closeButton = document.getElementById('modal-close-btn');
    //   closeButton.addEventListener('click', (e) => {
    //      if(e.target.value === closeButton){
    //       document.querySelectorAll(".modal-container").remove();
    //     }
    //   });
    //  }

      //Formatters 
      const formatTelephoneNumber = (phoneNumber) => {
        const phone = /^(\d{1,3})(\d{3})(\d{4})$/;
        return phoneNumber.replace(phone, '$(1) $2-$3');
      }

    





    //Helper functions
    /*function checkStatus(response) {
        if(response.ok){
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      }*/
