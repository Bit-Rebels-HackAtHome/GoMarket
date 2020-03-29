<template>
  <q-page class="column flex-center justify-evenly">
    <div class="column col-6 flex-center">
      <q-btn @click="showDialog=!!timer" round color="red" size="xl" icon="timer" />
      <q-chip square>Prossima coda: {{timer || 'nessuna coda'}}</q-chip>
    </div>

    <div class="column col-6 flex-center">
      <q-btn round color="primary" size="xl" icon="gps_fixed" @click="$router.push('/registrati')" />
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

    <q-dialog v-model="showDialog" >
      <div class="row flex-center q-pa-sm" style="background-color:white">
        <div square class="q-pa-sm col-11">Supermercato: {{supermercato.nome}}</div>
        <div square class="q-pa-sm col-11">Indirizzo: {{supermercato.indirizzo}}</div>
        <div square class="q-pa-sm col-11">Ora: {{supermercato.ora}}:00</div>
        <q-btn square size="sm" class="q-pa-sm col-3" color="red-10">Cancella</q-btn>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { EventBus } from "./eventBus.js";
export default {
  name: "paginaIniziale",
  data() {
    return {
      showDialog:false,
      timer: false,
      code: [],
      supermercato : {
        nome:'',
        indirizzo:'',
        ora:''
      },
    };
  },
  mounted() {
    EventBus.$on("nuovaCoda",(mk)=>{
      this.code.push(mk);
    });
  },
  watch:{
    code(){
      if (!this.code.length){
        this.timer = false;
      }
      let min = 24;
      this.code.forEach((elt,ind)=>{
        if(elt.ora<min){
          min = ind;
        }
      });
      this.supermercato.nome = this.code[min].nome;
      this.supermercato.indirizzo = this.code[min].indirizzo;
      this.supermercato.ora = this.code[min].ora;
      this.timer = this.code[min].h;
    }
  }
};
</script>