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



function openServices(){


    document
    .querySelector(
        "#services-panel"
    )
    .classList
    .add(
        "open"
    );


}



function closeServices(){


    document
    .querySelector(
        "#services-panel"
    )
    .classList
    .remove(
        "open"
    );


}