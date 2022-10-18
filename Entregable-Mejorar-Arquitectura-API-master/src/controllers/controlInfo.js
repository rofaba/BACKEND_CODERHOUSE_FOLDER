const express = require('express');
const router = express.Router();
const logger = require("pino");
const minimist=require('minimist');
const cluster = require('cluster');

module.exports = {

    getInfo: (req, res) => {
        logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
         const data = {
          "argv": `Argumentos de entrada: ${process.argv.slice(2)}`,
          "so": `Sistema operativo utilizado: ${process.platform}`,
          "verNode": `Versión de Node: ${process.version}`,
          "memoria": `Memoria total reservada - RSS: ${process.memoryUsage().rss} bytes`,
          "pathexec": `Path de ejecución: ${process.execPath}`,
          "processId": `Process Id: ${process.pid}`,
          "folder": `Carpeta de proyecto: ${process.cwd()}`,
          // Procesadores - Desafío Balance de Carga
          "numprocess":`Número de Procesadores: ${require('os').cpus().length}`,
          }
        //   console.log(data)  
          res.render('info', { data: data })
            
      }
    };