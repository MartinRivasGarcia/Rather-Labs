const express = require('express');
const graphqlHTTP  = require('express-graphql');
const { buildSchema } = require('graphql');

var schema = buildSchema(`

    type Client {
        id: Int
        name: String
        number: String
    }
    type Query {
        clients: [Client]
        client(id : Int): Client
    }
    type Mutation {
        addClient(name : String, number : String): Client
    }
`);

var clients = []
var counter = 1

var root =  {
    clients : () => { return clients },

    client : (data) => {
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id == data.id) {
                return clients[i]
            }
        }
        return null
    },

    addClient: (data) => {
        var c = { 'id':counter, 'name':data.name, 'number': data.number };
        clients.push(c)
        counter ++;
        return c;
    }
};

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3001, ()=>{
    console.log("Server listening port 3001")
})