const Elements = {
  icon: document.querySelector(".city-icon"),
  cityOutput: document.querySelector(".city-name"),
  windOutput: document.querySelector(".city-wind"),
  humidityOutput: document.querySelector(".city-humidity"),
  celciusOutput: document.querySelector(".city-celcius"),
  descriptionOutput: document.querySelector(".city-desc"),
  dateOutput: document.querySelector(".city-date"),
  middleColumn: document.querySelector(".col-middle"),
  inputSearch: document.querySelector(".input-search"),
  interfacePanel: document.querySelector(".interface"),
  errorOutput: document.querySelector(".error"),
  searchButton: document.querySelector(".search-button"),
  daysPanel: document.querySelector(".future-weather"),
  daysCome: [...document.querySelectorAll(".future-day")],
  tempDaysCome: [...document.querySelectorAll(".future-temp")]
};

class Weather {
  constructor(
    city,
    country,
    data,
    wind,
    humidity,
    temperature,
    iconID,
    weatherDescription
  ) {
    this.city = city;
    this.country = country;
    this.data = data;
    this.wind = wind;
    this.humidity = humidity;
    this.temperature = temperature;
    this.iconID = iconID;
    this.weatherDescription = weatherDescription;
  }
  convertKelvinToCelcius() {
    return Math.round(this.temperature - 273.15);
  }
  thisDay() {
    const j = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const d = new Date();
    return j[d.getDay()];
  }
  createIcon() {
    const self = this;
    Elements.icon.setAttribute(
      "src",
      `https://openweathermap.org/img/w/${self.iconID}.png`
    );
  }
  printDataForFiveDays() {
    let counterDays = 0;
    const j = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const d = new Date();
    console.log(d.getDay());
    Elements.daysCome.forEach(el => {
      counterDays++;
      el.textContent = j[(d.getDay() + counterDays) % j.length];
    });
  }
  printTempForFiveDays() {
    let counterDays = 0;
    for (let i = 8; i < this.data.length; i += 8) {
      let temp = this.data[i].main["temp_max"];
      Elements.tempDaysCome[counterDays].innerHTML = `${Math.round(
        temp - 273.15
      )} &deg; C`;
      counterDays++;
    }
  }
  print() {
    Elements.cityOutput.textContent = `${this.city} , ${this.country}`;
    Elements.windOutput.textContent = `Wind : ${this.wind}`;
    Elements.humidityOutput.textContent = `Humidity: ${this.humidity}`;
    Elements.celciusOutput.innerHTML = `${this.convertKelvinToCelcius()} &deg; C`;
    Elements.descriptionOutput.textContent = this.weatherDescription;

    Elements.dateOutput.textContent = this.thisDay();
    Elements.middleColumn.style.display = "block";
    Elements.daysPanel.style.display = "flex";
    this.createIcon();
    this.printDataForFiveDays();
    this.printTempForFiveDays();
  }
}

const searchWeather = () => {
  let inputValue = Elements.inputSearch.value;
  if (!inputValue) {
    Elements.errorOutput.style.display = "block";
  } else {
    Elements.inputSearch.value = "";
    return getWeather(inputValue);
  }
};

const getWeather = value => {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.status === 404) {
      Elements.errorOutput.style.display = "block";
    }
  };
  req.open(
    "GET",
    `http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=68bd5f4bb35ae2d156f101f9dfc3a4a0`,
    true
  );
  req.send();
  req.onload = function() {
    json = JSON.parse(req.responseText);

    let city = json.city.name,
      country = json.city.country,
      dateList = json.list,
      wind = `${json.list[0].wind.speed} mph`,
      humidity = `${json.list[0].main.humidity}%`,
      temperature = json.list[0].main["temp_max"],
      iconID = json.list[0].weather[0].icon,
      weatherDescription = json.list[0].weather[0].description;

    Elements.errorOutput.style.display = "none";

    const newWeather = new Weather(
      city,
      country,
      dateList,
      wind,
      humidity,
      temperature,
      iconID,
      weatherDescription
    );
    newWeather.print();
  };
};

Elements.searchButton.addEventListener("click", searchWeather);

Elements.inputSearch.addEventListener("keypress", function(e) {
  if (e.keyCode == 13) {
    searchWeather();
    this.blur();
  }
});

Elements.inputSearch.addEventListener("click", function() {
  this.placeholder = "";
});

Elements.inputSearch.addEventListener("blur", function() {
  this.placeholder = "Enter the city or country";
});
