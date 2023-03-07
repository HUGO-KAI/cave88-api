const mongoose = require('mongoose');

//Créer schema du produit
const productSchema = mongoose.Schema({ 
    title: { type: String, required: true },
    AOC: { type: String, required: true },
    description: { type: String, required: true },
    region: { type: String, required: true },
    imageUrl: { type: String, required: true },
    prix : { type: String, required: true },
    prix_offre: { type: String, required: false },
    rating: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);