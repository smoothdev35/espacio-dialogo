export const categories = [
  {
    slug: 'campaign',
    name: 'Campaña',
    description: 'Movilización social, activismos y luchas ciudadanas por la democracia y los derechos fundamentales en Nicaragua.',
  },
  {
    slug: 'news',
    name: 'Noticias',
    description: 'Información oportuna sobre los acontecimientos políticos, sociales y económicos que marcan la realidad nicaragüense.',
  },
  {
    slug: 'analysis',
    name: 'Análisis',
    description: 'Perspectivas profundas, contextualización histórica y lecturas expertas sobre la coyuntura nacional e internacional.',
  },
  {
    slug: 'voices',
    name: 'Voces',
    description: 'Testimonios en primera persona, crónicas y artículos de opinión que reflejan la diversidad de la experiencia nicaragüense.',
  },
]

export const tags = [
  'Derechos Humanos',
  'Economía',
  'Política Exterior',
  'Elecciones',
  'Protestas',
  'Corrupción',
  'Libertad de Prensa',
  'Sociedad Civil',
  'Reformas',
  'Opinión',
]

export const authors = [
  {
    name: 'Carlos Mendoza',
    slug: 'carlos-mendoza',
    bio: 'Editor general de Espacio Diálogo. Periodista con más de quince años de experiencia cubriendo política centroamericana. Excorresponsal en Managua para medios internacionales. Ha recibido el premio Rey de España de Periodismo Internacional en dos ocasiones.',
    avatarSeed: 'author-carlos-mendoza',
  },
  {
    name: 'María González',
    slug: 'maria-gonzalez',
    bio: 'Periodista de investigación especializada en derechos humanos y corrupción. Colaboradora de diversas organizaciones internacionales de defensa de la libertad de prensa. Autora del libro "Nicaragua: crónica de una democracia interrumpida".',
    avatarSeed: 'author-maria-gonzalez',
  },
]

function p(...paragraphs: string[]) {
  return paragraphs.map((text) => ({
    type: 'paragraph' as const,
    children: [{ type: 'text' as const, text }],
  }))
}

function h2(text: string) {
  return {
    type: 'heading' as const,
    level: 2 as const,
    children: [{ type: 'text' as const, text }],
  }
}

function h3(text: string) {
  return {
    type: 'heading' as const,
    level: 3 as const,
    children: [{ type: 'text' as const, text }],
  }
}

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[¿?¡!.,:;"]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '')
}

export interface ArticleSeed {
  categorySlug: string
  tagNames: string[]
  authorIndex: number
  title: string
  slug: string
  excerpt: string
  body: Record<string, any>[]
  imageSeed: string
}

