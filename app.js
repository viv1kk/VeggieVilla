const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000



//Connet to MongoDB

mongoose.connect('mongodb://localhost:27017/Veggies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});


// const login = require('./routes/login')
let path = require('path')

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs")

// app.use("/user", login)

app.get('/', (req, res) => {
  res.render("index")
})

app.get('/dashboard', (req, res) => {
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