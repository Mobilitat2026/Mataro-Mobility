export async function loadServices() {

    const response = await fetch("assets/data/services.json");

    console.log(response.status);

    const data = await response.json();

    console.log(data);

    return data.services;
}