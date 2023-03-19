const express = require("express");
const app = express();
const { v4 } = require("uuid");

app.use(express.static("public"));

//index.js
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running.");
});

module.exports = app;
