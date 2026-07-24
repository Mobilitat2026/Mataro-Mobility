import { getIncidencias } from "./incidents.js";


// ==========================================================
// EXPORTAR INCIDENCIAS CSV
// ==========================================================

export function exportarCSV(){


    const incidencias = getIncidencias();


    if(!incidencias.length){

        alert(
            "No hay incidencias para exportar"
        );

        return;

    }



    let csv =

        "ID,Tipo,Titulo,Descripcion,Latitud,Longitud,Fecha,Estado\n";



    incidencias.forEach(i=>{


        csv +=

        `${i.id},` +
        `${i.tipo || ""},` +
        `"${i.titulo || ""}",` +
        `"${i.descripcion || ""}",` +
        `${i.lat || ""},` +
        `${i.lng || ""},` +
        `${i.fecha || ""},` +
        `${i.estado || ""}\n`;


    });



    descargarArchivo(

        csv,

        "mataro-incidencias.csv",

        "text/csv"

    );


}



// ==========================================================
// EXPORTAR KML PARA GOOGLE MY MAPS
// ==========================================================

export function exportarKML(){


    const incidencias = getIncidencias();


    if(!incidencias.length){

        alert(
            "No hay incidencias para exportar"
        );

        return;

    }



    let kml =

`<?xml version="1.0" encoding="UTF-8"?>

<kml xmlns="http://www.opengis.net/kml/2.2">

<Document>

`;



    incidencias.forEach(i=>{


        kml +=

`
<Placemark>

<name>
${i.titulo || i.tipo}
</name>

<description>

Tipo: ${i.tipo}

${i.descripcion || ""}

Estado: ${i.estado || "pendiente"}

Fecha: ${i.fecha || ""}

</description>

<Point>

<coordinates>
${i.lng},${i.lat},0
</coordinates>

</Point>

</Placemark>

`;



    });



    kml +=

`
</Document>

</kml>
`;



    descargarArchivo(

        kml,

        "mataro-incidencias.kml",

        "application/vnd.google-earth.kml+xml"

    );


}



// ==========================================================
// DESCARGA ARCHIVOS
// ==========================================================

function descargarArchivo(

    contenido,

    nombre,

    tipo

){


    const blob =

        new Blob(

            [
                contenido
            ],

            {
                type: tipo
            }

        );



    const url =

        URL.createObjectURL(blob);



    const enlace =

        document.createElement("a");



    enlace.href = url;

    enlace.download = nombre;


    document.body.appendChild(enlace);

    enlace.click();


    document.body.removeChild(enlace);


    URL.revokeObjectURL(url);


}