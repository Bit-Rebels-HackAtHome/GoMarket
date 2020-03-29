<template>
  <q-page class="column flex-center justify-evenly">
    <div class="column col-6 flex-center">
      <q-btn @click="showDialog=!!timer" round color="red" size="xl" icon="timer" />
      <q-chip square>Prossima coda: {{timer || 'nessuna coda'}}</q-chip>
    </div>

    <div class="column col-6 flex-center">
      <q-btn
        round
        color="primary"
        size="xl"
        icon="gps_fixed"
        @click="$router.push('/registra-coda')"
      />
      <q-chip square>Registrati ad una coda</q-chip>
    </div>

    <div class="column flex-center">
      <q-btn
        round
        color="secondary"
        size="xl"
        icon="settings"
        @click="$router.push('/impostazioni')"
      />
      <q-chip square>Impostazioni</q-chip>
    </div>

    <q-dialog v-model="showDialog">
      <div class="row flex-center q-pa-sm" style="background-color:white">
        <div square class="q-pa-sm col-11">Supermercato: {{supermercato.nome}}</div>
        <div square class="q-pa-sm col-11">Indirizzo: {{supermercato.indirizzo}}</div>
        <div square class="q-pa-sm col-11">Ora: {{supermercato.ora}}:00</div>
        <q-btn square size="sm" class="q-pa-sm col-3" color="red-10" @click="sprenota">Cancella</q-btn>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { EventBus } from "./eventBus.js";
import querystring from "querystring";

export default {
  name: "PaginaInizialeAutenticata",
  data() {
    return {
      showDialog: false,
      timer: false,
      code: [],
      supermercato: {
        nome: "",
        indirizzo: "",
        ora: "",
        id: ""
      },
      index: 0
    };
  },
  mounted() {
    EventBus.$on("nuovaCoda", mk => {
      this.code.push(mk);
      this.refresh();
    });
  },
  methods: {
    refresh() {
      console.log("Qui");
      if (!this.code.length) {
        this.timer = false;
      }
      let min = 0;
      let minTime = 24;
      this.code.forEach((elt, ind) => {
        console.log(`elt: `, elt);
        if (elt.ora < minTime) {
          minTime = elt.ora;
          min = ind;
        }
      });
      this.supermercato.nome = this.code[min].nome;
      this.supermercato.indirizzo = this.code[min].indirizzo;
      this.supermercato.ora = this.code[min].ora;
      this.timer = this.supermercato.ora;

      this.index = min;
    },
    sprenota() {
      const axios_config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        withCredentials: true
      };

      const query = querystring.stringify({
        idSuper: this.supermercato.id,
        orario: this.supermercato.h
      });

      this.$axios
        .post(
          "https://russelpopi.synology.me//api/supermercati/sprenota.php",
          query,
          axios_config
        )
        .then(response => {
          this.code.pop(this.index);
          this.refresh();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>