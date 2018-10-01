import { Config } from './config.js';




$.get('./components/header.html', function(response) {
  $("#nav").html(response);
});
