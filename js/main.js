// Search
let searchInput = document.getElementById("searchInput");
let clearInputs = document.getElementById("clearInputs");
// let getLocation = document.getElementById("getLocation");//location
// Search
// Day 1
let dayOneName = document.getElementById("dayOneName");
let dayOneDate = document.getElementById("dayOneDate");
let city = document.getElementById("city");
let dayOneTemp = document.getElementById("dayOneTemp");
let dayOneTempIcon = document.getElementById("dayOneTempIcon");
let dayOneDesc = document.getElementById("dayOneDesc");
let dayOneRain = document.getElementById("dayOneRain");
let dayOneWind = document.getElementById("dayOneWind");
let dayOneCompass = document.getElementById("dayOneCompass");
// Day 1
// Day 2
let dayTwoName = document.getElementById("dayTwoName");
let dayTwoDate = document.getElementById("dayTwoDate");
let dayTwoIcon = document.getElementById("dayTwoIcon");
let maxTempTwo = document.getElementById("maxTempTwo");
let minTempTwo = document.getElementById("minTempTwo");
let dayTwoDesc = document.getElementById("dayTwoDesc");
//Day 2
//Day 3
let dayThreeName = document.getElementById("dayThreeName");
let dayThreeDate = document.getElementById("dayThreeDate");
let dayThreeIcon = document.getElementById("dayThreeIcon");
let maxTempThree = document.getElementById("maxTempThree");
let minTempThree = document.getElementById("minTempThree");
let dayThreeDesc = document.getElementById("dayThreeDesc");
//Day 3

//API and Display
async function weather(input) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=cdf3562fc63444388e200548241912&q=${input}&days=7`
  );
  let res = await data.json();
  const d = new Date();
  // console.log(res);
  const ToDate = new Date(res.location.localtime);
  // console.log( ToDate.getDate(res.location.localtime));
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  dayOneName.innerHTML = days[ToDate.getDay()];
  // console.log(days[ToDate.getDay()])

  dayOneDate.innerHTML = `${ToDate.getDate(res.location.localtime)}${
    months[d.getMonth(res.location.localtime)]
  }`;
  city.innerHTML = res.location.name;
  dayOneTemp.innerHTML = `${res.current.temp_c}<sup>o</sup>C`;
  dayOneTempIcon.setAttribute("src", `https:${res.current.condition.icon}`);
  dayOneDesc.innerHTML = res.current.condition.text;
  dayOneRain.innerHTML = `${res.current.humidity} %`;
  dayOneWind.innerHTML = `${res.current.wind_kph} km/h`;
  dayOneCompass.innerHTML = res.current.wind_dir;

  const TwoDate = new Date(res.forecast.forecastday[1].date);
  // console.log(TwoDate.getDate(res.forecast.forecastday[1].date));
  dayTwoName.innerHTML = days[TwoDate.getDay()];
  // console.log(days[TwoDate.getDay()])
  dayTwoDate.innerHTML = `${TwoDate.getDate(res.forecast.forecastday[1].date)}${
    months[d.getMonth(res.forecast.forecastday[1].date)]
  }`;
  // console.log(res.forecast.forecastday[1].date);
  // console.log(d.getDay(res.forecast.forecastday[1].date));
  dayTwoIcon.setAttribute(
    "src",
    `https:${res.forecast.forecastday[1].day.condition.icon}`
  );
  maxTempTwo.innerHTML = `${res.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
  minTempTwo.innerHTML = `${res.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>`;
  dayTwoDesc.innerHTML = res.forecast.forecastday[1].day.condition.text;

  const ThreeDate = new Date(res.forecast.forecastday[2].date);
  // console.log(ThreeDate.getDate(res.forecast.forecastday[2].date));
  dayThreeName.innerHTML = days[ThreeDate.getDay()];
  dayThreeDate.innerHTML = `${ThreeDate.getDate(
    res.forecast.forecastday[2].date
  )}${months[d.getMonth(res.location.localtime)]}`;
  dayThreeIcon.setAttribute(
    "src",
    `https:${res.forecast.forecastday[2].day.condition.icon}`
  );
  maxTempThree.innerHTML = `${res.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
  minTempThree.innerHTML = `${res.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>`;
  dayThreeDesc.innerHTML = res.forecast.forecastday[2].day.condition.text;
}

//   Search****
searchInput.addEventListener("input", () => {
  weather(searchInput.value);
});

// clearInputs.addEventListener("click", () => {
//   searchInput.value = "";
// });

//   Search****
weather("Alexandria");

//Client Location
document.getElementById("getLocation").addEventListener("click", () => {
  const output = document.getElementById("output");
  output.classList.replace("d-none","d-block");

  // Check if Geolocation API is available
  if (!navigator.geolocation) {
    output.textContent = "Geolocation is not supported by your browser.";
    return;
  }
  navigator.geolocation.getCurrentPosition(
    async (position) => {
   
      const { latitude, longitude } = position.coords;
      const apiKey = "43b37ee7b9b84a48b4495a00a154b905";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch location name");
        }
        const data = await response.json();
        // console.log(data)
        // console.log(data.results[0].components.town)
        weather(data.results[0].components.town);
        const location = data.results[0]?.formatted || "Location not found";
        output.innerHTML = `Location: ${location}`;
      } catch (error) {
        output.textContent = `Error fetching location name: ${error.message}`;
      }
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          output.textContent = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          output.textContent = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          output.textContent = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          output.textContent = "An unknown error occurred.";
          break;
      }
    }
  );
});

//Client Location
