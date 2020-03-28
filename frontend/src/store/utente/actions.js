import axios from 'axios';

export function registra({ commit }, form) {
    axios.post("https://2.229.191.232/api/utente/registra.php", form)
        .then(response => {
            console.log("Utente registrato correttamente");
            //commit("Registra", { form });
            // TODO: setAxiosHeader(response.data.token)
        });
}

export function entra({ commit }, form) {
    axios.post("https://2.229.191.232/api/utente/entra.php", form)
        .then(response => {
            // TODO: setAxiosHeader(response.data.token)
            commit("Login", {
                utente: form.utente,
                lat: form.lat_residenza,
                long: form.long_residenza,
                session_token: null
            });
            console.log("Utente registrato correttamente");
        }).catch(response => {
            console.error("Impossibile creare un nuovo utente: ", response);
        });
}
