// Import stylesheets
import "./style.css";

const form = document.querySelector(".top-banner form");

window.search_function = event => {
  // event.preventDefault();
  var x = document.getElementById("search_bar").value;
  console.log(x);

  // getting API data
  var query = x;
  var n_days = "3";
  const api = {
    key: "use you key here...",
    base: "https://api.weatherapi.com/v1/"
  };

  const api_url = `${api.base}forecast.json?key=${
    api.key
  }&q=${query}&days=${n_days}`;

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", api_url, true);
  xhttp.send();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const weatherData = JSON.parse(this.responseText);
      console.log(this.responseText);

      var forecastday = weatherData.forecast.forecastday;

      const outer_div = document.getElementById("outer_div");
      outer_div.style.backgroundColor = "2px solid #0a1f44";

      // Today date & time in header
      const heading = document.getElementById("today_date_time");
      var today_date = document.createElement("h3");
      var today_time = document.createElement("h3");

      var today = new Date();
      var amOrPm = today.getHours() < 12 ? "AM" : "PM";
      var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      var day = days[today.getDay()];
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear() +
        " (" +
        day +
        ")";
      var time = today.getHours() + ":" + today.getMinutes() + " " + amOrPm;
      today_date.innerHTML = date;
      today_time.innerHTML = time;

      heading.append(today_date);
      heading.append(today_time);

      // FIrst Section
      var inner_div_0_heading = document.getElementById("inner_div_0_heading");
      inner_div_0_heading.innerHTML =
        weatherData.location.name +
        ", " +
        weatherData.location.region +
        ", " +
        weatherData.location.country;
      inner_div_0_heading.setAttribute("style", "background: white");

      // Second Section
      var inner_div_1 = document.getElementById("inner_div_1");
      inner_div_1.setAttribute("style", "background: white");
      inner_div_1.style.opacity = 0.8;

      // Second Section Part 1
      var today_temperature = document.getElementById("today_temperature");
      var max_min_temp = document.getElementById("max_min_temp");
      today_temperature.innerHTML = weatherData.current.temp_c + " *C";
      max_min_temp.innerHTML =
        forecastday[0].day.maxtemp_c +
        " *C / " +
        forecastday[0].day.mintemp_c +
        " *C";

      // Second Section Part 2
      var today_condition_icon = document.getElementById(
        "today_condition_icon"
      );
      var fig_caption = document.getElementById("fig_caption");
      today_condition_icon.setAttribute(
        "src",
        weatherData.current.condition.icon
      );
      fig_caption.innerHTML = weatherData.current.condition.text;

      // Second Section Part 3
      var Sunrise = document.getElementById("sunrise");
      var Sunset = document.getElementById("sunset");
      var Moonrise = document.getElementById("moonrise");
      var Moonset = document.getElementById("moonset");

      Sunrise.innerHTML = "Sunrise: " + forecastday[0].astro.sunrise;
      Sunset.innerHTML = "Sunset: " + forecastday[0].astro.sunset;
      Moonrise.innerHTML = "Moonrise: " + forecastday[0].astro.moonrise;
      Moonset.innerHTML = "Moonset: " + forecastday[0].astro.moonset;

      // Second Section Part 4
      var humidity = document.getElementById("humidity");
      var precipitation = document.getElementById("precipitation");
      var wind_speed = document.getElementById("wind-speed");
      var pressure = document.getElementById("pressure");

      humidity.innerHTML = "Humidity: " + weatherData.current.humidity + " %";
      precipitation.innerHTML =
        "Precipitation: " + weatherData.current.precip_mm + " mm";
      wind_speed.innerHTML =
        "Wind Speed: " + weatherData.current.wind_mph + " mph";
      pressure.innerHTML =
        "Pressure: " + weatherData.current.pressure_mb + " mb";

      // Third Section
      var inner_div_2 = document.getElementById("inner_div_2");
      // var form = document.createElement('form');
      var table = document.createElement("table");

      // form.append(table);
      for (var i = 0; i < n_days; i++) {
        var tr = document.createElement("tr");
        if (i == 0) {
          var date = document.createElement("th");
          var temp = document.createElement("th");
          var cond = document.createElement("th");
          var humidity = document.createElement("th");
          var precipitation = document.createElement("th");
          var pressure = document.createElement("th");
          var wind_speed = document.createElement("th");

          date.appendChild(document.createTextNode("Date"));
          temp.appendChild(document.createTextNode("Temperature (*C)"));
          cond.appendChild(document.createTextNode("Condition"));
          humidity.appendChild(document.createTextNode("Humidity (%)"));
          // precipitation.appendChild(document.createTextNode('Precipitation'));
          // pressure.appendChild(document.createTextNode('Pressure'));
          wind_speed.appendChild(document.createTextNode("Wind Speed (mph)"));

          tr.appendChild(date);
          tr.appendChild(temp);
          tr.appendChild(cond);
          tr.appendChild(humidity);
          tr.appendChild(precipitation);
          tr.appendChild(pressure);
          tr.appendChild(wind_speed);
        } else {
          var date = document.createElement("td");
          var temp = document.createElement("td");
          var cond = document.createElement("td");
          var humidity = document.createElement("td");
          var precipitation = document.createElement("td");
          var pressure = document.createElement("td");
          var wind_speed = document.createElement("td");

          date.appendChild(document.createTextNode(forecastday[i].date));
          temp.appendChild(
            document.createTextNode(forecastday[i].day.avgtemp_c)
          );
          cond.appendChild(
            document.createTextNode(forecastday[i].day.condition.text)
          );
          humidity.appendChild(
            document.createTextNode(forecastday[i].day.avghumidity)
          );
          // precipitation.appendChild(document.createTextNode(forecastday[i].day.totalprecip_mm));
          // pressure.appendChild(document.createTextNode(forecastday[i].day.avgtemp_c));
          wind_speed.appendChild(
            document.createTextNode(forecastday[i].day.maxwind_mph)
          );

          tr.appendChild(date);
          tr.appendChild(temp);
          tr.appendChild(cond);
          tr.appendChild(humidity);
          tr.appendChild(precipitation);
          tr.appendChild(pressure);
          tr.appendChild(wind_speed);
        }
        table.appendChild(tr);
      }
      inner_div_2.append(table);
    }
  };
};
