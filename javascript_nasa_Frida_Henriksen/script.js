//Formuläret

//Börjar med att skapa ref till HTML-element till id och klass
let userInput = document.querySelector("#spaceName");
let btn_send = document.querySelector("#sendBtn");
let message = document.querySelector(".input-text");

//Animation till input-texten
const title = document.querySelector(".input-text");
const CHAR_TIME = 130;
let text, index;
function requestCharAnimation(char, value) {
  setTimeout(function () {
    char.textContent = value;
    char.classList.add("fade-in");
  }, CHAR_TIME);
}

function addChar() {
  const char = document.createElement("span");
  char.classList.add("char");
  char.textContent = "▌";
  title.appendChild(char);
  requestCharAnimation(char, text.substr(index++, 1));
  if (index < text.length) {
    requestChar();
  }
}

function requestChar(delay = 0) {
  setTimeout(addChar, CHAR_TIME + delay);
}

function start() {
  index = 0;
  text = title.textContent.trim();
  title.textContent = "";
  requestChar(1000);
}

start();

//console.log(btn_send);
//Lyssnar efter när user släpper upp en tangent "keyup"
// Hämta in antalet tecken som user skrivit in value.length
userInput.addEventListener("keyup", function () {
  //Hämtar värdet i input
  // console.log(userInput.value);

  //Hämtar antalet tecken i input
  console.log(userInput.value.length);

  let getValueLenght = userInput.value.length;

  // Kontrollerar så att user skrivit mer än 3 tecken
  if (getValueLenght > 2) {
    console.log("Det är MER än 3 tecken");

    // Om villkoret är uppfyllt ska btn bli aktiv
    //Tabort disabled från btn
    btn_send.disabled = false;
  } else {
    console.log("Det är MINDRE än 3 tecken");
    // Är inte villkoret uppfyllt ska btn inte vara aktiv
    btn_send.disabled = true;
  }
});

//Lyssnar efter focus på input

userInput.addEventListener("focus", function () {
  //Vad ska hända när element är i fokus
  console.log("Du står i rutan");
  // När man klickar i input ska focus lyssnare läggas på
  userInput.classList.toggle("focusBorder");
});

//Lyssnar efter blur på input alltså när man är utanför
userInput.addEventListener("blur", function () {
  //Vad ska hända i blur

  console.log("Du står utanför rutan!");

  // När man klickar utanför input ska blur lyssnare läggas på
  userInput.classList.toggle("focusBorder");
});

//Lyssnare på btn
btn_send.addEventListener("click", function (event) {
  //Vad ska hända vid klick
  console.log("du klickade på btn");

  //För att stoppa btns default betedende
  event.preventDefault();

  //Om userInput är tom ska knappen bli disabled
  if (userInput.value === "") {
    console.log("Input är tomt");
    btn_send.disabled = true;
    //Kollar så att inte userInput är tomt, trodde att texten skulle komma ut här men verkar som den kommer ut på else istället, varför är det så?^^
  } else if (userInput.value === !"") {
    message.innerHTML = "Welcome " + userInput.value;

    // btn_send.disabled = false;
  } else {
    /* requestCharAnimation()   addChar() requestChar()   start()  */

    message.innerHTML = "Welcome " + userInput.value + " !";
    //Kallar på funktionerna
    requestCharAnimation();
    addChar();
    requestChar();
    start();
    getFetchTwo();
    getFetch();

    getFetchThree();

    btn_send.disabled = false;
  }
  // Här rensas userInput
  userInput.value = "";
});

//API bilderna till Mars
//API KEY: <QEarDc7Mhdgi6YXAndFoT9KXpL4s0lQWCfIkTEMj>

