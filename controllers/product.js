const Product = require('../models/Product');
const fs = require('fs');

//Créer un product à la demande de l'utilisateur et l'enregistrer dans la base de donnée
exports.createProduct = (req, res, next) => { 
    const productObject = JSON.parse(req.body.product)
    const product = new Product({        
        ...productObject,
        imageUrl: `https://${req.get('host')}/images/${req.file.filename}`
  });
  product.save()
    .then(() => { res.status(201).json({message: 'Product enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

//Chercher dans la base de donnée la sauce que l'utilisateur a selectionné pour afficher le détail et l'envoyer au front-end
exports.getOneProduct = (req, res, next) => {
    Product.findOne({
    _id: req.params.id
  }).then(
    (product) => {
      res.status(200).json(product);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//Modifier un product suite à la demande de client
exports.modifyProduct = (req, res, next) => {
  const productObject = req.file ? {
    ...JSON.parse(req.body.product),
    imageUrl: `https://${req.get('host')}/images/${req.file.filename}`
  } : { ...JSON.parse(req.body.product)};
  Product.findOne({_id: productObject.id})
    .then((product) => {
          const filename = product.imageUrl.split('/images/')[1];
          if (req.file) {
            fs.unlink(`images/${filename}`, () => {
                Product.updateOne({ _id: productObject.id}, { ...productObject, _id: productObject.id})
                .then(() => res.status(200).json({message : 'Product modifiée!'}))
                .catch(error => res.status(401).json({ error }));
          })}else {
            Product.updateOne({ _id: productObject.id}, { ...productObject, _id: productObject.id})
              .then(() => res.status(200).json({message : 'Product modifiée!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
        .catch((error) => {
        res.status(400).json({ error });
    }
  );
};

//Supprimer un product dans la base de donnée suite à la demande de client
exports.deleteProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id})
      .then(product => {
              const filename = product.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                Product.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      )
      .catch( error => {
          res.status(500).json({ error });
      });
 };

//Envoyer toutes les products existant dans la base de donnée au front-end
exports.getAllProduct = (req, res, next) => {
  Product.find().then(
    (product) => {
      res.status(200).json(product);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

