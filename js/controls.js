
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

// Variables Globales
let videos = []
let ytplayer;



// FUNCIONES PARA MANEJAR LOS ARCHIVOS DE YOUTUBE 

/*
obtiene el archivo de imagen (miniatura o thumbnail) de in video de youtube 
op0ciones para el parametro size default, hqdefault, mqdefault, sddefault, maxresdefault
Tamaño pequeño: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/default.jpg
Tamaño mediano: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/hqdefault.jpg
Tamaño estándar de las miniaturas: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/mqdefault.jpg
Tamaño grande: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/sddefault.jpg
Máxima calidad de la miniatura: https://img.youtube.com/vi/IDENTIFICADOR_DEL_VIDEO/maxresdefault.jpg
*/
function getYTVideoId(url) {
  var video, results;
  
   if (url === null) {
       return '';
   }
   // extrae el id del video que viene en el url como parametro despues de v= y antes de cualquier otro parametro (que empieza con & ó #)
   results = url.match('[\\?&]v=([^&#]*)');
   if (results === null){
      results = url.match('/embed/([^&#]*)');   
   } 
   video   = (results === null) ? url : results[1];
   
  return video;
};


function getYTThumb(url, size) {
  var video, results, thumburl;
  
   if (url === null) {
       return '';
   }

   video = getYTVideoId(url);
   
   if(size != null) {
       thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
   }else{
       thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
   }
  
  return thumburl;
};


/*************************************************************** */

/* funcion para el clic en  cada boton de video */
const play_video = function (evento) {
    
    const video = this;
    
    let titulo ="", videoId="";
    
    if (!video.className.includes("selected")) {
      const actual_active = $('.selected');
      actual_active.toggleClass("selected"); // le quita la clñase seleted al actualmente activo 
      video.className += " selected"         // le pone la clase seleted al que le dio clic en este momento
      titulo= video.getElementsByClassName("title-video")[0].id;
      titulo= parseInt(titulo.slice(-1));
      
      // let  videoyt = document.getElementById("frameyt");
      videoId = getYTVideoId(videos[titulo]);
      ytplayer.loadVideoById({'videoId': videoId});
      // ytplayer.loadVideoById({'videoId': videoId,
      //            'startSeconds': 5,
      //            'endSeconds': 10});
      //console.log(ytplayer);
    }else{
      // si esta activo el video y dieron clic en su tarjeta, interactua con la pausa
      if ([2, 0].includes(ytplayer.getPlayerState()))
          ytplayer.playVideo();
      else
          ytplayer.pauseVideo();
    } 
};


function onYouTubePlayerAPIReady() {
  console.log("entre a  onYouTubePlayerAPIReady");

  ytplayer = new YT.Player('video-player', {
    //Parametros del video
    playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque' },
    videoId: "",
    events: {
          'onReady': onPlayerReady}
  });
}

function onPlayerReady() {
  console.log("entre a  onPlayerReady");
   //Ajustar volumen
   ytplayer.setVolume(50);
   create_cards();   // crea los elementos para cada video
   
}

function create_cards(){
  let grid = document.getElementById("grid");
  let vidId="";

  for (let i = 0; i < videos.length; i++) {
      // create a new div and add content
      var cell = document.createElement("div")
      cell.className="cell";
      
      var video = document.createElement("div");
      video.className="video";

      var img = document.createElement("img");
      img.className="img";
      img.src= getYTThumb(videos[i], "mqdefault");
      
      
      var titulo = document.createElement("div");
      titulo.id = "video-"+i;

      //-------------------prueba para extraer el titulo del video----
      tit = "clic para ver este video"; 
      //--------------------


      titulo.className="title-video";
      titulo.innerHTML=tit;
      video.appendChild(img);
      
      video.appendChild(titulo);
      cell.appendChild(video);
      grid.appendChild(cell);
      
    }

  /* agrega el evento clic a cada video */
  var cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++){
      cells[i].addEventListener("click", play_video);
  };
}
/********************************************************** */

function inicio() {

  videos[0]= "https://www.youtube.com/embed/WLP3jjcw3sA";
  videos[1]="https://www.youtube.com/embed/Qp4PR-A6rrk";
  videos[2]="https://www.youtube.com/embed/BJke8ONBGA8";
  videos[3]="https://www.youtube.com/embed/WWhBNnxQp3U";
  videos[4]="https://www.youtube.com/embed/yqgQuYXmgF4";
  videos[5]="https://www.youtube.com/embed/kPqHsO3fxu8";

  console.log("entre a inicio");
  

  /***** inserta Youtube Player *****/

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var videocell = document.getElementById('video-player');
  videocell.appendChild(tag);
}; //inicio

inicio();