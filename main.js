import http from "http";
import express from "express";
import { promises as fs } from "fs";
import handlebars from "express-handlebars";
import { Server as SocketServer } from "socket.io";

class ProductManager {
  // ...
}

const Manager = new ProductManager("./products.json");

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));

// Definir rutas y lógica para las vistas Handlebars
app.get("/", async (req, res) => {
  const products = Manager.getAllProducts(); // Obtén todos los productos
  res.render("home", { products }); // Vista home.handlebars
});

// ...

// WebSocket para la vista en tiempo real
io.on("connection", (socket) => {
  console.log("New WebSocket connection");
  const products = Manager.getAllProducts(); // Obtén todos los productos

  socket.emit("initialProducts", products); // Enviar productos iniciales al cliente
});

// Resto del código para manejar las solicitudes POST y otros endpoints

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
// ...

app.get("/realtimeproducts", async (req, res) => {
    const products = Manager.getAllProducts(); // Obtén todos los productos
    res.render("realtimeproducts", { products }); // Vista realtimeproducts.handlebars
  });
  
  // ...
  
  server.listen(8080, () => {
    console.log("Server is listening on port 8080");
  });
  
