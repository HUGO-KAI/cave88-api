const express = require('express');
const path = require('path');
var cors=require("cors");
const mongoose = require('mongoose');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const userRoutes = require('./routes/user');
const productRoute = require('./routes/product');

require('dotenv').config();

const app = express();
app.use(express.json()); 

//Sécurité et CORS
app.use(cors()); 
app.use(mongoSanitize());
app.use(helmet());

//Connecter à la base de donnée mmongodb
mongoose.set("strictQuery", false);
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Ajouter header aux toutes reponses afin que tous les utilisateurs peuvent accèder à l'API avec des méthodes pré-définies
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

//attribuer des middlewares aux différentes routes
app.use('/api/product', productRoute);  
app.use('/api/auth', userRoutes);  
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;