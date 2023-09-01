const CACHE_NAME = "Emerj CACHE";
const urlToCache = [
  "/",
  "/assets/css/Generical.css",
  "main.js",
  "/assets/Icons/capa.png",
  // "https://site.emerj.jus.br/cursos/5",
  // "https://virtual.emerj.com.br/login/index.php",
  // "https://site.emerj.jus.br/admin/login/5",
  // "https://www3.tjrj.jus.br/idserverjus-front/#/login",
  // "https://site.emerj.jus.br/pagina/13/78",
  // "https://site.emerj.jus.br/pagina/1/71",
];
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      console.log("cache aberta");
      cache.addAll(urlToCache);
    })
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
