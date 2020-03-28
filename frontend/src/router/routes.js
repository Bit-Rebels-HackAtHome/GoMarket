
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'paginaIniziale', component: () => import('pages/paginaIniziale.vue') },
      { path: 'registrati', component: () => import('pages/Registra.vue') },
      { path: 'entra', component: () => import('pages/Entra.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
