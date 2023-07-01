import express from 'express' ;
import { getAll, addOnce, getOnce, putOnce, deleteOnce } from '../controllers/produit.js';
import { body } from 'express-validator'; // Importer express-validator
import multer from '../middlewares/multer-config.js'; // Importer la configuration de multer

const router =express.Router();
router
.route('/')
.get(getAll) // pour récupérer toutes les produits
.post(
    multer, // Utiliser multer
    addOnce); // pour ajouter un produit 


router 
.route('/:id')
.get(getOnce)// pour récupérer un produit par son ID
.put(putOnce)// pour mettre à jour un produit par son ID
.delete(deleteOnce)// pour supprimer un produit par son ID 

export default router ; 