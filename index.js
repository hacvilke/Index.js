const http = require("http");
const https = require("https");

const WEBHOOK_ID = "1482118729922773149";
const WEBHOOK_TOKEN = "bHcKK6X9QJKRPJGQihmHOhUMy4lTkxr0TrnX8a2YqM-VNHh3wFr8iktim2MudG7jw6r5";

http.createServer((req, res) => {
  if (req.method !== "POST") return res.end("ok");
  let body = "";
  req.on("data", d => body += d);
  req.on("end", () => {
    const options = {
      hostname: "discord.com",
      path: `/api/webhooks/${WEBHOOK_ID}/${WEBHOOK_TOKEN}`,
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) }
    };
    const r = https.request(options, res2 => {
      res.writeHead(res2.statusCode);
      res2.pipe(res);
    });
    r.write(body);
    r.end();
  });
}).listen(process.env.PORT || 3000);
