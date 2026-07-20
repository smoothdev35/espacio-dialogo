import { seed } from './seed'

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    await ensurePublicPermissions(strapi)

    if (process.env.SEED_ON_BOOT === 'true') {
      await seed({ strapi })
    }
  },
}

async function ensurePublicPermissions(strapi: any) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  })

  if (!publicRole) return

  const actions = [
    'api::article.article.find',
    'api::article.article.findOne',
    'api::category.category.find',
    'api::category.category.findOne',
    'api::author.author.find',
    'api::author.author.findOne',
    'api::tag.tag.find',
    'api::tag.tag.findOne',
  ]

  const existing = await strapi.db.query('plugin::users-permissions.permission').findMany({
    where: { role: publicRole.id },
    select: ['action'],
  })

  const existingActions = new Set(existing.map((p: { action: string }) => p.action))
  const missing = actions.filter((action) => !existingActions.has(action))

  if (missing.length === 0) return

  await strapi.db.query('plugin::users-permissions.permission').createMany({
    data: missing.map((action) => ({ action, role: publicRole.id })),
  })
}
