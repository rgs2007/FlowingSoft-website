// Google Analytics 4, shared by every page. Paste the property's "G-..." ID
// into GA_MEASUREMENT_ID; while it is empty, nothing is loaded or tracked.
(function () {
  const GA_MEASUREMENT_ID = "";

  if (!GA_MEASUREMENT_ID) {
    return;
  }

  function loadGtag(measurementId) {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  }

  // Interest forms post to FormSubmit; record a lead with only the product name
  // (never the visitor's email or message).
  function trackFormSubmissions() {
    document.addEventListener("submit", function (event) {
      const productField = event.target.querySelector('input[name="product_name"]');
      window.gtag("event", "generate_lead", {
        product_name: productField ? productField.value : "Flowing Soft",
      });
    });
  }

  loadGtag(GA_MEASUREMENT_ID);
  trackFormSubmissions();
})();
