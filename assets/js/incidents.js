const STORAGE_KEY = "mataro-incidencias";

let incidencias = [];

export function getIncidencias() {
    return incidencias;
}

export function cargarIncidenciasStorage() {

    const datos = localStorage.getItem(STORAGE_KEY);

    if (datos) {
        incidencias = JSON.parse(datos);
    }

}

export function guardarIncidenciasStorage() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(incidencias)
    );

}

export function agregarIncidencia(incidencia) {

    const nuevaIncidencia = {

    id: Date.now(),

    estado: "pendiente",

    fecha: new Date().toLocaleDateString("es-ES"),

    ...incidencia

    };

    incidencias.push(nuevaIncidencia);

    guardarIncidenciasStorage();

    return nuevaIncidencia;

}

export function eliminarIncidencia(id){

    incidencias = incidencias.filter(i=>i.id!==id);

    guardarIncidenciasStorage();

}
export function marcarComoResuelta(id){

    const incidencia = incidencias.find(i => i.id === id);

    if(!incidencia){
        return;
    }

    incidencia.estado = "resuelta";

    guardarIncidenciasStorage();

}
export async function cargarIncidenciasIniciales(){

    if(localStorage.getItem(STORAGE_KEY)){
        return;
    }

    const respuesta = await fetch("assets/data/incidencias.json");

    incidencias = await respuesta.json();

    guardarIncidenciasStorage();

}
