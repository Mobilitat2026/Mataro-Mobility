import {
    getIncidencias,
    eliminarIncidencia,
    marcarComoResuelta
} from "./incidents.js";

let marcadorTemporal = null;
let avisoSeleccion = null;
let modoSeleccionActivo = false;
let mapaSeleccionActual = null;


const marcadores = new Map();



function crearIcono(emoji) {

    return L.divIcon({

        className: "emoji-marker",

        html: `<div class="emoji-icon">${emoji}</div>`,

        iconSize: [32, 32],

        iconAnchor: [16, 32],

        popupAnchor: [0, -30]

    });

}



// ICONO TEMPORAL

function crearIconoTemporal() {

    return L.divIcon({

        className: "emoji-marker temporal",

        html: `
            <div class="emoji-icon">
                📌
            </div>
        `,

        iconSize: [32,32],

        iconAnchor:[16,32]

    });

}



// MENSAJE SOBRE EL MAPA

function mostrarAvisoMapa(texto) {


    if (!avisoSeleccion) {

        avisoSeleccion = document.createElement(
            "div"
        );

        avisoSeleccion.id =
            "map-message";

        document
            .getElementById("map")
            .appendChild(avisoSeleccion);

    }


    avisoSeleccion.innerHTML = texto;


}



function ocultarAvisoMapa(){

    if(avisoSeleccion){

        avisoSeleccion.remove();

        avisoSeleccion = null;

    }

}



// ==========================================================
// INICIALIZAR MAPA
// ==========================================================

export function initMap() {


    const contenedor = document.getElementById("map");


    console.log(
        "MAP CONTAINER:",
        contenedor
    );


    console.log(
        "ALTURA MAP:",
        contenedor.offsetHeight
    );


    const map = L.map("map", {

        zoomControl: true,

        attributionControl: true

    }).setView(

        [41.5381, 2.4447],

        14

    );


    L.tileLayer(

        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            attribution: "OpenStreetMap"

        }

    ).addTo(map);



    // Ajustar tamaño después del render inicial

    setTimeout(() => {

        map.invalidateSize();

    }, 300);



    // Ajustar tamaño al cambiar ventana/orientación

    window.addEventListener(

        "resize",

        () => {

            map.invalidateSize();

        }

    );


    return map;

}

// ACTIVAR NUEVA INCIDENCIA

export function activarNuevaIncidencia(map) {


    if(modoSeleccionActivo){
        return;
    }


    modoSeleccionActivo = true;
    mapaSeleccionActual = map;


    mostrarAvisoMapa(
        "📍 Selecciona la ubicación de la incidencia"
    );


    map.getContainer()
        .style.cursor = "crosshair";



    map.once(
        "click",
        (e)=>{


            if(marcadorTemporal){

                map.removeLayer(
                    marcadorTemporal
                );

            }



            marcadorTemporal =
                L.marker(

                    [
                        e.latlng.lat,
                        e.latlng.lng
                    ],

                    {
                        icon:
                        crearIconoTemporal()
                    }

                )
                .addTo(map);



            window.AppState.nuevaIncidencia = {

                lat:e.latlng.lat,

                lng:e.latlng.lng

            };



            ocultarAvisoMapa();


            modoSeleccionActivo=false;


            map.getContainer()
                .style.cursor="";


        }

    );


}


// LIMPIAR MARCADOR TEMPORAL

export function limpiarMarcadorTemporal(map){


    if(marcadorTemporal){

        map.removeLayer(
            marcadorTemporal
        );

        marcadorTemporal=null;

    }


    if(window.AppState){

        window.AppState.nuevaIncidencia=null;

    }


    modoSeleccionActivo=false;


    ocultarAvisoMapa();


    map.getContainer()
        .style.cursor="";


}



// CARGAR INCIDENCIAS

export function cargarIncidencias(map) {


    const incidencias =
        getIncidencias();



    incidencias.forEach(

        incidencia => {

            añadirMarcadorIncidencia(
                map,
                incidencia
            );

        }

    );


}

function crearContenidoPopup(incidencia, emoji){

    return `

        <h3>

            ${emoji}
            ${incidencia.titulo}

        </h3>

        <p>

            <strong>📅 Fecha:</strong>
            ${incidencia.fecha ?? "-"}

        </p>

        <p>

            <strong>Estado:</strong>

            <span class="estado ${incidencia.estado ?? "pendiente"}">

                ${incidencia.estado ?? "pendiente"}

            </span>

        </p>

        <p>

            ${incidencia.descripcion}

        </p>

        ${incidencia.estado === "pendiente" ? `

            <button

                class="btnResolver"

                data-id="${incidencia.id}"

            >

                ✅ Marcar como resuelta

            </button>

            <br><br>

        ` : `

            <p style="color:green;font-weight:bold;">

            ✔ Incidencia resuelta

            </p>

`}

        <button

            class="btnEliminar"

            data-id="${incidencia.id}"

        >

            🗑 Eliminar

        </button>

    `;

}

