import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::blog-post.blog-post',
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        sort: ctx.query.sort ?? 'publishedAt:desc',
        populate: {
          featuredImage: { populate: '*' },
          author: { populate: { avatar: { populate: '*' } } },
          tags: { populate: '*' },
        },
      }

      const sanitizedQuery = await this.sanitizeQuery(ctx)

      const entries = await strapi
        .documents('api::blog-post.blog-post')
        .findMany({ ...sanitizedQuery })

      return { data: entries }
    },

    async findOne(ctx) {
      const sanitizedQuery = await this.sanitizeQuery(ctx)

      const entry = await strapi.documents('api::blog-post.blog-post').findOne({
        documentId: ctx.params.id,
        ...sanitizedQuery,
        populate: {
          featuredImage: { fields: ['url', 'alternativeText'] },
          tags: { fields: ['name', 'slug'] },
          author: {
            populate: {
              avatar: { fields: ['url', 'alternativeText'] },
            },
            fields: ['name', 'slug', 'bio'],
          },
        },
      })

      return { data: entry }
    },
  }),
)
