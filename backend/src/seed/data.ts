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

export interface UpdateSeed {
  categorySlug: string
  tagNames: string[]
  authorIndex: number
  title: string
  slug: string
  excerpt: string
  body: Record<string, any>[]
  imageSeed: string
}

export const updates: UpdateSeed[] = [
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
        '"No sabemos cuándo terminará esto, pero sí sabemos que cuando termine, la verdad debe estar documentada", afirma una historiadora que coordina uno de estos archivos. "La cultura de la impunidad se alimenta del olvido. Nuestro trabajo es hacer que nadie pueda decir \'no sabíamos\'".',
      ),
    ],
    imageSeed: 'article-voices-2',
  },
  {
    categorySlug: 'campaign',
    tagNames: ['Derechos Humanos', 'Sociedad Civil', 'Elecciones'],
    authorIndex: 0,
    title: 'Mujeres organizadas: el liderazgo femenino en la resistencia nicaragüense',
    slug: 'mujeres-organizadas-el-liderazgo-femenino-en-la-resistencia-nicaraguense',
    excerpt: 'Colectivos de mujeres han emergido como actores clave en la defensa de derechos humanos y la reconstrucción del tejido social en comunidades urbanas y rurales del país.',
    body: [
      h2('El rostro femenino de la resistencia'),
      ...p(
        'En los últimos años, las organizaciones de mujeres nicaragüenses han pasado de ser actores secundarios a protagonistas indiscutibles de la lucha por la democracia. Lideresas comunitarias, defensoras de derechos humanos y madres de presos políticos han tejido una red de solidaridad que trasciende fronteras partidarias y geográficas.',
        'Colectivos como la Red de Mujeres contra la Violencia y la Alianza de Mujeres Nicaragüenses han documentado más de mil casos de violencia política de género, un fenómeno que las organizaciones internacionales de derechos humanos apenas comienzan a visibilizar.',
      ),
      h3('Estrategias de autoprotección'),
      ...p(
        'Ante la creciente criminalización de su labor, las defensoras han desarrollado sofisticados protocolos de seguridad colectiva. Sistemas de alerta temprana, casas de acogida rotativas y redes de apoyo legal han permitido que muchas lideresas continúen su trabajo a pesar de las amenazas constantes.',
        '"Nos hemos organizado porque el Estado no nos protege. Al contrario: nos persigue", explica una coordinadora de una red de defensoras que pidió mantener su identidad reservada. "La solidaridad entre mujeres es nuestra única protección real".',
        'Estos mecanismos han demostrado ser efectivos: la tasa de desaparición forzada de defensoras ha disminuido significativamente en comunidades donde operan redes organizadas de autoprotección.',
      ),
      h3('Impacto en la agenda internacional'),
      ...p(
        'El trabajo de las organizaciones de mujeres nicaragüenses ha traspasado fronteras. Sus informes sobre violencia política de género han sido citados por la Comisión Interamericana de Derechos Humanos y han influido en la adopción de resoluciones específicas en el Parlamento Europeo.',
        'La red de defensoras ha logrado algo que parecía imposible: mantener el tema de Nicaragua en la agenda internacional a pesar de la fatiga informativa y la competencia de crisis globales. La clave ha sido la articulación constante con organizaciones feministas en América Latina y Europa.',
        'Sin embargo, las lideresas advierten que el costo personal de su activismo es cada vez más alto. Al menos doce defensoras han tenido que salir al exilio en los últimos dos años, y varias más enfrentan procesos judiciales por cargos que las organizaciones internacionales consideran fabricados.',
      ),
    ],
    imageSeed: 'article-campana-3',
  },
  {
    categorySlug: 'news',
    tagNames: ['Corrupción', 'Economía', 'Reformas'],
    authorIndex: 1,
    title: 'Nuevo escándalo de corrupción sacude a la administración pública',
    slug: 'nuevo-escandalo-de-corrupcion-sacude-a-la-administracion-publica',
    excerpt: 'Investigaciones periodísticas revelan un esquema de desvío de fondos públicos que involucra a altos funcionarios y empresas fantasma, con un monto estimado de 50 millones de dólares.',
    body: [
      h2('Los mecanismos del desvío'),
      ...p(
        'Una investigación conjunta de varios medios independientes ha destapado lo que podría ser el mayor escándalo de corrupción administrativa desde 2018. El esquema, que operaba a través de contratos de obra pública sobrevalorados y empresas fantasma registradas en paraísos fiscales, habría desviado al menos 50 millones de dólares de las arcas del Estado.',
        'Los documentos revelan un patrón sistemático: licitaciones amañadas, facturación por obras no ejecutadas y transferencias a cuentas offshore vinculadas a funcionarios de alto rango. El caso ha provocado reacciones encontradas: mientras el gobierno guarda silencio, organizaciones anticorrupción exigen una investigación independiente.',
      ),
      h3('Las empresas fantasma'),
      ...p(
        'El entramado societario incluye al menos quince empresas creadas entre 2020 y 2024, muchas de ellas registradas en Panamá y Belice. Estas empresas compartían direcciones fiscales, representantes legales y, en varios casos, los mismos beneficiarios finales.',
        'Una de las empresas, constituida apenas tres meses antes de recibir un contrato por 8 millones de dólares para la construcción de un hospital en la Costa Caribe, nunca había ejecutado obras de infraestructura. La investigación reveló que su capital social declarado era de apenas 500 dólares.',
        'Expertos en lavado de dinero consultados señalaron que el esquema presentaba todas las características del "crimen organizado con traje de corbata", utilizando estructuras corporativas para dar apariencia de legalidad a operaciones ilícitas.',
      ),
      h3('Reacciones y consecuencias'),
      ...p(
        'La publicación de la investigación ha generado una ola de reacciones. La Unión Europea ha expresado su preocupación y ha solicitado a la administración nicaragüense una explicación oficial. Organizaciones de la sociedad civil han convocado a movilizaciones pacíficas para exigir transparencia.',
        'El gobierno, por su parte, ha calificado la investigación de "campaña de desprestigio orquestada desde el exterior" y ha anunciado que iniciará acciones legales contra los medios que publicaron la información. Mientras tanto, los fondos desviados equivalen al presupuesto anual de salud de dos departamentos del país.',
      ),
    ],
    imageSeed: 'article-news-3',
  },
  {
    categorySlug: 'analysis',
    tagNames: ['Política Exterior', 'Economía', 'Elecciones'],
    authorIndex: 0,
    title: 'El tablero geopolítico de Centroamérica: Nicaragua en el nuevo orden regional',
    slug: 'el-tablero-geopolitico-de-centroamerica-nicaragua-en-el-nuevo-orden-regional',
    excerpt: 'Los cambios en la correlación de fuerzas en América Latina, el reposicionamiento de China y la nueva administración estadounidense reconfiguran el entorno estratégico de Nicaragua.',
    body: [
      h2('Un vecindario en transformación'),
      ...p(
        'El panorama geopolítico de Centroamérica ha experimentado cambios profundos en los últimos tres años. La llegada de nuevos gobiernos progresistas en la región, combinada con la intensificación de la competencia entre Estados Unidos y China, ha creado un entorno diplomático complejo para Nicaragua que el régimen ha sabido aprovechar.',
        'Mientras que el país enfrenta sanciones y aislamiento por parte de las democracias occidentales, ha encontrado aliados estratégicos en Rusia, China e Irán, que han proporcionado asistencia financiera, técnica y militar. Este reposicionamiento no es gratuito: implica una creciente dependencia que condiciona las decisiones de política exterior del régimen.',
      ),
      h3('El factor migratorio como presión'),
      ...p(
        'La crisis migratoria nicaragüense se ha convertido en un tema central en las relaciones bilaterales con Estados Unidos y Costa Rica. El flujo constante de nicaragüenses hacia el norte ha generado tensiones diplomáticas y ha sido utilizado tanto como herramienta de presión como de negociación.',
        'Costa Rica, que ha acogido a la mayor parte de los exiliados, enfrenta una saturación de sus servicios públicos y ha solicitado reiteradamente apoyo financiero internacional para atender la crisis. Estados Unidos, por su parte, ha vinculado la ayuda migratoria a avances democráticos en Nicaragua, aunque sin resultados tangibles hasta ahora.',
        'Analistas señalan que la migración forzada se ha convertido en una de las principales herramientas de presión que la comunidad internacional tiene sobre el régimen, pero también uno de los temas más difíciles de resolver sin generar un colapso humanitario.',
      ),
      h3('El papel de China en la región'),
      ...p(
        'La creciente presencia china en Centroamérica ha cambiado las reglas del juego. Nicaragua, que rompió relaciones con Taiwán en 2021 para alinearse con Pekín, se ha convertido en un punto focal de la inversión china en la región. Proyectos de infraestructura, préstamos blandos y asistencia técnica han fluido hacia el país.',
        'Sin embargo, esta relación tiene costos ocultos. La deuda de Nicaragua con China ha crecido exponencialmente, y varios proyectos anunciados han quedado paralizados por falta de transparencia en las condiciones de financiamiento. La experiencia de otros países latinoamericanos sugiere que la "diplomacia del dragón" puede ser tan exigente como cualquier otra.',
      ),
    ],
    imageSeed: 'article-analysis-3',
  },
  {
    categorySlug: 'voices',
    tagNames: ['Libertad de Prensa', 'Derechos Humanos', 'Opinión'],
    authorIndex: 1,
    title: 'Periodismo en la cuerda floja: reportear en un país sin garantías',
    slug: 'periodismo-en-la-cuerda-floja-reportear-en-un-pais-sin-garantias',
    excerpt: 'La experiencia de una periodista independiente que documenta la realidad nicaragüense bajo amenaza constante, entre la autocensura y la necesidad de contar la verdad.',
    body: [
      h2('El oficio del riesgo'),
      ...p(
        'Hace seis meses recibí la última amenaza directa. Un mensaje de texto desde un número desconocido: "Sabemos dónde vives, sabemos dónde estudian tus hijos. Deja de escribir o te arrepentirás". No fue la primera ni será la última. Así es el oficio del periodismo independiente en Nicaragua hoy.',
        'He aprendido a vivir con el miedo. A revisar debajo del coche cada mañana. A no tener rutinas predecibles. A cambiar de teléfono cada dos meses. A hablar con mis fuentes a través de aplicaciones cifradas que borran los mensajes automáticamente. Esta no es la profesión que elegí, pero es la que tengo.',
      ),
      h3('La autocensura como mecanismo de supervivencia'),
      ...p(
        'Lo peor no son las amenazas directas, sino la autocensura silenciosa que te vas imponiendo. Hay temas que aprendes a evitar, palabras que dejas de usar, ángulos que decides no explorar porque sabes que cruzar cierta línea puede significar el fin de tu carrera o algo peor.',
        'Cada artículo que publico pasa por un filtro interno que no existía antes: ¿puedo identificar a esta fuente sin ponerla en riesgo? ¿Este dato puede ser usado en mi contra? ¿Vale la pena la historia si mañana tengo que salir del país? Son preguntas que ningún periodista debería tener que hacerse.',
        'He visto a colegas desaparecer del mapa informativo. Algunos están en el exilio, otros en la cárcel, otros simplemente dejaron de escribir porque el costo era demasiado alto. Cada vez somos menos los que seguimos reporteando desde dentro, y los que quedamos sabemos que nuestra suerte puede cambiar en cualquier momento.',
      ),
      h3('Por qué sigo'),
      ...p(
        'Me preguntan a menudo por qué no me voy. Por qué sigo arriesgando mi vida y la de mi familia por un trabajo que no paga bien y que la mayoría de la gente no valora. La respuesta es simple: porque alguien tiene que hacerlo.',
        'Cuando dejamos de documentar la realidad, dejamos de existir como sociedad. Cuando el único relato permitido es el oficial, la historia la escriben los verdugos. Mientras tenga fuerzas, mientras pueda sostener un lápiz o abrir una computadora, voy a seguir contando lo que pasa en este país.',
        'No soy heroína, solo soy una periodista que cree que la verdad importa. Incluso cuando contarla puede costarte todo.',
      ),
    ],
    imageSeed: 'article-voices-3',
  },
  {
    categorySlug: 'voices',
    tagNames: ['Derechos Humanos', 'Sociedad Civil', 'Economía'],
    authorIndex: 0,
    title: 'El campo nicaragüense: voces de una crisis silenciada',
    slug: 'el-campo-nicaraguense-voces-de-una-crisis-silenciada',
    excerpt: 'Campesinos y pequeños productores relatan cómo la crisis política, la falta de insumos y el cambio climático están transformando la vida en las zonas rurales del país.',
    body: [
      h2('La tierra que agoniza'),
      ...p(
        'Don Óscar tiene 67 años y ha cultivado maíz y frijoles en el mismo pedazo de tierra en el departamento de Jinotega durante cuatro décadas. "Nunca había visto algo así", dice mientras señala sus parcelas resecas. "Antes sabíamos cuándo sembrar y cuándo cosechar. Ahora el clima está loco y nadie nos ayuda".',
        'Su historia se repite en cientos de comunidades rurales de Nicaragua, donde la crisis climática se suma a la crisis política para crear una tormenta perfecta. La falta de crédito agrícola, la ausencia de asistencia técnica y el encarecimiento de los insumos básicos han llevado a muchos pequeños productores al borde del abandono de sus tierras.',
      ),
      h3('Cooperativas bajo sospecha'),
      ...p(
        'Las cooperativas agrícolas, que durante décadas fueron el motor de la economía rural nicaragüense, enfrentan ahora una persecución sistemática. El gobierno las acusa de ser focos de "desestabilización" y ha intervenido varias de ellas, acusando a sus dirigentes de malversación de fondos.',
        '"Nos acusan de todo", relata doña Rosa, presidenta de una cooperativa de café en Matagalpa. "Dicen que somos políticos disfrazados de campesinos. Solo queremos trabajar la tierra y vivir dignamente. ¿Eso es político?". La cooperativa de doña Rosa perdió la certificación orgánica el año pasado después de que inspectores gubernamentales bloquearan la visita de los auditores internacionales.',
        'El acoso ha tenido consecuencias concretas: la producción de café, uno de los principales productos de exportación del país, ha caído un 15% en los últimos dos años, según datos del sector.',
      ),
      h3('La migración silenciosa del campo'),
      ...p(
        'Ante la imposibilidad de sostener sus medios de vida, miles de campesinos están abandonando sus tierras. No hacia Managua, como ocurría en el pasado, sino directamente hacia Costa Rica y Estados Unidos. Es una migración silenciosa que no aparece en los titulares, pero que está vaciando comunidades enteras.',
        '"Se fueron los jóvenes primero", cuenta don Óscar. "Luego se fueron los que tenían hijos pequeños. Ahora empiezan a irse los que nunca pensaron que dejarían su tierra. Me pregunto si valdrá la pena quedarse cuando ya no quede nadie".',
        'El despoblamiento rural tendrá consecuencias profundas para el país a largo plazo, no solo económicas sino culturales. La Nicaragua campesina, la de los pueblos originarios y las comunidades rurales, está desapareciendo sin que nadie parezca notarlo.',
      ),
    ],
    imageSeed: 'article-voices-4',
  },
]

