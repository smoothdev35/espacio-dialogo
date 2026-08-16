import { seed } from './seed'

const NETLIFY_DEBOUNCE_MS = 10_000

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    if (process.env.SEED_ON_BOOT === 'true') {
      await seed({ strapi })
    }

    const buildHook = process.env.NETLIFY_BUILD_HOOK
    if (!buildHook) {
      strapi.log.warn('[netlify] NETLIFY_BUILD_HOOK unset — rebuilds disabled')
      return
    }

    const uids = Object.keys(strapi.contentTypes).filter((uid: string) =>
      uid.startsWith('api::'),
    )

    let timer: ReturnType<typeof setTimeout> | undefined
    const triggerRebuild = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(async () => {
        try {
          const res = await fetch(buildHook, { method: 'POST' })
          if (res.ok) {
            strapi.log.info('[netlify] rebuild triggered')
          } else {
            strapi.log.error(`[netlify] build hook failed: ${res.status}`)
          }
        } catch (err) {
          strapi.log.error('[netlify] build hook request error', err)
        }
      }, NETLIFY_DEBOUNCE_MS)
    }

    const isPublished = (result: any) => result?.publishedAt != null

    strapi.db.lifecycles.subscribe({
      models: uids,
      afterCreate(event: any) {
        if (isPublished(event.result)) triggerRebuild()
      },
      afterUpdate(event: any) {
        if (isPublished(event.result)) triggerRebuild()
      },
      afterDelete(event: any) {
        if (isPublished(event.result)) triggerRebuild()
      },
    })
  },
}
