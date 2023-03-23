"use strict";

// src/index.ts
var import_farrow_http = require("farrow-http");
var http = (0, import_farrow_http.Http)();
http.use(() => {
  return import_farrow_http.Response.text("Hello Farrow");
});
http.listen(3e3, () => {
  console.log("server started at http://localhost:3000");
});
//# sourceMappingURL=index.js.map
