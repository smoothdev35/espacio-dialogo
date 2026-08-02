export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-post-action',
      handler: 'blog-post-action.find',
      config: { auth: false, policies: [] },
    },
  ],
}
