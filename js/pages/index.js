// Scroll reveal
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting)
        e.target.classList.add('visible'); });
}, { threshold: 0.12 });
$qa('.fade-up').forEach(el => observer.observe(el));
//# sourceMappingURL=index.js.map