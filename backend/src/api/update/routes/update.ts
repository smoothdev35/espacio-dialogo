export default {
  routes: [
    {
      method: 'GET',
      path: '/updates',
      handler: 'update.find',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/updates/:documentId',
      handler: 'update.findOne',
      config: { auth: false, policies: [] },
    },
    {
      method: 'POST',
      path: '/updates',
      handler: 'update.create',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/updates/:documentId',
      handler: 'update.update',
      config: { policies: [] },
    },
    {
      method: 'DELETE',
      path: '/updates/:documentId',
      handler: 'update.delete',
      config: { policies: [] },
    },
  ],
}
