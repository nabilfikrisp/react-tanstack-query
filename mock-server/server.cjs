const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
// Look for db.json in the same folder as server.cjs
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/api", router);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
  console.log(`Using database: ${path.join(__dirname, "db.json")}`);
});
