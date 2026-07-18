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
    {
      method: 'POST',
      path: '/tags',
      handler: 'tag.create',
      config: { auth: false, policies: [] },
    },
    {
      method: 'PUT',
      path: '/tags/:documentId',
      handler: 'tag.update',
      config: { auth: false, policies: [] },
    },
    {
      method: 'DELETE',
      path: '/tags/:documentId',
      handler: 'tag.delete',
      config: { auth: false, policies: [] },
    },
  ],
}
