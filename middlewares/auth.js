const jwt = require('jsonwebtoken');
const User = require ('../models/User');

//Authentifier l'utilisateur avec le token
module.exports = (req, res, next) => {
        if (!req.headers.authorization){
            console.log('Error authentification');
            res.status(401).json({ error: 'Paire identifiant/mot de passe incorrecte !' });
        }
        else{
            const token = req.headers.authorization;
            const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
            User.findOne({ _id : decodedToken.userId})
            .then((user) => {
                if (!user){
                    res.status(401).json({ error: 'Paire identifiant/mot de passe incorrecte !' });
                }
                else	next();
                })
                .catch (error =>  res.status(500).json(error))
        }
        
};