const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./reservations.db");

// Supprime la table existante (développement)
db.run(`DROP TABLE IF EXISTS reservations`);

// Recrée la table avec la colonne sieges
db.run(`
CREATE TABLE reservations (
    id TEXT PRIMARY KEY,
    bateau_id TEXT,
    date_depart TEXT,
    port_depart TEXT,
    port_arrivee TEXT,
    nb_passagers INTEGER,
    nom_client TEXT,
    sieges TEXT,
    prix_total REAL
)
`, (err) => {
    if (err) {
        console.error("Erreur création table :", err);
    } else {
        console.log("✅ Table reservations créée");
    }
});

console.log("✅ Base SQLite prête");

module.exports = db;