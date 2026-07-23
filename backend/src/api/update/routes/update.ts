import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::update.update', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
})
