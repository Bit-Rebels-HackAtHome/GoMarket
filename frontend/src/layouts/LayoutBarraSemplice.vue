<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated>

      <q-toolbar>

        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          @click="$router.go(-1)"          
        />

        <q-toolbar-title>
          GoMarket 
        <q-icon name="local_grocery_store"/>
        </q-toolbar-title>

      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'LayoutBarraSemplice',
}
</script>
