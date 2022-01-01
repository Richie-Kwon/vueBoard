const express = require("express")
const API = require ("./api")
const cors = require ("cors")
const { Article } = require("./mongoose/schema")
const app = express()
const PORT = 3000

app.use(cors())
//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Success")
})

app.get("/read", API.Article.articleRead)
app.get("/read/:id", API.Article.articleFindOne)
app.post("/create", API.Article.articleCreate)
app.patch("/update", API.Article.articleUpdate)
app.delete("/delete/:id", API.Article.articleDelete)


app.listen(PORT,"localhost", ()=>{
    console.log(`App listenining at localhost:${PORT}`)
})

