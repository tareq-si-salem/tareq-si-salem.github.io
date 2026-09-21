// Set the appearance before paint. Midnight is the default; honor explicit choices.
try { const theme = localStorage.getItem('theme'); if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme; } catch (_) { /* Storage is optional. */ }
