const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./reservations.db");


db.run(`

CREATE TABLE IF NOT EXISTS reservations (

    id TEXT PRIMARY KEY,

    bateau_id TEXT,

    date_depart TEXT,

    port_depart TEXT,

    port_arrivee TEXT,

    nb_passagers INTEGER,

    nom_client TEXT,

    prix_total REAL

)

`);


// Ajout colonne sièges si elle n'existe pas

db.run(`

ALTER TABLE reservations ADD COLUMN sieges TEXT

`, function(error){

    if(error){

        if(error.message.includes("duplicate column name")){

            console.log("✅ Colonne sièges déjà présente");

        }

    } else {

        console.log("✅ Colonne sièges ajoutée");

    }

});



console.log("✅ Base SQLite prête");


module.exports = db;