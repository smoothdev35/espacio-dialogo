export default {
  routes: [
    {
      method: 'GET',
      path: '/authors',
      handler: 'author.find',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/authors/:documentId',
      handler: 'author.findOne',
      config: { auth: false, policies: [] },
    },
  ],
}
