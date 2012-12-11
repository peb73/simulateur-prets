app.views.Home = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){

		var that = this;
		this.$el.html('template_Home',{});

		this.formModel = new Backbone.Model();

		this.viewAmortissement = new app.views.Home_Amortissement({el: this.$el.find("#amortissement"), model: this.formModel});
		new app.views.Home_ChartCoutMensualite({el: this.$el.find("#chart"), model: this.formModel});
		new app.views.Home_Form({el: this.$el.find("#form"), model: this.formModel});
		new app.views.Home_Resume({el: this.$el.find("#resume"), model: this.formModel});

		this.formModel.set({
			"capital":app.default.capital,
			"duree":app.default.duree,
			"interetAnnuel":app.default.interetAnnuel,
			"frais":app.default.frais
		})
		
		return this;
	}
});