// CREAR MARCADOR DEFINITIVO

export function añadirMarcadorIncidencia(
    map,
    incidencia
) {


    let emoji="📍";



    switch(
        incidencia.tipo
    ){

        case "accidente":

            emoji="🚨";

            break;


        case "obras":

            emoji="🚧";

            break;


        case "atasco":

            emoji="🚦";

            break;

    }



    const marker =
        L.marker(

            [

                incidencia.lat,

                incidencia.lng

            ],

            {

                icon:
                crearIcono(emoji)

            }

        )

        .addTo(map)

    .bindPopup(
        crearContenidoPopup(
            incidencia,
         emoji
        )
    );


    marcadores.set(
        incidencia.id,
        marker
    );

    marker.on(

    "popupopen",

    ()=>{

        const botonResolver =
            document.querySelector(
                `.btnResolver[data-id="${incidencia.id}"]`
            );

        if(botonResolver){

            botonResolver.onclick = ()=>{

                marcarComoResuelta(
                    incidencia.id
                );

                incidencia.estado = "resuelta";

                marker.setPopupContent(
                    crearContenidoPopup(
                        incidencia,
                        emoji
                    )
                );

                marker.openPopup();

            };

        }

        const boton =
            document.querySelector(
                `.btnEliminar[data-id="${incidencia.id}"]`
            );

        if(!boton)
            return;

        boton.onclick = ()=>{

            const confirmar =
                confirm(
                    "¿Eliminar esta incidencia?"
                );

            if(!confirmar)
                return;

            eliminarIncidencia(
                incidencia.id
            );

            map.removeLayer(
                marker
            );

            marcadores.delete(
                incidencia.id
            );

        };

    }

);
}


export function eliminarMarcador(
    map,
    id
){


    const marker =
        marcadores.get(id);



    if(marker){


        map.removeLayer(
            marker
        );


        marcadores.delete(
            id
        );


    }


}
export function confirmarNuevaIncidencia(map, incidencia){


    limpiarMarcadorTemporal(map);


    añadirMarcadorIncidencia(
        map,
        incidencia
    );


}
// ==========================================================
// VOLVER AL MAPA PRINCIPAL
// ==========================================================

export function volverMapaInicio(){


    document
        .getElementById("map-viewer")
        .classList
        .add("hidden");


    document
        .getElementById("map")
        .style.display = "block";


    document
        .getElementById("google-map-frame")
        .src = "";


    if(window.AppState?.map){


        window.AppState.map.setView(

            [41.5381, 2.4447],

            14

        );


        window.AppState.map.invalidateSize();


    }


}

// ==========================================================
// OBTENER UBICACIÓN DEL USUARIO
// ==========================================================

let marcadorUsuario = null;


export function obtenerUbicacionUsuario(){


    const map = window.AppState?.map;


    if(!map){

        console.error(
            "Mapa no disponible"
        );

        return;

    }



    if(!navigator.geolocation){


        alert(
            "Este dispositivo no permite obtener la ubicación"
        );


        return;

    }



    navigator.geolocation.getCurrentPosition(


        (pos)=>{


            const lat =
                pos.coords.latitude;


            const lng =
                pos.coords.longitude;


            console.log(
                "Ubicación usuario:",
                lat,
                lng
            );



            // eliminar marcador anterior

            if(marcadorUsuario){


                map.removeLayer(
                    marcadorUsuario
                );

            }



            marcadorUsuario =

                L.marker(

                    [
                        lat,
                        lng
                    ]

                )

                .addTo(map)

                .bindPopup(

                    `
                    <strong>📍 Mi ubicación</strong>
                    <br><br>
                    Latitud:
                    ${lat.toFixed(6)}
                    <br>
                    Longitud:
                    ${lng.toFixed(6)}
                    `

                )

                .openPopup();



            // centrar mapa en usuario

            map.setView(

                [
                    lat,
                    lng
                ],

                17

            );


        },


        ()=>{


            alert(
                "No se pudo obtener la ubicación"
            );


        },


        {

            enableHighAccuracy:true,

            timeout:10000,

            maximumAge:0

        }


    );


}
