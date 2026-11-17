(function () {
  var d = document, b = d.body, rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var menu = d.getElementById('menu'), btn = d.querySelector('.menu-btn'), hdr = d.querySelector('.hdr');
  var xs = menu.querySelectorAll('[data-close]'), items = menu.querySelectorAll('.ov-list a'), imgs = menu.querySelectorAll('.ov-view img'), last;
  menu.inert = true;
  function show(i) { imgs.forEach(function (m, k) { m.classList.toggle('on', k === i); }); }
  items.forEach(function (a, i) { a.addEventListener('mouseenter', function () { show(i); }); a.addEventListener('focus', function () { show(i); }); });
  show(0);
  function openMenu() {
    last = d.activeElement; menu.inert = false; menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false'); btn.setAttribute('aria-expanded', 'true'); b.classList.add('lock');
    setTimeout(function () { menu.querySelector('.ov-x').focus(); }, 80);
  }
  function closeMenu(cb) {
    menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); btn.setAttribute('aria-expanded', 'false');
    b.classList.remove('lock'); menu.inert = true;
    if (cb) setTimeout(cb, rm ? 0 : 650); else if (last) last.focus();
  }
  btn.addEventListener('click', openMenu);
  xs.forEach(function (x) { x.addEventListener('click', function () { closeMenu(); }); });
  d.addEventListener('keydown', function (e) {
    if (!menu.classList.contains('open')) return;
    if (e.key === 'Escape') return closeMenu();
    if (e.key === 'Tab') {
      var f = menu.querySelectorAll('a,button'), a = f[0], z = f[f.length - 1];
      if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin) return;
    if (u.pathname === location.pathname) { if (menu.classList.contains('open')) closeMenu(function () { if (u.hash) { var t = d.querySelector(u.hash); if (t) t.scrollIntoView({ behavior: rm ? 'auto' : 'smooth' }); } }); return; }
    e.preventDefault();
    var go = function () { b.classList.add('leaving'); setTimeout(function () { location.href = a.href; }, rm ? 0 : 600); };
    menu.classList.contains('open') ? closeMenu(go) : go();
  });
  addEventListener('pageshow', function () { b.classList.remove('leaving'); });
  var ps = d.querySelectorAll('[data-p]'), tk = false;
  function tick() {
    var y = scrollY; hdr.classList.toggle('sc', y > 60);
    if (!rm) ps.forEach(function (el) { var r = el.parentNode.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) el.style.transform = 'translate3d(0,' + (-r.top * el.dataset.p) + 'px,0)'; });
    tk = false;
  }
  addEventListener('scroll', function () { if (!tk) { tk = true; requestAnimationFrame(tick); } }, { passive: true }); tick();
  var rv = d.querySelectorAll('.rv,.imgrv');
  if ('IntersectionObserver' in window && !rm) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .15 });
    rv.forEach(function (n) { io.observe(n); });
  } else rv.forEach(function (n) { n.classList.add('in'); });
  var y = d.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