function getFetch() {
  //Spara API url i en variabel
  let randomNumber = Math.floor(Math.random() * 2000);
  console.log("nummer från getRover" + randomNumber);
  let apiOneRef = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${randomNumber}&api_key=QEarDc7Mhdgi6YXAndFoT9KXpL4s0lQWCfIkTEMj`;
  //Ref till klassen
  let contatinerOneRef = document.querySelector(".mars-container");

  //Hämta data med fetch
  fetch(apiOneRef)
    .then((response) => response.json())
    .then((data) => {
      //Vad ska vi göra med vår data

      let myArrayLength = data.photos.length;
      console.log(myArrayLength);
      //Kontrollerar om array är tom
      if (myArrayLength === 0) {
        console.log("Det finns INGEN data!");
        alert("Det finns inga bilder, prova igen!");
        location.reload(true); //Laddar om sidan
      } else {
        console.log("Det FINNS data!");
        //for-loop för bilderna, satte en maxgräns på 10st bilder så att det inte skulle bli för många

        for (let i = 0; i < 10; i++) {
          //Vad som ska ske för varje varv
          //Vad som sker i mars-container-klassen, hämtar bilder, namn och landnings-datum från rover

          contatinerOneRef.innerHTML += ` <article class='mars-card'><h2>${data.photos[i].camera.name}</h2><div class='overlay'> <div class ='textbox-overlay'> <h2 class = 'h2-overlay'>${data.photos[i].camera.name}</h2><h4 class = 'h4-overlay'>${data.photos[i].rover.landing_date}</h4></div></div><div class='mars-pic'>
        <img src="${data.photos[i].img_src}"
    </div><h2>${data.photos[i].rover.landing_date}</h2></article>`;
        }
      }
    })
    .catch((error) => console.log(`Detta fel: ${error}`));
}
function getFetchTwo() {
  //Andra bildsektionen
  //Här händer samma som i första sektionen men en annan url
  let randomNumberTwo = Math.floor(Math.random() * 1500);
  console.log("nummer från getRover" + randomNumberTwo);

  let apiTwoRef = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${randomNumberTwo}&api_key=QEarDc7Mhdgi6YXAndFoT9KXpL4s0lQWCfIkTEMj`;

  let contatinerTwoRef = document.querySelector(".pic-section-two");

  //Hämta data med fetch
  fetch(apiTwoRef)
    .then((response) => response.json())
    .then((data) => {
      //Kontrollerar om array är tom
      let myArrayLength = data.photos.length;
      console.log(myArrayLength);
      if (myArrayLength === 0) {
        console.log("Det finns INGEN data!");
        alert("Det finns inga bilder, prova igen!");
        location.reload(true); //Laddar om sidan
      } else {
        console.log("Det FINNS data!");

        for (let i = 0; i < 10; i++) {
          contatinerTwoRef.innerHTML += ` <article class='mars-card'><h2>${data.photos[i].camera.name}</h2><div class='overlay'>
       <div class ='textbox-overlay'> <h2 class = 'h2-overlay'>${data.photos[i].camera.name}</h2><h4 class = 'h4-overlay'>${data.photos[i].rover.landing_date}</h4></div>
        </div><div class='mars-pic'>
        <img src="${data.photos[i].img_src}"
    </div><h2>${data.photos[i].rover.landing_date}</h2></article>`;
        }
      }
    })
    .catch((error) => console.log(`Detta fel: ${error}`));
}
function getFetchThree() {
  //Tredje bildsektionen
  //Här händer samma som i första sektionen men en annan url

  let randomNumberThree = Math.floor(Math.random() * 1800);
  console.log("nummer från getRover" + randomNumberThree);

  let apiThreeRef = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${randomNumberThree}&page=2&api_key=QEarDc7Mhdgi6YXAndFoT9KXpL4s0lQWCfIkTEMj`;

  let contatinerThreeRef = document.querySelector(".pic-section-three");

  //Hämta data med fetch
  fetch(apiThreeRef)
    .then((response) => response.json())
    .then((data) => {
      //Vad ska vi göra med vår data
      console.log(data.photos[0].camera.name);
      console.log(data.photos[1].camera.name);
      //Kontrollerar om array är tom
      let myArrayLength = data.photos.length;
      console.log(myArrayLength);
      if (myArrayLength === 0) {
        console.log("Det finns INGEN data!");
        alert("Det finns inga bilder, prova igen!");
        location.reload(true); //Laddar om sidan
      } else {
        console.log("Det FINNS data!");

        for (let i = 0; i < 10; i++) {
          contatinerThreeRef.innerHTML += ` <article class='mars-card'><h2>${data.photos[i].camera.name}</h2><div class='overlay'>
        <div class ='textbox-overlay'> <h2 class = 'h2-overlay'>${data.photos[i].camera.name}</h2><h4 class = 'h4-overlay'>${data.photos[i].rover.landing_date}</h4></div>
         </div><div class='mars-pic'>
         <img src="${data.photos[i].img_src}"
     </div><h2>${data.photos[i].rover.landing_date}</h2></article>`;
        }
      }
    })
    .catch((error) => console.log(`Detta fel: ${error}`));
}

//Dark mode och light mode

// Skapa en ref till HTML
let switchBtn = document.querySelector("#switchBtn");
let bodyRef = document.querySelector("body");
let darkSwitch = "light";
//Skapa upp en lyssnare
//Kontroller om det är tomt i localstorage

if (!localStorage.getItem(darkSwitch)) {
  //Om det är tomt så händer detta
  console.log("Det finns inget i localStorage");
  checkIfDark();
} else {
  console.log("Det finns något i localStorage");
  checkIfDark();
}
switchBtn.addEventListener("click", function () {
  //Vad ska hända vid klick?
  //Skapa en lyssnare
  //Vid klick lägga till klassen dark på body
  //Klickar jag igen ska klassen tas bort
  //Kontrollerar om man har dark på body
  if (bodyRef.classList.value === "light") {
    //Om dark  finns gör detta
    console.log("Klassen light finns!");
    bodyRef.classList.toggle("light");
    removeDark();
  } else {
    //Om light inte finns gör detta
    console.log("Klassen light finns INTE!");
    bodyRef.classList.toggle("light");
    setDark();
  }
});

function setDark() {
  //I denna funktion vill man set localStorage
  //setItem(Key,Value)
  localStorage.setItem(darkSwitch, true);
  console.log("setDark körs");
}
function removeDark() {
  //I denna funktion vill man ta bort localStorage (nyckeln)
  localStorage.removeItem(darkSwitch);
  console.log("removeDark körs");
}

function checkIfDark() {
  //Om det finns något i localsstorage
  if (localStorage.getItem(darkSwitch)) {
    console.log("localStorage är satt och vi vill sätta darkmode");
    //Ändra så knappen är checked
    switchBtn.checked = true;
    //Om localStorage är satt, vill man sätta light klassen på body
    bodyRef.classList.toggle("light");
  } else {
    console.log("localStorage är inte satt");
  }
}
