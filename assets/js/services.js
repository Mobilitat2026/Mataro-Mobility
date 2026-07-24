import {
    exportarCSV,
    exportarKML
} from "./export.js";
// services.js

let servicesData = [];


/**
 * Carga los servicios desde JSON
 */
export async function initServices(){

    const response =
        await fetch(
            "assets/data/services.json"
        );


    const data =
        await response.json();


servicesData = [

    {
        name: "Mobilitat",
        services: data.services
    },


    {
        name: "Herramientas",
        services: [

            {
                id: "export-csv",
                name: "Exportar CSV",
                icon: "download"
            },


            {
                id: "export-kml",
                name: "Google My Maps",
                icon: "globe"
            }

        ]
    }

];


    renderServices(data.services);

}



/**
 * Genera el panel lateral
 */
function renderServices(services){


    const container =
        document.querySelector(
            "#services-content"
        );


    if(!container) return;



    container.innerHTML = "";



    servicesData.forEach(category => {


        const section =
            document.createElement(
                "section"
            );


        section.className =
            "service-category";



        section.innerHTML = `

            <h3>
                ${category.name}
            </h3>


            <div class="service-list">

            ${
                category.services
                .map(service => `

                    <button
                        class="service-item"
                        data-service="${service.id}"
                    >

                        <i data-lucide="${service.icon || "map-pin"}"></i>

                        <span>
                            ${service.name}
                        </span>

                    </button>

                `)
                .join("")
            }

            </div>

        `;


        container.appendChild(section);


    });



    lucide.createIcons();



    activarServicios(services);

}



/**
 * Activa los botones
 */
function activarServicios(services){


    document
    .querySelectorAll(".service-item")
    .forEach(button => {


        button.addEventListener(
            "click",
            () => {


                const id =
                    button.dataset.service;


                const servicio =
                    services.find(
                        s => s.id === id
                    );
                if(id === "export-csv"){

                   exportarCSV();

                return;

                }


                if(id === "export-kml"){

                    exportarKML();

                 return;

        }

                abrirMapaServicio(servicio);


            }
        );


    });

}



/**
 * Muestra el mapa Google
 */
function abrirMapaServicio(servicio){

    // Ocultar el mapa Leaflet
    document
        .querySelector("#map")
        .style.display = "none";

    // Mostrar el visor
    document
        .querySelector("#map-viewer")
        .classList
        .remove("hidden");

    // Cargar Google My Maps
    document
        .querySelector("#google-map-frame")
        .src = servicio.mapUrl;

    // En móviles cerrar automáticamente el panel
    if (window.innerWidth <= 768) {

        document
            .querySelector("#services-panel")
            .classList
            .remove("open");

    }

}