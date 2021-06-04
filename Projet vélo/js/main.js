$(window).on("load", function () {

    var menuActifObjet = Object.create(menuActif);    
    var stationsObjet = Object.create(stations);       

    menuActifObjet.initEvent();  
    stations.initStation();        
})