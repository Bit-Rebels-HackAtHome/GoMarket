import axios from 'axios';
import router from '../../router';

export function registra({ commit, dispatch }, form) {
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
            console.log(response),

                dipatch("user/entra", form);
            //commit("Registra", { form });
            // TODO: setAxiosHeader(response.data.token)
        }).catch(reason => { console.error(reason); });
}

export function entra({ commit }, form) {
    console.log("Tentando il login...");
    axios.post("/api/utente/entra.php", {
        email: form.email,
        password: form.password
    })
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
