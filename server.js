const http = require("http");
const app = require("./src/app");
const PORT = process.env.PORT || 3333;

http.createServer(app).listen(PORT, () => console.log(`Server running`));
