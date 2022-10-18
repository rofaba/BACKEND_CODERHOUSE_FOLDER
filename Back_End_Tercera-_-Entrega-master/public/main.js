

const socket = io.connect();
const date = new Date();




// socket.on('user', user => {
    
//     renderWelcome(user);
// });


socket.on('productos', data => {
    console.log(data);
    renderTabla(data);
});

socket.on('mensajes', msg => {
    renderMensajes(msg);
   
})
socket.on('compresion', num => {
    console.log(num);
    renderPorcentaje(num);
})

// RENDER NOMBRE USUARIO EN WELCOME

function renderWelcome(name) {
    document.querySelector(".text-success").innerHTML = `Bienvenido ${name}`;
};



function renderPorcentaje(por100) {
    document.querySelector(".porcentaje").innerHTML = `Compresión estimada en ${Math.trunc(por100)} %`;
}

function renderTabla(data) {
    const sinProductos = `<h3 style= "color:red";> No hay productos para mostrar </h3>`
    if (data.length == 0) {
        document.querySelector(".table").innerHTML = sinProductos

    } else {
        const tabla = data.map((elem) => {
            return (`  
                   <tr>                  
                    <td> ${elem.codigo} </td>
                    <td> ${elem.title} </td>
                    <td> ${elem.price} </td>
                    <td> <img src= ${elem.thumbnail} alt=${elem.title}} width="40px"></td>
                   </tr> 
                `)
        })
        document.querySelector(".table").innerHTML = `
        <tr>
        <th> Código</th>
        <th> Nombre </th>
        <th> Precio </th>
        <th> Imagen </th>    
        </tr>
        ${tabla}`
    }
}

// RENDERIZAR LOS MENSAJES
function renderMensajes(mensajes) {

    console.log(mensajes);

        const chatWeb = mensajes.map((elem) => {
        return (`<div>
        <span style = "color:blue;"> <b>${elem.author.id}</b>: </span> 
        <span style = "color: green; font-style:italic "<em>${elem.author.alias}</em> </span>
        <span style = "color: red; font-style:italic "> ${elem.text.message} </span>
        <img src= ${elem.author.avatar} alt=${elem.author.alias}} width="40px">
        </div>`)
    }).join(" ");
    document.querySelector("#messages").innerHTML = chatWeb;
}
//AGREGAR MENSAJE
function addMessage(e) {
 
        const mensaje = {
            author: {
                id: document.getElementById('id').value,
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                alias: document.getElementById('alias').value,
                avatar: document.getElementById('avatar').value
            },
            text: {
                message: document.getElementById('mensaje').value,
                id: 4           }
        };
        socket.emit('new-mensaje', mensaje);
        return false;
    }