# CineIA Studio

Taller de creación audiovisual con inteligencia artificial. De una idea a una obra que otros entienden.

Autor: Carlos Eduardo Bustos Hernández · Escuela de Diseño del Instituto Nacional de Bellas Artes (EDINBA).

## Qué hay aquí

| Ruta | Qué es |
|---|---|
| `index.html` | Página de presentación: método, los cinco Espacios, la obra de ejemplo, biblioteca y origen. Su botón principal lleva al estudio. |
| `studio/` | El libro de CineIA Studio: tapa, portadas de los cinco capítulos (Preproducción, Producción, Postproducción, Evaluación, Distribución) y el interior de cada uno. |
| `studio/piloto01/` | Prueba piloto 01 (19 de noviembre de 2026), congelada: las 25 secciones llenas con «El bosque cambia», con sus subtítulos (`bosque-cambia.srt`) y su lista de edición (`bosque-cambia.edl`). |
| `assets/img/` | Imágenes: bocetos, láminas de escenario, hojas modelo y capas de las portadas. |
| `assets/js/dc-mini.js` | Intérprete mínimo de las plantillas del libro. |
| `assets/js/portada3d.js` | Relieve y animación de las portadas de capítulo. |
| `assets/js/pasos.js` | Contenido de cada sección del interior de los cinco capítulos. |
| `assets/js/vinetas.js` | Las 72 viñetas de «El bosque cambia», tomadas de la hoja de desglose. |

Es un sitio estático: no necesita instalar nada. Se publica con GitHub Pages desde la rama `main`.

## Lo que sigue

- El guía con voz (dictado, respuesta de la IA, lectura en voz alta y capa invisible de transcripción) irá en una función de servidor, para que la clave de API nunca quede en el código público.
- Que los estados (aprobado, pendiente, 45 de 72) salgan de los datos de la obra y no de texto fijo.
- Activar los botones de acción, la traza de decisiones y el módulo de cámara.

Las cinco portadas de capítulo ya están animadas: I, II, III y V por capas sobre un mapa de profundidad, y IV con video.

## Nota de uso de IA

Este sitio se desarrolló con asistencia de inteligencia artificial (imágenes de GPT; código y textos con Claude), bajo la dirección, revisión y aprobación del autor. Carlos Eduardo Bustos Hernández.
