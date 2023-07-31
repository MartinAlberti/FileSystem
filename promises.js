import { promises as fs } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.poducts = [];
  }
  async addProduct(product) {
    try {
      let contenido = await fs.readFile(`./${this.path}`, "utf-8");
      let contenidoJson = JSON.parse(contenido);
      if (contenidoJson.find((prod) => prod.code == product.code)) {
        console.log("Producto ya presente con este codigo");
        return "Producto ya presente con este codigo";
      }
   
      if (product.title && product.description && product.thumbnail && product.code && product.id && product.code != "" && product.stock >= 0) {
        contenidoJson.push(product);
        console.log("producto agregado");
        await fs.writeFile(`./${this.path}`, JSON.stringify(contenidoJson));
        return product;
      }
      else{
        return "Producto incompleto"
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async getProducts() {
    try {
      let contenido = await fs.readFile(`./${this.path}`, "utf-8");
      let contenidoJson = JSON.parse(contenido);
      return contenidoJson;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getProductById(id) {
    try {
      let contenido = await fs.readFile(`./${this.path}`, "utf-8");
      let contenidoJson = JSON.parse(contenido);
      let contenidoExtraidoDelArray;

      contenidoJson.forEach((element) => {
        if (element.id == id) {
          contenidoExtraidoDelArray = element;
        }
      });

      return contenidoExtraidoDelArray;
    } catch (error) {
      console.log(error.mesasge);
    }
  }

  async deleteById(id) {
    try {
      let contenido = await fs.readFile(`./${this.path}`, "utf-8");
      let contenidoJson = JSON.parse(contenido);
      let found = contenidoJson.find((item) => item.id === id);
      if (found == undefined) {
        return console.log("No se encontro el producto");
      } else {
        let toDelete = contenidoJson.indexOf(found);
        contenidoJson.splice(toDelete, 1);
        await fs.writeFile(`./${this.path}`, JSON.stringify(contenidoJson));
        return console.log("Producto eliminado");
      }
    } catch (error) {
      console.log(error.mesasge);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      let contenido = await fs.readFile(`./${this.path}`, "utf-8");
      let contenidoJson = JSON.parse(contenido);
      let foundIndex = contenidoJson.findIndex((item) => item.id === id);

      if (foundIndex === -1) {
        console.log("No se encontro el producto con el ID especificado");
        return null;
      }

      let updatedProduct = { ...contenidoJson[foundIndex], ...updatedFields };
      contenidoJson[foundIndex] = updatedProduct;

      await fs.writeFile(`./${this.path}`, JSON.stringify(contenidoJson));

      console.log("Producto actualizado");
      return updatedProduct;
    } catch (error) {
      console.log(error.mesasge);
    }
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
const product3 = new Product("Cafe", "Nescafe", 3112, "fsd", "943", 22);
const product4 = new Product("Yerba", "Rosamonte", 2210, "asas", "3332",22 );

const updatedFields = {
  title: "Durazno",
};

const productManager = new ProductManager("products.json");

// ADD PRODUCT

// productManager.addProduct(product4).then((res) => {
//   console.log(res);
// });

// UPDATE PRODUCT

// productManager.updateProduct(1,updatedFields).then((res)=>{
//     console.log(res)
// })

// GET PRODUCTS

productManager.getProducts().then((res) => {
  console.log(res);
});

// GET PRODUCTD BY ID

// productManager.getProductById(4).then((res)=>{
//     console.log(res)
// })

// DELETE PRODUCTD BY ID

// productManager.deleteById(3).then((res) => {
//   console.log(res);
// });
