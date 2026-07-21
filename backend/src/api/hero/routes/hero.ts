export default {
  routes: [
    {
      method: 'GET',
      path: '/heroes',
      handler: 'hero.find',
      config: { auth: false, policies: [] },
    },
  ],
}
