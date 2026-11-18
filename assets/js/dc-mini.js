/*
 * dc-mini.js · CineIA Studio
 * Intérprete mínimo de plantillas para las páginas del libro.
 * Soporta {{ruta}}, <sc-if value>, <sc-for list as> y eventos onClick="{{fn}}".
 */
(function () {
  function resolve(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, scope);
  }
  var WHOLE = /^\s*\{\{([^}]+)\}\}\s*$/;
  function interp(str, scope) {
    return str.replace(/\{\{([^}]+)\}\}/g, function (_, p) {
      var v = resolve(p, scope);
      return v == null ? '' : String(v);
    });
  }
  function process(node, scope) {
    if (node.nodeType === 3) {
      if (node.nodeValue.indexOf('{{') > -1) node.nodeValue = interp(node.nodeValue, scope);
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = node.tagName.toLowerCase();
    if (tag === 'sc-if') {
      var m = WHOLE.exec(node.getAttribute('value') || '');
      var ok = m ? resolve(m[1], scope) : false;
      var frag = node.ownerDocument.createDocumentFragment();
      if (ok) {
        while (node.firstChild) frag.appendChild(node.firstChild);
        Array.prototype.slice.call(frag.childNodes).forEach(function (c) { process(c, scope); });
      }
      node.replaceWith(frag);
      return;
    }
    if (tag === 'sc-for') {
      var lm = WHOLE.exec(node.getAttribute('list') || '');
      var list = lm ? resolve(lm[1], scope) : [];
      var as = node.getAttribute('as') || 'item';
      var out = node.ownerDocument.createDocumentFragment();
      (list || []).forEach(function (item, i) {
        var s = Object.assign({}, scope); s[as] = item; s.$index = i;
        var clone = node.ownerDocument.createDocumentFragment();
        Array.prototype.forEach.call(node.childNodes, function (c) { clone.appendChild(c.cloneNode(true)); });
        Array.prototype.slice.call(clone.childNodes).forEach(function (c) { process(c, s); });
        out.appendChild(clone);
      });
      node.replaceWith(out);
      return;
    }
    Array.prototype.slice.call(node.attributes).forEach(function (a) {
      if (a.value.indexOf('{{') === -1) return;
      var wm = WHOLE.exec(a.value);
      if (/^on/i.test(a.name) && wm) {
        var fn = resolve(wm[1], scope);
        node.removeAttribute(a.name);
        if (typeof fn === 'function') node.addEventListener(a.name.slice(2).toLowerCase(), fn);
        return;
      }
      node.setAttribute(a.name, interp(a.value, scope));
    });
    Array.prototype.slice.call(node.childNodes).forEach(function (c) { process(c, scope); });
  }
  window.DCMini = {
    mount: function (root, templateHTML, component) {
      component.setState = function (patch) {
        Object.assign(component.state, typeof patch === 'function' ? patch(component.state) : patch);
        render();
      };
      function render() {
        var t = document.createElement('template');
        t.innerHTML = templateHTML;
        var vals = component.renderVals();
        Array.prototype.slice.call(t.content.childNodes).forEach(function (c) { process(c, vals); });
        root.replaceChildren(t.content);
        if (component.afterRender) component.afterRender(root);
      }
      render();
      return component;
    }
  };
})();
