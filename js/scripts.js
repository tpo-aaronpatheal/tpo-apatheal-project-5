/*Getting started. Will first need to fetch an image, first and las name, email, and city/location from the API. Then will need to add functionality to 
the webpage by creating a modal window which displays an image, name, email, city and location, cell number, detailed address, and birthday. Will also need 
ensure that the modal window can be closed. Will need to utilize regex to correctly format the user's cell number and DOB when the information is fetched. */

//List of global variables.
const gallery = document.querySelector('.gallery');
const userUrl = 'https://randomuser.me/api/?results=12&nat=us';
let index = 0
let allCards = [];
//console.log();


/*Fetch request that will request 12 random employees to display on the page. The data is passed to the userInfo and clickCard functions. I declared the
 url as a variable that I could pass through to the fetch request. */
fetch (userUrl)
  .then((res) => res.json()) //json string
  .then(data => {
    userInfo(data.results);
    clickCard(data.results);
  });
 
/*The userInfo function loops through the employees and creates an individual card for each employee and appends it to the html. This function is called 
in the fetch request where the data is passed through.*/
function userInfo(parseData) {
        //console.log(parseData);
    parseData.forEach((user) => { 
     const card = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    </div>`;
    gallery.insertAdjacentHTML('beforeend', card);
        });
       // console.log(generateUserProfile)
    }

  /* The createModal function creates the modal window once a user clicks on an employee. Utilized a template literal for the modal format. Once the
  createModal function is called below in the clickCard function, the modal is appended to the html. I also declared two variables: employeePhone and 
  employeeDOB. These variables are assigned the values of the format funcitons below for the telephone and DOB. These variables replace the respective 
  positions within the template literal. */
    function createModal(user){
      //console.log(user);
      let employeePhone = formatTelephoneNumber(`${user.phone}`);
      let employeeDOB = formatBirthDate(`${user.dob.date}`);
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
                <p class="modal-text">Birthday: ${employeeDOB}</p>
            </div>
        </div>`;
      gallery.insertAdjacentHTML('beforeend', modal);
    }
       

    /*The two functions below have the event listeners which open and close the modal windows. Function clickCard listens for when the user clicks on 
    an employee's card and then displays the appropriate modal window. In order to access each individual card, I looped through the employee cards
    and pushed them into an empty array which which is called "allCards." This made it so each card could be assigned a new index value that could be passed 
    when calling the createModal function. This ensures that the modal window displays the information for the employee that was clicked. Lastly, the 
    closeModalWindow function adds functionality to the close button that is within the div that is assigned a modal class. Once the user clicks
    the close button, the modal container is removed which will allow for a new one to be created when the user selects a different employee. The 
    closeModalWindow function is called in the clickCard function  along wtih the createModal function.*/
    function clickCard(employeeInfo){
      let userCards = document.querySelectorAll('.card');
      for(let i = 0; i< userCards.length; i++){
        allCards.push(userCards[i]);
      }
      allCards.forEach(card => {
        card.addEventListener('click',() => {
            index = allCards.indexOf(card);
            createModal(employeeInfo[index]);
            closeModalWindow();
        });
      });
    }

    function closeModalWindow(){
    const container = document.querySelector(".modal-container");
    const closeButton = document.getElementById('modal-close-btn');
     closeButton.addEventListener('click', (e) => {
        container.remove();
          //console.log('test');
      });
    }

    /* The formatters below format the telephone number and date of birth of each employee after their information is received from the 
    open-source API. The formatTelephone variable includes a function which takes the regex format of the original phone number. I utilized the 
    slice method to extract the first 14 characters of the phone number. I then globally matched characters that weren't digits and replaced
    them with an empty string. I used the replace method again to replace the phone number with the correct format (XXX) XXX-XXXX. The formatBirthDate works
    similar. The employee date of birth included additional information that was attached at the end of the employee birth dates. I utilized the slice 
    method again which gave the ability to extract the information that was needed which in this case  was the first ten characters. 
    I then globally matched characters that weren't digits and replaced them with an empty string. This was assigned to a  variable declared as dobSliced. 
    The format was then replaced again with the correct format mm/dd/yyyy. Both of these variables are called in the createModal function above. */
    const formatTelephoneNumber = (phoneNumber) => {
      const phone = /^(\d{3})(\d{3})(\d{4})$/;
      const phoneSliced = phoneNumber.slice(0,14).replace(/\D/g, '');
      const correctedFormat = phoneSliced.replace(phone, '($1) $2-$3');
      return correctedFormat;
      }

    const formatBirthDate = (dob) => {
      const currentFormat = /^(\d{4})(\d{2})(\d{2})$/;
      const dobSliced = dob.slice(0,10).replace(/\D/g, '');
      const correctedFormat = dobSliced.replace(currentFormat, '$2/$3/$1');
      return correctedFormat;
    }



  

   

     