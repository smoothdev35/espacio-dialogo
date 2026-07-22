import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = { ...ctx.query, populate: '*' }

    const sanitizedQuery = await this.sanitizeQuery(ctx)

    const entries = await strapi
      .documents('api::blog-post.blog-post')
      .findMany({ ...sanitizedQuery })

    return { data: entries }
  },
}))
