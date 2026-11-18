const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const requested = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = path.resolve(root, requested);

    if (!filePath.startsWith(root + path.sep) && filePath !== path.join(root, "index.html")) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
            res.end(error.code === "ENOENT" ? "Not found" : "Server error");
            return;
        }

        res.writeHead(200, {
            "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
            "Cache-Control": "no-cache"
        });
        res.end(data);
    });
});

server.listen(port, "0.0.0.0", () => {
    process.stdout.write(`OXOP Portfolio running at http://localhost:${port}\n`);
});
