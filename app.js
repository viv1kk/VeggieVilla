const express = require('express')
const path = require('path')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
app.set("view engine", "ejs")


const connection = require('./models/connection')
const user = require('./routes/auth');
const auth = require('./middlewares/auth');
const alreadylogged = require('./middlewares/alreadylogged');
const pantry = require('./routes/pantry')


app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  console.log("HTTP Method - " + req.method + ", URL - "+ req.url);
  next();
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
  secret : "secret",
  resave : false,
  saveUninitialized : false,

  cookie: { maxAge: 60*5*1000 }
}))
app.use("/auth", user)
app.use("/pantry", pantry)


const isAuthenticated = (req)=>{
  if(req.session.email){
    return 1;
  }
  return 0;
}

app.get('/', alreadylogged, (req, res) => {
  res.render("index")
})

app.get('/dashboard', auth, (req, res) => {
  res.render("pages/dashboard")
})

app.get('/cart', auth, (req, res) => {
  res.render("pages/cart")
})

app.get('/about', (req, res) => {
  let auth = isAuthenticated(req)
  res.render("pages/about",{ auth })
})  

app.get('/contact', (req, res) => {
  let auth = isAuthenticated(req)
  res.render("pages/contact", { auth })
})


app.all('*', (req, res) =>{
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})