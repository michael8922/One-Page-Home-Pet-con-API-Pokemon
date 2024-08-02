
/****************************************************** Estilos Movimiento One Page  ******************************************************/

(function ($) {
    "use strict";

    // Desplazamiento suave usando anime.js
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ?
                target :
                $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                anime({
                    targets: 'html, body',
                    scrollTop: target.offset().top - 36,
                    duration: 1000,
                    easing: 'easeInOutExpo'
                });
                return false;
            }
        }
    });

    // Cierra el menú de respuesta cuando se hace clic en un enlace de activación de desplazamiento
    $(".js-scroll-trigger").on('click', function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activar scrollspy para agregar una clase activa a los elementos de la barra de navegación en el desplazamiento
    $("body").scrollspy({
        target: "#mainNav",
        offset: 300,
    });

})(jQuery);








/****************************************************** Estilos Hora en tiempo real  ******************************************************/

function startTime() {
    //declaramos las  variables que nos proporcionaran los datos como la hora, minutos etc.

    var today = new Date(),
        hours = today.getHours(),
        minutes = today.getMinutes(),
        date = today.getDate(),
        day = today.getDay(),
        month = today.getMonth();

    //utilizaremos operadores ternarios esto nos ayudara a mostrar la hora solo del 1 al 12
    hours = (hours == 0) ? 12 : hours;
    hours = (hours > 12) ? hours - 12 : hours;

    //pasaremos las horas y minutos a una funcion que crearemos mas adelante
    hours = checkTime(hours);
    minutes = checkTime(minutes);

    //primero para los dias y meses crearemos un arreglo que nos devolvera estos datos en texto
    var dia = ["Domingo", " Lunes", "Martes", "Miercoles", "Jueves", "viernes", "Sabado"],
        mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    //haora solo imprimimos los datos
    var hr = document.getElementById('time').textContent = hours + ":" + minutes,
        dt = document.getElementById('date').textContent = dia[day] + ", " + date + " De " + mes[month];

    //esta funcion hara que nuestro escript se ejecute constantemente
    var time = setTimeout(function() {
        startTime();
    }, 500);

}
//solo falta crear la funcion que nos diga si tine uno o dos digitos
//esto para que si solo tiene uno le agrege un cero a la izquierda
function checkTime(e) {
    if (e < 10) {
        e = "0" + e;
    }
    return e;
}





/****************************************************** Estilos Valores Monetario Tiempo Real  ******************************************************/




$(document).ready(function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open ('GET', 'https://mindicador.cl/api', true)
    xmlhttp.send ();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            var data = JSON.parse(this.responseText);
        }
        document.getElementById("valorUF").innerHTML = new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:2}).format(data.uf.valor);
        document.getElementById("valorDolar").innerHTML =  new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:2}).format(data.dolar.valor);
        document.getElementById("valorEuro").innerHTML =  new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:2}).format(data.euro.valor);
    }
});




/****************************************************** Estilos Conversor Monetario  ******************************************************/

function convertir() {

    var valor = parseFloat(document.getElementById("cantidad").value);
    document.getElementById("valor").innerHTML = "<b>"+valor+"</b>";
    var de=document.getElementById("de").value;
    var a=document.getElementById("a").value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open ('GET', 'https://mindicador.cl/api', true)
    xmlhttp.send ();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            var data = JSON.parse(this.responseText);
        }
        var dolar = data.dolar.valor;
        var euro = data.euro.valor;



        //peso a Dolar
        if(de==1&&a==2)
        {
            resultado=valor/dolar;
        }
        //peso a Euro
        else if(de==1&&a==3)
        {
            resultado=valor/euro;
        }
        //Dolar a peso
        else if(de==2&&a==1)
        {
            resultado=valor*dolar;
        }
        //Dolar a Euro
        else if(de==2&&a==3)
        {
            resultado=valor*(dolar/euro);
        }
        //Euro a peso
        else if(de==3&&a==1)
        {
            resultado=valor*euro;
        }
        //Euro a Dolar
        else if(de==3&&a==2)
        {
            resultado=valor*(euro/dolar);
        }
        //peso a peso, Dolar a Dolar, Euro a Euro
        else
        {
            resultado=valor;
        }
        document.getElementById("resultado").innerHTML = "Resultado: $"+resultado.toFixed(2);
    }
}



/****************************************************** Validador del Formulario  ******************************************************/



(function() {
    'use strict';
    window.addEventListener('load', function() {
  
      var forms = document.getElementsByClassName('needs-validation');
  
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();