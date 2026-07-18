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
    {
      method: 'POST',
      path: '/authors',
      handler: 'author.create',
      config: { auth: false, policies: [] },
    },
    {
      method: 'PUT',
      path: '/authors/:documentId',
      handler: 'author.update',
      config: { auth: false, policies: [] },
    },
    {
      method: 'DELETE',
      path: '/authors/:documentId',
      handler: 'author.delete',
      config: { auth: false, policies: [] },
    },
  ],
}
