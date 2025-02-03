import express from "express";
import ollama from 'ollama';

const app = express();

const port = 3000;

// config
app.use(express.static("public"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.post("/chat", async (req, res) => {
  try{
    const { prompt } = req.body;

    const response = await ollama.chat({
      model: 'deepseek-r1:7b',
      messages: [ { role: 'user', content: prompt } ]
    });

    // respuesta del modelo
    const content = response.message.content; 

    res.json({ success: true, message: "Exito!", data: content });
  }catch(error){
    res.json({ success: false, message: "Ocurrio un error!"});
  }

});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
