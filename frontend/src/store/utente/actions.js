import axios from 'axios';
import router from '../../router';
import querystring from 'querystring';

const axios_config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
}

export function registra({ _, dispatch }, form) {
    const payload = querystring.stringify({ 'email': form.email, 'password': form.password, 'conf_password': form.conf_password });

    axios.post("https://russelpopi.synology.me/api/utente/registra.php", payload)
        .then(response => {
            console.log("Utente registrato correttamente");
            console.log(response);

            dispatch("user/entra", form);
            //commit("Registra", { form });
            // TODO: setAxiosHeader(response.data.token)
        }).catch(reason => { console.error(reason); });
}

export function entra({ commit }, form) {

    const payload = querystring.stringify({ 'email': form.email, 'password': form.password });

    axios.post("https://russelpopi.synology.me/api/utente/entra.php", payload, axios_config)
        .then(response => {
            // TODO: setAxiosHeader(response.data.token)
            commit("Login", {
                utente: form.email,
                impostazioni: null,
            });
            console.log("Utente loggato correttamente");
        }).catch(response => {
            console.error("Impossibile fare login: ", response);

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
