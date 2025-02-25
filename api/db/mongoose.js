// this file will handle connection logic to the mongoDB database using mongoose library

const mongoose = require ('mongoose');
require('dotenv').config();  //permet la connection entre app.js et le fichier .env

mongoose.Promise = global.Promise;  //Cette ligne indique à mongoose d'utiliser les Promises natives de JavaScript (un mécanisme pour gérer les opérations asynchrones) plutôt que d'utiliser une autre bibliothèque de Promises.

mongoose.connect(process.env.MONGO_URI ).then(() => {  //connection à la base de donnée
    console.log("cnnected to MongoDB successfully :) ");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

// To prevent deprectation warnings (from MongoDB native driver )
// mongoose.set('useCreateIndex', true);   //permet d'utiliser la méthode createIndex pour créer des index dans la base de données
// mongoose.set('useFinfAndModify', false); //désactive une ancienne méthode de mongoose qui est dépréciée.
 
//exporte l'objet mongoose pour qu'il puisse être utilisé dans d'autres fichiers de l'application.
module.exports = {
    mongoose
};