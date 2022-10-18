process.on("message", msg => {
    const numeros = {};
  
    for (let i = 0, random; i < msg; i++) {
      random = Math.ceil(Math.random() * 1000);
      numeros[random] = ++numeros[random] || 0;
    }
  
    process.send(numeros);
  });