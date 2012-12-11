var app = {
	collections: {},
	models: {},
	helpers: {},
	views: {}
}

app.default ={
    "capital"       : 100000,
    "interetAnnuel" : 0.0315,
    "frais"         : 0.0036,
    "duree"         : 120
}

// titre de l'application pour la balise <title>
app.APP_NAME = 'IGC Superviseur v1.0';

// url du contenu statique, racine de la page html
app.BASE_URL = '';
// url du service rest, les modèles utilisent cette base
app.REST_BASE_URL = '';

app.GlobalControllerEvent = {};
_.extend(app.GlobalControllerEvent, Backbone.Events);

app.formatageNombre= function(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '&nbsp;' + '$2');
    }
    return x1 + x2;
}

// ----------------------------------
// Lancement (main)
// ----------------------------------
$(function(){

    // Prise en compte des routes
    app.router = new app.Router();

    // Gestion de l'historique
    Backbone.history.start({root: app.BASE_URL});

});