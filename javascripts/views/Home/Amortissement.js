app.views.Home_Amortissement = Backbone.View.extend({
	initialize: function(){
		this.render();
		this.model.on("change",this.populateCollection,this);
	},
	events:{
		"click #table": "clickTabTable",
		"click #graphique": "clickTabGraphique"
	},
	render: function(){
		this.collection = new Backbone.Collection();

		this.$el.html('template_Home_Amortissement',{});
		
		this.viewTable = new app.views.Home_Amortissement_Table({
			el 			: this.$el.find("#amortissementTable"),
			collection 	: this.collection
		});
		this.viewGraphique = new app.views.Home_Amortissement_Graphique({
			el: this.$el.find("#amortissementGraphique"),
			collection: this.collection
		});

		this.populateCollection();

		return this;
	},
    clickTabTable: function(e){
    	this.selectTab(e);
    	this.viewTable.$el.show();
    	this.viewGraphique.$el.hide();
    	return false;
    },
    clickTabGraphique: function(e){
    	this.selectTab(e);
    	this.viewTable.$el.hide();
    	this.viewGraphique.show();
    	return false;
    },
    selectTab: function(e){
    	this.$el.find(".nav-tabs li").removeClass("active");
    	$(e.currentTarget).parent().addClass("active");
    },
    populateCollection: function(){
    	var tableauModel = [];

		var nbEcheance 		= this.model.get("duree");
		var mensualiteHF 	= this.model.get("capital")*( this.model.get("interetAnnuel")/12)/(1-Math.pow(1+(this.model.get("interetAnnuel")/12),-(this.model.get("duree"))));
		var fraisAssurance 	= this.model.get("capital")*this.model.get("frais")/12;
		var mensualite 		= mensualiteHF+fraisAssurance;

		var capitalRestantDu = this.model.get("capital");
	    for(var i=1;i<=nbEcheance;i++){

	    	var id = i;
	    	var interet = capitalRestantDu*this.model.get("interetAnnuel")/12;

	    	var capitalRembourse = mensualiteHF-interet;

	    	var tmpModel = new Backbone.Model({
	    		"id"				: id,
	    		"capitalRestantDu" 	: capitalRestantDu,
	    		"interet" 			: interet,
	    		"capitalRembourse"	: capitalRembourse,
	    		"frais" 			: fraisAssurance,
	    		"mensualite" 		: mensualite
	    	});

	    	tableauModel.push(tmpModel);

	    	capitalRestantDu = capitalRestantDu - capitalRembourse;
	    }

	    this.collection.reset(tableauModel);
	    
    }

});