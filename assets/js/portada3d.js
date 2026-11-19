/*
 * portada3d.js · CineIA Studio
 * Portadas con volumen: cada dibujo lleva un mapa (R = profundidad, G y B = personajes
 * que se mueven solos). Al mover el ratón, lo cercano se desplaza más que lo lejano,
 * como en un visor estereoscópico. Sin WebGL, queda la imagen fija de respaldo.
 *
 * Uso: <canvas data-portada3d data-img="..." data-mapa="..." data-anim="pro"></canvas>
 *      Portada3D.sincronizar(canvasOnull, () => ({ dentro, mx, my }))
 */
(function () {
  // Movimiento propio de cada portada (unidades: fracción del ancho / alto)
  var ANIM = {
    // I · el fondo con volumen y las ramas al viento; corredores y jabalí corren aparte, en sus tiras de 8 cuadros
    pre: { banda: 690 / 898, foco: 0.30, fuerza: [0.030, 0.020], g: [0.004, 0.002, 3.2], b: [0, 0, 1, 0], c: [0.5, 0.5] },
    // II · el fondo con volumen; el caballo galopa aparte, en su tira de 8 cuadros
    pro: { banda: 685 / 898, foco: 0.30, fuerza: [0.030, 0.020], g: [0, 0, 1], b: [0, 0, 1, 0], c: [0.5, 0.5] },
    // III · Pierrot y Colombina bailan en la pantalla, Paulin sigue la música
    post: { banda: 682 / 898, foco: 0.30, fuerza: [0.028, 0.018], g: [0.009, 0.006, 1.25], b: [0.002, 0.004, 0.68, 0], c: [0.5, 0.5] },
    // IV · el fondo con volumen; la película del tren corre aparte, recortada a la pantalla
    eva: { banda: 683 / 898, foco: 0.30, fuerza: [0.028, 0.018], g: [0, 0, 1], b: [0, 0, 1, 0], c: [0.5, 0.5] },
    // V · Méliès presenta su Luna, que se acerca
    dis: { banda: 684 / 898, foco: 0.30, fuerza: [0.030, 0.020], g: [0.004, 0.003, 2.4], b: [0.075, 0, 4.4, 1], c: [1215 / 1600, 165 / 898] }
  };

  var VS = 'attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*0.5+0.5,0.5-a.y*0.5);gl_Position=vec4(a,0.0,1.0);}';
  var FS = [
    'precision highp float;',
    'varying vec2 v;',
    'uniform sampler2D uImg;uniform sampler2D uMap;',
    'uniform vec2 uMouse;uniform float uT;uniform float uBand;uniform float uFoco;uniform vec2 uFuerza;',
    'uniform vec3 uG;uniform vec4 uB;uniform vec2 uC;uniform vec2 uTexel;',
    'void main(){',
    '  vec2 uv=v;',
    '  if(uv.y>=uBand){gl_FragColor=texture2D(uImg,uv);return;}',
    '  vec2 cen=vec2(0.5,uBand*0.5);',
    '  vec2 p=(uv-cen)/1.035+cen;',
    '  vec3 m=texture2D(uMap,vec2(p.x,p.y/uBand)).rgb;',
    '  vec2 off=uMouse*(m.r-uFoco)*uFuerza;',
    '  off+=m.g*uG.xy*sin(6.28318*uT/uG.z);',
    '  if(uB.w>0.5){float z=uB.x*(0.5-0.5*cos(6.28318*uT/uB.z));off+=m.b*(p-uC)*z;}',
    '  else{off+=m.b*uB.xy*sin(6.28318*uT/uB.z+1.3);}',
    '  vec2 q=clamp(p-off,uTexel,vec2(1.0-uTexel.x,uBand-1.5*uTexel.y));',
    '  gl_FragColor=texture2D(uImg,q);',
    '}'
  ].join('\n');

  var actual = null;
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function cargar(src) {
    return new Promise(function (ok, mal) {
      var im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = function () { ok(im); };
      im.onerror = mal;
      im.src = src;
    });
  }

  function textura(gl, im) {
    var t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
    return t;
  }

  function sombreador(gl, tipo, src) {
    var s = gl.createShader(tipo);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  function iniciar(canvas, fuente) {
    var cfg = ANIM[canvas.getAttribute('data-anim')];
    var gl = cfg && canvas.getContext('webgl', { premultipliedAlpha: false, antialias: false });
    if (!gl) return null;
    var vivo = { canvas: canvas, raf: 0, gl: gl, fin: false };
    var prog = gl.createProgram();
    try {
      gl.attachShader(prog, sombreador(gl, gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, sombreador(gl, gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
    } catch (e) { return null; }
    gl.useProgram(prog);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var la = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(la);
    gl.vertexAttribPointer(la, 2, gl.FLOAT, false, 0, 0);
    var U = {};
    ['uImg', 'uMap', 'uMouse', 'uT', 'uBand', 'uFoco', 'uFuerza', 'uG', 'uB', 'uC', 'uTexel'].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });

    Promise.all([cargar(canvas.getAttribute('data-img')), cargar(canvas.getAttribute('data-mapa'))]).then(function (ims) {
      if (vivo.fin) return;
      gl.activeTexture(gl.TEXTURE0); textura(gl, ims[0]);
      gl.activeTexture(gl.TEXTURE1); textura(gl, ims[1]);
      gl.uniform1i(U.uImg, 0); gl.uniform1i(U.uMap, 1);
      gl.uniform1f(U.uBand, cfg.banda); gl.uniform1f(U.uFoco, cfg.foco);
      gl.uniform2f(U.uFuerza, cfg.fuerza[0], cfg.fuerza[1]);
      gl.uniform3f(U.uG, cfg.g[0], cfg.g[1], cfg.g[2]);
      gl.uniform4f(U.uB, cfg.b[0], cfg.b[1], cfg.b[2], cfg.b[3]);
      gl.uniform2f(U.uC, cfg.c[0], cfg.c[1]);
      gl.uniform2f(U.uTexel, 1 / ims[0].naturalWidth, 1 / ims[0].naturalHeight);
      var mx = 0, my = 0, t0 = performance.now(), primero = true;
      function cuadro(ahora) {
        if (vivo.fin) return;
        var w = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
        var h = Math.round(canvas.clientHeight * Math.min(window.devicePixelRatio || 1, 2));
        if (w && h && (canvas.width !== w || canvas.height !== h)) { canvas.width = w; canvas.height = h; }
        gl.viewport(0, 0, canvas.width, canvas.height);
        var t = quieto ? 0 : (ahora - t0) / 1000;
        var f = fuente(), tx, ty;
        if (f.dentro) { tx = (f.mx - 50) / 50; ty = (f.my - 50) / 50; }
        else if (quieto) { tx = 0; ty = 0; }
        else { tx = 0.45 * Math.sin(t * 0.45); ty = 0.25 * Math.sin(t * 0.31 + 1); }
        mx += (Math.max(-1, Math.min(1, tx)) - mx) * 0.08;
        my += (Math.max(-1, Math.min(1, ty)) - my) * 0.08;
        gl.uniform2f(U.uMouse, mx, my);
        // capas en el DOM (como la tira del galope) siguen el mismo movimiento
        if (canvas.parentElement) {
          canvas.parentElement.style.setProperty('--p3x', mx.toFixed(3));
          canvas.parentElement.style.setProperty('--p3y', my.toFixed(3));
        }
        gl.uniform1f(U.uT, t);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (primero) { primero = false; canvas.style.opacity = '1'; }
        vivo.raf = requestAnimationFrame(cuadro);
      }
      vivo.raf = requestAnimationFrame(cuadro);
    }).catch(function () { /* se queda la imagen fija */ });
    return vivo;
  }

  // perder = true libera el contexto (cuando el lienzo desaparece); con false se reutiliza
  function parar(perder) {
    if (!actual) return;
    actual.fin = true;
    cancelAnimationFrame(actual.raf);
    if (perder !== false) {
      var ext = actual.gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    }
    actual = null;
  }

  // Si la página no da la posición del ratón, la portada la lee ella misma
  function rastrear(canvas) {
    if (canvas.__rastreo) return canvas.__rastreo;
    var est = { dentro: false, mx: 50, my: 50 };
    var caja = canvas.parentElement || canvas;
    caja.addEventListener('pointermove', function (e) {
      var b = caja.getBoundingClientRect();
      est.dentro = true;
      est.mx = ((e.clientX - b.left) / b.width) * 100;
      est.my = ((e.clientY - b.top) / b.height) * 100;
    });
    caja.addEventListener('pointerleave', function () { est.dentro = false; });
    canvas.__rastreo = function () { return est; };
    return canvas.__rastreo;
  }

  function sincronizar(canvas, fuente) {
    var clave = canvas ? canvas.getAttribute('data-img') + '|' + canvas.getAttribute('data-anim') : '';
    if (actual && actual.canvas === canvas && actual.clave === clave) return;
    parar(!(actual && actual.canvas === canvas));
    if (!canvas) return;
    canvas.style.opacity = '0';
    actual = iniciar(canvas, fuente || rastrear(canvas));
    if (actual) actual.clave = clave;
  }

  window.Portada3D = {
    sincronizar: sincronizar,
    parar: parar,
    // Para páginas que redibujan solas: vigila cuándo aparece o desaparece una portada
    vigilar: function (raiz) {
      raiz = raiz || document.body;
      var revisar = function () { sincronizar(raiz.querySelector('canvas[data-portada3d]')); };
      new MutationObserver(revisar).observe(raiz, { childList: true, subtree: true });
      revisar();
    }
  };
})();
