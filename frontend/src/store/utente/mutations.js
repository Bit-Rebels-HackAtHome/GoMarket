import router from '../../router/routes';

export const Login = (state, payload) => {
    state.utente = payload.utente;
    state.lat = payload.lat;
    state.long = payload.long;
    state.session_token = payload.session_token;
    // state.impostazioni = ...
}

export const Logout = (state, payload) => {
    state.utente = null;
    state.lat = null;
    state.long = null;
    state.impostazioni = null;
}