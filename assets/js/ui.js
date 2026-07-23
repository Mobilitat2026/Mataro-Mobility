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

    document
        .querySelector("#services-panel")
        .classList
        .remove("open");

    document
        .querySelector("#map-viewer")
        .classList
        .add("hidden");

    document
        .querySelector("#map")
        .style.display = "block";

    document
        .querySelector("#google-map-frame")
        .src = "";

}