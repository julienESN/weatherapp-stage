// Import all necessary element from the DOM
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");
// import * as from './modules/dom'; (In test)

//Default city when the page load

let cityInput = "London";

//Add click event to each city in the panel

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    //Change from default city to the clicked one
    cityInput = e.target.textContent;
    // Function that fetches and displays all the data from the Weather API
    fetchWeatherData();
    //Fade out the app (Animation)
    app.style.opacity = "0";
  });
});

//Add submit event to the form

form.addEventListener("submit", (e) => {
  // If the input field (Search bar) is empty , throw an alert
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    // Change from default city to the one written in the input field
    cityInput = search.value;
    // Function that fetches and displays all the data from the Weather API
    fetchWeatherData();
    //Remove all text from the input field
    search.value = "";
    //Fade out the app (Animation)
    app.style.opacity = "0";
  }
  //Prevent the default behaviour of the form
  e.preventDefault();
});

//Function with 3 parameters that return a day/month/year

function dayOfTheWeek(day, month, year) {
  // Creating an array that will be return
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // I return my weekday array which generates a date taking the 3 parameters that we will fill in after using the api and for the 'new date' we will use the prototype function.getday()
  // which generates a number between 1 and 7 and which will take the direct value of the array is why we return it
  return weekday[new Date(`${day}/${month}/${year}/`).getDay()];
}

// Function that fetches and displays the data from the weather API

function fetchWeatherData() {
  // Fetch data and add the city name of my cityInput using template literal
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=99ff652118574a858d175150222710&q=${cityInput}`
  )
    // Take the data in Json format and convert it to a regular JS Object

    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //   Adding temperature and weather condition to the page
      temp.textContent = data.current.temp_c + "°";
      // Adding condition content : Example : Partly Cloudy
      conditionOutput.textContent = data.current.condition.text;

      //Get the date and time from city we extract
      const date = data.location.localtime;
      // I create 3 constant year month days and I use the function substring which takes as parameter a start index and an end index ,example localtime : "2022-11-01 10:15""
      // I start my index at 0 and take the 4 value after
      const y = parseInt(date.substr(0, 4));
      // I start my index at 5 and take the 2 value after
      const m = parseInt(date.substr(5, 2));
      // I start my index at 8 and take the 2 value after
      const d = parseInt(date.substr(8, 2));
      //Extract the time from the location using substring starting at 11, substring not need everytime a second parameter
      //Reformat the date and add it to the page
      const time = date.substr(11);
      timeOutput.textContent = time;
      // This will also return the day of the week as we return the function that returns itself weekday
      dateOutput.textContent = `${dayOfTheWeek(m, d, y)} ${m},${d} ${y}`;
      // Add the name of the city into the page
      nameOutput.textContent = data.location.name;
      // Get the corresponding icon url for the weather and extract  it with subtr and .length and just after i can indicate the src to add it on my app
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
      console.log(iconId);
      //  Reformat the icon src to my own local folder path and add it on the page
      icon.src = "./icons/" + iconId;
      //Add the weather details to the page with my api
      cloudOutput.textContent = data.current.cloud + "%";
      humidityOutput.textContent = data.current.humidity + "%";
      windOutput.textContent = data.current.wind_kph + "km/h";
      //Set default time of the day
      let timeOfDay = "day";
      //Get the unique id for each weather condition
      const code = data.current.condition.code;
      //If the current data of the day is not equal to day(1) switch time of the day to night
      if (!data.current.is_day) {
        timeOfDay = "night"; //(0)
        console.log(data.current.is_day);
      }
      // Code 1000 means the weather is clear
      if (code == 1000) {
        // If my condition is validated I change the background by a clear image without forgetting that the directory differs depending on the night or the day.
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
        // Change the button bg color depending on if day or night
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      }
      // Else if condition to test if the current condition code are cloudy
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        // If my condition is validated I change the background by a cloud image without forgetting that the directory differs depending on the night or the day.
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        // If timeOfday == to night i change the styleback background of my search button
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249
      ) {
        // If my condition is validated I change the background by a rainy image without forgetting that the directory differs depending on the night or the day.
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        }
      }
      // Else background snow
      else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snow.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }
      app.style.opacity = "1";
    })
    // If my fetch request does not match anything I indicate an alert and set the opacity of my app to 1
    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
}
// Launch directly my function cause my Default city when the page load are london
fetchWeatherData();

/////////////////////////////////
//TDL (Put the tdl in notion later not in the scrip)
// Put the api key in .env

//Replace my day function with dayjs dependencies (just an idea)

// Import all my dom from an module

// Recreate my app in an object

// Comment my css

// Extract and display the country from the searched value

// Replace all my else if || with another method (maybe put all my condition code in an object and boucle and use array.find)

//Reussite

// L'app marche avec toute les villes trouvé avec l'api

//Difficulter

// Recréée mon app dans un object (en cours)
// Comprendre pourquoi certaine ville reponde une temperature avec une decimale
// Import all my dom with a modules
