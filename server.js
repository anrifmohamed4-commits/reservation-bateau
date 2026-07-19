const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./database.sqlite");

const app = express();

const PORT = 3000;


app.use(cors());

app.use(express.json());


app.use(express.static(path.join(__dirname, "frontend")));



// Accueil

app.get("/", (req,res)=>{

    res.sendFile(
        path.join(__dirname,"frontend","index.html")
    );

});




// Trajets

app.get("/api/trips",(req,res)=>{

    res.json([

        {
            id:"BATEAU-7842",
            depart:"Moroni",
            arrivee:"Mahajanga",
            date:"2026-07-20",
            prix:50,
            duree:"8h"
        },

        {
            id:"BATEAU-3921",
            depart:"Moroni",
            arrivee:"Nosy Be",
            date:"2026-07-22",
            prix:70,
            duree:"6h30"
        },

        {
            id:"BATEAU-6578",
            depart:"Moroni",
            arrivee:"Mayotte",
            date:"2026-07-25",
            prix:80,
            duree:"5h"
        }

    ]);

});






// Ajouter réservation avec sièges

app.post("/api/reservations",(req,res)=>{


const {

bateau_id,

date_depart,

port_depart,

port_arrivee,

nb_passagers,

nom_client,

sieges


}=req.body;

let prix = 0;

if (bateau_id === "BATEAU-7842") {
    prix = 50;
}

if (bateau_id === "BATEAU-3921") {
    prix = 70;
}

if (bateau_id === "BATEAU-6578") {
    prix = 80;
}

const id = "RES-" + Date.now();



db.run(

`

INSERT INTO reservations

(id,bateau_id,date_depart,port_depart,port_arrivee,nb_passagers,nom_client,sieges,prix_total)

VALUES (?,?,?,?,?,?,?,?,?)

`,

[

id,

bateau_id,

date_depart,

port_depart,

port_arrivee,

nb_passagers,

nom_client,

sieges,

prix

],


function(error){


if(error){

console.log(error);

return res.json({

status:"error"

});

}



console.log("✅ Nouvelle réservation :",{

id,

nom_client,

sieges

});



res.json({

status:"success",

reservation_id:id,

prix_total:prix

});



}



);


});






// Voir réservations admin

app.get("/api/reservations",(req,res)=>{


db.all(

"SELECT * FROM reservations",

[],

(error,rows)=>{


if(error){

return res.json([]);

}


res.json(rows);


}

);


});







// Supprimer réservation

app.delete("/api/reservations/:id",(req,res)=>{


const id=req.params.id;



db.run(

"DELETE FROM reservations WHERE id=?",

[id],

()=>{


res.json({

message:"Réservation supprimée"

});


}


);



});





app.listen(PORT,()=>{

console.log(
`🚢 Backend lancé sur http://localhost:${PORT}`
);

});