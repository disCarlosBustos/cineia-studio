/*
 * pasos.js · CineIA Studio
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
