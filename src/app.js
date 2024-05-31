import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Configuración de conexión a MongoDB
const username = encodeURIComponent("20460234");
const password = encodeURIComponent("Fernando987");
const uri = `mongodb+srv://${username}:${password}@cluster0.m2ctpdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}
connectToMongoDB();

// Ruta para obtener las notas
app.get('/notas', async (req, res) => {
  try {
    const collection = client.db("miBaseDeDatos").collection("notas");
    const notas = await collection.find({}).toArray();
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las notas" });
  }
});

// Ruta para crear una nueva nota
app.post('/notas', async (req, res) => {
  const { title, description } = req.body;
  try {
    const collection = client.db("miBaseDeDatos").collection("notas");
    const result = await collection.insertOne({ title, description });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la nota" });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://76.76.21.123:${port}`);
});
