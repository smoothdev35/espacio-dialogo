export default {
  routes: [
    {
      method: 'GET',
      path: '/tags',
      handler: 'tag.find',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/tags/:documentId',
      handler: 'tag.findOne',
      config: { auth: false, policies: [] },
    },
  ],
}
