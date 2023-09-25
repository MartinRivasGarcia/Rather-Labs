const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require("cors");
const MySQL = require('./modules/mysql');

var schema = buildSchema(`
    type Client {
        id: Int
        name: String
    }
    type Query {
        clients: [Client]
        client(id : Int): Client
        addClient(name : String, number : String): Client
        user: String
    }
    type Mutation {
        
        register(email : String, password: String): Boolean
        login(email : String, password: String): Boolean
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
    const element = { 'id': i, 'name': clients[i] };
    classes.push(element)
}

var counter = 6

var root = {
    clients: () => { return classes },

    user: (req, res) => {
        if (req.session.uid != undefined) {
            return req.session.uid
        }
        else{
            return -1
        }
    },

    client: (data) => {
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id == data.id) {
                return clients[i]
            }
        }
        return null
    },

    addClient: (data) => {
        var c = { 'id': counter, 'name': data.name };
        clients.push(c)
        counter++;
        return c;
    },
    register: async (data) => {
        try {
            const { email, password } = data
            await authService.registerUser(auth, { email, password });
            return true
        } catch (error) {
            console.error("Error en el registro:", error);
            return false
        }
    },

    login: async (data) => {
        try {
            const { email, password } = data
            const userCredential = await authService.loginUser(auth, {
                email,
                password,
            });
            return true
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            return false
        }
    }
};

const session = require('express-session');
const app = express();

app.use(cors());
app.use(express.json());
app.use(session({secret: 'x78fsdfgwsdsf', resave: true, saveUninitialized: true}))

const { getAuth } = require("firebase/auth")

const appFirebase = require("./modules/firebase");
const auth = getAuth(appFirebase);
// Importar AuthService
const authService = require("./modules/authService");

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
        rootValue: root,
    }),
)


app.listen(3001, () => {
    console.log("Server listening port 3001")
})

app.post("/graphql", (req, res) => {
    let query = req.body.query;
    console.log(query)
    graphql(schema, query).then(result => {
        res.json(result);
    });
});

app.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body
        
        let userCredential = await authService.registerUser(auth, { email, password });
        req.session.uid = userCredential.user.uid

        await MySQL.query(`INSERT INTO Users (id, mail, FirstName) VALUES ('${req.session.uid}','${email}', '${name}');`)

        res.send({ res: true })
    } catch (error) {
        console.error("Error en el registro:", error);
        res.send({ res: false })
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        
        const userCredential = await authService.loginUser(auth, {
            email,
            password,
        });
        
        req.session.uid = userCredential.user.uid
        console.log(req.session.uid)
        res.send({ res: true, uid: userCredential.user.uid })
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.send({ res: false })
    }
})

app.get("/favorites", async (req, res) => {
    const { user } = req.query
    const favorites = await MySQL.query(`SELECT id, type FROM Favorites WHERE id_user = ${user};`)
    res.send({ data: favorites })
})

app.post("/favorites", async (req, res) => {
    const { user, id, type } = req.body  

    await MySQL.query(`INSERT INTO Favorites (id_user, id, type) VALUES (${user},'${id}', '${type}');`)
    res.send({ res: true })
})

app.delete("/favorites", async (req, res) => {
    const { user, id, type } = req.body 

    await MySQL.query(`DELETE FROM Favorites WHERE id_user = ${user} AND id= '${id}' AND type='${type}';`)
    res.send({ res: true })
})

app.get("/user", async (req, res) => {
    const { user } = req.query
    const username = await MySQL.query(`SELECT FirstName FROM Users WHERE id = ${user};`)
    res.send({ data: username })
})