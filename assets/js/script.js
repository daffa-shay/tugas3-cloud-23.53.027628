/* Formulir statis: GitHub Pages tidak menjalankan PHP, jadi ini hanya demo tampilan. */
document.querySelectorAll('form.static-form').forEach(function (f) {
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var note = f.querySelector('.sent-message') || f.querySelector('.static-note');
    if (note) {
      note.textContent = 'Mode demo: formulir ini tidak mengirim data karena situs bersifat statis.';
      note.style.display = 'block';
    }
    f.reset();
  });
});
/* Tahun otomatis di footer */
var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
