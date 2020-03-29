import axios from 'axios';
import router from '../../router';
import querystring from 'querystring';

const axios_config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
export function registra({ _, dispatch }, form) {
    console.log(form.email);
    console.log(form.password);

    let payload = new FormData();
    payload.set("email", form.email);
    payload.set("password", form.password);
    payload.set("conf_password", form.password_ripetuta);

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
    console.log("Tentando il login...");

    //let payload = new FormData();
    const payload = querystring.stringify({ 'email': form.email, 'password': form.password });
    console.log(payload);
    //payload.set("email", form.email);
    //payload.set("password", form.password);


    axios.post("https://russelpopi.synology.me/api/utente/entra.php", payload, axios_config)
        .then(response => {
            // TODO: setAxiosHeader(response.data.token)
            commit("Login", {
                utente: form.email,
                impostazioni: null,
            });
            console.log("Utente loggato correttamente");
            router.push("/");

        }).catch(response => {
            console.error("Impossibile fare login: ", response);
        });
}
