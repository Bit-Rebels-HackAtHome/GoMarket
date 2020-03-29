
const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutPaginaIniziale.vue'),
    children: [
      { path: '', component: () => import('pages/PaginaIniziale.vue') },
      { path: '/coda/', component: () => import('pages/Coda.vue') },
      { path: '/registra-coda', component: () => import('pages/RegistraCoda') },

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
