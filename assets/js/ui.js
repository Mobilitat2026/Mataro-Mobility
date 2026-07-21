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



                if(action==="services"){

                    openServices();

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

    // Cerrar el panel lateral
    document
        .querySelector("#services-panel")
        .classList
        .remove("open");

    // Ocultar el visor Google Maps
    document
        .querySelector("#map-viewer")
        .classList
        .add("hidden");

    // Volver al mapa Leaflet
    document
        .querySelector("#map")
        .style.display = "block";

    // Limpiar el iframe
    document
        .querySelector("#google-map-frame")
        .src = "";

    // Mostrar la barra inferior
    document
        .querySelector(".bottom-nav")
        .style.display = "flex";

}