import { Config } from './config.js';




$.get('./components/header.html', function(response) {
  $("#nav").html(response);
});


$("#weather-info").css("display", "none");


 // from the line below on is an entire function
$("#search_weather").submit( event => {
  // form naturally refreshes page, we need to prevent that
  event.preventDefault();

  let searchTerm= $("#city_search").val();
  console.log(searchTerm);

  // instantiating new config object to retrieve api key
  let config = new Config();
  let key = config.getKey();


  let url = 'http://api.openweathermap.org/data/2.5/weather';


  let data = {
    q: searchTerm,
    APPID: key
  }
  function convertDeg(degree) {
    return(((degree - 273) * (9/5)) + 32).toFixed(2);
  }

  function showWeather(response) {
    console.log(response);

    $("#city_name").text(response.name + ', ' + response.sys.country);
    $("#high").html(convertDeg(response.main.temp_max) + "&deg");
    $("#low").html(convertDeg(response.main.temp_low) + "&deg");
    $("#forecast").html(response.weather[0].main);
    $("#humidity").html(response.main.humidity);

    // have weather cards appear again on submission
    $("#weather-info").css("display", "block");
  }

  $.get(url, data, showWeather);
})


let url='https://learnwebcode.github.io/json-example/animals-1.json';
function showAnimals(response) {
  let content = "";
  for (let i = 0; i < response.length; i++) {
    content += `
      <tr>
        <td>${response[i].name}</td>
        <td>${response[i].species}</td>`;

    content += '<td><ul>';
    for (let j = 0; j < response[i].foods.likes.length; j++) {
      content += `
        <li>${response[i].foods.likes[j]}</li>
      `
    }
      content += '</ul></td>';
      content += '<td><ul>';
      for (let k = 0; k < response[i].foods.dislikes.length; k++) {
        content += `
          <li>${response[i].foods.dislikes[k]}</li>
        `
      }
        content += '</ul></td>';
}

  $("#animals").html(content);

//   console.log(response[0].foods.likes);
//   let content='';
//   let likes = '';
//   let name1 = response[0].name;
//   let name2 = response[1].name;
//   let name3 = response[2].name;
//   let species1 = response[0].species;
//   let species2 = response[1].species;
//   let species3 = response[2].species;
//   let likes1='';
//   for (let i=0; i<response.length; i++) {
//     content+=`${response[i].name}\n`;
//     for (let j=0; j<response[i].foods.likes.length;  j++) {
//       likes += `${response[i].foods.likes[j]}\n`;
// }
//   }
//   $("#name1").html(name1);
//   $("#name2").html(name2);
//   $("#name3").html(name3);
//   $("#species2").html(species2);
//   $("#species3").html(species3);
//
//   $("#species1").html(species1);
//   $("#name").html(content);
//   $("#likes").html(likes);
//   // $("#dislikes").html(dislikes);
}

$.get(url, showAnimals)
