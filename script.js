const ul = document.createElement('ul');
const li = document.createElement('li');
let requestedItems = [];

document.getElementById('get-info').addEventListener('click', loadRequest);

// Gets value of the active radio button

const getRadioValue = () => {
  let radios = document.getElementsByName('type-of-request');

  for (i= 0; i < radios.length; i++) {
    if (radios[i].checked) {
      console.log(radios[i]);
      return radios[i].value;
    }
  }
}

// Passes to the request the number and type of requested items

function loadRequest(e) {
  e.preventDefault();
  requestedItems = [];
  let numberRequested = document.getElementById('number').value;
  let typeRequested = getRadioValue();
  let i;
  for (i = 1; i <= numberRequested; i++) {
    let randomNumber = Math.floor(Math.random() * 20);
    getInformation(randomNumber, typeRequested);
  }
}

// Gets specified number and type of items from the API

const getInformation = (number, type) => {
  fetch(`https://swapi.dev/api/${type}/${number}`)
  .then(res => res.text())
  .then(data => JSON.parse(data))
  .then(final => requestedItems.push(final))
  .catch(err => console.log(err));
}


function displayRequestedPerson(person) {
  let name = document.createTextNode(person.name);
  let birthYear = document.createTextNode(person.birth_year);
  document.querySelector('.container').appendChild(ul).appendChild(li).appendChild(name);
}



function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}