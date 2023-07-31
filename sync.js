import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.poducts = [];
  }
  addProduct(product) {
    let contenido = fs.readFileSync(`./${this.path}`, "utf-8");
    let contenidoJson = JSON.parse(contenido);
    if (contenidoJson.find((prod) => prod.code == product.code)) {
      console.log("Producto ya presente con este codigo")
      return "Producto ya presente con este codigo";
    }

    if (product.code != "" || product.stock >= 0 ) {
     
      contenidoJson.push(product);
      fs.writeFileSync(`./${this.path}`, JSON.stringify(contenidoJson));
    } else {
      return "No puedo cargar un producto vacio";
    }
  }

 
  getProducts() {
    let contenido = fs.readFileSync(`./${this.path}`, "utf-8");
    let contenidoJson = JSON.parse(contenido);
    return contenidoJson;
  }

  getProductById(id) {
    let contenido = fs.readFileSync(`./${this.path}`, "utf-8");
    let contenidoJson = JSON.parse(contenido);
    let contenidoExtraidoDelArray;

    contenidoJson.forEach((element) => {
      if (element.id == id) {
        contenidoExtraidoDelArray = element;
      }
    });

    return contenidoExtraidoDelArray;
  }

  
  deleteById(id) {
    let contenido = fs.readFileSync(`./${this.path}`, "utf-8");
    let contenidoJson = JSON.parse(contenido);
    let found = contenidoJson.find((item) => item.id === id);
    if (found == undefined) {
      return console.log("No se encontro el producto");
    } else {
      let toDelete = contenidoJson.indexOf(found);
      contenidoJson.splice(toDelete, 1);
      fs.writeFileSync(`./${this.path}`, JSON.stringify(contenidoJson));
      return console.log("Producto eliminado");
    }
  }

  updateProduct(id, updatedFields){
    let contenido = fs.readFileSync(`./${this.path}`, "utf-8");
    let contenidoJson = JSON.parse(contenido);
    let foundIndex = contenidoJson.findIndex((item) => item.id === id);

    if (foundIndex === -1) {
      console.log("No se encontro el producto con el ID especificado");
      return null;
    }

    let updatedProduct = { ...contenidoJson[foundIndex], ...updatedFields };
    contenidoJson[foundIndex] = updatedProduct;

    fs.writeFileSync(`./${this.path}`, JSON.stringify(contenidoJson));

    console.log("Producto actualizado");
    return updatedProduct;

  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.incrementarID();
  }
  //static significa metodo de clase
  static incrementarID() {
    if (this.idIncrement) {
      //Atributo de la clase. Si no existe, lo creo. Si existe, lo aumento en 1
      this.idIncrement++; //Si existe, lo aumento en uno
    } else {
      this.idIncrement = 1; //Valor inicial
    }
    return this.idIncrement;
  }
}

const product1 = new Product("Arroz", "Rico", 1000, "asd", "123", 20);
const product2 = new Product("Fideos", "Italia", 2300, "asd", "333", 12);

const updatedFields ={
  title: "Ravioles",
}

const productManager = new ProductManager("products.json");

// productManager.addProduct(product1);
// productManager.addProduct(product2);

console.log(productManager.getProducts());
// console.log(productManager.updateProduct(2,updatedFields))
// console.log(productManager.getProductById(2));
// console.log(productManager.deleteById(2))
