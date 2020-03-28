import Vue from 'vue'
import Vuex from 'vuex'

import utente from './utente';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      utente
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./utente'], () => {
      const newUtente = require('./utente').default
      Store.hotUpdate({ modules: { utente: newUtente } })
    })
  }
  return Store
}
