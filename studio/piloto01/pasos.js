/*
 * pasos.js · CineIA Studio · PRUEBA PILOTO 01 (19 de noviembre de 2026, congelada)
 * Copia de assets/js/pasos.js con todas las secciones llenas con «El bosque cambia».
 * Contenido de cada sección del interior del libro.
 * Cada sección es una lista de bloques; el tipo del bloque decide cómo se dibuja.
 * Tipos: Texto, Campos, Opciones, Lista, Letra, Galeria, Tabla, Linea, Vinetas, Avance, Cjd, Acciones, Lecturas.
 * Regla: lo que la obra de ejemplo todavía no tiene se marca «por producir»; no se inventa.
 */
(function () {
  var POR = 'por producir';
  function bl(tipo, o) {
    o = o || {};
    o['es' + tipo] = true;
    o.base = o.ancho ? o.ancho : '100%';
    if (o.url) o.hayUrl = true;
    if (o.nota) o.hayNota = true;
    if (o.alto) o.hayAlto = true;
    if (o.cols) { o.plantilla = o.plantilla || 'repeat(' + o.cols.length + ', minmax(0, 1fr))'; o.minimo = o.minimo || (o.cols.length * 110) + 'px'; }
    return o;
  }
  var kv = function (pares) { return pares.map(function (p) { return { k: p[0], v: p[1], falta: p[1] === POR, hay: p[1] !== POR }; }); };
  var op = function (t, v, elegida) { return { t: t, v: v, elegida: !!elegida, otra: !elegida }; };
  var acc = function (lista, nota) {
    return bl('Acciones', { nota: nota || 'Botones de muestra: se activan en la siguiente versión.',
      items: lista.map(function (t, i) { return { t: t, principal: i === lista.length - 1, normal: i !== lista.length - 1 }; }) });
  };
  var yt = function (q) { return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q); };

  // Capítulos del libro, índice definitivo aprobado el 19 de noviembre de 2026
  var CAP = {
    6: 'Cap. 6 · Del punctum al scroll', 7: 'Cap. 7 · Observar no es mirar', 10: 'Cap. 10 · Narrar, sentir y justificar',
    11: 'Cap. 11 · De la ilusión de vida al mundo justificable', 12: 'Cap. 12 · Principios de dirección con IA',
    13: 'Cap. 13 · Un sistema de compuertas', 14: 'Cap. 14 · Protocolos para creación audiovisual con IA', 15: 'Cap. 15 · Laboratorio',
    16: 'Cap. 16 · La Base Olvera', 17: 'Cap. 17 · Estética de la imagen generada', 18: 'Cap. 18 · Estética del sonido y del silencio',
    19: 'Cap. 19 · Estética del tiempo y del montaje', 20: 'Cap. 20 · Estética de la imperfección y la huella humana',
    21: 'Cap. 21 · Pedagogía del Observador Audiovisual', 22: 'Cap. 22 · Hacia un nuevo potencial: el caso «El bosque cambia»', 23: 'Cap. 23 · Implementación profesional',
    24: 'Cap. 24 · Ética de la dirección audiovisual con IA', 25: 'Cap. 25 · El futuro del Observador Audiovisual', 26: 'Cap. 26 · Manifiesto'
  };
  var mod = function (n) { return 'Cap. 22 · «El bosque cambia», módulo ' + n; };
  var V = {
    comp: { t: 'Por qué tus videos todavía no se ven como películas', canal: 'Genery', url: yt('Genery Por qué tus videos todavía no se ven como películas') },
    rostro: { t: '¿Por qué los actores de Hollywood se ven tan diferentes en la vida real?', canal: 'canal por confirmar', url: yt('Por qué los actores de Hollywood se ven tan diferentes en la vida real') },
    actores: { t: '¿Quién es el mejor actor de la historia? (Los 12 elegidos)', canal: 'CinePrime', url: yt('CinePrime Quién es el mejor actor de la historia 12 elegidos') },
    rodaje: { t: 'La escena más difícil de rodar de la historia del cine', canal: 'CinePrime', url: yt('CinePrime La escena más difícil de rodar de la historia del cine') },
    visual: { t: 'Las 20 películas visualmente más increíbles de la historia', canal: 'CinePrime', url: yt('CinePrime Las 20 películas visualmente más increíbles de la historia') },
    secuencia: { t: '6 obras maestras rodadas en un solo plano secuencia', canal: 'CinePrime', url: 'https://www.youtube.com/watch?v=pJjFADNk5Mk' },
    finales: { t: 'Los 10 mejores planos finales de la historia del cine', canal: 'CinePrime', url: 'https://www.youtube.com/watch?v=iiyCiFh478o' },
    canal: { t: 'El canal completo: listas de Análisis, Actuaciones y Directores', canal: 'CinePrime', url: 'https://www.youtube.com/@CinePrimee' }
  };
  var PX = function (tema, url) { return { t: 'Pixar in a Box · ' + tema, url: url || 'https://www.khanacademy.org/computing/pixar' }; };
  var HIST = 'https://www.khanacademy.org/computing/pixar/storytelling';
  var LEC = {
    'pre-01': [[10, mod(1)], [V.canal], PX('El arte de contar historias', HIST)],
    'pre-02': [[10, 11, mod(1)], [V.canal], PX('El arte de contar historias', HIST)],
    'pre-03': [[18], [V.canal], PX('Sonido y efectos')],
    'pre-04': [[19, mod(3)], [V.canal], PX('El arte de contar historias', HIST)],
    'pre-05': [[16, mod(4)], [V.comp], PX('Sets y escenarios')],
    'pre-06': [[19, mod(3), mod(4)], [V.canal], PX('El arte de contar historias', HIST)],
    'pre-07': [[16, 11, mod(2)], [V.rostro], PX('Modelado de personajes')],
    'pre-08': [[12, mod(5)], [V.comp], PX('Cámaras virtuales')],
    'pro-01': [[11], [V.actores], PX('Animación')],
    'pro-02': [[12, 14], [V.rodaje], PX('Cámaras virtuales')],
    'pro-03': [[17], [V.visual], PX('Ciencia del color')],
    'pro-04': [[14, 15, 20], [V.canal], PX('Animación')],
    'post-01': [[18], [V.actores], PX('Sonido y efectos')],
    'post-02': [[18], [V.canal], PX('Sonido y efectos')],
    'post-03': [[18], [V.canal], PX('Sonido y efectos')],
    'post-04': [[19], [V.secuencia], PX('El arte de contar historias', HIST)],
    'post-05': [[17], [V.visual], PX('Ciencia del color')],
    'eva-01': [[21], [V.canal], PX('El arte de contar historias', HIST)],
    'eva-02': [[6], [V.finales], PX('El arte de contar historias', HIST)],
    'eva-03': [[13, 24], [V.canal], PX('El arte de contar historias', HIST)],
    'dis-01': [[mod(6), mod(7), mod(8), 23], [V.canal], PX('El arte de contar historias', HIST)],
    'dis-02': [[mod(4)], [V.comp], PX('El arte de contar historias', HIST)],
    'dis-03': [[mod(4)], [V.secuencia], PX('Animación')],
    'dis-04': [[6, 23], [V.canal], PX('El arte de contar historias', HIST)],
    'dis-05': [[25, 26, 22], [V.finales], PX('El arte de contar historias', HIST)]
  };
  function lecturas(clave) {
    var d = LEC[clave];
    if (!d) return null;
    return bl('Lecturas', {
      capitulos: d[0].map(function (c) { return typeof c === 'number' ? CAP[c] : c; }),
      videos: d[1], pixar: d[2],
      nota: 'Del libro El Observador Audiovisual, versión de trabajo. El enlace a cada capítulo se agrega cuando quede cerrado. Los videos se citan con canal y título; el minuto del pasaje se señala al cerrar la sección.'
    });
  }

  window.CineIAPasos = function (B) {
    var img = function (id, alt, pie) { return { src: B(id), alt: alt, pie: pie }; };
    var VI = window.CineIAVinetas || [];
    var COLOR = { boceto: '#8B6914', nueva: '#9C3B2E', rec: '#1F3A5F' };
    var tramos = VI.map(function (r) {
      return { n: r.n, g: r.dura, c: COLOR[r.tipo], t: r.n + ' · ' + r.entra + ' · ' + r.verso + ' · ' + r.funcion + ' ' + r.dura + ' s · ' + r.origen };
    });
    var cuenta = function (t) { return VI.filter(function (r) { return r.tipo === t; }).length; };

    var pre = {
      '01': {
        intro: 'Antes de la historia está la falta: qué le hace falta al mundo de tu historia, a quién y en qué hecho concreto se nota. De ahí sale el conflicto.',
        bloques: [
          bl('Texto', { etiqueta: 'Tu intención', parrafos: ['Explicarle a un niño pequeño por qué separaron a su familia. Inspirado en hechos reales en Estados Unidos.'], ancho: '320px' }),
          bl('Campos', { etiqueta: 'Lo que le falta al mundo de la historia', ancho: '520px', items: kv([
            ['Qué falta', 'La seguridad, el nido original y la certeza de vivir en paz sin que separen a la familia.'],
            ['Qué provoca', 'Miedo, vulnerabilidad de la infancia y la urgencia de un viaje incierto hacia un lugar donde volver a empezar.'],
            ['A quién le falta', 'A Ámbar, a sus hermanos y a cualquier familia desplazada que busca refugio y futuro.'],
            ['En qué se nota', 'La expulsión de la madre al otro lado del río y el encierro de los hermanos.']]) }),
          bl('Opciones', { etiqueta: 'El conflicto en una frase', nota: 'La IA propuso cuatro enfoques; tú escribiste tu propia versión.', items: [
            op('Tu versión', 'Una familia de hermanos separada por la violencia de una frontera emprende un peligroso viaje para reencontrarse con su madre y construir desde cero un hogar seguro.', true),
            op('A · afectivo', 'Una familia de cachorros guiada por una señal sonora cruza un bosque cercado y confía en aliados inesperados.'),
            op('B · alegórico', 'El cierre arbitrario de un territorio separa a una madre de sus crías y las obliga a construir un nuevo hogar.'),
            op('D · fábula', 'Tres hermanos separados de su madre aprenden que nadie se queda atrás si hay manos dispuestas a cuidar.')] }),
          acc(['Pedir otras alternativas', 'Comparar con mi intención', 'Aprobar la idea'])
        ]
      },
      '02': {
        intro: 'La idea se vuelve historia en tres capas: la premisa que la historia pone a prueba, la frase que la cuenta y los movimientos que la ordenan.',
        bloques: [
          bl('Texto', { etiqueta: 'Premisa', parrafos: ['El verdadero hogar no es el territorio que te arrebataron, sino la comunidad viva que construyes con quienes se cuidan mutuamente.'], ancho: '360px' }),
          bl('Texto', { etiqueta: 'Logline', parrafos: ['Separados de su madre por la violencia de una frontera, tres hermanos escapan de su encierro con la ayuda de animales del bosque y la redención de un antiguo opresor. Está en juego la posibilidad de sanar el desplazamiento construyendo un nuevo hogar.'], ancho: '420px' }),
          bl('Lista', { etiqueta: 'Sinopsis en cinco movimientos', items: [
            { n: '1', t: 'Inicio', v: 'Ámbar y sus hermanos crecen seguros en el bosque junto a su madre, unidos por una señal rítmica.' },
            { n: '2', t: 'Iniciador', v: 'Guardias de gorra roja irrumpen, expulsan a la madre al sur del río y encierran a los hermanos.' },
            { n: '3', t: 'Complicación', v: 'Con las criaturas nocturnas y con Junco, un guardia arrepentido, escapan y cruzan el río.' },
            { n: '4', t: 'Clímax', v: 'En el árbol del sur Ámbar da la señal y su madre responde.' },
            { n: '5', t: 'Resolución', v: 'La familia y sus aliados reconstruyen un valle dañado como hogar abierto a quien necesite refugio.' }] }),
          bl('Cjd', { etiqueta: 'Registro de la decisión', agencia: 'asistida', items: kv([
            ['Decisión', 'Premisa centrada en la reconstrucción del hogar, logline de resiliencia y sinopsis en cinco movimientos.'],
            ['Función', 'Dar una columna vertebral narrativa clara antes del diseño de personajes.'],
            ['Evidencia', 'El contraste de opciones mostró que el clímax en la comunidad da más profundidad que la sola huida.'],
            ['Ajuste', 'Se priorizaron los arcos de transformación: el perdón a Junco y la acogida de nuevas crías.']]) }),
          acc(['Ver las otras opciones', 'Aprobar la historia'])
        ]
      },
      '03': {
        intro: 'La canción es la columna de la obra: marca el tiempo de cada viñeta. Aquí se escucha, se lee y se contrasta con lo que entiende la IA.',
        bloques: [
          bl('Avance', { etiqueta: 'El bosque cambia · canción completa', hecho: '0:00', total: '5:35', pct: 0, reproductor: true, nota: 'Reproductor de la grabación aprobada.' }),
          bl('Letra', { etiqueta: 'Letra', ancho: '360px', estrofas: [
            { e: 'Verso 1', versos: ['Soy Ámbar, cuido a mis hermanos;', 'Brizna y Nuez van junto a mí.', 'Mamá llegó del sur del río;', 'en este bosque yo nací.'] },
            { e: 'Coro', versos: ['Dos golpes cortos, uno largo,', 'mamá, te voy a encontrar.', 'Hay muchas patas en el bosque', 'que nos ayudan a avanzar.'] },
            { e: 'Final', versos: ['Hoy llega una cría asustada,', 'le ofrezco agua y un lugar.', 'Dos golpes cortos, uno largo...', 'ven, ya podemos jugar.'] }] }),
          bl('Campos', { etiqueta: 'Lo que ya funciona, según la lectura de la IA', ancho: '420px', items: kv([
            ['El golpeteo', '«Dos golpes cortos, uno largo» es el ancla afectiva y el símbolo del reencuentro.'],
            ['Los símbolos', 'La ardilla dorada y las gorras rojas se entienden sin nombrar conceptos políticos.'],
            ['El lema', '«Nadie se queda atrás» arma una historia de apoyo mutuo.'],
            ['El cierre', 'Ámbar recibe a una cría asustada: el dolor vivido se vuelve acogida.']]) }),
          bl('Texto', { etiqueta: 'Dónde se separa de tu intención', parrafos: ['La letra muestra cómo separaron a la familia, pero no por qué. La segunda mitad es densa para un niño pequeño. Junco pasa muy rápido de guardia a familia.'] }),
          bl('Cjd', { etiqueta: 'Registro de la decisión', agencia: 'asistida', items: kv([
            ['Decisión', 'Dejar la canción como está.'],
            ['Función', 'Transmitir la separación de la familia sin explicarla con conceptos.'],
            ['Evidencia', 'La alegoría de los animales transmite bien la metáfora.'],
            ['Efecto', 'El audio está bien logrado y es emotivo.']]) })
        ]
      },
      '04': {
        intro: 'La canción se parte en viñetas. Cada viñeta tiene una función dramática y una intensidad; de ahí sale cuánto dura en pantalla.',
        bloques: [
          bl('Campos', { etiqueta: 'El desglose en números', items: kv([
            ['Viñetas', '72, en 335 segundos'], ['Con boceto de 2025', String(cuenta('boceto') || 48)], ['Láminas nuevas', String(cuenta('nueva') || 20)], ['Recicladas', (cuenta('rec') || 4) + ': los coros se repiten']]) }),
          bl('Tabla', { etiqueta: 'Reparto por acto', ancho: '440px', cols: ['Acto', 'Viñetas', 'Segundos', 'Láminas nuevas'], filas: [
            ['Planteamiento', '16', '62.4', '3'], ['Nudo', '42', '190.6', '9'], ['Desenlace', '14', '82.0', '8']],
            nota: 'Lo que falta dibujar es el nido antes del cerco y el valle después del reencuentro.' }),
          bl('Tabla', { etiqueta: 'Duración base por función', ancho: '360px', cols: ['Función', 'Segundos'], filas: [
            ['Impactar', '2.0'], ['Revelar', '2.6'], ['Transitar', '3.2'], ['Reaccionar', '3.8'], ['Decidir', '6.0'], ['Establecer', '6.5'], ['Contemplar', '9.0']],
            nota: 'La intensidad alta acorta el plano de acción.' }),
          bl('Lista', { etiqueta: 'Tus decisiones del 4 de noviembre', items: [
            { n: '1', t: 'Castores', v: 'Son robots; solo Junco se humaniza.' },
            { n: '2', t: 'Formato', v: 'Todo se rehace en 16:9 desde las hojas modelo aprobadas.' },
            { n: '3', t: 'Limpieza', v: 'Se quitan los letreros fantasma de los bocetos de 2025.' },
            { n: '4', t: 'Nuez', v: 'El rescate se descubre en el reflejo del ojo del que se ahoga.' },
            { n: '5', t: 'Coros', v: 'Se reciclan al modo Hanna-Barbera para ahorrar producción.' }] }),
          Object.assign(acc(['Recalcular duraciones', 'Aprobar el desglose']), { url: 'https://claude.ai/artifact/DbURek958vq2Pj2useTovc', urlTexto: 'Abrir la hoja de desglose completa', hayUrl: true })
        ]
      },
      '05': {
        intro: 'Cada viñeta del desglose pide un boceto de línea: composición, pose y dirección de la mirada, sin color todavía.',
        bloques: [
          bl('Avance', { etiqueta: 'Bocetos aprobados', hecho: '45', total: '72', pct: 62.5, nota: 'Las 72 viñetas se producen con 68 láminas.' }),
          bl('Galeria', { etiqueta: 'Banco de bocetos', items: [
            img('f0c2dd45f16ed854dee5d441e8572729', 'Ardillas encerradas en un corral de troncos', 'El encierro'),
            img('67a590ce696bbb3a956ddc42d36fdc93', 'Luciérnagas trazando caminos de luz', 'Las luciérnagas'),
            img('80da97d38536db513948b99f78ade4f4', 'Un mapache sobre una rama, de noche', 'El mapache'),
            img('e31e158fb0afe8ec6fefe7cfdfaa0b02', 'Conejos en un túnel hacia la luz', 'El túnel'),
            img('b44320f3738f784b419f0f22381785db', 'Ardillas en la orilla mientras otras cruzan el río', 'El cruce'),
            img('2734069640d03d4e3dbdafb6584ed560', 'Tortugas en el agua entre luciérnagas', 'Las tortugas'),
            img('f7935faa356a9afcafd937f508981752', 'Ardillas corren de noche bajo la luna llena', 'La carrera'),
            img('2bdd0276a84ea7b85418e8352c321332', 'Una fila de ardillas frente a los jaguares', 'Los jaguares'),
            img('b1bea4c0724977c7c35a9017d9474108', 'Figuras avanzan por un claro entre pinos', 'El éxodo'),
            img('e1cbe6b5f6901e3ba99e36a8ee12f021', 'El Gran Árbol con figuras que caminan hacia él', 'La llegada')] }),
          Object.assign(acc(['Subir un boceto', 'Pedir variantes de composición', 'Aprobar boceto']), { url: 'https://claude.ai/artifact/GWU4LagtLfNuaYjVkrSrnQ', urlTexto: 'Abrir el banco de bocetos', hayUrl: true })
        ]
      },
      '06': {
        intro: 'El animatic pone los bocetos sobre la canción con su duración. Es la primera vez que la obra se ve de corrido.',
        bloques: [
          bl('Vinetas', { etiqueta: 'Las 72 viñetas contra la canción · 5:35', tramos: tramos,
            leyenda: [{ t: 'Con boceto de 2025 (' + cuenta('boceto') + ')', c: COLOR.boceto }, { t: 'Lámina nueva (' + cuenta('nueva') + ')', c: COLOR.nueva }, { t: 'Reciclada del coro (' + cuenta('rec') + ')', c: COLOR.rec }],
            nota: 'El ancho de cada viñeta es su duración, calculada por su función dramática y su intensidad. Al pasar el cursor se ve el verso, la función y el origen. Qué bocetos están aprobados se marcará cuando la app lea el estado de la obra.' }),
          bl('Linea', { etiqueta: 'Por acto', tramos: [
            { t: 'Planteamiento', s: '16 viñetas · 62.4 s', w: 18.6, c: '#C9B27A' }, { t: 'Nudo', s: '42 viñetas · 190.6 s', w: 56.9, c: '#8B6914' }, { t: 'Desenlace', s: '14 viñetas · 82.0 s', w: 24.5, c: '#1F3A5F' }] }),
          bl('Campos', { etiqueta: 'La prueba con otra persona', ancho: '520px', items: kv([
            ['Quién la vio', POR], ['Qué contó', POR], ['Dónde se perdió', POR], ['Qué cambió después', POR]]) }),
          bl('Texto', { etiqueta: 'Cuándo pasa este paso', ancho: '300px', parrafos: ['Cuando otra persona cuenta la historia viendo solo el animatic, sin la letra delante.'] }),
          acc(['Armar el animatic con los bocetos aprobados', 'Ajustar contra la onda de la canción', 'Registrar la prueba'])
        ]
      },
      '07': {
        intro: 'Antes de producir, cada personaje y cada lugar quedan fijados en una hoja modelo, para que sean los mismos en todas las tomas. El aspecto se deriva de la psicología, y la voz, de los dos.',
        bloques: [
          bl('Campos', { etiqueta: 'Ámbar · 1 · psicología', ancho: '520px', items: kv([
            ['Deseo', 'Reencontrar a su madre para devolverles la seguridad a sus hermanos.'],
            ['Necesidad', 'Soltar el control y confiar en los demás.'],
            ['Herida', 'Ver cómo expulsaban a su madre y los encerraban a ellos.'],
            ['Máscara', 'La líder que no se permite temblar.'],
            ['Contradicción', 'Dice que nadie se queda atrás, pero duda en aceptar la ayuda de un antiguo guardia.'],
            ['Miedo', POR], ['La mentira que cree', POR], ['Qué hace si no lo obtiene', POR]]) }),
          bl('Campos', { etiqueta: 'Ámbar · 2 · aspecto y 3 · voz', ancho: '360px', items: kv([
            ['Lo que ya tiene', 'Pelaje anaranjado suave, ojos avellana grandes, postura erguida y atenta.'],
            ['Somatotipo', POR], ['Lenguaje de formas', POR], ['Silueta', POR], ['Paleta', POR],
            ['Timbre', POR], ['Ritmo', POR]]) }),
          bl('Campos', { etiqueta: 'Nivel de conciencia', ancho: '360px', items: kv([['De partida', POR], ['De llegada', POR]]),
            nota: 'El mapa de Hawkins y la morfopsicología se usan aquí como heurística de diseño de personajes: ayudan a pensar el aspecto desde la psicología y no tienen validez científica. Si un rasgo cae en estereotipo, la app lo avisa.' }),
          bl('Galeria', { etiqueta: 'Hojas modelo', ancho: '420px', items: [
            img('b60f665afe12eca1ad486e02ff87c87b', 'Hoja modelo de Ámbar en cuatro vistas', 'Ámbar'),
            img('8cf0a4b9554a08a54b5bfbf6f96fd905', 'Hoja modelo de Junco en cuatro vistas', 'Junco, el único castor de carne')] }),
          bl('Tabla', { etiqueta: 'Fichas que faltan', ancho: '420px', cols: ['Personaje', 'Ficha', 'Hoja modelo'], filas: [
            ['Brizna', POR, POR], ['Nuez', POR, POR], ['La madre', POR, POR], ['Junco', POR, 'aprobada'], ['El Dorado', POR, POR],
            ['La cuadrilla de castores robot', POR, 'aprobada en ChatGPT, falta subirla'], ['Mapache, conejos, búhos, luciérnagas, tortugas', POR, POR], ['Jaguar y águila', POR, POR], ['La cría del final', POR, POR]] }),
          bl('Tabla', { etiqueta: 'Escenarios y luz · arco de la obra', ancho: '520px', cols: ['Viñetas', 'Hora', 'Qué pasa'], filas: [
            ['1 a 7', 'Amanecer', 'El nido en el Bosque Dorado'], ['8 a 16', 'Tarde', 'Llegan las cercas'], ['17 a 44', 'Noche', 'Encierro, organización, fuga y río'],
            ['45 a 47', 'Bajo el agua', 'Nuez se hunde'], ['48 a 51', 'Noche', 'El rescate'], ['52 a 58', 'Amanecer', 'El Gran Árbol y el reencuentro'],
            ['59 a 66', 'Día', 'El valle de trabajo'], ['67 a 72', 'Atardecer', 'El banco y la cría que llega']],
            nota: 'Todo el nudo ocurre en una sola noche. Para que no se vuelva una mancha, dos escenarios nocturnos seguidos nunca comparten fuente de luz: luna abierta, verde de luciérnagas, ámbar de farol, rojo de alarma, plata de agua. La gorra roja y los lentes de los robots son los únicos rojos saturados.' }),
          bl('Galeria', { etiqueta: 'Láminas de escenario', items: [
            img('e1a34bd2e9d700a3deb2cb4d5af55acf', 'Nido en los árboles al amanecer', 'El nido · amanecer'),
            img('37b0c87294534e80857b3df11a06b1d2', 'Remanso del río de noche con luna llena', 'El remanso · noche, luna abierta'),
            img('58308ddc4506f781c650717fcd873a21', 'El Gran Árbol en un valle al amanecer', 'El Gran Árbol · amanecer')] }),
          acc(['Agregar personaje', 'Agregar escenario', 'Aprobar hojas modelo'])
        ]
      },
      '08': {
        intro: 'El guion técnico traduce cada viñeta a cámara. Las filas salen del desglose; lo que la cámara todavía no decide queda por producir.',
        bloques: [
          bl('Tabla', { etiqueta: 'Las 72 viñetas', alto: '520px',
            cols: ['Viñeta', 'Entra', 'Plano', 'Función · intensidad', 'Segundos', 'Qué se ve', 'Actuación'], plantilla: '48px 52px 130px 120px 76px minmax(200px, 2fr) minmax(200px, 2fr)', minimo: '980px',
            filas: VI.map(function (r) { return [String(r.n), r.entra, r.plano, r.funcion + ' · ' + r.intensidad, r.dura.toFixed(1), r.ve, r.micro]; }),
            nota: 'Por producir en cada fila: ángulo, altura, lente, movimiento, composición, luz, transición y sonido.' }),
          bl('Campos', { etiqueta: 'Catálogo por función dramática', ancho: '520px', items: kv([
            ['Dos opciones de catálogo', POR], ['Una referencia canónica', POR], ['Tu aportación', 'El espacio para la decisión propia de cada viñeta.']]) }),
          bl('Texto', { etiqueta: 'Módulo de cámara', ancho: '360px', parrafos: ['Un set en líneas, en 3D, donde colocas la cámara con claves de posición, mirada, pausa, aceleración y lente. El recorrido queda grabado y se repite idéntico en cada pasada, como en la Dykstraflex.'] }),
          acc(['Llenar desde el desglose', 'Abrir el módulo de cámara', 'Aprobar el guion técnico'])
        ]
      }
    };

    var pro = {
      '01': { intro: 'Antes de rodar, el personaje ensaya. La cámara queda fija frente a él y cada línea cae en su cuadro exacto, a 24 cuadros por segundo.', bloques: [
        bl('Campos', { etiqueta: 'La hoja de exposición', ancho: '520px', items: kv([
          ['Diálogo', 'Desglosado por sonidos, cuadro por cuadro.'], ['Acción corporal', 'Primero el cuerpo.'], ['Acción facial', 'Después la cara.'],
          ['Cámara', 'Fija durante el ensayo.'], ['Sonido', 'La canción y las voces temporales.']]) }),
        bl('Campos', { etiqueta: 'Lo que se marca', ancho: '360px', items: kv([
          ['Sostenes vivos', 'Pausas que siguen respirando, en los acentos.'], ['La escucha', 'Una pista propia para quien no habla.'],
          ['Duración media de plano', 'Comparada con la continuidad clásica y la intensificada.']]) }),
        bl('Texto', { etiqueta: 'Con «El bosque cambia»', parrafos: ['Ensayo de Ámbar: por producir. Cada viñeta ya trae su indicación de actuación desde el desglose.'] }),
        acc(['Abrir la sala de ensayo', 'Aprobar la actuación'])] },
      '02': { intro: 'El rodaje tiene dos pantallas: arriba el set visto desde fuera, abajo lo que ve la cámara. La cámara se programa y repite su recorrido.', bloques: [
        bl('Campos', { etiqueta: 'El visor', ancho: '420px', items: kv([
          ['Set', 'Visto desde arriba, en líneas.'], ['Cámara', 'Programable; repite el mismo recorrido en cada pasada.'], ['Luces', 'Colocadas por intención dramática.']]) }),
        bl('Campos', { etiqueta: 'Ficha de toma aprobada', ancho: '420px', items: kv([
          ['Cuadro inicial', POR], ['Cuadro final', POR], ['Duración', POR], ['Movimiento', POR], ['Actuación', POR], ['Luz', POR]]) }),
        acc(['Abrir el visor de rodaje', 'Aprobar la toma'])] },
      '03': { intro: 'Cada lámina se pide con su paquete de referencia y se revisa contra la hoja modelo. Lámina y viñeta son cosas distintas: una lámina puede servir a varias viñetas.', bloques: [
        bl('Campos', { etiqueta: 'El paquete de cada lámina', ancho: '520px', items: kv([
          ['Hoja modelo', 'Del personaje que aparece.'], ['Lámina de ambiente', 'El escenario vacío.'], ['Boceto', 'Como guía de composición.'],
          ['Estilo', 'El bloque de estilo de la obra.'], ['Exclusiones', 'Sin texto, sin firmas, 16:9.'], ['Continuidad', 'Hora y luz según el arco de la obra.']]) }),
        bl('Avance', { etiqueta: 'Láminas a color', hecho: '0', total: '68', pct: 0, ancho: '360px', nota: 'El estado real se leerá del banco permanente de láminas.' }),
        bl('Texto', { etiqueta: 'Lo que falta de la obra', parrafos: ['El nido antes del cerco y el valle después del reencuentro.'], ancho: '360px' }),
        acc(['Armar el prompt de la lámina', 'Revisar contra la hoja modelo', 'Aprobar la lámina'])] },
      '04': { intro: 'Cada toma se anima a partir de su primer y su último cuadro, con la duración del guion técnico y las notas de la sala de ensayo.', bloques: [
        bl('Campos', { etiqueta: 'Lo que lleva cada toma', ancho: '520px', items: kv([
          ['Primer cuadro', 'La lámina aprobada.'], ['Último cuadro', 'Su variante final.'], ['Duración', 'La del guion técnico.'],
          ['Movimiento de cámara', 'El del visor de rodaje.'], ['Actuación', 'Las notas de la sala de ensayo.']]) }),
        bl('Tabla', { etiqueta: 'Qué herramienta conviene para cada tarea', ancho: '420px', cols: ['Tarea', 'Herramienta'], filas: [
          ['Imagen fija', POR], ['Video desde cuadros', POR], ['Interpolación', POR]], nota: 'Tabla viva: se edita conforme cambian las herramientas.' }),
        acc(['Generar la toma', 'Aprobar la toma'])] }
    };

    var post = {
      '01': { intro: 'Primero voces temporales para fijar los tiempos antes del video; después las voces finales y la sincronía de los labios.', bloques: [
        bl('Campos', { etiqueta: 'Las voces', items: kv([['Temporales', POR], ['Finales', POR], ['Sincronía labial', POR]]),
          nota: '«El bosque cambia» es un cómic mudo: la voz es la canción. Esta sección aplica a los productos con diálogo.' }),
        acc(['Grabar voz temporal', 'Aprobar voces'])] },
      '02': { intro: 'El sonido se arma en tres niveles más el silencio. En cada escena se decide dónde respira.', bloques: [
        bl('Lista', { etiqueta: 'Los niveles', items: [
          { n: '1', t: 'Voces', v: 'Siempre inteligibles.' }, { n: '2', t: 'Incidentales y ambientes', v: 'El bosque, el agua, la alarma.' },
          { n: '3', t: 'Música', v: 'La canción.' }, { n: '4', t: 'Silencio', v: 'Por ejemplo, entre el segundo y el tercer golpe.' }] }),
        acc(['Marcar silencios en la línea de tiempo', 'Aprobar el diseño sonoro'])] },
      '03': { intro: 'Cuando hace falta música instrumental, se pide con su duración objetivo y sus secciones; se genera más larga y se edita en frase musical.', bloques: [
        bl('Campos', { etiqueta: 'El pedido de música', items: kv([['Duración objetivo', POR], ['Secciones', POR], ['Punto de corte', 'Siempre al final de una frase musical.']]) }),
        acc(['Armar el pedido', 'Aprobar la música'])] },
      '04': { intro: 'Las tomas se ordenan en una línea de tiempo con sus transiciones. Se exporta una lista de edición para terminar en un editor externo.', bloques: [
        bl('Campos', { etiqueta: 'El montaje', items: kv([['Cuadros por segundo', '24 para cine; 29.97 para televisión y redes.'], ['Transiciones', 'Las del guion técnico.'], ['Lista de edición', POR]]) }),
        acc(['Abrir la línea de tiempo', 'Exportar lista de edición'])] },
      '05': { intro: 'Al final se revisa que todas las tomas se vean de la misma obra, que la voz se entienda en la mezcla y que haya subtítulos.', bloques: [
        bl('Campos', { etiqueta: 'El máster', items: kv([['Color', 'Consistencia entre tomas contra el guion de color.'], ['Mezcla', 'Con la voz siempre inteligible.'], ['Subtítulos', POR]]) }),
        acc(['Revisar color', 'Aprobar máster'])] }
    };

    var eva = {
      '01': { intro: 'La obra se muestra en tres momentos: la canción, el animatic y el corte final. Cada vez se hacen las mismas preguntas.', bloques: [
        bl('Lista', { etiqueta: 'Las preguntas', ancho: '520px', items: [
          { n: '1', t: 'Cuéntala', v: 'En tres frases.' }, { n: '2', t: 'El conflicto', v: 'Quién quería qué y qué se lo impedía.' },
          { n: '3', t: 'Dónde te perdiste', v: 'Se marca en la línea de tiempo.' }, { n: '4', t: 'Qué te dejó', v: '' }, { n: '5', t: 'Qué harías tú', v: '' }] }),
        bl('Tabla', { etiqueta: 'Los tres momentos', ancho: '360px', cols: ['Momento', 'Prueba'], filas: [['Canción', POR], ['Animatic', POR], ['Corte final', POR]],
          nota: 'El mapa de comprensión sigue el modelo de Shannon y Weaver: lo que sale del autor, el ruido y lo que llega.' }),
        acc(['Invitar a una persona', 'Registrar respuestas'])] },
      '02': { intro: 'Se compara lo que llegó al espectador con la premisa y con el para qué del autor.', bloques: [
        bl('Campos', { etiqueta: 'Contra la premisa', items: kv([['Lo que llegó', POR], ['Lo que se perdió', POR], ['Lo que añadió el espectador', POR]]) }),
        acc(['Comparar con la premisa'])] },
      '03': { intro: 'El reporte de Calidad de Justificación de Decisiones (CJD) se redacta desde la traza de lo que decidiste en cada sección, y lo firmas tú.', bloques: [
        bl('Tabla', { etiqueta: 'Las cuatro capas', ancho: '520px', cols: ['Capa', 'Qué revisa'], filas: [
          ['Narrativa', 'Si la historia se sostiene.'], ['Visual y técnica', 'Si la imagen y el sonido sirven a la historia.'],
          ['Humano e IA', 'Qué propuso la IA y qué decidiste tú.'], ['Personal y autoral', 'Qué es tuyo en la obra.']],
          nota: 'Cada capa se califica con una rúbrica de cuatro niveles.' }),
        bl('Texto', { etiqueta: 'Por decidir', parrafos: ['Si la rúbrica de diez criterios del libro acompaña a este reporte o lo sustituye.'], ancho: '320px' }),
        acc(['Generar el reporte desde la traza', 'Firmar el reporte'])] }
    };

    var dis = {
      '01': { intro: 'Tu casa productora firma la obra. Tiene nombre, ident y los tres productos del curso.', bloques: [
        bl('Campos', { etiqueta: 'Tu casa productora', ancho: '420px', items: kv([['Nombre', POR], ['Ident', 'El de CineIAStudio, como ejemplo.']]) }),
        bl('Lista', { etiqueta: 'Los tres productos', ancho: '360px', items: [{ n: '1', t: 'Videoclip', v: '«El bosque cambia».' }, { n: '2', t: 'Comercial', v: POR }, { n: '3', t: 'Corto final', v: POR }] }),
        acc(['Diseñar mi ident', 'Aprobar'])] },
      '02': { intro: 'Las viñetas se diagraman como cómic según lo que piden: acción, drama o comedia.', bloques: [
        bl('Campos', { etiqueta: 'El cómic', items: kv([['Diagramación', 'Según el contenido de cada página.'], ['Globos y cartelas', POR], ['Onomatopeyas', POR], ['Portada', POR]]) }),
        acc(['Diagramar', 'Exportar PDF'])] },
      '03': { intro: 'El cómic animado recorre cada viñeta con paneos y acercamientos, y corta a los clips de video, con la canción, la música, los efectos y el silencio.', bloques: [
        bl('Campos', { etiqueta: 'Por viñeta', items: kv([['Paneo o acercamiento', POR], ['Corte a video', POR], ['Sonido', 'Canción, música, efectos y silencio.']]) }),
        acc(['Armar el cómic animado'])] },
      '04': { intro: 'Antes de publicar se preparan las versiones derivadas y todo lo que acompaña a la obra.', bloques: [
        bl('Campos', { etiqueta: 'Lo que sale', items: kv([
          ['Versiones', 'Trailer, 30 segundos y vertical 9:16.'], ['Metadatos', POR], ['Kit de festival', POR],
          ['Créditos', 'Con los roles humanos y los de la IA.'], ['Nota de uso de IA', 'Firmada por el autor.'],
          ['Licencia', 'Creative Commons, como Recurso Educativo Abierto (REA).'], ['Accesibilidad', POR]]) }),
        acc(['Preparar versiones', 'Publicar'])] },
      '05': { intro: 'La obra abre otras: una guía breve para conversar después de verla y una invitación a que el espectador cuente su propia historia.', bloques: [
        bl('Campos', { etiqueta: 'La pieza puente', items: kv([['Guía de conversación', 'Tres preguntas.'], ['Invitación', 'Que el espectador cuente su historia, que puede volverse una obra nueva.']]) }),
        acc(['Escribir las tres preguntas'])] }
    };

    // ===== Prueba piloto 01 · 19 de noviembre de 2026 =====
    // Todo lo que en la app estaba «por producir» se llena aquí con propuestas para revisar.
    // Fuentes: hoja de desglose y documento de escenarios y luz del 4 de noviembre, láminas del 10 de noviembre, registros de decisión de la app.
    var PROP = 'Propuesta del piloto, por revisar.';
    var num = function (t) { return VI.filter(function (r) { return r.tipo === t; }).map(function (r) { return r.n; }).join(', '); };
    var v = function (n) { return VI[n - 1] || {}; };

    pre['05'].bloques.splice(2, 0, bl('Tabla', { etiqueta: 'Lo que no tiene boceto de 2025', ancho: '520px', cols: ['Origen', 'Viñetas'], plantilla: '160px minmax(0, 1fr)', minimo: '420px', filas: [
      ['Lámina nueva (' + cuenta('nueva') + ')', num('nueva')], ['Reciclada (' + cuenta('rec') + ')', num('rec')]],
      nota: 'Sale de la hoja de desglose. Qué 45 bocetos están aprobados se marcará cuando la app lea el estado de la obra.' }));

    pre['06'].bloques[2] = bl('Campos', { etiqueta: 'La prueba en frío · lector simulado', ancho: '100%', items: kv([
      ['Quién la vio', 'La IA, leyendo solo lo que se ve en las 72 viñetas, sin la letra. No sustituye la prueba con una persona.'],
      ['Qué contó', 'Una familia de ardillas vive feliz hasta que una ardilla dorada y una cuadrilla de castores robot cercan el bosque, expulsan a la madre y encierran a las crías. Con los animales del bosque y un guardia que cambia de lado, escapan, cruzan el río sobre tortugas y salvan al más pequeño cuando se hunde. Encuentran a la madre en un gran árbol, reconstruyen un valle con otros y reciben a una cría que llega sola.'],
      ['Dónde se perdió', 'Viñeta 4: el árbol tejido no se lee como pista hasta la 27. Viñeta 13: no se entiende qué es la hoja que marcan. Viñeta 22: la madre aparece en la orilla sur sin que se vea cómo llegó. Viñeta 33: el recuerdo de Junco joven parece otro personaje. Viñeta 38: el coro reciclado muestra a Ámbar dentro del encierro cuando ya escaparon en la 36.'],
      ['Qué cambiaría', 'Sostener el árbol tejido en la 4; en la 14, que la carreta cruce el río; marcar el recuerdo de la 33 con un viraje de color; para la 38, una lámina nueva en el bosque de raíces o leerla como recuerdo.']]) });
    pre['06'].bloques[3] = bl('Texto', { etiqueta: 'Lo que confirma', ancho: '100%', parrafos: ['La historia se entiende sin palabras: el lector contó los cinco movimientos de la sinopsis. Lo que no llega es lo mismo que no llega en la canción: por qué los separan.'] });

    pre['07'] = {
      intro: 'Antes de producir, cada personaje y cada lugar quedan fijados en una hoja modelo. El aspecto se deriva de la psicología, y la voz, de los dos. En este cómic mudo la voz de la familia es el golpeteo.',
      bloques: [
        bl('Texto', { etiqueta: 'Cómo leer estas fichas', parrafos: ['El mapa de Hawkins y la morfopsicología se usan aquí como heurística de diseño de personajes: ayudan a pensar el aspecto desde la psicología y no tienen validez científica. Cada ficha avisa dónde un rasgo podría caer en estereotipo.'] }),
        bl('Campos', { etiqueta: 'Ámbar · protagonista', ancho: '520px', items: kv([
          ['Deseo', 'Reencontrar a su madre para devolverles la seguridad a sus hermanos.'], ['Necesidad', 'Soltar el control y confiar en los demás.'],
          ['Herida', 'Ver cómo expulsaban a su madre y los encerraban a ellos.'], ['Máscara', 'La líder que no se permite temblar.'],
          ['Contradicción', 'Dice que nadie se queda atrás, pero duda en aceptar la ayuda de un antiguo guardia.'],
          ['Miedo', 'Que la familia se pierda para siempre por no haberla sostenido.'], ['La mentira que cree', 'Si yo suelto, todo se cae.'],
          ['Si no lo obtiene', 'Se endurece y deja de pedir ayuda.'],
          ['Aspecto', 'Cuerpo largo y ligero de trepadora; óvalos con una vertical firme en la espalda; cola alta en S; pelaje anaranjado suave con vientre crema; ojos avellana.'],
          ['Voz', 'El golpeteo: dos cortos, uno largo, siempre con la pausa antes del tercero.'],
          ['Conciencia', 'De partida, miedo; de llegada, aceptación, con un gesto de amor al recibir a la cría.'],
          ['Aviso', 'Que su firmeza no se dibuje con ceño adulto: sigue siendo una cría.']]) }),
        bl('Campos', { etiqueta: 'Junco · el guardia que cambia', ancho: '420px', items: kv([
          ['Deseo', 'Cumplir la orden y pertenecer a la cuadrilla.'], ['Necesidad', 'Recordar quién era antes de la gorra.'],
          ['Herida', 'El puente comunitario que construyó de joven y que nadie usa.'], ['Máscara', 'La gorra roja.'],
          ['Contradicción', 'Cierra el cerrojo y después lo abre.'], ['Aspecto', 'Castor de carne entre robots; formas cuadradas que se ablandan cuando se quita la gorra.'],
          ['Conciencia', 'De partida, culpa; de llegada, voluntad de reparar.'], ['Aviso', 'Su cambio necesita un motivo visible: el golpe de Nuez en la tabla, viñeta 34.']]) }),
        bl('Campos', { etiqueta: 'Brizna · la que busca salidas', ancho: '360px', items: kv([
          ['Deseo', 'Salir.'], ['Necesidad', 'Esperar el momento y hacerlo con otros.'], ['Máscara', 'La inquieta que no tiene miedo.'],
          ['Contradicción', 'Busca salidas sola, pero en el puente se agarra para sostener a los demás.'],
          ['Aspecto', 'Compacta y saltarina, triángulos; cuelga de cabeza; pelaje más oscuro que el de Ámbar.'], ['Conciencia', 'De partida, deseo; de llegada, coraje.']]) }),
        bl('Campos', { etiqueta: 'Nuez · el más pequeño', ancho: '360px', items: kv([
          ['Deseo', 'Estar con mamá.'], ['Necesidad', 'Confiar en que otros lo sostienen.'], ['Máscara', 'El juego: mira la regadera, no la semilla.'],
          ['Contradicción', 'El más frágil es quien hace cambiar a Junco al golpear la tabla.'],
          ['Aspecto', 'Redondo, círculos; cola grande; pelaje claro, dorado pálido.'], ['Conciencia', 'De partida, miedo; de llegada, alegría tranquila.']]) }),
        bl('Campos', { etiqueta: 'La madre', ancho: '360px', items: kv([
          ['Deseo', 'Volver a juntar a sus hijos.'], ['Herida', 'La expulsión.'], ['Máscara', 'La calma.'],
          ['Contradicción', 'Llegó del sur del río y la expulsan al sur.'], ['Aspecto', 'Silueta adulta alargada; el mismo ámbar, más profundo.'],
          ['Voz', 'El golpeteo original: los hijos lo aprendieron de ella.']]) }),
        bl('Campos', { etiqueta: 'El Dorado y la cuadrilla', ancho: '360px', items: kv([
          ['El Dorado', 'Personaje sin arco: divide el bosque con una línea, sin mirar a quién divide.'],
          ['La cuadrilla', 'Robots sin psicología propia: paso idéntico, lentes rojos.'],
          ['Aviso', 'Que la maldad del Dorado esté en el gesto, sin volverlo gordo o feo, y sin parecido con ninguna persona real.']]) }),
        bl('Tabla', { etiqueta: 'Las criaturas del bosque', ancho: '520px', cols: ['Criatura', 'Función', 'Viñetas'], plantilla: '160px minmax(0, 1fr) 90px', minimo: '460px', filas: [
          ['Mapache', 'Trae la señal de mamá', '25 a 27'], ['Conejos', 'Cavan el túnel', '28'], ['Búhos', 'Vigilan desde arriba', '29'],
          ['Luciérnagas', 'Marcan la ruta', '30'], ['Tortugas', 'Hacen el puente y salvan a Nuez', '41 a 51'], ['Jaguar', 'Lleva a la familia', '52 a 54'],
          ['Águila', 'Muestra el lugar', '54'], ['La cría del final', 'Repite el temblor de Nuez', '70 a 72']],
          nota: 'Aviso: el jaguar asusta al entrar y resulta refugio; que su diseño no sea el del depredador de siempre.' }),
        bl('Galeria', { etiqueta: 'Hojas modelo aprobadas', ancho: '420px', items: [
          img('b60f665afe12eca1ad486e02ff87c87b', 'Hoja modelo de Ámbar en cuatro vistas', 'Ámbar'),
          img('8cf0a4b9554a08a54b5bfbf6f96fd905', 'Hoja modelo de Junco en cuatro vistas', 'Junco')] }),
        bl('Tabla', { etiqueta: 'Los escenarios con su luz', alto: '420px', cols: ['Escenario', 'Viñetas', 'Hora', 'Luz dominante'], plantilla: 'minmax(180px, 1.2fr) 90px 140px minmax(220px, 2fr)', minimo: '720px',
          filas: (function () { var f = [], prev = null; VI.forEach(function (r) { var k = r.lugar + r.fuente; if (prev && prev.k === k) { prev.fila[1] = prev.ini + ' a ' + r.n; } else { prev = { k: k, ini: r.n, fila: [r.lugar, String(r.n), r.hora, r.luz] }; f.push(prev.fila); } }); return f; })(),
          nota: 'Diecisiete láminas de escenario generadas: tres en el banco y catorce en el hilo de ChatGPT, por subir. Revisado en el piloto: ningún par de escenarios nocturnos seguidos comparte fuente de luz. El documento de luz pone las viñetas 38 a 40 en el bosque de raíces, pero son recicladas de la 21, la 23 y la 24: se corrigió según su lámina.' }),
        acc(['Agregar personaje', 'Agregar escenario', 'Aprobar fichas'])
      ]
    };

    pre['08'] = {
      intro: 'El guion técnico traduce cada viñeta a cámara. Las primeras columnas salen del desglose; las de cámara, luz y sonido son la propuesta del piloto, hecha por regla a partir del plano, la función y el escenario.',
      bloques: [
        bl('Tabla', { etiqueta: 'Las 72 viñetas', alto: '560px',
          cols: ['Viñeta', 'Entra', 'Plano', 'Ángulo', 'Altura', 'Lente', 'Movimiento', 'Composición', 'Lugar y luz', 'Seg.', 'Transición', 'Actuación', 'Sonido'],
          plantilla: '46px 52px 120px 100px 130px 84px 130px 170px 200px 44px 110px 220px 220px', minimo: '1700px',
          filas: VI.map(function (r) { return [String(r.n), r.entra, r.plano, r.angulo, r.altura, r.lente, r.movimiento, r.composicion, r.lugar + ' · ' + r.luz, r.dura.toFixed(1), r.transicion, r.micro, r.sonido]; }),
          nota: 'Lente en equivalente de 35 mm. Dirección en pantalla: el viaje al sur va siempre de izquierda a derecha; los guardias, de derecha a izquierda. ' + PROP }),
        bl('Tabla', { etiqueta: 'Catálogo por función dramática', cols: ['Función', 'Opción A', 'Opción B', 'Referencia', 'Tu aportación'], plantilla: '100px minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr) 120px', minimo: '900px', filas: [
          ['Establecer', 'Gran plano general fijo, horizonte bajo', 'Grúa que baja y entra al lugar', 'Bambi (1942): la cámara multiplano entra al bosque', 'la escribe el autor'],
          ['Contemplar', 'Plano fijo sostenido con aire', 'Empuje casi imperceptible', 'Mi vecino Totoro (1988): la parada del autobús bajo la lluvia', 'la escribe el autor'],
          ['Impactar', 'Corte seco a primer plano', 'Plano general con entrada brusca', 'Psicosis (1960): la secuencia de la ducha', 'la escribe el autor'],
          ['Revelar', 'Empuje hacia el detalle', 'Paneo que descubre', 'Ciudadano Kane (1941): el recorrido final hasta el trineo', 'la escribe el autor'],
          ['Decidir', 'Primer plano frontal sostenido', 'Detalle de las manos', 'La pasión de Juana de Arco (1928): los primeros planos', 'la escribe el autor'],
          ['Transitar', 'Seguimiento lateral con dirección constante', 'Gran plano general con la fila cruzando', 'Lawrence de Arabia (1962): las travesías del desierto', 'la escribe el autor'],
          ['Reaccionar', 'Plano de reacción después del estímulo', 'Plano y contraplano', 'Tiburón (1975): Brody en la playa', 'la escribe el autor']] }),
        bl('Texto', { etiqueta: 'Módulo de cámara', parrafos: ['Un set en líneas, en 3D, donde colocas la cámara con claves de posición, mirada, pausa, aceleración y lente. El recorrido queda grabado y se repite idéntico en cada pasada, como en la Dykstraflex. En el piloto, los movimientos de la tabla son las claves de partida.'] }),
        acc(['Llenar desde el desglose', 'Abrir el módulo de cámara', 'Aprobar el guion técnico'])
      ]
    };

    var asl = function (a) { var x = VI.filter(function (r) { return r.acto === a; }); return (x.reduce(function (s, r) { return s + r.dura; }, 0) / x.length).toFixed(2); };
    pro = {
      '01': { intro: 'Antes de rodar, el personaje ensaya con la cámara fija. Ejemplo del piloto: viñeta 21, Ámbar golpea la madera del encierro; 5.5 segundos, 132 cuadros a 24 por segundo.', bloques: [
        bl('Tabla', { etiqueta: 'Hoja de exposición · viñeta 21', cols: ['Cuadros', 'Cuerpo', 'Cara', 'Cámara', 'Sonido'], plantilla: '90px minmax(0, 1.3fr) minmax(0, 1fr) 110px minmax(0, 1fr)', minimo: '820px', filas: [
          ['1 a 18', 'Se acerca a la madera; el peso va adelante', 'Mira la madera', 'Fija', 'Canción'],
          ['19 a 26', 'Primer golpe corto; el nudillo baja y rebota', 'Párpados quietos', 'Fija', 'Golpe 1'],
          ['27 a 34', 'Segundo golpe corto', 'Igual', 'Fija', 'Golpe 2'],
          ['35 a 58', 'Sostén vivo: la pata en el aire, el pecho detenido', 'No respira', 'Fija', 'Silencio'],
          ['59 a 82', 'Golpe largo: el nudillo apoya y se queda', 'Cierra los ojos', 'Fija', 'Golpe largo'],
          ['83 a 132', 'Escucha: la cabeza gira, la oreja a la madera', 'Espera; no hay respuesta', 'Fija', 'Canción sola']],
          nota: 'Primero el cuerpo, después la cara. Los cuadros exactos de cada golpe se ajustan contra la onda de la canción. ' + PROP }),
        bl('Campos', { etiqueta: 'Duración media de plano', ancho: '420px', items: kv([
          ['La obra', (335 / 72).toFixed(2) + ' s'], ['Planteamiento', asl('Planteamiento') + ' s'], ['Nudo', asl('Nudo') + ' s'], ['Desenlace', asl('Desenlace') + ' s']]),
          nota: 'Como referencia, David Bordwell mide de 8 a 11 segundos en la continuidad clásica de Hollywood (1930 a 1960) y de 3 a 6 en la continuidad intensificada de los noventa en adelante. La obra queda entre las dos y se calma en el desenlace.' }),
        bl('Texto', { etiqueta: 'La escucha', ancho: '360px', parrafos: ['En la viñeta 21 la pista de quien no habla es la de la madre: en la 22 levanta la cabeza en la orilla sur. Los cuadros 83 a 132 de Ámbar y la reacción de la madre se ensayan juntos.'] }),
        acc(['Abrir la sala de ensayo', 'Aprobar la actuación'])] },
      '02': { intro: 'El rodaje tiene dos pantallas: arriba el set visto desde fuera, abajo lo que ve la cámara. Ejemplo del piloto: viñeta 47, el ojo de Nuez bajo el agua.', bloques: [
        bl('Campos', { etiqueta: 'El visor · viñeta 47', ancho: '420px', items: kv([
          ['Set', 'Bajo el agua: la superficie arriba con la luna rota, Nuez al centro, la tortuga entra por la derecha.'],
          ['Cámara', 'Primerísimo plano del ojo, 100 mm, empuje lento hacia la pupila.'], ['Luces', 'Una sola: el reflejo de la luna en el ojo, único punto claro.']]) }),
        bl('Campos', { etiqueta: 'Ficha de toma', ancho: '420px', items: kv([
          ['Cuadro inicial', 'Pupila contraída, reflejo oscuro.'], ['Cuadro final', 'Pupila dilatada; la tortuga dentro del reflejo.'],
          ['Duración', '2.1 s, 50 cuadros.'], ['Movimiento', 'Empuje lento.'], ['Actuación', 'La pupila se dilata; el reflejo crece.'], ['Luz', 'Luna rota vista desde abajo.']]),
          nota: 'Toma por generar. ' + PROP }),
        acc(['Abrir el visor de rodaje', 'Aprobar la toma'])] },
      '03': { intro: 'Cada lámina se pide con su paquete de referencia y se revisa contra la hoja modelo. Ejemplo del piloto: viñeta 56, la pata de Ámbar sobre la corteza del Gran Árbol, lámina nueva.', bloques: [
        bl('Avance', { etiqueta: 'Láminas de escenario', hecho: '17', total: '17', pct: 100, ancho: '360px', nota: 'Tres en el banco y catorce en el hilo de ChatGPT, por subir al banco.' }),
        bl('Avance', { etiqueta: 'Láminas de viñeta', hecho: '0', total: '68', pct: 0, ancho: '360px', nota: 'Lo que sigue de producción: personaje sobre lámina con la hoja modelo.' }),
        bl('Campos', { etiqueta: 'El paquete de la viñeta 56', items: kv([
          ['Hoja modelo', 'Ámbar, aprobada.'], ['Lámina de ambiente', 'E7, el Gran Árbol al amanecer.'], ['Boceto', 'No hay: es lámina nueva; la composición sale del guion técnico.'],
          ['Estilo', 'El de las láminas del banco: luz cálida, detalle a los bordes, aire en la zona media.'], ['Exclusiones', 'Sin texto, sin firmas, 16:9, nada de arquitectura humana.'],
          ['Continuidad', 'Amanecer pleno, sol bajo sobre la corteza alta, niebla dorada; misma dirección de sol que el nido.']]) }),
        bl('Texto', { etiqueta: 'El pedido para la IA', parrafos: ['Primerísimo plano, 16:9: la pata derecha de Ámbar, la ardilla de la hoja modelo adjunta, apoyada sobre la corteza del Gran Árbol de la lámina adjunta, con el nudillo a punto del tercer golpe. Amanecer pleno, sol bajo desde la izquierda que toca la corteza alta, niebla dorada al pie. Profundidad corta: la corteza nítida, el fondo suave. Sin texto, sin firmas, sin construcciones humanas.'] }),
        bl('Lista', { etiqueta: 'Control de calidad contra la hoja modelo', items: [
          { n: '1', t: 'Proporción', v: 'La pata y los dedos como en la hoja modelo.' }, { n: '2', t: 'Color', v: 'El anaranjado del pelaje y el crema del vientre.' },
          { n: '3', t: 'Luz', v: 'La misma dirección de sol del nido.' }, { n: '4', t: 'Rojos', v: 'Ninguno: solo la gorra y los lentes son rojos.' }] }),
        acc(['Armar el prompt de la lámina', 'Revisar contra la hoja modelo', 'Aprobar la lámina'])] },
      '04': { intro: 'Cada toma se anima a partir de su primer y su último cuadro. Ejemplo del piloto: viñeta 56, el golpeteo en el Gran Árbol.', bloques: [
        bl('Campos', { etiqueta: 'La toma de la viñeta 56', ancho: '420px', items: kv([
          ['Primer cuadro', 'La lámina 56: la pata antes del primer golpe.'], ['Último cuadro', 'La misma lámina con la pata apoyada después del golpe largo.'],
          ['Duración', '5.5 s, 132 cuadros.'], ['Movimiento de cámara', 'Fija, con empuje muy lento.'], ['Actuación', 'Entre el segundo y el tercer golpe no respira.']]) }),
        bl('Tabla', { etiqueta: 'Qué herramienta conviene para cada tarea', ancho: '520px', cols: ['Tarea', 'Lo que se usó en este proyecto'], plantilla: '160px minmax(0, 1fr)', minimo: '460px', filas: [
          ['Imagen fija', 'ChatGPT, imágenes de GPT, para láminas y portadas; Midjourney para la estética de grabado.'],
          ['Video desde cuadros', 'Midjourney, animar con cuadro inicial y final: la portada IV, prueba 1a.'],
          ['Interpolación', 'Midjourney inventó un sombrero duplicado y gente nueva en la prueba 2: cada toma se revisa cuadro por cuadro.'],
          ['Separar capas', 'Segmentación y mapas de profundidad, en las portadas I, II, III y V.']], nota: 'Tabla viva: se edita conforme cambian las herramientas.' }),
        acc(['Generar la toma', 'Aprobar la toma'])] }
    };

    var trans = function (t) { return VI.filter(function (r) { return r.transicion === t; }).length; };
    post = {
      '01': { intro: '«El bosque cambia» es un cómic mudo: nadie habla y la voz es la canción.', bloques: [
        bl('Campos', { etiqueta: 'Las voces en esta obra', items: kv([['Temporal', 'La canción aprobada funciona como pista guía para fijar los tiempos.'], ['Final', 'La misma canción.'], ['Sincronía labial', 'No aplica: los personajes no hablan.']]),
          nota: 'En el comercial y el corto final del curso, esta sección se usa completa.' }),
        acc(['Cargar la pista guía'])] },
      '02': { intro: 'Tres niveles más el silencio. En el piloto, cada escenario ya tiene su ambiente y cada viñeta su sonido en el guion técnico.', bloques: [
        bl('Lista', { etiqueta: 'Los niveles', ancho: '420px', items: [
          { n: '1', t: 'Voces', v: 'La canción.' }, { n: '2', t: 'Incidentales', v: 'El golpeteo, el martillo, la alarma, el agua.' },
          { n: '3', t: 'Ambientes', v: 'Uno por escenario: pájaros del nido, servos del puesto, búhos del bosque de raíces.' }, { n: '4', t: 'Música', v: 'La canción misma.' }] }),
        bl('Tabla', { etiqueta: 'Dónde respira la obra', ancho: '420px', cols: ['Viñeta', 'Silencio'], plantilla: '80px minmax(0, 1fr)', minimo: '360px', filas: [
          ['21, 38, 56', 'Entre el segundo y el tercer golpe'], ['45 a 47', 'Bajo el agua: sonido sordo; la canción se filtra'], ['57', 'Antes de que la madre conteste'], ['72', 'Después del golpe torpe de la cría']] }),
        acc(['Marcar silencios en la línea de tiempo', 'Aprobar el diseño sonoro'])] },
      '03': { intro: 'La canción completa ya existe. La música instrumental hace falta para las versiones derivadas.', bloques: [
        bl('Campos', { etiqueta: 'Pedido de música para el trailer', items: kv([
          ['Duración objetivo', '30 segundos; se pide de 45 y se corta en frase.'], ['Secciones', 'Golpeteo solo, 4 s; tema del coro sin voz, 20 s; un golpe largo y silencio, 6 s.'],
          ['Punto de corte', 'Al final de una frase musical, nunca en medio.']]), nota: PROP }),
        acc(['Armar el pedido', 'Aprobar la música'])] },
      '04': { intro: 'Las 72 viñetas se ordenan en la línea de tiempo con sus transiciones. El piloto ya exporta la lista de edición.', bloques: [
        bl('Campos', { etiqueta: 'El montaje', items: kv([
          ['Cuadros por segundo', '24, salida de cine; 8 041 cuadros en total.'],
          ['Transiciones', trans('Corte') + ' cortes, ' + trans('Corte seco') + ' cortes secos, ' + trans('Fundido encadenado') + ' fundidos encadenados; abre de negro y cierra a negro.'],
          ['Lista de edición', 'CMX 3600, una entrada por viñeta, para terminar en un editor externo.']]) }),
        Object.assign(acc(['Abrir la línea de tiempo', 'Exportar lista de edición']), { url: 'bosque-cambia.edl', urlTexto: 'Descargar la lista de edición del piloto', hayUrl: true })] },
      '05': { intro: 'Al final se revisa que todas las tomas se vean de la misma obra, que la canción se entienda y que haya subtítulos.', bloques: [
        bl('Tabla', { etiqueta: 'El guion de color', ancho: '520px', cols: ['Tramo', 'Color', 'Contraste'], plantilla: '120px minmax(0, 1fr) 90px', minimo: '460px', filas: [
          ['1 a 7', 'Amarillo casi excesivo del amanecer', '2:1'], ['8 a 16', 'Luz plana de tarde que se vuelve áspera', 'hasta 8:1'],
          ['17 a 51', 'Una noche con cinco fuentes que no se repiten seguidas', 'alto'], ['52 a 58', 'Del azul frío al dorado', 'baja'], ['59 a 66', 'Color drenado, luz de trabajo', '1:1'], ['67 a 72', 'Atardecer dorado', 'suave']],
          nota: 'La gorra roja y los lentes de los robots son los únicos rojos saturados.' }),
        bl('Campos', { etiqueta: 'Mezcla y subtítulos', ancho: '360px', items: kv([['Mezcla', 'La letra siempre inteligible; −14 LUFS integrados, la referencia de YouTube y Spotify.'], ['Subtítulos', '65 subtítulos de la letra, con el tiempo de cada viñeta.']]) }),
        Object.assign(acc(['Revisar color', 'Aprobar máster']), { url: 'bosque-cambia.srt', urlTexto: 'Descargar los subtítulos del piloto', hayUrl: true })] }
    };

    eva = {
      '01': { intro: 'La obra se muestra en tres momentos. En el piloto, dos lecturas ya existen y la tercera espera al corte final.', bloques: [
        bl('Tabla', { etiqueta: 'Los tres momentos', ancho: '520px', cols: ['Momento', 'Lectura'], plantilla: '120px minmax(0, 1fr)', minimo: '420px', filas: [
          ['Canción', 'Lectura de la IA, registrada en 03 Canción: se entiende la separación; no llega el porqué.'], ['Animatic', 'Lector simulado, registrado en 06 Animatic: cuenta los cinco movimientos; se pierde en cinco viñetas.'], ['Corte final', 'Con público real, cuando exista el corte.']] }),
        bl('Lista', { etiqueta: 'Las preguntas', ancho: '420px', items: [
          { n: '1', t: 'Cuéntala', v: 'En tres frases.' }, { n: '2', t: 'El conflicto', v: 'Quién quería qué y qué se lo impedía.' },
          { n: '3', t: 'Dónde te perdiste', v: 'Marca el momento en la línea de tiempo.' }, { n: '4', t: 'Qué te dejó', v: 'Una palabra o una imagen.' }, { n: '5', t: 'Qué harías tú', v: 'Si llegara una cría asustada.' }] }),
        bl('Campos', { etiqueta: 'Mapa de comprensión · Shannon y Weaver', items: kv([
          ['Fuente', 'El autor: explicarle a un niño pequeño por qué separaron a su familia.'], ['Mensaje', 'La canción y 72 viñetas.'],
          ['Codificación', 'La fábula de animales y el golpeteo.'], ['Canal', 'Video 16:9, cómic en PDF y cómic animado.'],
          ['Ruido', 'Falta el porqué, la segunda mitad es densa, Junco cambia rápido y el coro reciclado de la 38.'], ['Destino', 'Un niño pequeño, acompañado de un adulto que conversa con él.']]) }),
        acc(['Invitar a una persona', 'Registrar respuestas'])] },
      '02': { intro: 'Se compara lo que llegó con la premisa y con el para qué del autor. En el piloto, con las dos lecturas que ya existen.', bloques: [
        bl('Campos', { etiqueta: 'Contra la premisa', items: kv([
          ['Lo que llegó', 'La separación, el golpeteo como lazo, la ayuda de muchos y la acogida final.'],
          ['Lo que se perdió', 'Por qué los separan: la obra muestra cómo pasa y no la razón.'],
          ['Lo que añadió quien leyó', 'La IA leyó la gorra roja como referencia política directa; la obra no la nombra.'],
          ['Frente al para qué', 'Para un niño pequeño falta una línea que le diga que no fue su culpa.']]) }),
        bl('Texto', { etiqueta: 'Por decidir', parrafos: ['Si la obra añade esa línea, en la letra o en la pieza puente. Mi recomendación es la pieza puente, para no tocar la canción aprobada.'] }),
        acc(['Comparar con la premisa'])] },
      '03': { intro: 'El reporte de Calidad de Justificación de Decisiones (CJD) se redacta desde la traza de lo que decidiste en cada sección, y lo firmas tú. Borrador del piloto con lo que ya está registrado.', bloques: [
        bl('Tabla', { etiqueta: 'Las cuatro capas', cols: ['Capa', 'Lo que está registrado', 'Nivel'], plantilla: '140px minmax(0, 1fr) 150px', minimo: '640px', filas: [
          ['Narrativa', 'Canción sin cambios; premisa, logline y sinopsis en cinco movimientos elegidas entre opciones; conflicto escrito por el autor.', 'por calificar'],
          ['Visual y técnica', 'Castores robot, todo en 16:9, sin letreros, Nuez reescrito, coros reciclados (4 nov.); el nudo en una sola noche; mundo sin humanos (10 nov.).', 'por calificar'],
          ['Humano e IA', 'Agencia asistida: la IA propuso alternativas y el autor eligió o escribió la suya.', 'por calificar'],
          ['Personal y autoral', 'La intención: explicarle a un niño por qué separaron a su familia, desde hechos reales.', 'por calificar']],
          nota: 'El nivel se califica con la rúbrica de cuatro niveles, o con la de diez criterios del libro: decisión pendiente.' }),
        bl('Lista', { etiqueta: 'Lo que encontró el piloto', items: [
          { n: '1', t: 'Viñeta 38', v: 'El coro reciclado muestra a Ámbar dentro del encierro cuando ya escaparon.' },
          { n: '2', t: 'Viñetas 38 a 40', v: 'El documento de luz las pone en el bosque de raíces; por su lámina son el encierro, el claro de los hongos y el bosque.' },
          { n: '3', t: 'El porqué', v: 'Ni la canción ni las imágenes dicen por qué los separan.' },
          { n: '4', t: 'Viñetas 4, 13, 22 y 33', v: 'Piden una pista visual más clara.' },
          { n: '5', t: 'Hojas modelo', v: 'Faltan Brizna, Nuez, la madre, el Dorado y las criaturas; la cuadrilla está aprobada pero no subida.' }] }),
        acc(['Generar el reporte desde la traza', 'Firmar el reporte'])] }
    };

    dis = {
      '01': { intro: 'Tu casa productora firma la obra. En el piloto, la casa es CineIA Studio.', bloques: [
        bl('Campos', { etiqueta: 'La casa productora del piloto', ancho: '420px', items: kv([['Nombre', 'CineIA Studio.'], ['Ident', 'La ardilla en salto: logo, disco, carrera y ocho fases.']]) }),
        bl('Lista', { etiqueta: 'Los tres productos', ancho: '420px', items: [
          { n: '1', t: 'Videoclip', v: '«El bosque cambia», 5:35.' },
          { n: '2', t: 'Comercial', v: 'Propuesta: 30 segundos con la señal de los golpes como llamado a reunir familias.' },
          { n: '3', t: 'Corto final', v: 'Lo decide el autor.' }] }),
        bl('Galeria', { etiqueta: 'El ident', items: [
          img('62c9d1ae33d627d0cc05cfc3dfad6842', 'Logo de CineIA Studio con la ardilla en salto', 'El logo'), img('2c6be48d0a64372bc4382baa8fb08783', 'Disco de ilusión óptica con Ámbar', 'El disco'),
          img('64abc958f6c9604e05efd41405376a3c', 'Ámbar corre sobre un cable', 'La carrera'), img('2c8b76000caec476e056102a4809ccce', 'Ámbar en ocho fases de salto', 'El salto')] }),
        acc(['Diseñar mi ident', 'Aprobar'])] },
      '02': { intro: 'Las 72 viñetas se diagraman como cómic según lo que pide cada tramo.', bloques: [
        bl('Tabla', { etiqueta: 'La diagramación', cols: ['Tramo', 'Páginas', 'Retícula'], plantilla: '160px 80px minmax(0, 1fr)', minimo: '560px', filas: [
          ['Planteamiento, 1 a 16', '3', 'Retícula regular de cinco o seis viñetas: la calma antes del cerco.'],
          ['Nudo, 17 a 58', '7', 'Viñetas irregulares y diagonales; las de impacto, pequeñas; página completa para el ojo de Nuez (47) y para el abrazo (58).'],
          ['Desenlace, 59 a 72', '3', 'Viñetas anchas y horizontales; página completa para la cría que responde (72).'],
          ['Portada', '1', 'La pata de Ámbar sobre la corteza del Gran Árbol, sin texto dentro de la imagen.']], nota: 'Catorce páginas y portada. ' + PROP }),
        bl('Campos', { etiqueta: 'Globos y sonidos', items: kv([['Globos y cartelas', 'Ninguno: es mudo.'], ['Onomatopeyas', 'Solo el golpeteo, «toc · toc · tooc», puesto sobre la página y nunca dentro de la lámina.']]) }),
        acc(['Diagramar', 'Exportar PDF'])] },
      '03': { intro: 'El cómic animado recorre cada lámina con su movimiento y corta a video solo donde la imagen fija no alcanza.', bloques: [
        bl('Campos', { etiqueta: 'Por viñeta', ancho: '420px', items: kv([
          ['Movimientos', (function () { var c = {}; VI.forEach(function (r) { c[r.comic] = (c[r.comic] || 0) + 1; }); return Object.keys(c).map(function (k) { return k + ': ' + c[k]; }).join(' · '); })()],
          ['Sonido', 'La canción, los incidentales del guion técnico y los silencios marcados.']]) }),
        bl('Tabla', { etiqueta: 'Cortes a video', ancho: '420px', cols: ['Viñeta', 'Por qué'], plantilla: '70px minmax(0, 1fr)', minimo: '360px', filas: [
          ['9', 'La cuadrilla avanza: el paso idéntico necesita movimiento real'], ['24', 'El bosque entero hacia el sur'], ['37', 'Los lentes se encienden todos a la vez'],
          ['41', 'Las tortugas forman el puente'], ['45', 'Nuez se hunde'], ['58', 'El abrazo entre las raíces']], nota: PROP }),
        acc(['Armar el cómic animado'])] },
      '04': { intro: 'Antes de publicar se preparan las versiones derivadas y todo lo que acompaña a la obra.', bloques: [
        bl('Tabla', { etiqueta: 'El trailer de 30 segundos', ancho: '420px', cols: ['Viñeta', 'Segundos'], plantilla: '1fr 90px', minimo: '300px', filas: [
          ['1 · el nido', '3.0'], ['6 · el golpeteo de la madre', '2.4'], ['9 · la cuadrilla', '1.6'], ['10 · el castor robot', '1.6'], ['14 · las dos filas', '1.6'],
          ['15 · las patas por la rendija', '2.1'], ['18 · Nuez tiembla', '3.0'], ['21 · Ámbar golpea', '3.0'], ['30 · las luciérnagas', '3.0'], ['41 · las tortugas', '2.6'], ['Título y negro', '6.1']],
          nota: 'Termina antes del río: nada del rescate ni del reencuentro.' }),
        bl('Campos', { etiqueta: 'Lo que acompaña', ancho: '520px', items: kv([
          ['Versiones', 'Trailer de 30 s, versión completa 16:9 y vertical 9:16 con recorte al centro de la acción.'],
          ['Metadatos', 'Título, logline, 5:35, español, 16:9, 24 cps, 2026; palabras clave: familia, separación, solidaridad, fábula, animación.'],
          ['Kit de festival', 'Ficha técnica, sinopsis de una línea y de un párrafo, cuatro láminas, nota de dirección y créditos.'],
          ['Créditos', 'Idea, letra y dirección: Carlos Eduardo Bustos Hernández. Imágenes generadas con GPT y Midjourney bajo su dirección. Desglose, guion técnico y código con asistencia de Claude. Música: por confirmar.'],
          ['Nota de uso de IA', 'Esta obra se hizo con asistencia de inteligencia artificial para las imágenes, el desglose y el código, bajo la dirección, revisión y aprobación del autor. Carlos Eduardo Bustos Hernández.'],
          ['Licencia', 'Propuesta: Creative Commons BY-NC-SA 4.0 como Recurso Educativo Abierto (REA). La decide el autor.'],
          ['Accesibilidad', 'Subtítulos del piloto; la audiodescripción se arma con la columna «Qué se ve» de las 72 viñetas.']]) }),
        acc(['Preparar versiones', 'Publicar'])] },
      '05': { intro: 'La obra abre otras: una guía breve para conversar después de verla y una invitación a contar la propia historia.', bloques: [
        bl('Lista', { etiqueta: 'Tres preguntas para conversar', ancho: '520px', items: [
          { n: '1', t: 'La señal', v: '¿Qué hacía la familia para encontrarse?' },
          { n: '2', t: 'Junco', v: '¿Por qué crees que Junco se quitó la gorra?' },
          { n: '3', t: 'La cría', v: 'Si llegara a tu casa alguien asustado, ¿qué le ofrecerías?' }] }),
        bl('Texto', { etiqueta: 'La invitación', ancho: '360px', parrafos: ['Inventa con tu familia una señal propia y cuenta la historia de cuándo la usarían. Esa historia puede ser la próxima obra.', 'Para el adulto que acompaña: si el niño pregunta por qué los separaron, la respuesta empieza por decirle que no fue culpa de nadie de la familia.'] }),
        acc(['Escribir las tres preguntas'])] }
    };

    var todo = { pre: pre, pro: pro, post: post, eva: eva, dis: dis };
    Object.keys(todo).forEach(function (f) {
      Object.keys(todo[f]).forEach(function (n) {
        var l = lecturas(f + '-' + n);
        if (l) todo[f][n].bloques.push(l);
      });
    });
    return todo;
  };
})();
