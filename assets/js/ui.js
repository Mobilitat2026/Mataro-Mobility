import {
    volverMapaInicio,
    obtenerUbicacionUsuario
} from "./maps.js";


export function initUI(){


    document
    .querySelectorAll(
        ".bottom-nav button"
    )
    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                const action =
                    button.dataset.action;



                switch(action){


                    case "services":

                        openServices();

                        break;


                    case "home":

                        volverMapaInicio();

                        break;

                    case "location":

                        console.log("BOTON UBICACION PULSADO");

                        obtenerUbicacionUsuario();

                        break;
                    

                }


            }

        );


    });



    document
    .querySelector(
        "#close-services"
    )
    .addEventListener(

        "click",

        closeServices

    );


}



export function openServices(){


    document
    .querySelector(
        "#services-panel"
    )
    .classList
    .add(
        "open"
    );


}



export function closeServices(){


    document
    .querySelector(
        "#services-panel"
    )
    .classList
    .remove(
        "open"
    );


    volverMapaInicio();


}