export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-posts',
      handler: 'blog-post.find',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/blog-posts/:documentId',
      handler: 'blog-post.findOne',
      config: { auth: false, policies: [] },
    },
    {
      method: 'POST',
      path: '/blog-posts',
      handler: 'blog-post.create',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/blog-posts/:documentId',
      handler: 'blog-post.update',
      config: { policies: [] },
    },
    {
      method: 'DELETE',
      path: '/blog-posts/:documentId',
      handler: 'blog-post.delete',
      config: { policies: [] },
    },
  ],
}
