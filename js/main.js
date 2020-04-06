/*En este archivo estan las funciones que acomodan las gráficas de plotly para que cuando se carguen 
se vean bien. Sin este código se ven fuera de sitio las que estan dentro de tabs internos
Es posible que se vean así porq cuando estan ocultas toman el tamaño de ese container oculto
y cuando se vuelven visibles no reconocen que el container cambió de tamaño*/



/*Actualiza la gráfica que llega como parámetro en el evento mouseclick
*/
function actualizarGrafica(grafica)
{
    // console.log(grafica.target.getAttribute("href"))

	 var graficasTab = document.querySelectorAll(grafica.target.getAttribute("href") + " .js-plotly-plot");
	var update = 
	{
	    'marker.color': 'red'
	}; //no importa el tipo de update mietnras no sea vacio

	for (var i = 0; i < graficasTab.length; i++) 
	{
  		let objetoGrafica = graficasTab[i];

		setTimeout(function()
		{
			Plotly.relayout(objetoGrafica, update);
		},200, objetoGrafica);
		//se hace dos veces pq si el navegador es muy lento 
		//puede que no alcance mostrar la gráfica antes del tiempo de refresco
		setTimeout(function()
		{
			Plotly.relayout(objetoGrafica, update);
		},600, objetoGrafica);
	}

}

/*
* Carga al inicio.
* Hace que cuando se hace click en un tab de navegacion de las gráficas o en el tab general debajo del menu
* se llama al evento actualizar gráficas
*/
function anadirOnClickAGraficas()
{
    //recarga las gráficas visibles
    actualizarTodasLasGraficasVisibles();
  
    var tabsInternos = document.getElementsByClassName('nav-link');

    for (var i = 0; i < tabsInternos.length; i++) 
    {
        tabsInternos[i].addEventListener("click", actualizarGrafica);
    }    

  	var tabsGenerales = document.querySelectorAll('.nav-tabs li > a')

     for (var i = 0; i < tabsGenerales.length; i++) 
    {
        tabsGenerales[i].addEventListener("click", actualizarGrafica);
    }                                                                           
}

window.onload=  anadirOnClickAGraficas;
// anadirOnClickAGraficas();

// Las gráficas que estan visibles se actualizan, las que no se ven
//en teoría también se actualizan, pero cuando se traen a visibles estan desacomodadas
//por eso la funcion on click de los tags
function actualizarTodasLasGraficasVisibles()
{
	var graficasTab = document.querySelectorAll(".js-plotly-plot");
	var update = 
	{
	    'marker.color': 'red'
	}; //no importa el tipo de update mietnras no sea vacio

	for (var i = 0; i < graficasTab.length; i++) 
	{
		Plotly.relayout(graficasTab[i] , update);
	}

}

function situarInicio()
{
	var inicio = document.getElementById("inicio");
	if(inicio != null)
	{
		var slogan = document.getElementById("slogan");
		var cuadro = document.getElementById("cuadroIndicadores");
		var topCuadro = 15 + slogan.offsetHeight + slogan.offsetTop + parseInt(window.getComputedStyle(slogan).getPropertyValue("margin-top"));
		cuadro.style.top= topCuadro + "px";
		var titulo = document.getElementsByClassName("inicio");
		titulo[0].style.top = (cuadro.offsetTop + cuadro.offsetHeight)+"px";
		var fondo = document.getElementById("header");
		fondo.style.height= (cuadro.offsetTop + 2*Math.ceil(cuadro.offsetHeight/3)) + "px";
	}
}

window.onresize = situarInicio;
window.onload = situarInicio;
