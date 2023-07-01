import mongoose from "mongoose"; // importer Mongoose 
const { Schema, model} = mongoose; // utiliser Schema et model du module mongoose  

const produitSchema = new Schema (
    {
        categorieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categorie',
            required: true,
          },
        name : {
            type: String ,
            required: true // Cet attribut est obligatoire 
        }, 
        description : {
            type: String ,
            required: true 
        },
        prix : {
            type: Number,
            required: true 
        },
        marque : {
            type: String ,
            required: true
            
        },
        taille : {
            type : String,
            required: true
            
        },
        couleur : {
            type: String,
            required: true
        },
        materieau : {
            type: String ,
            required: true
        }, 
        // Ajout de l'attribut image
        image: {
            type: String,
            required: true

        },
    }
);

export default model("Produit", produitSchema);