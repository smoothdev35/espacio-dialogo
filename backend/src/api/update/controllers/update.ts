import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::update.update',
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        sort: ctx.query.sort ?? 'publishedAt:desc',
        populate: {
          featuredImage: { populate: '*' },
          author: { populate: { avatar: { populate: '*' } } },
          category: { populate: '*' },
          tags: { populate: '*' },
        },
      }

      const sanitizedQuery = await this.sanitizeQuery(ctx)

      const entries = await strapi
        .documents('api::update.update')
        .findMany({ ...sanitizedQuery })

      return { data: entries }
    },
  }),
)
