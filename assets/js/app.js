import {
    initMap,
    cargarIncidencias,
    activarNuevaIncidencia,
    añadirMarcadorIncidencia,
    limpiarMarcadorTemporal
} from "./maps.js";

import { initUI } from "./ui.js";
import { loadServices } from "./providers.js";
import { initStorage } from "./storage.js";
import { initServices } from "./services.js";

import {
    cargarIncidenciasStorage,
    cargarIncidenciasIniciales,
    agregarIncidencia
} from "./incidents.js";


window.AppState = {

    map: null,

    services: [],

    favorites: [],

    nuevaIncidencia: null

};


window.AppState = AppState;



async function start() {

    initStorage();

    cargarIncidenciasStorage();

    await cargarIncidenciasIniciales();

    AppState.map = initMap();

    cargarIncidencias(AppState.map);

    AppState.services = await loadServices();

    initUI();

    initServices();

    lucide.createIcons();

}


start();



// ELEMENTOS DEL MODAL

const botonNueva = document.getElementById(
    "btnNuevaIncidencia"
);

const panelIncidencia = document.getElementById(
    "incidencia-panel"
);

const guardar = document.getElementById(
    "guardarIncidencia"
);

const cancelar = document.getElementById(
    "cancelarIncidencia"
);

const cerrarModal = document.getElementById(
    "cerrarModalIncidencia"
);



// ABRIR MODAL

botonNueva.addEventListener("click", () => {

    panelIncidencia.classList.remove("hidden");

    AppState.nuevaIncidencia = null;

    activarNuevaIncidencia(
        AppState.map
    );

});



// CERRAR CON CANCELAR

cancelar.addEventListener("click", () => {

    panelIncidencia.classList.add("hidden");

    AppState.nuevaIncidencia = null;

});



// CERRAR CON X

cerrarModal.addEventListener("click", () => {

    panelIncidencia.classList.add("hidden");

    AppState.nuevaIncidencia = null;

});



// CERRAR AL PULSAR FUERA DEL PANEL

panelIncidencia.addEventListener(
    "click",
    (e) => {

        if (e.target === panelIncidencia) {

            panelIncidencia.classList.add("hidden");

            AppState.nuevaIncidencia = null;

        }

    }
);



// GUARDAR INCIDENCIA

guardar.addEventListener("click", () => {


    if (!AppState.nuevaIncidencia) {

        alert(
            "Selecciona primero una ubicación en el mapa"
        );

        return;

    }


    const titulo = document
        .getElementById("tituloIncidencia")
        .value
        .trim();


    const descripcion = document
        .getElementById("descripcionIncidencia")
        .value
        .trim();


    const tipo = document
        .getElementById("tipoIncidencia")
        .value;



    if (!titulo) {

        alert(
            "Introduce un título."
        );

        return;

    }



    if (!descripcion) {

        alert(
            "Introduce una descripción."
        );

        return;

    }



    const incidencia = {

        titulo,

        descripcion,

        tipo,

        lat: AppState.nuevaIncidencia.lat,

        lng: AppState.nuevaIncidencia.lng

    };



    const nuevaIncidencia = agregarIncidencia(
    incidencia
    );


    añadirMarcadorIncidencia(
        AppState.map,
        nuevaIncidencia
    );


    limpiarMarcadorTemporal(
        AppState.map
    );



    // LIMPIAR FORMULARIO

    document
        .getElementById("tituloIncidencia")
        .value = "";


    document
        .getElementById("descripcionIncidencia")
        .value = "";


    document
        .getElementById("tipoIncidencia")
        .value = "obras";



    // CERRAR MODAL

    panelIncidencia.classList.add(
        "hidden"
    );


    AppState.nuevaIncidencia = null;


});
