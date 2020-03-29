<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn
          v-show="$route.path == '/'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        
        <q-btn
          v-show="$route.path != '/' && $route.path != '/entra'"
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

    <q-drawer
      v-model="leftDrawerOpen"
      v-show="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      
    <transition name="fade" appear mode="out-in">
      <keep-alive>
       <router-view :key="$route.fullPath"/>
      </keep-alive>
    </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'LayoutPaginaIniziale',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'About us',
          caption: 'aboutGoMarket.it',
          icon: 'group',
          link: 'https://aboutGoMarket.it'
        },
      ]
    }
  }
}
</script>


<style>

.fade-enter,.fade-leave-to{
  transition: opacity .15s ease;
  opacity:0;
}
.fade-enter-to,.fade-leave{
  opacity:1;
}

</style>