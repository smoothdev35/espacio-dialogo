export default {
  routes: [
    {
      method: 'GET',
      path: '/categories',
      handler: 'category.find',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/categories/:documentId',
      handler: 'category.findOne',
      config: { auth: false, policies: [] },
    },
    {
      method: 'POST',
      path: '/categories',
      handler: 'category.create',
      config: { auth: false, policies: [] },
    },
    {
      method: 'PUT',
      path: '/categories/:documentId',
      handler: 'category.update',
      config: { auth: false, policies: [] },
    },
    {
      method: 'DELETE',
      path: '/categories/:documentId',
      handler: 'category.delete',
      config: { auth: false, policies: [] },
    },
  ],
}
