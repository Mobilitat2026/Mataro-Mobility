export function initStorage(){


    const saved =
        localStorage.getItem(
            "favorites"
        );


    AppState.favorites =
        saved
        ? JSON.parse(saved)
        : [];


}