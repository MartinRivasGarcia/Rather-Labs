const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors  = require("cors");

var schema = buildSchema(`
    type Client {
        id: Int
        name: String
    }
    type Query {
        clients: [Client]
        client(id : Int): Client
    }
    type Mutation {
        addClient(name : String, number : String): Client
    }
`);

let clients = [
    'Maths',
    'Spanish',
    'History',
    'Geography',
    'Biology',
    'Art'
]

let classes = []

for (let i = 0; i < clients.length; i++) {
    const element = {'id': i , 'name': clients[i]};
    classes.push(element)
}

var counter = 6

var root =  {
    clients : () => { return classes },
 
    client : (data) => {
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id == data.id) {
                return clients[i]
            }
        }
        return null
    },

    addClient: (data) => {
        var c = { 'id':counter, 'name':data.name };
        clients.push(c)
        counter ++;
        return c;
    }
};

const app = express();

app.use(cors());
app.use(express.json());

// Importar AuthService
//const authService = require("./modules/authService");

app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
      rootValue: root,
    }),
  )


app.listen(3001, ()=>{
    console.log("Server listening port 3001")
})

app.post("/graphql", (req, res) => {
    let query = req.body.query;
    console.log(query)
    graphql(schema, query).then(result => {
      res.json(result);
    });
  });