export const articles: ArticleSeed[] = [
  {
    categorySlug: 'campaign',
    tagNames: ['Sociedad Civil', 'Protestas', 'Derechos Humanos'],
    authorIndex: 0,
    title: 'Sociedad civil se organiza por la restauración democrática',
    slug: 'sociedad-civil-se-organiza-por-la-restauracion-democratica',
    excerpt: 'Diversas organizaciones ciudadanas han retomado espacios de articulación para promover una agenda de reconciliación nacional y retorno al estado de derecho en Nicaragua.',
    body: [
      h2('Un nuevo capítulo en la lucha ciudadana'),
      ...p(
        'En las últimas semanas, un número creciente de organizaciones de la sociedad civil nicaragüense ha comenzado a coordinar esfuerzos en torno a una agenda común de restauración democrática. Esta convergencia, que reúne a colectivos de derechos humanos, gremios empresariales, asociaciones estudiantiles y grupos de mujeres, representa un intento por superar la fragmentación que ha caracterizado a la oposición en los últimos años.',
        'El movimiento, que aún no tiene un nombre oficial, ha establecido comisiones de trabajo en al menos seis departamentos del país. Su propuesta se articula en torno a tres ejes fundamentales: la liberación de presos políticos, el retorno al orden constitucional y la convocatoria a elecciones libres supervisadas internacionalmente.',
      ),
      h3('Estrategias de acción pacífica'),
      ...p(
        'A diferencia de ciclos anteriores de protesta, las organizaciones han priorizado acciones de no violencia activa: foros ciudadanos, campañas de información pública, acompañamiento internacional y uso estratégico de plataformas digitales para sortear la censura.',
        '"No se trata de confrontar por confrontar", explicó una de las lideresas entrevistadas. "Buscamos construir una propuesta de país que sea incluyente, que demuestre que hay una alternativa viable al autoritarismo".',
        'La iniciativa ha recibido el respaldo de varios organismos internacionales, aunque la comunidad diplomática en Managua se mantiene cautelosa ante la volatilidad del panorama político.',
      ),
      h3('Desafíos inmediatos'),
      ...p(
        'El principal obstáculo sigue siendo la ausencia de garantías para la protesta pacífica. En lo que va del año, al menos quince activistas han sido detenidos temporalmente durante manifestaciones, y varias organizaciones han visto suspendidos sus registros legales.',
        'Sin embargo, los organizadores confían en que la presión internacional combinada con una estrategia de movilización sostenida pueda generar las condiciones para un diálogo nacional genuino. Las próximas semanas serán cruciales para determinar si este nuevo esfuerzo de articulación logra consolidarse o se disuelve como intentos anteriores.',
      ),
    ],
    imageSeed: 'article-campana-1',
  },
  {
    categorySlug: 'campaign',
    tagNames: ['Protestas', 'Sociedad Civil', 'Opinión'],
    authorIndex: 1,
    title: 'Juventud nicaragüense alza la voz en nuevas jornadas pacíficas',
    slug: 'juventud-nicaraguense-alza-la-voz-en-nuevas-jornadas-pacificas',
    excerpt: 'Estudiantes universitarios y colectivos juveniles han protagonizado jornadas de concientización en las principales ciudades del país, exigiendo reformas democráticas y libertad de expresión.',
    body: [
      h2('La generación del relevo'),
      ...p(
        'Una nueva generación de jóvenes nicaragüenses está redefiniendo las formas de hacer política en el país. Lejos de los partidos tradicionales y las estructuras verticales, los colectivos juveniles han optado por una organización horizontal, descentralizada y profundamente arraigada en las comunidades locales.',
        'En universidades de Managua, León y Matagalpa, los estudiantes han organizado cátedras libres, cine foros y talleres de formación cívica que abordan desde la historia política del país hasta herramientas de incidencia ciudadana. Estas actividades, que evitan la confrontación directa con las autoridades, han logrado sortear la vigilancia gubernamental.',
      ),
      h3('Arte, cultura y resistencia'),
      ...p(
        '"No vamos a pedir permiso para pensar", afirma Lucía, una estudiante de sociología de 22 años que coordina un círculo de lectura en su universidad. "Nos han enseñado que el espacio público es prohibido, pero el espacio del conocimiento no nos lo pueden quitar".',
        'El movimiento juvenil ha incorporado el arte como herramienta central de su estrategia. Murales colectivos, presentaciones de poesía, conciertos de música alternativa y obras de teatro callejero han aparecido en barrios populares, llevando mensajes de esperanza y resistencia.',
        'Las redes sociales, aunque vigiladas y con cuentas bloqueadas frecuentemente, siguen siendo el principal canal de difusión. Los jóvenes han desarrollado una hábil estrategia de elusión tecnológica, utilizando aplicaciones cifradas y rotando cuentas para mantener la comunicación activa.',
      ),
      h3('Solidaridad internacional'),
      ...p(
        'Varias organizaciones internacionales de juventud han manifestado su solidaridad con el movimiento nicaragüense. Becas de estudio en el exilio, pasantías en organismos multilaterales y programas de intercambio virtual son algunas de las iniciativas que buscan apoyar a los jóvenes que han tenido que interrumpir su formación por razones políticas.',
        'La pregunta que queda en el aire es si esta efervescencia juvenil podrá traducirse en cambios estructurales duraderos o si, como ha ocurrido en el pasado, será sofocada por la combinación de cooptación, desgaste y represión selectiva.',
      ),
    ],
    imageSeed: 'article-campana-2',
  },
  {
    categorySlug: 'news',
    tagNames: ['Libertad de Prensa', 'Derechos Humanos'],
    authorIndex: 0,
    title: 'Régimen intensifica restricciones a medios independientes',
    slug: 'regimen-intensifica-restricciones-a-medios-independientes',
    excerpt: 'Nuevas disposiciones administrativas han forzado el cierre de dos medios digitales y la suspensión temporal de tres estaciones de radio en distintas regiones del país.',
    body: [
      h2('Cerco a la información'),
      ...p(
        'El gobierno nicaragüense ha endurecido su ofensiva contra los medios de comunicación independientes en lo que diversos analistas califican como la etapa más severa de censura desde 2018. En menos de un mes, dos medios digitales han sido obligados a cesar operaciones y tres emisoras de radio en el interior del país han sido suspendidas temporalmente.',
        'Las clausuras se han fundamentado en una controvertida interpretación de la Ley de Telecomunicaciones, que faculta al ente regulador a revocar concesiones por "incumplimiento de los fines informativos establecidos en la ley". Organismos de derechos humanos han denunciado que esta normativa se aplica de manera selectiva contra medios críticos.',
      ),
      h3('Estrategias de supervivencia'),
      ...p(
        'Frente a este panorama, los medios independientes han desarrollado diversas estrategias para mantenerse operativos. Algunos han migrado completamente al entorno digital, utilizando servidores en el extranjero y plataformas descentralizadas. Otros han optado por modelos de financiamiento colectivo que les permiten reducir su dependencia de la pauta publicitaria gubernamental.',
        '"Hemos aprendido a operar en condiciones de asedio permanente", comenta un editor de un medio recientemente clausurado que pidió mantener su nombre en reserva. "Sabíamos que esto podía pasar, por eso tenemos planes de contingencia. La información va a seguir circulando cueste lo que cueste".',
        'La Sociedad Interamericana de Prensa (SIP) ha emitido una declaración condenando las medidas y exigiendo al gobierno nicaragüense el cese inmediato de la persecución contra los medios independientes.',
      ),
      h3('Cobertura internacional restringida'),
      ...p(
        'Las restricciones también han afectado a corresponsales de medios internacionales. En las últimas semanas, al menos tres periodistas extranjeros han visto denegadas sus solicitudes de visa o han sido expulsados del país sin explicación oficial.',
        'Este aislamiento informativo preocupa especialmente a las organizaciones de derechos humanos, que ven en la falta de cobertura internacional un factor que facilita la impunidad. "Cuando el mundo no ve lo que está pasando, es más fácil que sigan ocurriendo violaciones", advirtió un relator especial de la ONU.',
      ),
    ],
    imageSeed: 'article-news-1',
  },
  {
    categorySlug: 'news',
    tagNames: ['Política Exterior', 'Derechos Humanos'],
    authorIndex: 1,
    title: 'Comunidad internacional condena nuevas detenciones arbitrarias',
    slug: 'comunidad-internacional-condena-nuevas-detenciones-arbitrarias',
    excerpt: 'Gobiernos de América Latina, Europa y Estados Unidos han emitido pronunciamientos conjuntos exigiendo la liberación inmediata de los detenidos y el respeto al debido proceso.',
    body: [
      h2('Reacción global ante la escalada represiva'),
      ...p(
        'La detención de al menos veintitrés personas, entre líderes opositores, defensores de derechos humanos y activistas estudiantiles, ha provocado una oleada de condenas internacionales sin precedentes en lo que va del año. Los gobiernos de Estados Unidos, la Unión Europea y varios países latinoamericanos han emitido pronunciamientos coordinados exigiendo la liberación inmediata de los detenidos.',
        'Las detenciones, ocurridas durante la madrugada del pasado jueves en operativos simultáneos en Managua, León y Estelí, han sido calificadas por organizaciones de derechos humanos como "una clara violación al debido proceso y a las garantías judiciales mínimas".',
      ),
      h3('Presión diplomática'),
      ...p(
        'El Consejo de Derechos Humanos de la ONU ha convocado a una sesión extraordinaria para tratar la situación nicaragüense, programada para las próximas dos semanas. Paralelamente, el Departamento de Estado de Estados Unidos ha anunciado la imposición de nuevas sanciones selectivas contra funcionarios del régimen señalados como responsables de las detenciones.',
        'En una declaración conjunta, los cancilleres de Argentina, Brasil, Chile, Colombia, México y Uruguay expresaron su "profunda preocupación" por el deterioro de las condiciones democráticas en Nicaragua e instaron al diálogo como única vía para superar la crisis.',
        'La Organización de Estados Americanos, por su parte, ha solicitado una reunión urgente de su Consejo Permanente para evaluar la aplicación de la Carta Democrática Interamericana.',
      ),
      h3('Posición del gobierno'),
      ...p(
        'El gobierno nicaragüense ha rechazado las condenas internacionales, calificándolas de "injerencias en asuntos internos". En un comunicado oficial, las autoridades afirmaron que las detenciones se realizaron "en estricto apego a la ley" y que los detenidos enfrentan cargos por "conspiración y atentado contra la seguridad del Estado".',
        'Analistas internacionales señalan que esta escalada represiva podría tener el efecto contrario al deseado por el régimen, al reactivar la atención global sobre Nicaragua y fortalecer los mecanismos de presión multilaterales que habían perdido momentum en los últimos meses.',
      ),
    ],
    imageSeed: 'article-news-2',
  },
  {
    categorySlug: 'analysis',
    tagNames: ['Economía', 'Política Exterior', 'Reformas'],
    authorIndex: 0,
    title: 'El impacto de las sanciones internacionales en la economía nicaragüense',
    slug: 'el-impacto-de-las-sanciones-internacionales-en-la-economia-nicaraguense',
    excerpt: 'Un análisis detallado de cómo las medidas restrictivas adoptadas por Estados Unidos y la Unión Europea están afectando los sectores clave de la economía nacional y las perspectivas a mediano plazo.',
    body: [
      h2('Sanciones: ¿arma de presión o castigo colectivo?'),
      ...p(
        'Desde 2018, Estados Unidos, la Unión Europea y otros países han impuesto progresivamente un régimen de sanciones selectivas contra funcionarios, empresas y sectores estratégicos de la economía nicaragüense. Seis años después, los efectos de estas medidas comienzan a ser mensurables, aunque su eficacia como herramienta de presión política sigue siendo objeto de intenso debate.',
        'Las sanciones han tenido un impacto significativo en sectores como la minería, la producción de café y la industria textil, que dependen en gran medida de los mercados internacionales. La salida de inversores extranjeros y las restricciones al acceso a financiamiento internacional han contribuido a una contracción económica que, según el FMI, podría prolongarse hasta 2028.',
      ),
      h3('El costo humano'),
      ...p(
        'El economista independiente Francisco Lacayo estima que las sanciones han reducido el PIB potencial de Nicaragua en aproximadamente un 3.5% acumulado desde 2019. "El problema no son las sanciones en sí mismas", explica Lacayo, "sino la ausencia de un Estado de derecho que permita canalizar la inversión hacia sectores productivos. Las sanciones agravan una crisis que es fundamentalmente institucional".',
        'Los sectores más afectados son aquellos que habían logrado insertarse en cadenas de valor globales, como la manufactura textil y la agroindustria. Se estima que más de quince mil empleos formales se han perdido directa o indirectamente como consecuencia de las restricciones comerciales.',
        'Organizaciones de la sociedad civil han expresado su preocupación por el impacto humanitario de las sanciones, señalando que aunque están diseñadas para ser selectivas, en la práctica afectan de manera desproporcionada a los sectores más vulnerables de la población.',
      ),
      h3('Perspectivas y escenarios'),
      ...p(
        'Analistas consultados coinciden en que el levantamiento de las sanciones está condicionado a avances verificables en materia democrática, algo que parece improbable en el corto plazo. Mientras tanto, la economía nicaragüense enfrenta el desafío de reinventar sus modelos productivos en un contexto de aislamiento internacional.',
        'Algunas voces abogan por una estrategia de "sanciones inteligentes" que combine presión política con incentivos para sectores productivos que demuestren buenas prácticas laborales y ambientales, como una vía para evitar que el costo de las sanciones recaiga exclusivamente sobre la población.',
      ),
    ],
    imageSeed: 'article-analysis-1',
  },
  {
    categorySlug: 'analysis',
    tagNames: ['Elecciones', 'Reformas', 'Opinión'],
    authorIndex: 1,
    title: '¿Hacia dónde va la oposición? Estrategias y desafíos del movimiento democrático',
    slug: 'hacia-donde-va-la-oposicion-estrategias-y-desafios-del-movimiento-democratico',
    excerpt: 'Un recorrido por las diferentes corrientes opositoras, sus visiones estratégicas encontradas y los obstáculos que enfrentan para construir una alternativa política creíble frente al régimen.',
    body: [
      h2('La oposición en la encrucijada'),
      ...p(
        'El movimiento democrático nicaragüense atraviesa una de las crisis internas más profundas desde el estallido social de 2018. Dividido entre quienes abogan por la participación electoral como única vía de cambio y quienes consideran que las condiciones para unos comicios libres simplemente no existen, el espectro opositor se encuentra en un punto de inflexión estratégico.',
        'Las diferencias no son meramente tácticas: reflejan concepciones radicalmente distintas sobre la naturaleza del régimen, las lecciones que deben extraerse de los fracasos pasados y el tipo de sociedad que se quiere construir. Esta diversidad, que en condiciones normales sería una fortaleza, se ha convertido en un factor de parálisis.',
      ),
      h3('La vía electoral'),
      ...p(
        'Un sector de la oposición, aglutinado en torno a algunas figuras históricas y organizaciones con presencia internacional, sostiene que la participación en los próximos comicios municipales y generales es indispensable. Argumentan que el abstencionismo solo legitima al régimen y que, a pesar de las trampas y la falta de garantías, es necesario mantener viva la opción electoral.',
        '"No podemos renunciar a la lucha democrática solo porque las condiciones no son ideales", afirma un dirigente de este sector. "Si abandonamos el terreno electoral, le estamos regalando al régimen la única legitimidad que le queda".',
        'Críticos dentro del mismo movimiento señalan que esta postura ignora las lecciones de 2021, cuando la participación electoral no impidió el fraude ni la consolidación del autoritarismo.',
      ),
      h3('La apuesta por la presión internacional'),
      ...p(
        'Otro sector ha concentrado sus esfuerzos en fortalecer los mecanismos de presión internacional, buscando que la comunidad internacional imponga costos crecientes al régimen hasta forzar una negociación. Esta estrategia ha logrado avances significativos en el plano diplomático, pero sus resultados concretos sobre el terreno son limitados.',
        '"Necesitamos ser realistas: el régimen no va a negociar mientras no sienta que su supervivencia está en juego", explica una analista política que prefirió no ser identificada. "La presión internacional es necesaria pero no suficiente. Hace falta una estrategia interna que complemente los esfuerzos externos".',
        'Las próximas elecciones municipales serán una prueba de fuego para ambas visiones. La decisión de participar o no, y en qué condiciones, probablemente definirá el rumbo del movimiento democrático durante los próximos años.',
      ),
    ],
    imageSeed: 'article-analysis-2',
  },
  {
    categorySlug: 'voices',
    tagNames: ['Derechos Humanos', 'Opinión'],
    authorIndex: 1,
    title: 'Testimonio de un exilio forzado: dejar Nicaragua para sobrevivir',
    slug: 'testimonio-de-un-exilio-forzado-dejar-nicaragua-para-sobrevivir',
    excerpt: 'En primera persona, la historia de un joven activista que tuvo que abandonar el país tras recibir amenazas directas contra su vida, y las dificultades de comenzar de cero en tierra extranjera.',
    body: [
      h2('La noche que cambió todo'),
      ...p(
        'Eran las tres de la mañana cuando escuché los golpes en la puerta. No eran policías, no eran militares. Eran los mismos que habían estado siguiéndome durante semanas, los mismos que aparecían y desaparecían en las esquinas de mi barrio. Esa noche entendí que ya no podía quedarme.',
        'No pretendo que mi historia sea excepcional. En los últimos años, más de cien mil nicaragüenses han salido del país no por voluntad propia, sino porque quedarse se había convertido en una sentencia de muerte. Algunos eran líderes comunitarios, otros periodistas, otros simplemente estudiantes que alzaron la voz en el momento equivocado.',
      ),
      h3('Comenzar de cero'),
      ...p(
        'Llegué a Costa Rica con lo puesto y el número de un contacto que me había dado un amigo. Los primeros meses fueron los más duros. Sin documentos, sin trabajo formal, sin red de apoyo. Dormir en albergues temporales, hacer colas interminables para trámites migratorios, explicar una y otra vez por qué había salido de Nicaragua.',
        'Pero también encontré solidaridad. Organizaciones de acogida, familias que abrieron las puertas de sus casas, otros exiliados que compartían sus experiencias y me ayudaban a navegar un sistema burocrático que no está diseñado para quienes huyen de la persecución política.',
        '"Aquí nadie te pregunta de dónde vienes", me dijo una señora en un comedor comunitario. "Todos estamos construyendo algo nuevo". Esa frase se convirtió en mi lema.',
      ),
      h3('El exilio no termina nunca'),
      ...p(
        'Han pasado dos años y medio. Tengo un trabajo, un cuarto propio, papeles temporales. Pero el exilio no es solo una condición jurídica, es un estado del alma. Cada noticia que llega de Nicaragua, cada detención de un amigo que se quedó, cada llamado de mi madre que termina en llanto, me recuerda que esto no es un viaje, sino una herida que no termina de cerrar.',
        'Escribo esto no para generar lástima, sino para que el mundo sepa que hay un país donde miles de personas tienen que elegir cada día entre su tierra y su vida. Nicaragua existe, resiste, y nosotros, los que nos fuimos, llevamos ese pedazo de tierra donde quiera que vamos.',
      ),
    ],
    imageSeed: 'article-voices-1',
  },
  {
    categorySlug: 'voices',
    tagNames: ['Sociedad Civil', 'Libertad de Prensa', 'Opinión'],
    authorIndex: 0,
    title: 'La resistencia cultural como herramienta de lucha ciudadana',
    slug: 'la-resistencia-cultural-como-herramienta-de-lucha-ciudadana',
    excerpt: 'Músicos, poetas y artistas visuales han encontrado en la creación cultural una forma de eludir la censura y mantener viva la memoria histórica y la esperanza de un país distinto.',
    body: [
      h2('Cuando la palabra se vuelve resistencia'),
      ...p(
        'En un país donde los canales tradicionales de expresión política han sido sistemáticamente cerrados, el arte y la cultura han emergido como espacios de resistencia que el régimen no ha logrado controlar del todo. Desde la poesía callejera hasta el muralismo comunitario, pasando por canciones que se viralizan en aplicaciones de mensajería cifrada, la creatividad nicaragüense ha encontrado formas de burlar la censura.',
        'No es casualidad. El régimen entiende que el control de los medios de comunicación y la represión directa no son suficientes si la gente sigue encontrando espacios para nombrar lo innombrable. Por eso ha intentado cooptar festivales, cerrar galerías independientes y perseguir a artistas. Pero la cultura, como la memoria, encuentra siempre resquicios por donde filtrarse.',
      ),
      h3('Los nuevos trovadores'),
      ...p(
        'En los barrios de Managua y en las comunidades del interior, han surgido colectivos musicales que fusionan ritmos tradicionales con letras de denuncia social. Sus canciones circulan en Telegram y WhatsApp, compartidas de teléfono a teléfono, en una suerte de radiografía sonora de la resistencia.',
        '"La música es lo último que te pueden quitar", dice un joven cantautor que se presenta bajo un seudónimo. "Pueden apagar radios, cerrar periódicos, bloquear redes sociales. Pero no pueden impedir que la gente cante en su casa, en su trabajo, en su comunidad".',
        'Estos artistas operan en un limbo legal, conscientes de que cualquier presentación pública puede ser interrumpida y cualquier letra puede ser utilizada como evidencia en su contra. Pero también saben que su trabajo es indispensable para mantener viva la memoria colectiva.',
      ),
      h3('Museos de la memoria'),
      ...p(
        'Paralelamente, iniciativas de memoria histórica han comenzado a documentar y preservar testimonios, fotografías y documentos de la crisis actual. Archivos digitales, exposiciones virtuales y publicaciones clandestinas buscan contrarrestar la narrativa oficial y garantizar que las futuras generaciones conozcan lo que está ocurriendo.',
        '"No sabemos cuándo terminará esto, pero sí sabemos que cuando termine, la verdad debe estar documentada", afirma una historiadora que coordina uno de estos archivos. "La cultura de la impunidad se alimenta del olvido. Nuestro trabajo es hacer que nadie pueda decir \'no sabíamos\'."',
      ),
    ],
    imageSeed: 'article-voices-2',
  },
]
