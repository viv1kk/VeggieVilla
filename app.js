const express = require('express')
const path = require('path')
const app = express()
const port = 3000
app.set("view engine", "ejs")

const connection = require('./models/connection')
const user = require('./routes/auth');
const auth = require('./middlewares/auth');
const pantry = require('./routes/pantry')

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  console.log("HTTP Method - " + req.method + ", URL - "+ req.url);
  next();
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/auth", user)
app.use("/pantry", pantry)

app.get('/', (req, res) => {  
  res.render("index")
})

app.get('/dashboard',  (req, res) => {
  res.render("pages/dashboard")
})

app.get('/cart', (req, res) => {
  res.render("pages/cart")
})

app.get('/about', (req, res) => {
  res.render("pages/about")
})  

app.get('/contact', (req, res) => {
  res.render("pages/contact")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})