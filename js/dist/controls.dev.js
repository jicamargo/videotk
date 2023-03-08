"use strict";

/******************************************************************************

// ejemplode uso del jqueri para desvaneces parrafos y ocultar imagenes 

var left = $('.l');
var right = $('.r');

$('button').on('click', function() {
  
  $( "p" ).fadeToggle( "slow" );
  
  left.toggleClass('left');
  right.toggleClass('right');

  if (left.hasClass('left')) {
    $(left).children('figcaption').text('Floating Left');
  } else {
    $(left).children('figcaption').text('Not Floating');
  }

  if (right.hasClass('right')) {
    $(right).children('figcaption').text('Floating Right');
  } else {
    $(right).children('figcaption').text('Not Floating');
  }

    $( "p" ).last().fadeToggle( "fast", function() {
    $( "article" ).append( "<div>*****finished********</div>" );
    });
});
******************************************************************************/
var videos = Array[6];
videos[1] = "https://www.youtube.com/embed/WLP3jjcw3sA";
videos[2] = "https://www.youtube.com/embed/Qp4PR-A6rrk";
videos[3] = "https://www.youtube.com/embed/BJke8ONBGA8";
videos[4] = "https://www.youtube.com/embed/WWhBNnxQp3U";
videos[5] = "https://www.youtube.com/embed/yqgQuYXmgF4";
videos[6] = "https://www.youtube.com/embed/kPqHsO3fxu8";
/* funcion para el clic en  cada boton de video */

var active_video = function active_video(evento) {
  var actual_active = $('.selected');
  actual_active.toggleClass("selected"); // le quita la clñase seleted al actualmente activo 

  var video = this;

  if (!video.className.includes("selected")) {
    video.className += " selected"; // le pone la clase seleted al que le dio clic en este momento
  }
};
/* agrega el evento clic a cada video */


var cells = document.getElementsByClassName("cell");

for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", active_video);
}

;
/*
obtiene el archivo de imagen (miniatura o thumbnail) de in video de youtube 
op0ciones para el parametro size default, hqdefault, mqdefault, sddefault, maxresdefault
Tamaño pequeño: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/default.jpg
Tamaño mediano: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/hqdefault.jpg
Tamaño estándar de las miniaturas: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/mqdefault.jpg
Tamaño grande: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/sddefault.jpg
Máxima calidad de la miniatura: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/maxresdefault.jpg
*/

function getYTThumb(url, size) {
  var video, results, thumburl;

  if (url === null) {
    return '';
  } // extrae el id del video que viene en el url como parametro despues de v= y antes de cualquier otro parametro (que empieza con & ó #)


  results = url.match('[\\?&]v=([^&#]*)');
  video = results === null ? url : results[1];

  if (size != null) {
    thumburl = 'http://img.youtube.com/vi/' + video + '/' + size + '.jpg';
  } else {
    thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
  }

  return thumburl;
}

;
//# sourceMappingURL=controls.dev.js.map
