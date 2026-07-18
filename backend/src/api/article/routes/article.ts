export default {
  routes: [
    {
      method: 'GET',
      path: '/articles',
      handler: 'article.find',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/articles/:documentId',
      handler: 'article.findOne',
      config: { auth: false, policies: [] },
    },
    {
      method: 'POST',
      path: '/articles',
      handler: 'article.create',
      config: { auth: false, policies: [] },
    },
    {
      method: 'PUT',
      path: '/articles/:documentId',
      handler: 'article.update',
      config: { auth: false, policies: [] },
    },
    {
      method: 'DELETE',
      path: '/articles/:documentId',
      handler: 'article.delete',
      config: { auth: false, policies: [] },
    },
  ],
}
