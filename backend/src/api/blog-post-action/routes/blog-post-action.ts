export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-post-actions',
      handler: 'blog-post-action.find',
      config: { auth: false, policies: [] },
    },
  ],
}
