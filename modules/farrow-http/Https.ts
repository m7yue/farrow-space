import { Https, Response } from "farrow-http";
import fs from 'fs'
import path from 'path'

const CERT = fs.readFileSync(path.join(__dirname, "./keys/https-cert.pem"));
const KEY = fs.readFileSync(path.join(__dirname, "./keys/https-key.pem"));
const CA = fs.readFileSync(path.join(__dirname, "keys/https-csr.pem"));

/**
 * 和 http 区别在于 tls 选项
 */
const https = Https({
  tls: {
    cert: CERT,
    ca: CA,
    key: KEY,
  },
});

// add http middleware
https.use(() => {
  // returning response in middleware
  return Response.text(`Hello Farrow`);
});

https.listen(3000);