<template>
  <q-page class="column flex-center justify-evenly">
        
    <div class="column col-6 flex-center">
        <q-btn 
        round
        color="red" 
        size="xl" 
        icon="timer" />
        <q-chip 
        square>
        Attesa
        </q-chip>
    </div>

    <div class="column col-6 flex-center">
        <q-btn 
        round
        color="primary" 
        size="xl" 
        icon="gps_fixed" 
        @click="$router.push('/registrati')"/>
        <q-chip 
        square>
        Registrati ad una coda
        </q-chip>
    </div>
    
    <div class="column flex-center">

        <q-btn 
        round 
        color="secondary" 
        size="xl" 
        icon="settings" 
        @click="$router.push('/impostazioni')"/>
        <q-chip 
        square>
        Impostazioni
        </q-chip>
        
    </div>
  </q-page>
</template>

<script>
export default {
  name: "paginaIniziale",
};
</script>