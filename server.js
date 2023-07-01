import express from 'express'; // importer express
import mongoose from 'mongoose'; // importer Mongoose 
import morgan from 'morgan'; // Importer morgan
import cors from 'cors'; // Importer cors

import { notFoundError, errorHandler } from './middlewares/error-handler.js';

import categorieRoutes from './routes/categorie.js';
import produitRoutes from './routes/produit.js';



const app = express(); // créer l'instance de express à utiliser  
const port = process.env.Port || 9090; // le port du serveur
const databaseName = 'produit'; //creation base de donnee 

mongoose.set('debug', true); // afficher les requete mongoDB dans le terminal 
mongoose.Promise = global.Promise;

// se connecter à mongoDB
mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    // une fois connecté, affichera un message réussite sur la console 
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    // si quelque chose ne va pas n afficher l'erreur sur le console 
    console.log(err);
  });



app.use(cors()); // Utiliser CORS
app.use(morgan('dev')); // Utiliser morgan
app.use(express.json()); // Pour analyser (parsing) les requetes application/json
app.use(express.urlencoded({ extended: true })); // Pour analyser application/x-www-form-urlencoded
app.use('/img', express.static('public/images')); // Servir les fichiers sous le dossier public/images


// A chaque requête, exécutez ce qui suit
app.use((req, res, next) => {
  console.log("Middleware just ran !");
  next();
});

// Sur toute demande à /gse, exécutez ce qui suit
app.use('/gse', (req, res, next) => {
  console.log("Middleware just ran on a gse route !");
  next();
});


app.use('/categorie' , categorieRoutes);
app.use('/produit' , produitRoutes);




// Utiliser le middleware de routes introuvables
app.use(notFoundError);
// Utiliser le middleware gestionnaire d'erreurs
app.use(errorHandler);

/**
 * Démarrer le serveur à l'écoute des connexions 
 */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
