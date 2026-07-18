export default {
  register({ strapi }: { strapi: any }) {},

  async bootstrap({ strapi }: { strapi: any }) {
    const publicRole = await strapi.db.query(
      'plugin::users-permissions.role'
    ).findOne({
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

    for (const action of actions) {
      const existing = await strapi.db.query(
        'plugin::users-permissions.permission'
      ).findOne({
        where: { action, role: publicRole.id },
      })

      if (!existing) {
        await strapi.db.query(
          'plugin::users-permissions.permission'
        ).create({
          data: { action, role: publicRole.id },
        })
      }
    }
  },
}
