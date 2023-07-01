import Produit from "../models/produit.js";
//import { validationResult } from 'express-validator'; // Importer express-validator
import { body, validationResult } from 'express-validator';


export function getAll(req,res){
    Produit
    .find ({})
    .then(docs => {
        res.status(200).json(docs);
     })
     .catch(err => {
        res.status(500).json({ error: err});
     });
}



export function addOnce(req,res){
    // Valider les champs requis avec express-validator
    const validationRules = [
        body('name').notEmpty().withMessage('Le champ "name" est requis.'),
        body('description').notEmpty().withMessage('Le champ "description" est requis.'),
        body('prix').notEmpty().withMessage('Le champ "prix" est requis.')
    ];

    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Si la validation passe, créer le produit
    Produit 
    .create({
        categorieId: req.body.categorieId,
        name: req.body.name,
        description: req.body.description,
        prix: req.body.prix,
        marque: req.body.marque,
        taille: req.body.taille,
        couleur: req.body.couleur,
        materieau: req.body.materieau,
        image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
    })
    .then(newProduit => {
        res.status(200).json(newProduit);
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
}


/*export function addOnce(req,res){
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
    if(!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
  }
  else {
      // Invoquer la méthode create directement sur le modèle
    Produit 
    .create({
        categorieId: req.body.categorieId,
        name: req.body.name,
        description: req.body.description,
        prix : req.body.prix , 
        marque: req.body.marque,
        taille: req.body.taille ,
        couleur: req.body.couleur,
        materieau: req.body.materieau,
        // Récupérer l'URL de l'image pour l'insérer dans la BD
        image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
    })
    .then(newProduit => {
        res.status(200).json(newProduit)
      })
      .catch(err => {
        res.status(500).json({ error: err});
      }); 
   }
}
*/
export function getOnce (req, res){
    Produit 
    .findById(req.params.id)
    .then (doc => {
       res.status(200).json(doc);
    })
    .catch(err => {
       res.status(500).json({error: err});
    });
  }

  export function putOnce (req, res ) {
    Produit
    .findByIdAndUpdate ( req.params.id, req.body, { new:true})
    .then(doc => {
       res.status(200).json(doc);
    })
    .catch(err => {
       res.status(500).json({error: err});
    });
 
  }

  export function  deleteOnce(req, res){
    Produit
    .findByIdAndRemove( req.params.id)
    .then(doc => {
       res.status(200).json(doc);
    })
    .catch(err => {
       res.status(500).json({error: err});
    });
  }



