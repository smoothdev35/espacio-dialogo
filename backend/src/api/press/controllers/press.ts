import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::press.press',
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        sort: ctx.query.sort ?? 'publicationDate:desc',
        populate: {
          media: { populate: '*' },
          videoPoster: { populate: '*' },
        },
      }

      const sanitizedQuery = await this.sanitizeQuery(ctx)

      const entries = await strapi
        .documents('api::press.press')
        .findMany({ ...sanitizedQuery })

      return { data: entries }
    },

    async findOne(ctx) {
      const sanitizedQuery = await this.sanitizeQuery(ctx)

      const entry = await strapi.documents('api::press.press').findOne({
        documentId: ctx.params.id,
        ...sanitizedQuery,
        populate: {
          media: { populate: '*' },
          videoPoster: { populate: '*' },
        },
      })

      return { data: entry }
    },
  }),
)
