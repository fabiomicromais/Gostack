const express = require('express');

const app = express();

app.get('/projects', (request, response) => {
   return response.json(['1projeto1','projeto 2']);
});

app.post('/projects', (request, response ) => {
    return response.json([
     'projeto 1',
     'projeto 2',
     'projeto3',
    ]);
});


app.put('/projects/:id', (request, response ) => {
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
