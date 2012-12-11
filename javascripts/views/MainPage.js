app.views.MainPage = Backbone.View.extend({
	initialize: function(){
		this.render();
		this.setupSpinner();
	},
	render: function(){
		this.$el.html('template_MainPage',{});

		return this;
	},
	setupSpinner: function(){

		app.GlobalControllerEvent.on("traitementStart",function(){
			this.$el.find("#general_traitement_spinner").show();
		},this);
		app.GlobalControllerEvent.on("traitementStop",function(){
			this.$el.find("#general_traitement_spinner").hide();
		},this);

	}
});