export interface BlogPostSeed {
  tagNames: string[]
  authorIndex: number
  title: string
  excerpt: string
  slug: string
  body: Record<string, any>[]
  imageSeed: string
}

export const blogPosts: BlogPostSeed[] = [
  {
    tagNames: ['Derechos Humanos', 'Sociedad Civil'],
    authorIndex: 0,
    title: 'Nicaragua: el largo camino hacia la reconciliación nacional',
    excerpt: 'Reflexiones sobre los desafíos de construir paz en un país dividido',
    slug: 'nicaragua-el-largo-camino-hacia-la-reconciliacion-nacional',
    body: [
      h2('Una herida que no cierra'),
      ...p(
        'Nicaragua vive desde 2018 una crisis que ha trascendido lo político para convertirse en una fractura social de dimensiones históricas. Las familias divididas, las comunidades rotas, los amigos que dejaron de hablarse: la polarización ha dejado cicatrices que ningún acuerdo diplomático podrá sanar por sí solo.',
        'La reconciliación, ese término que los diplomáticos pronuncian con facilidad, implica en la práctica un proceso doloroso de reconocimiento mutuo. Significa que quienes apoyaron el régimen y quienes lo combatieron deben aprender a convivir en el mismo espacio, compartir la misma calle, sentarse en la misma mesa. No hay atajos para semejante empresa.',
      ),
      h2('Lecciones de otros procesos'),
      ...p(
        'Los casos de Sudáfrica, Colombia y Guatemala ofrecen aprendizajes parciales. En todos ellos, la justicia transicional fue necesaria pero insuficiente. La comisión de la verdad puede establecer hechos, pero no devolver la dignidad a las víctimas. El perdón no se decreta, se construye con hechos concretos de reparación y garantías de no repetición.',
        'En Nicaragua, el contexto es particularmente complejo porque no existe un vencedor claro ni un derrotado absoluto. El régimen mantiene el control del aparato estatal, pero ha perdido legitimidad ante amplios sectores. La oposición tiene apoyo popular, pero carece de estructura y liderazgo unificado. Esta ambigüedad, lejos de facilitar la negociación, la dificulta porque ninguno de los dos bandos siente que necesita ceder.',
      ),
      h2('La sociedad civil como puente'),
      ...p(
        'En este escenario desolador, las organizaciones de la sociedad civil emergen como el actor más prometedor para liderar el proceso de reconciliación. No están contaminadas por la lógica partidaria, tienen credibilidad acumulada y, sobre todo, trabajan en terreno: conocen las necesidades reales de las comunidades.',
        'Iniciativas como los tribunales de paz comunitarios, los programas de salud mental colectiva y los proyectos de desarrollo económico local están demostrando que es posible reconstruir el tejido social desde abajo. No sustituyen la voluntad política, pero sí crean las condiciones para que esa voluntad eventualmente emerja.',
        'El camino será largo y probablemente más de una generación tendrá que pasar para que Nicaragua pueda hablar de reconciliación real. Pero cada paso que se da hoy, por pequeño que parezca, es un paso hacia un futuro donde el diálogo reemplace al silencio y la convivencia al miedo.',
      ),
    ],
    imageSeed: 'blog-reconciliation',
  },
  {
    tagNames: ['Política Exterior', 'Economía'],
    authorIndex: 1,
    title: 'La diáspora nicaragüense: entre la nostalgia y la reinventión',
    excerpt: 'Cómo cientos de miles de exiliados están transformando comunidades en el exterior',
    slug: 'la-diaspora-nicaraguense-entre-la-nostalgia-y-la-reinvencion',
    body: [
      h2('Un éxodo sin precedentes'),
      ...p(
        'Desde 2018, más de 200,000 nicaragüenses han abandonado el país, creando una de las diásporas más grandes de América Latina proporcionalmente. Costa Rica ha absorbido la mayor parte, pero comunidades significativas se han establecido en México, Estados Unidos, España y otros países europeos.',
        'Este éxodo no es un fenómeno nuevo en la historia centroamericana — los salvadoreños y guatemaltecos conocieron procesos similares durante sus guerras civiles — pero tiene características propias que lo distinguen. La rapidez de la salida, la diversidad socioeconómica de los emigrados y la naturaleza política del exilio configuran una diáspora con demandas y necesidades específicas.',
      ),
      h2('La economía del exilio'),
      ...p(
        'Los remesas se han convertido en uno de los pilares fundamentales de la economía familiar en Nicaragua. Según datos del Banco Central, las transferencias desde el exterior representan más del 25% del PIB, una cifra que revela tanto la dependencia del país como la generosidad de quienes se fueron.',
        'Pero las remesas no son solo dinero: son también conocimientos, habilidades y redes de contacto que los nicaragüenses en el exterior están poniendo al servicio de sus comunidades de origen. Empresas textiles administradas por exiliados en Costa Rica, cooperativas de artesanías organizadas desde México, plataformas tecnológicas desarrolladas por ingenieros en Estados Unidos: la diáspora está creando una economía paralela que podría ser clave para la reconstrucción futura.',
      ),
      h2('La identidad en el limbo'),
      ...p(
        'Vivir en el exilio plantea preguntas existenciales que van más allá de lo material. ¿Sigue siendo nicaragüense alguien que lleva cinco años viviendo en San José? ¿Qué significa pertenecer a un país que te expulsó? ¿Cómo se mantiene viva la conexión con una tierra que cada vez se siente más lejana?',
        'Las comunidades de exiliados han creado espacios de memoria y resistencia que funcionan como anclaje identitario. Centros culturales, escuelas de español para hijos de emigrados, festivales de música tradicional, grupos de lectura sobre literatura nicaragüense: todos ellos son intentos de preservar una identidad que amenaza con disolverse en la acelerada asimilación del país de acogida.',
        'La paradoja del exilio es que te obliga a ser más nicaragüense de lo que eras cuando vivías en Nicaragua. En el país, la identidad era un dato; en el exterior, se convierte en una elección. Y esa elección, repetida cada día en mil pequeños gestos, es lo que mantiene viva la esperanza de retorno.',
      ),
    ],
    imageSeed: 'blog-diaspora',
  },
  {
    tagNames: ['Reformas', 'Opinión'],
    authorIndex: 0,
    title: 'La educación como campo de batalla silencioso',
    excerpt: 'Cómo el control académico ha moldeado una generación de nicaragüenses',
    slug: 'la-educacion-como-campo-de-batalla-silencioso',
    body: [
      h2('Universidades bajo asedio'),
      ...p(
        'La intervención de las universidades públicas y privadas de Nicaragua no fue un acto aislado sino parte de una estrategia sistemática de control social. Desde 2018, el gobierno ha desmantelado la autonomía universitaria, depurado profesorado disidente y reorientado planes de estudio para eliminar lo que considera "desestabilización ideológica".',
        'Las consecuencias van más allá de lo académico. Las universidades nicaragüenses eran espacios de pensamiento crítico, formación de liderazgo y movilización social. Al cerrar esos espacios, el régimen no solo controla el acceso al conocimiento, sino que corta las redes de organización que podrían desafiar su poder.',
      ),
      h2('Una generación en la encrucijada'),
      ...p(
        'Los estudiantes que comenzaron su formación universitaria en 2018 vivieron en carne propia el momento más convulso de la crisis. Muchos de ellos participaron en las protestas, fueron testigos de la violencia policial y vieron cómo sus compañeros eran detenidos o expulsados. Para esta generación, la universidad no fue un espacio de aprendizaje sino de politización forzada.',
        'Ahora, varios años después, los estudiantes que permanecen en el país enfrentan un panorama desolador: carreras con planes de estudio censurados, profesores que han aprendido a autopreservarse, bibliotecas depuradas de literatura "subversiva". Los que se fueron al exilio, por su parte, han tenido que reinventarse en sistemas educativos radicalmente diferentes, cargando con el peso de una formación interrumpida.',
      ),
      h2('La resistencia desde las aulas vacías'),
      ...p(
        'A pesar del control férreo, han surgido iniciativas de resistencia educativa que operan en los márgenes. Círculos de lectura clandestinos, tutorías en línea a través de plataformas cifradas, intercambios académicos con universidades extranjeras que mantienen vínculos con profesores exiliados.',
        '"La educación no se detiene porque cierren un edificio", afirma un profesor de filosofía que imparte clases por videollamada a estudiantes repartidos en cinco países. "El conocimiento es el recurso más difícil de confiscar porque viaja en la mente de la gente".',
        'Estas iniciativas, aunque valiosas, no pueden sustituir el ecosistema universitario completo: laboratorios, bibliotecas, espacios de encuentro, la vida comunitaria que forja carácter y crea lazos. La verdadera batalla educativa tomará años para revertirse, y el costo de esta generación perdida será incalculable.',
      ),
    ],
    imageSeed: 'blog-education',
  },
  {
    tagNames: ['Sociedad Civil', 'Derechos Humanos'],
    authorIndex: 1,
    title: 'La trata de personas en la ruta migratoria nicaragüense',
    excerpt: 'Una investigación sobre cómo las redes de trata aprovechan la vulnerabilidad de quienes huyen del país, y las iniciativas ciudadanas que intentan proteger a los más expuestos.',
    slug: 'la-trata-de-personas-en-la-ruta-migratoria-nicaraguense',
    body: [
      h2('El negocio de la desesperación'),
      ...p(
        'Cada mes, miles de nicaragüenses emprenden la ruta hacia el norte. Huyen de la represión, de la falta de oportunidades, de un futuro que no promete nada. En ese camino, muchos caen en las redes de tratantes que operan con impunidad a lo largo de la ruta migratoria.',
        'Organizaciones de derechos humanos han documentado un aumento alarmante de casos de trata de personas con fines de explotación laboral y sexual entre la población migrante nicaragüense. Las víctimas, en su mayoría mujeres jóvenes y adolescentes, son captadas por redes que prometen empleo digno en los países de tránsito o destino.',
      ),
      h2('Los puntos ciegos de la protección'),
      ...p(
        'Los consulados nicaragüenses en el exterior, controlados por el régimen, ofrecen escasa asistencia a los migrantes. Muchos reportan que al acudir a las representaciones diplomáticas son recibidos con hostilidad o simplemente ignorados, lo que los deja en una situación de vulnerabilidad extrema.',
        'Las organizaciones de la sociedad civil han tratado de llenar este vacío, estableciendo redes de apoyo en puntos clave de la ruta migratoria. Albergues temporales, asesoría legal gratuita y líneas de emergencia operadas por voluntarios son algunas de las iniciativas que han surgido para proteger a los migrantes.',
        '"No podemos reemplazar al Estado, pero podemos estar donde el Estado no está", explica una voluntaria de una organización de apoyo migrante en la frontera sur de México. "Cada persona que logramos orientar y proteger es una vida que no cae en las redes de la trata".',
      ),
      h2('Testimonios de sobrevivencia'),
      ...p(
        'Ana (nombre ficticio) tenía 22 años cuando aceptó la oferta de un "empleo seguro" en Panamá. La oferta llegó a través de una amiga de una amiga, en un grupo de WhatsApp de nicaragüenses en el exilio. "Me prometieron trabajo de recepcionista, con vivienda incluida. Sonaba legítimo".',
        'Al llegar a la frontera, le quitaron el pasaporte y la trasladaron a una casa donde estaba encerrada con otras mujeres. Durante tres meses fue obligada a trabajar en un prostíbulo, hasta que logró escapar durante una redada policial. Ahora vive en un albergue en Costa Rica, esperando una resolución de asilo.',
        'Historias como la de Ana se repiten con variaciones cada semana. Las organizaciones de derechos humanos estiman que solo uno de cada diez casos de trata es denunciado. La mayoría de las víctimas nunca recupera su libertad ni recibe justicia.',
      ),
    ],
    imageSeed: 'blog-trafficking',
  },
  {
    tagNames: ['Elecciones', 'Reformas', 'Opinión'],
    authorIndex: 0,
    title: 'El sistema de justicia en Nicaragua: del estado de derecho al estado de excepción permanente',
    excerpt: 'Un análisis exhaustivo de cómo el poder judicial ha sido instrumentalizado para perseguir a la oposición y consolidar el control gubernamental sobre todas las esferas de la vida pública.',
    slug: 'el-sistema-de-justicia-en-nicaragua-del-estado-de-derecho-al-estado-de-excepcion-permanente',
    body: [
      h2('La metamorfosis del poder judicial'),
      ...p(
        'En una década, Nicaragua ha pasado de tener un sistema judicial imperfecto pero funcional a un aparato de persecución política disfrazado de administración de justicia. La transformación no fue abrupta sino gradual: reformas legislativas, destitución de jueces independientes, nombramientos de leales y, sobre todo, la creación de una cultura de miedo que impide cualquier resistencia dentro del sistema.',
        'El proceso comenzó con la purga de la Corte Suprema de Justicia en 2018, cuando magistrados críticos fueron destituidos bajo acusaciones de "incumplimiento de deberes". A partir de ahí, la depuración se extendió a tribunales de apelación, juzgados de distrito y, finalmente, a los juzgados locales. Hoy, no existe un solo juez en Nicaragua que pueda considerarse verdaderamente independiente.',
      ),
      h2('Jueces sin toga'),
      ...p(
        'Los llamados "jueces sin rostro", reintroducidos mediante una reforma legal en 2023, representan el punto más bajo de este proceso de degradación judicial. Bajo este sistema, los acusados no pueden conocer la identidad de los jueces que los juzgan, una medida que las organizaciones de derechos humanos califican como "una violación flagrante del debido proceso".',
        'Este mecanismo se ha utilizado exclusivamente contra presos políticos. En los últimos dos años, más de 150 personas han sido procesadas bajo este sistema, y la tasa de condenas es del 99.7%. La única persona absuelta fue un caso en el que el propio fiscal solicitó la absolución por falta total de pruebas.',
        'Los jueces que participan en estos tribunales lo hacen voluntariamente, atraídos por salarios triplicados y protección especial. Pero también bajo amenaza: negarse a participar puede significar la pérdida del empleo y, en algunos casos, la apertura de investigaciones penales contra el propio juez renuente.',
      ),
      h2('El costo de la injusticia'),
      ...p(
        'Las consecuencias de esta captura del sistema judicial son profundas y duraderas. No se trata solo de los presos políticos, que ya suman más de 300 según organizaciones de derechos humanos. Se trata de la imposibilidad de hacer valer cualquier derecho: laboral, de propiedad, de familia, de identidad.',
        'Un contrato no vale el papel en que está escrito porque no hay un juez independiente que lo haga cumplir. Una propiedad puede ser expropiada sin recurso legal. Un padre puede perder la custodia de sus hijos si es señalado como "opositor". El estado de derecho se ha desmoronado por completo.',
        'La reconstrucción del sistema judicial tomará generaciones. No basta con cambiar leyes o nombrar nuevos jueces: la cultura de impunidad y miedo está tan arraigada que incluso en un escenario de transición democrática, los abogados y jueces tendrían que aprender a ejercer su profesión sin temor a represalias.',
      ),
    ],
    imageSeed: 'blog-justice',
  },
  {
    tagNames: ['Economía', 'Política Exterior', 'Reformas'],
    authorIndex: 0,
    title: 'El cerco financiero: cómo las sanciones reconfiguraron la economía nicaragüense',
    excerpt: 'Más allá del impacto macroeconómico, las sanciones internacionales han transformado las relaciones comerciales, el sistema bancario y las estrategias de supervivencia del empresariado local.',
    slug: 'el-cerco-financiero-como-las-sanciones-reconfiguraron-la-economia-nicaraguense',
    body: [
      h2('La paradoja de las sanciones'),
      ...p(
        'Hay una escena que se repite cada mes en las bodegas del puerto de Corinto: contenedores enteros de mercancía que llegan y no pueden ser liberados porque el banco intermediario, temeroso de violar sanciones internacionales, ha congelado la transacción. La mercancía se pudre, el importador pierde su inversión y el exportador extranjero aprende a no hacer negocios con Nicaragua.',
        'Esta es la realidad cotidiana de las sanciones financieras, cuyo impacto no siempre es visible en las estadísticas macroeconómicas pero que se siente en cada rincón del aparato productivo del país. El sistema bancario nicaragüense, desconectado progresivamente del sistema financiero global, opera en un aislamiento creciente.',
      ),
      h2('Bancos en la cuerda floja'),
      ...p(
        'Los bancos nicaragüenses enfrentan un dilema existencial. Por un lado, necesitan mantener corresponsalías internacionales para procesar transacciones en dólares, el pilar del comercio exterior del país. Por otro, cada vez menos bancos internacionales están dispuestos a asumir el riesgo reputacional y regulatorio de mantener relaciones con Nicaragua.',
        'En los últimos tres años, al menos seis bancos internacionales han cortado sus relaciones de corresponsalía con entidades nicaragüenses. Esto significa que las transferencias internacionales tardan semanas en procesarse, cuando antes tomaban horas. Los costos de transacción se han disparado, y algunos sectores simplemente han dejado de exportar porque no pueden cobrar.',
        'El gobierno ha intentado mitigar el impacto mediante acuerdos con bancos de países aliados, principalmente China y Rusia. Sin embargo, estas alternativas tienen limitaciones técnicas y geográficas que impiden sustituir completamente la infraestructura financiera global.',
      ),
      h2('La economía de la supervivencia'),
      ...p(
        'En este contexto, el empresariado nicaragüense ha desarrollado estrategias creativas de supervivencia. Algunos han establecido casas matrices en Costa Rica o Panamá para poder operar en el sistema financiero internacional. Otros han recurrido al trueque o a sistemas de compensación que recuerdan a las épocas de hiperinflación de los años ochenta.',
        'La economía digital, particularmente las criptomonedas, ha encontrado un terreno fértil en Nicaragua. La adopción de USDT y Bitcoin ha crecido exponencialmente como mecanismo para eludir el cerco financiero. Sin embargo, esta solución tecnológica está fuera del alcance de la mayoría de la población, que depende de efectivo y transferencias bancarias tradicionales.',
        '"Hemos vuelto a la economía de la subsistencia", resume un economista nicaragüense exiliado en México. "Las empresas gastan más recursos en sortear las restricciones financieras que en producir. Eso no es sostenible a largo plazo. La economía nicaragüense está encogiéndose, y las sanciones son solo una parte de la historia".',
      ),
    ],
    imageSeed: 'blog-sanctions',
  },
  {
    tagNames: ['Sociedad Civil', 'Derechos Humanos', 'Opinión'],
    authorIndex: 1,
    title: 'Iglesias bajo presión: la fe como resistencia en Nicaragua',
    excerpt: 'Las comunidades religiosas, tanto católicas como evangélicas, enfrentan un asedio creciente mientras intentan mantener espacios de esperanza y solidaridad en medio de la represión.',
    slug: 'iglesias-bajo-presion-la-fe-como-resistencia-en-nicaragua',
    body: [
      h2('Persecución selectiva'),
      ...p(
        'Cuando la policía ingresó a la fuerza en la Catedral de Managua en 2022, no solo violó la inmunidad eclesiástica: cruzó una línea que ni la dictadura de Somoza se había atrevido a cruzar. Ese momento marcó un punto de inflexión en la relación entre el régimen y las iglesias, que pasaron de ser actores mediadores a blancos directos de persecución.',
        'La Iglesia Católica ha sido el objetivo principal, pero no el único. Denominaciones evangélicas que han mostrado solidaridad con presos políticos o han criticado abiertamente al gobierno también han sufrido hostigamiento. Pastores detenidos durante sus servicios, templos clausurados bajo acusaciones fiscales, líderes religiosos obligados al exilio.',
      ),
      h2('El silencio cómplice y la resistencia callada'),
      ...p(
        'La respuesta de las comunidades religiosas ha sido diversa. Algunas jerarquías han optado por un perfil bajo, negociando con el régimen la continuidad de sus actividades a cambio de silencio político. Otras, particularmente a nivel de base, han redoblado su compromiso con los más vulnerables, utilizando su infraestructura para albergar a perseguidos y distribuir ayuda humanitaria.',
        '"La iglesia no es solo el templo, es la comunidad", dice un sacerdote que coordina una red de comedores infantiles en barrios marginales de Managua. "Pueden cerrar el edificio, pero no pueden cerrar la solidaridad. Lo que hacemos no es político, es cristiano. Pero en este país, ayudar al prójimo se ha vuelto un acto subversivo".',
        'Las parroquias se han convertido en centros de resistencia silenciosa: espacios donde se reúnen familiares de presos políticos, se organizan colectas para exiliados y se ofrece asesoría legal gratuita. Son los únicos lugares donde la gente puede reunirse sin levantar sospechas inmediatas.',
      ),
      h2('La fe como refugio existencial'),
      ...p(
        'Para muchos nicaragüenses, la persecución religiosa ha reforzado la fe en lugar de debilitarla. Las iglesias llenas, las peregrinaciones multitudinarias y el crecimiento de comunidades de orión clandestinas son señales de que la represión no ha logrado quebrar la espiritualidad del pueblo.',
        '"Cuando todo lo demás falla, nos queda la fe", dice una feligresa que asiste a misa diaria en una parroquia de León. "No sabemos cuándo terminará esto, pero sabemos que Dios está con los que sufren. Eso nos da fuerzas para seguir".',
        'La pregunta que queda abierta es si la Iglesia, como institución, podrá jugar un papel relevante en una eventual transición democrática. Su legitimidad entre la población, fortalecida por su papel actual de defensora de derechos humanos, la posiciona como un actor potencialmente clave. Pero el costo pagado ha sido alto: decenas de sacerdotes exiliados, templos confiscados y una jerarquía dividida entre la resistencia y la supervivencia.',
      ),
    ],
    imageSeed: 'blog-church',
  },
  {
    tagNames: ['Política Exterior', 'Derechos Humanos', 'Sociedad Civil'],
    authorIndex: 1,
    title: 'Exilio nicaragüense: la diáspora política más joven de América Latina',
    excerpt: 'Una generación de profesionales, estudiantes y activistas reconstruye sus vidas fuera del país mientras mantiene viva la lucha por la democracia desde la distancia.',
    slug: 'exilio-nicaraguense-la-diaspora-politica-mas-joven-de-america-latina',
    body: [
      h2('Una generación dispersa'),
      ...p(
        'A diferencia de las migraciones económicas del pasado, el exilio político nicaragüense tiene un perfil distintivo: es joven (edad promedio de 29 años), altamente educado (más del 60% tiene estudios universitarios) y forzado por razones políticas directas. Esta combinación lo convierte en un fenómeno único en la historia migratoria latinoamericana.',
        'Se estima que más de 120,000 nicaragüenses han salido del país por razones políticas desde 2018. De ellos, aproximadamente el 40% son profesionales: médicos, ingenieros, abogados, profesores universitarios. La pérdida de capital humano para Nicaragua es incalculable, pero la diáspora se ha convertido en un actor político relevante en los países de acogida.',
      ),
      h2('Organización transnacional'),
      ...p(
        'Lejos de dispersarse y asimilarse pasivamente, la diáspora nicaragüense ha creado una estructura organizativa que opera en múltiples países. Consejos de nicaragüenses en el exilio, asociaciones de profesionales y redes de estudiantes mantienen una coordinación constante a través de plataformas digitales.',
        '"No somos refugiados esperando regresar, somos una comunidad política transnacional", explica una jurista nicaragüense exiliada en España que coordina una red de abogados que brindan asesoría legal gratuita a otros exiliados. "Nuestra lucha no terminó cuando cruzamos la frontera. Simplemente cambió de escenario".',
        'Las organizaciones de la diáspora han logrado incidir en las políticas migratorias y de derechos humanos de varios países. Han conseguido que gobiernos europeos otorguen protección especial a nicaragüenses, que universidades ofrezcan becas para estudiantes exiliados y que medios internacionales cubran la situación del país.',
      ),
      h2('El dilema del retorno'),
      ...p(
        'A pesar de su organización y éxito en la integración, la mayoría de los exiliados vive con la incertidumbre del retorno. Una encuesta realizada entre nicaragüenses exiliados reveló que el 78% desea regresar al país, pero solo el 12% considera que las condiciones para hacerlo existirán en los próximos cinco años.',
        'El retorno no es solo una decisión logística, sino profundamente emocional. Muchos exiliados describen la experiencia de vivir en el exterior como una "doble ausencia": ausentes del país que aman, pero nunca completamente integrados en el país que los acoge. La nostalgia, la culpa del sobreviviente y la ansiedad por los familiares que quedaron atrás son constantes.',
        '"No sé si volveré", dice un joven ingeniero exiliado en Canadá. "Pero quiero que mis hijos sepan de dónde vienen, que conozcan la Nicaragua que yo conocí, no la que el régimen ha destruido. Mientras tanto, voy a trabajar desde aquí para que ese país vuelva a existir algún día".',
        'Mientras el régimen se mantenga en el poder, la diáspora seguirá creciendo. Y con ella, la comunidad política nicaragüense más dispersa pero quizás también la más organizada y resiliente de la historia del país.',
      ),
    ],
    imageSeed: 'blog-exile',
  },
]
