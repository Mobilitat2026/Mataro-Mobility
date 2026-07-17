let modoAlta = false;

export function activarModoAlta(){

    modoAlta = true;

    document.body.style.cursor = "crosshair";

}

export function desactivarModoAlta(){

    modoAlta = false;

    document.body.style.cursor = "default";

}

export function estaModoAlta(){

    return modoAlta;

}