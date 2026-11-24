/*!
 * i18n.js — Indonesian (default) / English language switcher.
 *
 * HOW IT WORKS
 *   - Every translatable element in index.html carries data-i18n="some.key".
 *     Its text is replaced from the dictionary below when the language changes.
 *   - data-i18n-attr="alt:some.key;aria-label:other.key" translates attributes.
 *   - The text written inside the HTML is the Indonesian default. It is what
 *     search engines and no-JS visitors see; keep it equal to the "id" entry.
 *   - The visitor's choice is remembered in localStorage. A link such as
 *     https://<you>.github.io/<repo>/?lang=en opens the page in English.
 *
 * TO EDIT TEXT : change the same key in BOTH dictionaries (and the HTML fallback).
 * TO ADD A LANGUAGE : add a code to SUPPORTED, a new dictionary below, and a
 *   <button data-lang="xx"> in the .lang-switch group in index.html.
 */
(function () {
  'use strict';

  var DEFAULT_LANG = 'id';
  var SUPPORTED = ['id', 'en'];
  var STORAGE_KEY = 'portfolio-lang'; // keep in sync with the inline script in index.html <head>

  var DICT = {
    id: {
    // ---- Document meta (title + description are swapped by i18n.js) ----
    "meta.title": "Kenneth Johannes Phan — Portofolio Software Engineer",
    "meta.description": "Portofolio Kenneth Johannes Phan, Junior Web Developer berbasis PHP & Laravel.",

    // ---- Navigation + language switcher ----
    "nav.about": "Tentang",
    "nav.experience": "Pengalaman",
    "nav.projects": "Proyek",
    "nav.contact": "Kontak",
    "lang.group": "Pilih bahasa",

    // ---- Hero ----
    "hero.tagline": "Merancang sistem web modular yang menghubungkan kebutuhan bisnis dengan teknologi.",
    "hero.ctaProjects": "Lihat Proyek",
    "hero.ctaContact": "Hubungi Saya",
    "hero.photoAlt": "Foto profil Kenneth Johannes Phan",
    "hero.focus": "Sistem Informasi Bisnis",

    // ---- About ----
    "about.eyebrow": "TABLE 01 — TENTANG",
    "about.title": "Ringkasan Profesional",
    "about.text": "Lulusan Sistem Informasi Bisnis dengan pemahaman kuat dalam analisis proses bisnis, pengelolaan data, dan penerapan teknologi informasi untuk mendukung pengambilan keputusan strategis. Terbiasa bekerja dengan sistem basis data, analisis data, dan perancangan solusi digital yang menjembatani kebutuhan bisnis dengan teknologi. Memiliki kemampuan analitis, pemecahan masalah, serta komunikasi yang baik untuk berkolaborasi lintas divisi — mulai dari tim IT hingga manajemen bisnis. Antusias mengembangkan diri di bidang analisis sistem, manajemen proyek TI, maupun transformasi digital perusahaan.",
    "about.eduHead": "pendidikan",
    "edu.s1.level": "S1",
    "edu.sma.level": "SMA",
    "edu.smp.level": "SMP",
    "edu.sd.level": "SD",
    "edu.s1.name": "Sistem Informasi Bisnis, iSTTS — 2026",

    // ---- Skills ----
    "skills.prog": "Bahasa Pemrograman",
    "skills.lang": "Bahasa",
    "skills.langId": "Bahasa Indonesia",
    "skills.langEn": "Bahasa Inggris",

    // ---- Experience ----
    "exp.eyebrow": "TABLE 02 — PENGALAMAN",
    "exp.title": "Pengalaman Kerja",
    "exp.period": "Agustus 2025 — Juni 2026",
    "exp.summary": "Merancang dan mengembangkan sistem internal berbasis web menggunakan Laravel untuk mendukung operasional lembaga bimbingan belajar, mencakup lebih dari 25 modul fungsional.",
    "exp.p1": "Membangun sistem autentikasi multi-peran (admin, staf, asisten pengajar, orang tua) lengkap dengan 2FA dan reset password otomatis via email.",
    "exp.p2": "Mengembangkan modul presensi siswa, staf, dan asisten, jadwal pengganti, serta penilaian tugas dan sikap belajar.",
    "exp.p3": "Membangun modul keuangan meliputi invoice, bukti pembayaran, dan payroll untuk mengotomatisasi proses manual.",
    "exp.p4": "Mengintegrasikan fitur impor/ekspor data siswa berbasis Excel untuk pengelolaan data dalam jumlah besar.",
    "exp.p5": "Mengimplementasikan notifikasi email otomatis (tagihan jatuh tempo, jadwal pengganti, akun terkunci).",

    // ---- Projects ----
    "proj.eyebrow": "TABLE 03 — PROYEK",
    "proj.title": "Modul & Proyek",
    "proj.sub": "Sebagian modul yang dirancang dan dikembangkan dalam sistem internal Kumon Putro Agung.",
    "proj.1.name": "Sistem Autentikasi Multi-Peran",
    "proj.1.desc": "Login terpisah untuk admin, staf, asisten pengajar, dan orang tua, dengan verifikasi dua faktor dan reset password otomatis lewat email.",
    "proj.1.row1": "role : admin · staf · asisten · orang tua",
    "proj.2.name": "Modul Presensi & Jadwal",
    "proj.2.desc": "Pencatatan presensi siswa, staf, dan asisten, pengelolaan jadwal pengganti, serta penilaian tugas dan sikap belajar.",
    "proj.2.row1": "entitas : siswa · staf · asisten",
    "proj.2.row2": "fitur : jadwal pengganti",
    "proj.3.name": "Modul Keuangan",
    "proj.3.desc": "Invoice, bukti pembayaran, dan payroll otomatis — menggantikan proses pencatatan manual lembaga.",
    "proj.3.row1": "entitas : invoice · pembayaran · payroll",
    "proj.3.row2": "output : notifikasi jatuh tempo",
    "proj.4.name": "Impor / Ekspor Data Excel",
    "proj.4.desc": "Migrasi dan sinkronisasi data siswa dalam jumlah besar melalui berkas Excel, mengurangi input manual.",
    "proj.4.row2": "volume : data siswa massal",

    // ---- Contact + form ----
    "contact.eyebrow": "TABLE 04 — KONTAK",
    "contact.title": "Hubungi Saya",
    "contact.sub": "Terbuka untuk peluang kerja, kolaborasi proyek, maupun sekadar berdiskusi soal sistem & data.",
    "contact.location": "lokasi",
    "contact.formHead": "kirim_pesan()",
    "form.name": "Nama",
    "form.subject": "Subjek",
    "form.message": "Pesan",
    "form.send": "Kirim Pesan",

    // ---- Form status messages (used by script.js, not present in the HTML) ----
    "form.sending": "Mengirim...",
    "form.invalid": "Mohon lengkapi semua kolom dengan benar.",
    "form.success": "Pesan berhasil dikirim. Terima kasih sudah menghubungi saya!",
    "form.error": "Pesan gagal dikirim. Silakan coba lagi atau hubungi saya lewat email.",
    "form.network": "Terjadi kesalahan koneksi. Silakan coba lagi nanti.",
    "form.rateLimited": "Pesan baru saja dikirim. Mohon tunggu sebentar sebelum mengirim lagi.",
    "form.notConfigured": "Formulir belum dikonfigurasi. Silakan hubungi saya lewat email.",

    // ---- Footer ----
    "footer.built": "Dibangun dengan HTML, Bootstrap & EmailJS.",
    "footer.top": "Kembali ke atas ↑"
    },

    en: {
    // ---- Document meta (title + description are swapped by i18n.js) ----
    "meta.title": "Kenneth Johannes Phan — Software Engineer Portfolio",
    "meta.description": "Portfolio of Kenneth Johannes Phan, Junior Web Developer specializing in PHP & Laravel.",

    // ---- Navigation + language switcher ----
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "lang.group": "Select language",

    // ---- Hero ----
    "hero.tagline": "Designing modular web systems that bridge business needs with technology.",
    "hero.ctaProjects": "View Projects",
    "hero.ctaContact": "Contact Me",
    "hero.photoAlt": "Profile photo of Kenneth Johannes Phan",
    "hero.focus": "Business Information Systems",

    // ---- About ----
    "about.eyebrow": "TABLE 01 — ABOUT",
    "about.title": "Professional Summary",
    "about.text": "Business Information Systems graduate with a strong understanding of business process analysis, data management, and applying information technology to support strategic decision-making. Experienced with database systems, data analysis, and designing digital solutions that bridge business needs and technology. Strong analytical and problem-solving skills, plus good communication for collaborating across divisions — from IT teams to business management. Eager to grow in systems analysis, IT project management, and corporate digital transformation.",
    "about.eduHead": "education",
    "edu.s1.level": "Bachelor's",
    "edu.sma.level": "High School",
    "edu.smp.level": "Junior High",
    "edu.sd.level": "Elementary",
    "edu.s1.name": "Business Information Systems, iSTTS — 2026",

    // ---- Skills ----
    "skills.prog": "Programming Languages",
    "skills.lang": "Languages",
    "skills.langId": "Indonesian",
    "skills.langEn": "English",

    // ---- Experience ----
    "exp.eyebrow": "TABLE 02 — EXPERIENCE",
    "exp.title": "Work Experience",
    "exp.period": "August 2025 — June 2026",
    "exp.summary": "Designed and developed web-based internal systems using Laravel to support the operations of a tutoring institution, covering more than 25 functional modules.",
    "exp.p1": "Built a multi-role authentication system (admin, staff, teaching assistants, parents) complete with 2FA and automated password reset via email.",
    "exp.p2": "Developed attendance modules for students, staff, and assistants, make-up class scheduling, and assessment of assignments and learning attitude.",
    "exp.p3": "Built finance modules covering invoices, payment receipts, and payroll to automate manual processes.",
    "exp.p4": "Integrated Excel-based student data import/export features for managing large volumes of data.",
    "exp.p5": "Implemented automated email notifications (overdue invoices, make-up schedules, locked accounts).",

    // ---- Projects ----
    "proj.eyebrow": "TABLE 03 — PROJECTS",
    "proj.title": "Modules & Projects",
    "proj.sub": "A selection of modules designed and developed within the Kumon Putro Agung internal system.",
    "proj.1.name": "Multi-Role Authentication System",
    "proj.1.desc": "Separate logins for admins, staff, teaching assistants, and parents, with two-factor verification and automated password reset via email.",
    "proj.1.row1": "role : admin · staff · assistant · parent",
    "proj.2.name": "Attendance & Scheduling Module",
    "proj.2.desc": "Attendance tracking for students, staff, and assistants, make-up schedule management, and assessment of assignments and learning attitude.",
    "proj.2.row1": "entity : student · staff · assistant",
    "proj.2.row2": "feature : make-up schedule",
    "proj.3.name": "Finance Module",
    "proj.3.desc": "Invoices, payment receipts, and automated payroll — replacing the institution’s manual record-keeping.",
    "proj.3.row1": "entity : invoice · payment · payroll",
    "proj.3.row2": "output : due-date notifications",
    "proj.4.name": "Excel Data Import / Export",
    "proj.4.desc": "Migration and synchronization of large volumes of student data through Excel files, reducing manual input.",
    "proj.4.row2": "volume : bulk student data",

    // ---- Contact + form ----
    "contact.eyebrow": "TABLE 04 — CONTACT",
    "contact.title": "Get in Touch",
    "contact.sub": "Open to job opportunities, project collaborations, or simply a conversation about systems & data.",
    "contact.location": "location",
    "contact.formHead": "send_message()",
    "form.name": "Name",
    "form.subject": "Subject",
    "form.message": "Message",
    "form.send": "Send Message",

    // ---- Form status messages (used by script.js, not present in the HTML) ----
    "form.sending": "Sending...",
    "form.invalid": "Please fill in all fields correctly.",
    "form.success": "Message sent successfully. Thank you for reaching out!",
    "form.error": "Message failed to send. Please try again or email me directly.",
    "form.network": "A connection error occurred. Please try again later.",
    "form.rateLimited": "A message was just sent. Please wait a moment before sending again.",
    "form.notConfigured": "The contact form isn’t configured yet. Please reach me by email instead.",

    // ---- Footer ----
    "footer.built": "Built with HTML, Bootstrap & EmailJS.",
    "footer.top": "Back to top ↑"
    }
  };

  var current = DEFAULT_LANG;

  function storageGet() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function storageSet(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* private mode etc. */ }
  }

  function normalize(code) {
    if (!code) return null;
    code = String(code).toLowerCase().slice(0, 2);
    return SUPPORTED.indexOf(code) !== -1 ? code : null;
  }

  // Priority: ?lang= in the URL  >  saved choice  >  default
  function initialLang() {
    var fromUrl = null;
    try { fromUrl = normalize(new URLSearchParams(window.location.search).get('lang')); } catch (e) {}
    return fromUrl || normalize(storageGet()) || DEFAULT_LANG;
  }

  function t(key) {
    var table = DICT[current] || {};
    if (table[key] != null) return table[key];
    var fallback = DICT[DEFAULT_LANG] || {};
    return fallback[key] != null ? fallback[key] : key;
  }

  function applyTranslations() {
    var root = document.documentElement;
    root.setAttribute('lang', current);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var idx = pair.indexOf(':');
        if (idx < 1) return;
        el.setAttribute(pair.slice(0, idx).trim(), t(pair.slice(idx + 1).trim()));
      });
    });

    document.title = t('meta.title');
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('meta.description'));

    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === current ? 'true' : 'false');
    });

    root.classList.remove('lang-pending');
  }

  function setLang(code) {
    var next = normalize(code);
    if (!next) return;
    var changed = next !== current;
    current = next;
    storageSet(current);
    applyTranslations();
    if (changed) {
      document.dispatchEvent(new CustomEvent('portfolio:langchange', { detail: { lang: current } }));
    }
  }

  function init() {
    current = initialLang();
    applyTranslations();
    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang')); });
    });
  }

  // Public API (used by script.js for form messages)
  window.PortfolioI18n = {
    t: t,
    getLang: function () { return current; },
    setLang: setLang
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
