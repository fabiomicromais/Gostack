const express = require('express');

const app = express();

const  { uuid, isUuid } = require('uuidv4');  //so esta usando a bib uuid do pacote uuidv4

app.use(express.json());  //para o expresse entender o formato json

/*responsavel em enviar dados do formulario em formato json, usado em post, ou puttermssh   */

//middleware  = interceptador de requisicoes, interrompe totalmente ou altera dados da requisicao
//pode mudar dados da req antes de enviar a aresposta pro usuario
// utiliza quando precisa disparar de forma automatica = identico a trigger
// para usar para interromper nao usa o next no return


///exemplo middleware  - mostra qual rota e os metodos
function logRequests(request,response, next) {
   const {method, url } = request; //pegou metho e url da requisicao

   const logLabel = `[ ${method.toUpperCase()}] ${url}`;

   console.log(logLabel);

   return next(); //libera a resquiscao

}

//middle para validar o id //dessa
function validateProject( request,response,next) {
     const {id} = request.params;

     if(!isUuid(id)) {  // se nao eh uma id valida retorna  vai interroper a requisiao
          return response.status(400).json({error: 'id errada' });
     }
     return next();  //se passou id, comtinua a rota, chama no metodo
 }   //app.put('/projects/:id', validateProject, (request, response ) => {
      //pode usar no metodo ou fazer um use e colocar na rota
    ///app.use('/projects/:id', logRequests);  



//com esse middleware todos os metodos da app sao vasculhados
app.use(logRequests);  //se nao colocar o return next - a req [e interropida]
app.use('/projects/:id', logRequests);  


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

   //console.log(Arrayprojects);

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


app.delete('/projects/:id',  (request, response ) => {
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
