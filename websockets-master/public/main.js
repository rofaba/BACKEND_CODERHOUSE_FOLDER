
const socket = io.connect();
const date = new Date();

socket.on('productos', data => {
    console.log(data);
    renderTabla(data);
});

socket.on('mensajes', msg => {
    console.log(msg);
    renderMensajes(msg);
})

function renderTabla(data) {
    const sinProductos = `<h3 style= "color:red";> No hay productos para mostrar </h3>`
    if (data.length == 0) {
        document.querySelector(".table").innerHTML = sinProductos

    } else {
        const tabla = data.map((elem) => {
            return (`  
                   <tr>                  
                    <td> ${elem.id} </td>
                    <td> ${elem.title} </td>
                    <td> ${elem.price} </td>
                    <td> <img src= ${elem.thumbnail} alt=${elem.title}} width="40px"></td>
                   </tr> 
                `)
        })
        document.querySelector(".table").innerHTML = `
        <tr>
        <th> Id</th>
        <th> Nombre </th>
        <th> Precio </th>
        <th> Imagen </th>    
        </tr>
        ${tabla}`
    }
}

// RENDERIZAR LOS MENSAJES

function renderMensajes(mensajes) {

        const chatWeb = mensajes.map((elem) => {
        return (`<div>
        <span style = "color:blue;"> <b>${elem.author}</b>: </span> 
        <span style = "color:brown;"> ${elem.fecha} </style> </span>
        <span style = "color: green; font-style:italic "<em>${elem.text}</em> </span>
            </div>`)
    }).join(" ");
    document.querySelector("#messages").innerHTML = chatWeb;
}

function addMessage(e) {
    const email = document.getElementById('username');

    if (email.value) {
        const mensaje = {
            author: document.getElementById('username').value,
            text: document.getElementById('texto').value,
            fecha: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        };
        socket.emit('new-mensaje', mensaje);
        return false;
    } else {
        alert("Debes ingresar tu e-mail para utilizar el chat")
    }
}