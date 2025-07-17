import fastify from "fastify";

// GET, POST, PUT, PATCH e DELETE

const app = fastify();

app.get("/hello", () => {
  return "Hello caraio";
});

// PARA RODAR O SERVER EM JS SEM CONVERTER/CRIAR ARQUIVO, EXECUTAR O COMANDO "NPX TSX ARQUIVO.EXTENSAO" -- RECOMENDADO PARA USAR EM DESENVOLVIMENTO, NAO RECOMENDADO PARA PRODUÇÃO

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP SERVER RUNNING AT PORT 3333");
  });

// EcmaScript Lint = ES Lint
