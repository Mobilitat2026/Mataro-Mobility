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
        }
    ];


    renderServices();

}



/**
 * Genera el panel lateral
 */
function renderServices(){


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

}