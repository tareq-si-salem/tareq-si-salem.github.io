// assets/analytics.js
// Click / outbound-link tracking on top of Umami.
// Load this AFTER the Umami script.js snippet.

(function () {
  "use strict";

  function send(name, data) {
    if (window.umami && typeof window.umami.track === "function") {
      window.umami.track(name, data);
    }
  }

  // Current page, e.g. "publications.html"
  function currentPage() {
    var p = location.pathname.replace(/^\/+/, "");
    return p === "" ? "index.html" : p;
  }

  document.addEventListener(
    "click",
    function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;

      var page = currentPage();
      var href = a.getAttribute("href") || "";
      var label = (a.textContent || "").trim().slice(0, 60) || "link";

      // mailto: links
      if (href.indexOf("mailto:") === 0) {
        send("email-click", { page: page });
        return;
      }

      var url;
      try {
        url = new URL(a.href, location.href);
      } catch (err) {
        return;
      }

      // File downloads (PDFs, slides, images, archives)
      if (/\.(pdf|zip|pptx?|docx?|png|jpe?g|csv)$/i.test(url.pathname)) {
        send("download", {
          file: url.pathname.split("/").pop(),
          page: page
        });
        return;
      }

      // Outbound links (arXiv, Scholar, GitHub, Hugging Face, ...)
      if (url.hostname && url.hostname !== location.hostname) {
        send("outbound", {
          domain: url.hostname,
          url: url.href.slice(0, 120),
          label: label,
          page: page
        });
      }
    },
    true
  );
})();
