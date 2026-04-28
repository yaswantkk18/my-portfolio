/* ═══ THEME TOGGLE ═══ */
(function() {
  var saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', function() {
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var html = document.documentElement;
      var current = html.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ═══ MOBILE MENU ═══ */
  var hamburger = document.querySelector('.hamburger');
  var navList = document.querySelector('nav ul');

  if (hamburger && navList) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navList.classList.toggle('open');
    });

    document.querySelectorAll('nav ul a').forEach(function(a) {
      a.addEventListener('click', function() {
        navList.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  /* ═══ NAV SCROLL EFFECT ═══ */
  var navEl = document.querySelector('nav');
  if (navEl) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navEl.classList.add('scrolled');
      } else {
        navEl.classList.remove('scrolled');
      }
    });
  }

  /* ═══ SCROLL REVEAL ═══ */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el) { obs.observe(el); });
  }

  /* ═══ MODAL CLOSE HANDLERS ═══ */
  var overlay = document.getElementById('pdfModalOverlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) closePdfModal();
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePdfModal();
  });
});

/* ═══ PDF PREVIEW MODAL ═══ */
function openPdfModal(link, title) {
  var overlay = document.getElementById('pdfModalOverlay');
  var titleEl = document.getElementById('pdfModalTitle');
  var iframe = document.getElementById('pdfModalIframe');
  var openBtn = document.getElementById('pdfModalOpen');
  var loading = document.getElementById('pdfModalLoading');
  if (!overlay) return;

  var embedUrl = link.replace('/view?', '/preview?');

  titleEl.textContent = title;
  openBtn.href = link;
  iframe.src = '';
  loading.style.display = 'flex';
  iframe.style.opacity = '0';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  iframe.src = embedUrl;
  iframe.onload = function() {
    loading.style.display = 'none';
    iframe.style.opacity = '1';
  };
}

function closePdfModal() {
  var overlay = document.getElementById('pdfModalOverlay');
  if (!overlay) return;
  var iframe = document.getElementById('pdfModalIframe');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  if (iframe) iframe.src = '';
}
