import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = { ...ctx.query, populate: '*' }

    const sanitizedQuery = await this.sanitizeQuery(ctx)

    const entries = await strapi
      .documents('api::article.article')
      .findMany({ ...sanitizedQuery })

    return { data: entries }
  },
}))
