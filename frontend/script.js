// =============================
// RESERVATION
// =============================

const reservationForm = document.getElementById("reservationForm");


if (reservationForm) {

    reservationForm.addEventListener("submit", async function(e){

        e.preventDefault();


        const reservation = {

            bateau_id: document.getElementById("bateau_id").value,

            date_depart: document.getElementById("date_depart").value,

            port_depart: document.getElementById("port_depart").value,

            port_arrivee: document.getElementById("port_arrivee").value,

            nb_passagers: Number(
                document.getElementById("nb_passagers").value
            ),

            nom_client: document.getElementById("nom_client").value

        };


        const response = await fetch(
            "http://localhost:3000/api/reservations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(reservation)
            }
        );


        const data = await response.json();


        document.getElementById("resultat").innerHTML =
        `
        ✅ ${data.message}<br>
        Réservation : ${data.reservation_id}<br>
        Prix : ${data.prix_total} €
        `;


    });

}


// =============================
// TRAJETS
// =============================


async function chargerTrajets(){

    const container = document.getElementById("trips");


    // Si on n'est pas sur index.html
    if (!container) {
        return;
    }


    const response = await fetch(
        "http://localhost:3000/api/trips"
    );


    const trips = await response.json();



    trips.forEach(trip => {


        container.innerHTML += `

        <div class="bg-white p-6 rounded-xl shadow">

            <h3 class="text-xl font-bold text-blue-700">
                🚢 ${trip.depart} → ${trip.arrivee}
            </h3>


            <p class="mt-3">
                Prix : ${trip.prix} €
            </p>


        </div>

        `;


    });


}


chargerTrajets();