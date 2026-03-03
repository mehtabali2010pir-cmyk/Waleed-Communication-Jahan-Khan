// ── MOBILE DRAWER ──
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navOverlay   = document.getElementById('navOverlay');
  const drawerClose  = document.getElementById('drawerClose');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    navOverlay.classList.add('open');
    hamburgerBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    navOverlay.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', () => mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer());
  drawerClose.addEventListener('click', closeDrawer);
  navOverlay.addEventListener('click', closeDrawer);

  // Close drawer on nav link click
  document.querySelectorAll('.mobile-drawer a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  // ── ACCORDION in drawer ──
  document.querySelectorAll('.drawer-accordion').forEach(acc => {
    acc.querySelector('.drawer-acc-toggle').addEventListener('click', () => {
      const isOpen = acc.classList.contains('expanded');
      // close all
      document.querySelectorAll('.drawer-accordion').forEach(a => a.classList.remove('expanded'));
      if (!isOpen) acc.classList.add('expanded');
    });
  });

  // ── MOBILE SEARCH TOGGLE ──
  const searchToggleBtn = document.getElementById('searchToggleBtn');
  const mobileSearch    = document.getElementById('mobileSearch');
  const mobileSearchInput = document.getElementById('mobileSearchInput');

  searchToggleBtn.addEventListener('click', () => {
    const isOpen = mobileSearch.classList.contains('open');
    mobileSearch.classList.toggle('open');
    if (!isOpen) setTimeout(() => mobileSearchInput.focus(), 50);
  });

  // ── SEARCH HANDLERS ──
  function doSearch(val) {
    if (val.trim()) alert('Searching for: ' + val.trim());
  }
  document.getElementById('desktopSearchBtn').addEventListener('click', () => doSearch(document.getElementById('desktopSearch').value));
  document.getElementById('desktopSearch').addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(e.target.value); });
  document.getElementById('mobileSearchBtn').addEventListener('click', () => doSearch(mobileSearchInput.value));
  mobileSearchInput.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(e.target.value); });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── SERVICE CARD ANIMATIONS ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = (i * 0.1) + 's';
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.service-card').forEach(card => observer.observe(card));

  // Close mobile search when clicking outside
  document.addEventListener('click', e => {
    if (!mobileSearch.contains(e.target) && !searchToggleBtn.contains(e.target)) {
      mobileSearch.classList.remove('open');
    }
  });

