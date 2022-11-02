//Weather app object
const weatherApp = {
  // Import all necessary element from the DOM

  app: document.querySelector(".weather-app"),
  cities: document.querySelectorAll(".city"),
  temp: document.querySelector(".temp"),
  dateOutput: document.querySelector(".date"),
  timeOutput: document.querySelector(".time"),
  conditionOutput: document.querySelector(".condition"),
  nameOutput: document.querySelector(".name"),
  icon: document.querySelector(".icon"),
  cloudOutput: document.querySelector(".cloud"),
  humidityOutput: document.querySelector(".humidity"),
  windOutput: document.querySelector(".wind"),
  form: document.getElementById("locationInput"),
  search: document.querySelector(".search"),
  btn: document.querySelector(".submit"),
  // End import

  // Default city when the page load

  cityInput: "London",

  //Add click event to each city in the panel
  cityevent: weatherApp.cities.forEach((city) => {
    city.addEventListener("click", (e) => {
      //Change from default city to the clicked one
      weatherApp.cityInput = e.target.textContent;
      // Primary function that fetches and displays all the data from the Weather API
      fetchWeatherData();
      //Fade out the app (Animation)
      weatherApp.app.style.opacity = "0";
    });
  }),
  //Add submit event to the form

  form: form.addEventListener("submit", (e) => {
    // If the input field (Search bar) is empty , throw an alert
    if (search.value.length == 0) {
      alert("Please type in a city name");
    } else {
      // Change from default city to the one written in the input field
      weatherApp.cityInput = weatherApp.search.value;
      // Function that fetches and displays all the data from the Weather API
      fetchWeatherData();
      //Remove all text from the input field
      weatherApp.search.value = "";
      //Fade out the app (Animation)
      weatherApp.app.style.opacity = "0";
    }
    //Prevent the default behaviour of the form
    e.preventDefault();
  }),

  //Function with 3 parameters that return a day/month/year

  generateday: function dayOfTheWeek(day, month, year) {
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
    // I return my weekday array which generates a date taking the 3 parameters that we will fill in after using the api and for the 'new date' we will use the prototype function. getday()
    // which generates a number between 1 and 7 and which will take the direct value of the array is why we return it
    return weekday[new Date(`${day}/${month}/${year}/`).getDay()];
  },
};
