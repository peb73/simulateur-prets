app.views.Home_Resume = Backbone.View.extend({
	initialize: function(){
		this.render();
		this.model.on("change",this.render,this);
	},
	render: function(){

		var templateData = {};
		templateData.nbEcheance = this.model.get("duree");
		templateData.mensualiteHF = this.model.get("capital")*( this.model.get("interetAnnuel")/12)/(1-Math.pow(1+(this.model.get("interetAnnuel")/12),-(this.model.get("duree"))));
		templateData.frais 		= this.model.get("capital")*this.model.get("frais")/12;
		templateData.mensualite = templateData.mensualiteHF+templateData.frais;
		templateData.coutTotal = templateData.mensualite*templateData.nbEcheance;

		this.$el.html('template_Home_Resume',templateData);

		//console.log(this.model);

		return this;
	},

});