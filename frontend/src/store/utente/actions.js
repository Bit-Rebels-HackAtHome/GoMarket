import axios from 'axios';

export function registra({ commit }, form) {
    console.log(form.email);
    console.log(form.password);

    axios.post("/api/utente/registra.php",
        {
            email: form.email,
            password: form.password,
            conf_password: form.conf_password,
            lat_residenza: form.lat_residenza,
            long_residenza: form.long_residenza
        })
        .then(response => {
            console.log("Utente registrato correttamente");
            console.log(response);
            //commit("Registra", { form });
            // TODO: setAxiosHeader(response.data.token)
        }).catch(reason => { console.error(reason); });
}

export function entra({ commit }, form) {
    console.log("Tentando il login...");
    axios.post("/api/utente/entra.php", form)
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
