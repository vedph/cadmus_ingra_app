// https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
(function (window) {
  window.__env = window.__env || {};

  // environment-dependent settings
  window.__env.apiUrl = "http://localhost:39447/api/";
  window.__env.databaseId = "cadmus-ingra";
  window.__env.biblioApiUrl = 'http://localhost:61691/api/';
})(this);
