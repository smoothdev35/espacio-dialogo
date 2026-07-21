import { seed } from './seed'

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    if (process.env.SEED_ON_BOOT === 'true') {
      await seed({ strapi })
    }
  },
}
