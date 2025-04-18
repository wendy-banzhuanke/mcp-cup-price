import http from "http";

const colorPriceMap = {
  red: 10,
  blue: 12,
  green: 11,
  yellow: 9,
  black: 13
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/cup-price" && url.searchParams.has("color")) {
    const color = url.searchParams.get("color");
    const price = colorPriceMap[color.toLowerCase()];
    res.writeHead(200, { "Content-Type": "application/json" });
    if (price !== undefined) {
      res.end(JSON.stringify({ color, price }));
    } else {
      res.end(JSON.stringify({ error: "未知颜色" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "未找到接口" }));
  }
});

server.listen(3000, () => {
  console.log("服务器已启动，端口3000");
});