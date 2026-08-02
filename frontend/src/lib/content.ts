/**
 * content
 *
 * Centralized Mexican Spanish (es-MX) UI strings.
 * Imports by domain — grab only what you need.
 *
 * Usage:
 *   import { NAV, FOOTER, HERO } from '@/lib/content'
 */

export const NAV = {
  home: 'Inicio',
  blog: 'Blog',
  contact: 'Contacto',
  subscribe: 'Suscríbete',
  donate: 'Donar',
  about: 'Acerca de',
} as const

export const FOOTER = {
  aboutNavLabel: 'Navegación del pie — Acerca de',
  contentNavLabel: 'Navegación del pie — Contenido',
  ourMission: 'Nuestra misión',
  blog: 'Blog',
  donate: 'Donar',
  statements: 'Comunicados',
  updates: 'Actualizaciones',
  analysis: 'Análisis',
  news: 'Noticias',
  socialAriaLabel: 'Síguenos en redes sociales',
  legalNotice: 'Aviso legal',
  copyright: (year: number | string) =>
    `© ${year} Espacio Diálogo. Todos los derechos reservados.`,
} as const

export const FOOTER_CONTACT = {
  heading: '¿Tienes alguna pregunta?',
  subtitle: '¡Contáctanos!',
  sendEmail: 'Enviar correo',
  copyEmail: 'Copiar correo',
  copied: '¡Copiado!',
  copyFailed: '¡Error!',
  copiedAnnounce: 'Correo copiado',
  copyFailedAnnounce: 'Error al copiar. Intenta de nuevo.',
} as const

export const HERO = {
  fallbackTitle: 'La democracia echa raíces en Nicaragua',
  fallbackSubtitle:
    'Creemos en el poder de la gente común para construir algo mejor. Este colectivo existe para documentar, apoyar y amplificar las voces que trabajan por una Nicaragua libre y democrática.',
  learnMore: 'Conoce más',
  donate: 'Donar',
} as const

export const CTA_HOME = {
  heading: 'Apoya el futuro de Nicaragua',
  description:
    'Tu apoyo nos ayuda a documentar, amplificar e impulsar la transición democrática. Únete a este esfuerzo.',
  donate: 'Donar',
  contact: 'Contacto',
} as const

export const UPDATES = {
  tagline: 'Actualizaciones',
  heading: 'Lo que está pasando ahora',
  description:
    'Los últimos acontecimientos en la transición que vive Nicaragua.',
  filterAllLabel: 'Todas',
  filterAriaLabel: 'Filtrar por categoría',
  noFeatured: 'No hay actualización destacada disponible.',
  noCategoryMatch: 'No hay actualizaciones en esta categoría',
  noUpdates: 'Aún no hay actualizaciones publicadas.',
} as const

export const BLOG_SLIDER = {
  tagline: 'Blog',
  heading: 'Publicaciones destacadas',
  viewAll: 'Ver todos',
  prevPosts: 'Publicaciones anteriores',
  nextPosts: 'Siguientes publicaciones',
  noPosts: 'Aún no hay publicaciones en el blog.',
  goToPost: (i: number) => `Ir a la publicación ${i}`,
} as const

export const BLOG_HEADER = {
  backToBlog: 'Todas las publicaciones',
  copyLink: 'Copiar enlace',
  shareLinkedIn: 'Compartir en LinkedIn',
  shareX: 'Compartir en X',
  shareFacebook: 'Compartir en Facebook',
} as const

export const BLOG_LISTING = {
  tagline: 'Blog',
  heading: 'Blog',
  filterAllLabel: 'Todas',
  filterAriaLabel: 'Filtrar por etiqueta',
  searchPlaceholder: 'Buscar publicaciones...',
  noPosts: 'Aún no hay publicaciones en el blog.',
  noResults: 'No se encontraron publicaciones con ese criterio de búsqueda.',
} as const

export const BLOG_RELATED = {
  heading: 'Artículos relacionados',
} as const

export const UPDATE_HEADER = {
  home: 'Inicio',
  updates: 'Actualizaciones',
  shareDispatch: 'Compartir este despacho',
  copyLink: 'Copiar enlace',
  shareLinkedIn: 'Compartir en LinkedIn',
  shareX: 'Compartir en X',
  shareFacebook: 'Compartir en Facebook',
} as const

export const UPDATE_PAGINATION = {
  ariaLabel: 'Paginación de actualizaciones',
  prevPage: 'Página anterior',
  nextPage: 'Siguiente página',
} as const

export const TIMELINE = {
  tagline: 'Línea de tiempo',
  heading: 'El hilo de una nación en resistencia',
  description:
    'Recorre los momentos clave que han marcado la transición democrática. Haz clic en cualquier fecha para leer el despacho completo.',
} as const

export const PRESS = {
  heading: 'Espacio Diálogo en la prensa',
  description:
    'Cobertura mediática reciente sobre nuestras iniciativas y programas.',
  prevItems: 'Notas de prensa anteriores',
  nextItems: 'Siguientes notas de prensa',
  noItems: 'Aún no hay notas de prensa publicadas.',
  goToItem: (i: number) => `Ir a la nota de prensa ${i}`,
} as const

export const PAGINATION = {
  loadMore: 'Cargar más',
} as const

export const FILTER = {
  allLabel: 'Todos',
} as const

export const SEARCH = {
  placeholder: 'Buscar...',
} as const

export const READ_MORE = {
  label: 'Leer más',
} as const

export const NOT_FOUND = {
  title: 'Página no encontrada',
  heading: 'El camino hacia Nicaragua libre no es una línea recta.',
  body: 'El contenido que buscaste no existe en esta página.',
  backHome: 'Volver al inicio',
  goToBlog: 'Ir al blog',
} as const
