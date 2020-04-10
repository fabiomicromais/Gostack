const express = require('express');

const app = express();

app.use(express.json());  //para o expresse entender o formato json

/*responsavel em enviar dados do formulario em formato json, usado em post, ou puttermssh   */

app.get('/projects', (request, response) => {
    //const query =  request.query;
    const {title, owner } =  request.query;  //pegando desestruturado 
    console.log(title);
   
   return response.json(['1projeto1','projeto 2']);
});

app.post('/projects', (request, response ) => {
   const body = request.body;
   console.log(body);

    return response.json([
     'projeto 1',
     'projeto 2',
     'projeto3',
    ]);
});


app.put('/projects/:id', (request, response ) => {
   const params = request.params;  //
 
   console.log(params);

   return response.json([
    'projeto 4',
    'projeto 2',
    'projeto3',
   ]);
});


app.delete('/projects/:id', (request, response ) => {
   return response.json([
    'projeto 2',
    'projeto3',
   ]);
});


app.listen(3333, () => {
   console.log(['Bask-en startded'])
})

;
