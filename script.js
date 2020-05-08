const ul = document.createElement('ul');
const li = document.createElement('li');
let requestedItems = [];

document.getElementById('get-info').addEventListener('click', loadRequest);



// Passes to the request the number and type of requested items

function loadRequest(e) {
  e.preventDefault();
  requestedItems = [];
  let numberRequested = document.getElementById('number').value;
  let typeRequested = getRadioValue();
  let i;

  for (i = 1; i <= numberRequested; i++) {
    let randomNumber = Math.ceil(Math.random() * 10);
    console.log(randomNumber);
    getInformation(randomNumber, typeRequested);
  }
}

// Gets specified number and type of items from the API

function getInformation (number, type) {
  fetch(`https://swapi.dev/api/${type}/${number}`)
  .then(res => res.text())
  .then(data => JSON.parse(data))
  .then(final => requestedItems.push(final))
  .catch(err => console.log(err));
}

// Gets value of the active radio button

function getRadioValue() {
  let radios = document.getElementsByName('type-of-request');

  for (i= 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
}

function testDisplay(arr) {
  let container = document.getElementById('display');
  container.innerText = arr;
}

function displayArray() {
  let a = setInterval(() => {
    if (requestedItems.length > 0) {
      testDisplay(requestedItems[1].name);
      clearInterval(a);
    }
}, 1000);
}

displayArray();