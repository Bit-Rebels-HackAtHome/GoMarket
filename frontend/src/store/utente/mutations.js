import { LOGIN, LOGOUT, IMPOSTAZIONI } from './types';

import router from '../../router/routes';
const mutations = {
    [types.LOGIN]: (state, payload) => {
        state.utente = payload.utente;
        state.lat = payload.lat;
        state.long = payload.long;
        // state.importazioni = null;
    },

    [types.LOGOUT]: (state, _) => {
        state.utente = null;
        state.lat = null;
        state.long = null;
    },

    [types.REGISTRA]: (state, _) => {
        // TODO
    },
}
