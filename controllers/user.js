const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const User = require ('../models/User');
require('dotenv').config();

//Sécurier le mot de passe, enregistrer l'identifiant  et le mont de passe crypté dans la base de donnée
/*exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};*/

//Chercher l'email de l'utilisateur, vérifier le mot de passe et retouner un token pour l'utilsateur
exports.login = (req, res, next) => {
    User.findOne({name:req.body.name})
        .then((user) => {
            if (!user){
                res.status(401).json({ error: 'Paire identifiant/mot de passe incorrecte !' });
            }
            else if(user.password === req.body.password ){
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.ACCESS_SECRET_TOKEN,
                        { expiresIn: '24h' }
                    )
                });
            }
            else {
                res.status(401).json({ error: 'Paire identifiant/mot de passe incorrecte !' })
            }
        })
        .catch(error => res.status(500).json({ error }));
 };