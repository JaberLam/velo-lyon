// Permet de récupérer les données de chaque station présentent sur Lyon et d'afficher la Google Maps

var stations = {
    initStation: function () {
        var stations = [];
        var mapObjet = Object.create(map);
        $.get("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=a8b4070711804ac98c4622586f5796b67bb3a0ab", function (reponse) {
            $.each(reponse, function (index, station) {
                stations.push(station);
            })
            mapObjet.initMap(stations);
        });
    }
}