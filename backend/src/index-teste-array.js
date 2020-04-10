const express = require('express');

const app = express();

const  { uuid } = require('uuidv4');  //so esta usando a bib uuid do pacote uuidv4

app.use(express.json());  //para o expresse entender o formato json

/*responsavel em enviar dados do formulario em formato json, usado em post, ou puttermssh   */

const Arrayprojects = []; // array vazio para armazenar projetos

app.get('/projects', (request, response) => {
    const {title } =  request.query;  //pegando desestruturado 
    
    //faz filtro
    const results = title   //titulo foi preenchido
    ? Arrayprojects.filter(project => project.title.includes(title) ) // para cada projeto no titulo inclui o title
    : Arrayprojects;   //se nao passou nada no filtro vem o array sem filtro                 // includes retorna boolen que ver se o titulo teve conteudo 
    
   return response.json(results);
});


app.post('/projects', (request, response ) => {
   const {title, owner} = request.body;
   
   const project = { id:uuid(), title, owner }  //juntou com os dados vindo do body

   Arrayprojects.push(project); //push adiciona no final do array os dados da const project

   console.log(Arrayprojects);

    return response.json(project); //exibe o projeto criado
});


app.put('/projects/:id', (request, response ) => {
   const {id} = request.params;  //
   const {title, owner} = request.body;
   
   const indexproject = Arrayprojects.findIndex(varproject => varproject.id == id);   //procura em varproject 
                                                                                      //todos project existentes
  if(indexproject < 0)  //verifica se existe id
     { return response.status(400).json({error: 'projeto nao encontrado'}  //seta o http code para 400
      )}
     
   const project = {   //armazena valores 
      id,
      title,
      owner,
   };

  Arrayprojects[indexproject] = project;   //substitui no array com dados que veio do body no id que foi passado


     return response.json(project);
});


app.delete('/projects/:id', (request, response ) => {
   const {id} = request.params;  //
   
      const indexproject = Arrayprojects.findIndex(varproject => varproject.id == id);   //procura em varproject 
                                                                                      //todos project existentes
  if(indexproject < 0)  //verifica se existe id
     { return response.status(400).json({error: 'projeto nao encontrado'}  //seta o http code para 400
      )}
   
     Arrayprojects.splice(indexproject,1); //passoo a quantidade de espa;os para remover a partir de onde ta
     
   
   return response.status(204).send();
});


app.listen(3333, () => {
   console.log(['Bask-en startded'])
})

;
