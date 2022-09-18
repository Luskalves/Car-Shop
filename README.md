<h1> 🚧 README em construção 🚧 </h1>

<h1> Projeto Car Shop 🚘 </h1>

<h3> Sobre o projeto </h3>

Este é um projeto da <a href="https://www.betrybe.com/">Trybe</a> que eu desenvolvi e tinha como objetivo a criação de uma API CRUD para compra de veículos como carros e motos. Onde seria possível adcionar novos veículos, listar todos, buscar por um específico e deletar um veículo do banco de dados.

<h1> Tecnologias utilizadas 🧑🏿‍💻 </h1>

Durante o desenvolvimento do projeto utilizei as tecnologias a baixo:

* Typescript ✅
* MongoDB ✅
* Mongoose ✅
* Express ✅
* Express-Async-Errors ✅
* Docker ✅
* Postman ✅
* Node.js ✅
* Zod ✅
* Mocha ✅
* Chai ✅
* Ts-Node ✅

<h3> Código já preparado pela trybe ⚙️ </h3>

  A <a href="https://www.betrybe.com/">Trybe</a> já prepara o ambiente para que possamos apenas nos concentrar em desenvolver o necessário. Arquivos de configuração como o ```package.json```, ```Dockerfile``` e ```nyc.config.js``` são alguns dos exemplos de arquivos já configurados pela ```Trybe```.


<h1>O que desenvolvi 🧑🏿‍💻</h1>

Na pasta ```./src``` estão todos os arquivos e pasta de códigos que precisei escrever com exceção dos arquivos ```index.ts``` e ```app.ts``` que não precisei cria-los apenas adicionar as rotas que eu iria utilizar no ``app.ts``` e descomentar o arquivo ```index.ts```.

<h4> Pasta Routes </h4>

Na pasta ```./src/routes```, existem dois arquivos, o ```carRoute``` para a roda de carros e ```motorRoute``` para a rota de motos. Neles existem as intâncias do ```controller```, ```service``` e ```model``` de cada um. Assim como os caminhos e metodos de requisição HTTP para cara caminho específico.

<h4> Pasta Controllers </h4>

Na pasta ```./src/controllers``` estão os controllers para as requisições de carros e motos. Em cada controller eles fazem uma comunicação específica para cada ```service``` que retorna uma resposta adequada para aquilo que foi requisitado assim como um valor de "status" específico para cada requisição.

<h4> Pasta Services </h4>

Na pasta ```/src/services``` estão os arquivos de service para carros e motos, esles são os responsáveis pela comunicação entre o controller e o model fazendo as validações necessárias e retornando os valores esperados das requisições.

Uma das funções do service é validar os corpos das requisições e disparam erros específicos caso alguma coisa estejá fora do padrão, como por exemplo se algum valor do corpo da requisição estiver faltando o erro ```BadRequest``` é disparado. 

<h4> Pasta Model </h4>

Na pasta ```/src/models``` estão os models de carros e motos, são os responsáveis por receber as requisições do service e fazer a comunicação direta com o banco de dados e retornar algum valor caso existam com base nos valores passados pelo service.

<h1> Como usar o projeto </h1>

⚠️ Atenção ⚠️ recomendo utilizar algum programa como o Postman ou extenção do vscode como o Thunder Client para fazer as requisições para a api.

* Clone o projeto.
* Abra a pasta do projeto e instale as dependências com o ```npm install```.
* Use o comando ```docker-compose up -d````para iniciar os containers.
* use o comando ```docker exec -d car_shop npm run dev``` para iniciar o servidor dentro do container.
* Faça alguma requisição para uma rota que exista nos arquivos ```./src/routes```
* Veja o resultado da requisição.

<h2> Exemplos de Requisição e Retorno </h3>

<h3> Requisição do tipo get </h3>

⚠️ É necessário popular o banco antes ⚠️

Requisição na rota: ```http://localhost:3001/cars/```.

Exemplo de retorno: 

```
[
    {
        "_id": "6325eb91a7d87fcc4c62be25",
        "doorsQty": 2,
        "seatsQty": 5,
        "model": "fusca",
        "buyValue": 3500,
        "color": "Red",
        "year": 1963
    },
    {
        "_id": "6325ebbea7d87fcc4c62be27",
        "doorsQty": 4,
        "seatsQty": 5,
        "model": "Honda Civic",
        "buyValue": 3500,
        "color": "Black",
        "status": true,
        "year": 2020
    },
    ...
]
```
