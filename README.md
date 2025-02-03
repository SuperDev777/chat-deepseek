# Chat con DeepSeek-R1 en Node.js

Este es un proyecto de chat que utiliza **Ollama** y **DeepSeek** para ofrecer respuestas basadas en procesamiento de lenguaje natural, construido con **Node.js**.

## Tabla de Contenidos
1. [Descripción](#descripción)
3. [Requisitos previos](#requisitos-previos)
4. [Implementación](#implementación)

## Descripción

Este chat implementa un sistema de conversación utilizando las APIs de **Ollama** y **DeepSeek**. El backend está construido con **Express.js**, ofreciendo una interfaz simple para que los usuarios interactúen.

### Tecnologías utilizadas
- **Node.js**: Backend del servidor.
- **Ollama**: Herramienta que permite ejcutar modelos de IA.
- **DeepSeek**: Modelo de lenguage de gran tamaño (LLM).
- **Express.js**: Framework para crear el servidor HTTP.

## Requisitos previos:
- Tener **Node.js** instalado en tu máquina.
- Tener [Ollama](https://ollama.com/) y [deepseek-r1:8b](https://ollama.com/library/deepseek-r1:8b).

## Implementación

### Back-end
Recibimos el `prompt` desde el cliente y se lo enviamos a ollama luego retornamos la respuesta del modelo `deepseek-r1:7b`.

```javascript
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
````

### Front-end
Desde el `index.html` enviamos el texto digitado por el usuario a `http://localhost:3000/chat` y mostramos la respuesta en la pantalla del navegador.

```javascript
btnSend.addEventListener('click', async () => {
    try{
        const prompt = txtPrompt.value.trim();
        if(!prompt){
            return alert('Debes ingresar un prompt!');
        }

        appendMessageToChat(prompt, 'user');

        txtPrompt.value = '';

        showLoading();

        const response = await sendPrompt({ prompt:prompt });

        hideLoading();

        appendMessageToChat(response.data, 'assistant');

    }catch(error){
        console.log(error);
    }
});

const sendPrompt = async (data) => {
    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const json = await response.json();

    return json;
}

````
### Interfaz Web
![magen chat deepseek con node](https://raw.githubusercontent.com/SuperDev777/chat-deepseek/refs/heads/main/chat.png)
