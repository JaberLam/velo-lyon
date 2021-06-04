var dom = {

    // Affichage informations station

    initDom: function (station) {

        var info = $(".text-informations");
        info.addClass("hide");

        var contenuInfoStation = $(".contenu-info-station");
        contenuInfoStation.removeClass("hide");
        

       $(".reservation").removeClass("hide");

        var nomStationSpan = $("#nom-station");
        $(nomStationSpan).text(station.name);       

        var veloStationSpan = $("#numero-velo-station");
        $(veloStationSpan).text(station.available_bikes);

        var placeStationSpan = $("#numero-place-station");
        $(placeStationSpan).text(station.available_bike_stands);

        var etatStation = this.etatStation(station);
        var nbreVeloDispo = this.verifierNombreVeloDispo(station, contenuInfoStation);
        var veloEtPlaceDispo = this.verifierVeloEtPlaceDispo(station);
    },

    // Coloration état de la station

    etatStation: function (station) {

        var etatStation = $("#etat-station");
        var etat = $("#etat");

        etat.removeClass("vert");
        etat.removeClass("orange");
        etat.removeClass("rouge");

        if ((station.status === "OPEN") && (station.available_bikes > 0)) {
            $(etatStation).text("Ouvert");
            etat.addClass("vert");
        }
        if ((station.status === "OPEN") && (station.available_bikes === 0)) {
            $(etatStation).text("Ouvert");
            etat.addClass("orange");
        }
        if (station.status === "CLOSED") {
            $(etatStation).text("Fermer");
            etat.addClass("rouge");
        }
    },

    // Vélos disponibles 

    verifierNombreVeloDispo: function (station, contenuInfoStation) {

        var reservation = $(".reservation");
        var reservationTxt = $(".reservation-txt");
        reservationTxt.html("");
      
        if (station.available_bikes === 0) {
            reservation.addClass("hide");
            $(reservationTxt).text("Aucun vélo n'est disponible à la station pour le moment. Veuillez patientez en l'attente d'un velo.");
        }
    },

    verifierVeloEtPlaceDispo: function (station) {
        var veloDispoStationSpan = $("#numero-velo-station");
        var placeStationSpan = $("#numero-place-station");
        if (sessionStorage.getItem("station")) {
            var stationStorage = JSON.parse(sessionStorage.getItem("station"));
            if (stationStorage.name === station.name) {
                $(veloDispoStationSpan).text(station.available_bikes - 1);
                $(placeStationSpan).text(station.available_bike_stands + 1);
            } else {
                $(veloDispoStationSpan).text(station.available_bikes);
                $(placeStationSpan).text(station.available_bike_stands);
            }
        }
    },


    // Affichage texte 

    verifierPlurielsDispo: function (station) {

        var placeDispoStationSpan = $("#texte-place-station");

        var veloDispoStationSpan = $("#texte-velo-station");


        if (station.available_bike_stands > 1) {
            $(placeDispoStationSpan).text("Places disponibles : ");
        } else {
            $(placeDispoStationSpan).text("Place disponible : ");
        }
        if (station.available_bikes > 1) {
            $(veloDispoStationSpan).text("Vélos disponibles : ");
        } else {
            $(veloDispoStationSpan).text("Vélo disponible : ");
        }
    },
    
    // Validation

    valider: function (station) {
        var validation = $(".validation");
        var self = this;

        $(validation).click(function () {

            $("#modal-signature").addClass("hide");
            $(".texteReservation").addClass("hide");

            sessionStorage.setItem("totalSeconds", 20 * 60);

            if (!sessionStorage.getItem("station")) {
                compteur.interval = setInterval(compteur.initCompteur, 1000);
            }

            var stationStorage = JSON.stringify(station);
            sessionStorage.setItem("station", stationStorage);

            self.verifierVeloEtPlaceDispo(station);
            self.bloquerReservationEnCours(station);
        })
    }
}