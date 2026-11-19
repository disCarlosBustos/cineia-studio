/*
 * pasos.js · CineIA Studio
 * Contenido simulado de cada sección del interior del libro.
 * Cada sección es una lista de bloques; el tipo del bloque decide cómo se dibuja.
 * Tipos: Texto, Campos, Opciones, Lista, Letra, Galeria, Tabla, Linea, Avance, Cjd, Acciones.
 */
(function () {
  function bl(tipo, o) {
    o = o || {};
    o['es' + tipo] = true;
    o.base = o.ancho ? o.ancho : '100%';
    if (o.url) o.hayUrl = true;
    if (o.nota) o.hayNota = true;
    return o;
  }
  var kv = function (pares) { return pares.map(function (p) { return { k: p[0], v: p[1] }; }); };
  var op = function (t, v, elegida) { return { t: t, v: v, elegida: !!elegida, otra: !elegida }; };
  var acc = function (lista) { return lista.map(function (t, i) { return { t: t, principal: i === lista.length - 1, normal: i !== lista.length - 1 }; }); };

  window.CineIAPasos = function (B) {
    var img = function (id, alt, pie) { return { src: B(id), alt: alt, pie: pie }; };
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
          bl('Acciones', { items: acc(['Pedir otras alternativas', 'Comparar con mi intención', 'Aprobar la idea']) })
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
          bl('Acciones', { items: acc(['Ver las otras opciones', 'Aprobar la historia']) })
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
            ['Función', 'Transmitir la idea de separación, una de las cinco heridas.'],
            ['Evidencia', 'La alegoría de los animales transmite bien la metáfora.'],
            ['Efecto', 'El audio está bien logrado y es emotivo.']]) })
        ]
      },
      '04': {
        intro: 'La canción se parte en viñetas. Cada viñeta tiene una función dramática y una intensidad; de ahí sale cuánto dura en pantalla.',
        bloques: [
          bl('Campos', { etiqueta: 'El desglose en números', items: kv([
            ['Viñetas', '72, en 335 segundos'], ['Con boceto de 2025', '48'], ['Láminas nuevas', '20'], ['Recicladas', '4: los coros se repiten']]) }),
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
          bl('Acciones', { url: 'https://claude.ai/artifact/DbURek958vq2Pj2useTovc', urlTexto: 'Abrir la hoja de desglose completa', items: acc(['Recalcular duraciones', 'Aprobar el desglose']) })
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
          bl('Acciones', { url: 'https://claude.ai/artifact/GWU4LagtLfNuaYjVkrSrnQ', urlTexto: 'Abrir el banco de bocetos', items: acc(['Subir un boceto', 'Pedir variantes de composición', 'Aprobar boceto']) })
        ]
      },
      '06': {
        intro: 'El animatic pone los bocetos sobre la canción con su duración. Es la primera vez que la obra se ve de corrido.',
        bloques: [
          bl('Linea', { etiqueta: 'Línea de tiempo · 5:35', tramos: [
            { t: 'Planteamiento', s: '62.4 s', w: 18.6, c: '#C9B27A' }, { t: 'Nudo', s: '190.6 s', w: 56.9, c: '#8B6914' }, { t: 'Desenlace', s: '82.0 s', w: 24.5, c: '#1F3A5F' }] }),
          bl('Campos', { etiqueta: 'Lo que necesita', ancho: '420px', items: kv([
            ['Canción', 'Aprobada'], ['Desglose', 'Aprobado'], ['Bocetos', '45 de 72'], ['Microacting', 'Una indicación por viñeta']]) }),
          bl('Texto', { etiqueta: 'La prueba de este paso', ancho: '320px', parrafos: ['Otra persona cuenta la historia viendo solo el animatic. Si la cuenta bien, el capítulo puede pasar a Producción.'] }),
          bl('Acciones', { items: acc(['Armar el animatic con los bocetos aprobados', 'Ajustar contra la onda de la canción', 'Mostrar a otra persona']) })
        ]
      },
      '07': {
        intro: 'Antes de producir, cada personaje y cada lugar quedan fijados en una hoja modelo, para que sean los mismos en todas las tomas.',
        bloques: [
          bl('Campos', { etiqueta: 'Ámbar · protagonista', ancho: '440px', items: kv([
            ['Deseo', 'Reencontrar a su madre para devolverles la seguridad a sus hermanos.'],
            ['Necesidad', 'Soltar el control y confiar en los demás.'],
            ['Herida', 'Ver cómo expulsaban a su madre y los encerraban a ellos.'],
            ['Máscara', 'La líder que no se permite temblar.'],
            ['Contradicción', 'Dice que nadie se queda atrás, pero duda en aceptar la ayuda de un antiguo guardia.']]) }),
          bl('Galeria', { etiqueta: 'Hojas modelo', ancho: '420px', items: [
            img('b60f665afe12eca1ad486e02ff87c87b', 'Hoja modelo de Ámbar en cuatro vistas', 'Ámbar'),
            img('8cf0a4b9554a08a54b5bfbf6f96fd905', 'Hoja modelo de Junco en cuatro vistas', 'Junco, el único castor que se humaniza')] }),
          bl('Galeria', { etiqueta: 'Escenarios', items: [
            img('e1a34bd2e9d700a3deb2cb4d5af55acf', 'Nido en los árboles al amanecer', 'El nido'),
            img('37b0c87294534e80857b3df11a06b1d2', 'Remanso del río de noche con luna llena', 'El remanso'),
            img('58308ddc4506f781c650717fcd873a21', 'El Gran Árbol en un valle al amanecer', 'El Gran Árbol')] }),
          bl('Acciones', { items: acc(['Agregar personaje', 'Agregar escenario', 'Aprobar hojas modelo']) })
        ]
      },
      '08': {
        intro: 'El guion técnico traduce cada viñeta a cámara: tamaño de plano, ángulo, movimiento y duración. Aquí se conectará el módulo de cámara.',
        bloques: [
          bl('Tabla', { etiqueta: 'Planos · ejemplo por llenar', cols: ['Viñeta', 'Plano', 'Ángulo', 'Movimiento', 'Segundos', 'Acción'], filas: [
            ['001', 'General', 'Picado', 'Fija', '6.5', 'El nido al amanecer'],
            ['002', 'Conjunto', 'Normal', 'Paneo lento', '6.0', 'Ámbar despierta a sus hermanos'],
            ['003', 'Detalle', 'Normal', 'Fija', '2.6', 'Dos golpes cortos, uno largo sobre la rama'],
            ['004', 'Medio', 'Contrapicado', 'Fija', '3.8', 'Mamá responde desde la rama'],
            ['005', 'General', 'Picado', 'Grúa', '2.0', 'La cuadrilla llega al bosque']],
            nota: 'Las filas son de muestra; se llenan desde el desglose.' }),
          bl('Texto', { etiqueta: 'Módulo de cámara', parrafos: ['Un set en líneas, en 3D, donde colocas la cámara, marcas posiciones y cuántos cuadros dura cada tramo. El movimiento queda grabado para repetirlo en otras pasadas, como en la Dykstraflex.'] }),
          bl('Acciones', { items: acc(['Llenar desde el desglose', 'Abrir el módulo de cámara', 'Aprobar el guion técnico']) })
        ]
      }
    };
    return { pre: pre };
  };
})();
