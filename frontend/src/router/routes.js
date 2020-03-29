
const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutPaginaIniziale.vue'),
    children: [
      { path: '', component: () => import('pages/paginaIniziale.vue') },
      { path: '/registrati', component: () => import('pages/Registra.vue') },
      { path: '/entra', component: () => import('pages/Entra.vue') },
      { path: '/coda', component: () => import('pages/Coda.vue')},
      { path: '/impostazioni', component: () => import('pages/impostazioni.vue')}
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
