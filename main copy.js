import fs from "fs";

// ESCRIBIR ARCHIVO
fs.writeFileSync("./ejemplo.txt", "Hola, buenas noches");

// CONSULTAR SI EXISTE TXT
console.log(fs.existsSync("./ejemplo.txt"));

if (fs.existsSync("./ejemplo.txt")) {
  //LEER txt
  let contenido = fs.readFileSync("./ejemplo.txt", "utf-8");
  console.log(contenido);
}

// AGREGAR TEXTO
fs.appendFileSync("./ejemplo.txt", "\n Buenas tardes");

//ELIMINAR TXT
// fs.unlinkSync("./ejemplo.txt")
