import { default as handler } from "./dist/server/index.mjs";
const req = new Request("http://localhost/", { method: "GET" });
try {
  const res = await handler.fetch(req, {}, {});
  const text = await res.text();
  console.log("STATUS:", res.status);
  console.log("HEADERS:", JSON.stringify([...res.headers.entries()]));
  console.log("BODY(head):", text.slice(0, 600));
} catch (e) {
  console.log("THREW:", e && e.stack ? e.stack : e);
}
