import { validationResult } from 'express-validator'; // Importer express-validator
import Categorie from "../models/categorie.js";

 
 export function getAll (req,res){
   Categorie
   .find({})
   .then(docs => {
      res.status(200).json(docs);
   })
   .catch(err => {
      res.status(500).json({ error: err});
   });
 }

 export function addOnce(req,res) {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
    if(!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
  }
  else {
      // Invoquer la méthode create directement sur le modèle
   Categorie
    .create({
      name: req.body.name ,
      description: req.body.description,

    })
    .then(newCategorie => {
      res.status(200).json(newCategorie)
    })
    .catch(err => {
      res.status(500).json({ error: err});
    }); 
   }
    
 }

 export function getOnce (req, res){
   Categorie 
   .findById(req.params.id)
   .then (doc => {
      res.status(200).json(doc);
   })
   .catch(err => {
      res.status(500).json({error: err});
   });
 }
 export function putOnce (req, res ) {
   Categorie
   .findByIdAndUpdate ( req.params.id, req.body, { new:true})
   .then(doc => {
      res.status(200).json(doc);
   })
   .catch(err => {
      res.status(500).json({error: err});
   });

 }

 export function  deleteOnce(req, res){
   Categorie
   .findByIdAndRemove( req.params.id)
   .then(doc => {
      res.status(200).json(doc);
   })
   .catch(err => {
      res.status(500).json({error: err});
   });
 }
