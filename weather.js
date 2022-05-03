let weather = {
    apiKey: "a718bac335337214cd6e987402d3e34c",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { description } = data.weather[0];
      const { temp_max, temp_min, humidity } = data.main;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp_max").innerText = ((temp_max * 9/5) + 32) + "°F";
      document.querySelector(".temp_min").innerText = ((temp_min * 9/5) + 32) + "°F";
      document.querySelector(".humidity").innerText = 
        "Humidity: " + humidity + "%";
      document.querySelector(".weather").classList.remove("loading");
    
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Baltimore")