const app = require("./app")

app.listen(3001, ()=>{
    console.log("Server listening port 3001")
})

/*app.get("/api/classes", function (req,res) {
    res.send({classes: classes})
})*/

app.use("/api/users", require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))
app.use("/api/classes", require('./routes/classes'))