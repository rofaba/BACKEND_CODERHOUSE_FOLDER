const express = require('express');
const app = express();
const { Router } = express;
const productos = [
    {
        "title": "Funko Pop Star Wars: The Mandalorian",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/5176rALHhgS._AC_UL480_FMwebp_QL65_.jpg",
        "id": 1
    },
    {
        "title": "Funko Pop Televisión: Silicon Valley Gilfoyle",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/41PsLYv3r2L._AC_.jpg",
        "id": 2
    },
    {
        "title": "Funko Pop Star Wars: The Mandalorian",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/51d9zjK3DdL._AC_SX466_.jpg",
        "id": 3
    }
];
const router = Router();

router.get('/', (req, res) => {
    res.json(productos)
})

router.get('/:num', (req, res) => {
    const posicion = Number(req.params.num);
    const elementoBuscado = productos.find((element) => element.id == posicion);
    if (elementoBuscado == undefined) {
        res.json({ error: "producto no encontrado" })

    } else {
        res.json(elementoBuscado)
    }
})

router.post('/', (req, res) => {
    try {
        const nuevoProducto = req.body;
        if (productos.length == 0) {
            nuevoProducto.id = 1
        } else {
            const identificadores = [];
            productos.forEach(element => identificadores.push(element.id));
            nuevoProducto.id = (Math.max(...identificadores) + 1);
        }
        productos.push(nuevoProducto)
        res.json(nuevoProducto)
    }
    catch (error) {
        console.log('Ha ocurrido un error en el proceso', error)
    }
})

router.put('/:num', (req, res) => {
    const idBuscado = Number(req.params.num);
    const elementoBuscado = productos.find((element) => element.id == idBuscado);
    if (elementoBuscado == undefined) {
        res.json({ error: "producto no encontrado" })

    } else {
        elementoBuscado.title = req.body.title;
        elementoBuscado.price = req.body.price;
        elementoBuscado.thumbnail = req.body.thumbnail
        res.json(elementoBuscado)
    }

})

router.delete('/:num', (req, res) => {
    const idBuscado = Number(req.params.num);
    const elementoBuscado = productos.find((element) => element.id == idBuscado);
    if (elementoBuscado == undefined) {
        res.json({ error: "producto no encontrado" })

    } else {
        const indexToDelete = productos.findIndex((element) => element.id == idBuscado)
        productos.splice(indexToDelete, 1)
        console.log(productos)
        res.send('Elemento Eliminado')
    }
})

module.exports = router;
