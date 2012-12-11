app.views.Home_Form = Backbone.View.extend({
	initialize: function(){
		this.render();

		this.model.on("change",function(){
			$( "#sliderCapitalEmprunte" ).slider( "option", "value", this.getCapitalVal());
			$( "#sliderDuree" ).slider( "option", "value", this.getDureeVal()/12);
			$( "#sliderInteretAnnuel" ).slider( "option", "value", this.getInteretAnnuelVal()*100);
			$( "#sliderFrais" ).slider( "option", "value", this.getFraisVal()*100);
		},this);
	},
	render: function(){
		var that = this;
		this.$el.html('template_Home_Form',{});

		var updateModel = function(e){

			that.$el.find(".control-group").removeClass("error");

			if(isNaN(that.$el.find("#capitalEmprunte").val()))
				that.$el.find("#capitalEmprunte").parents(".control-group").addClass("error");
			if(isNaN(that.$el.find("#duree").val()))
				that.$el.find("#duree").parents(".control-group").addClass("error");
			if(isNaN(that.$el.find("#interetAnnuel").val()))
				that.$el.find("#interetAnnuel").parents(".control-group").addClass("error");
			if(isNaN(that.$el.find("#frais").val()))
				that.$el.find("#frais").parents(".control-group").addClass("error");

			that.model.set({
				"capital":that.getCapitalVal(),
				"duree":that.getDureeVal(),
				"interetAnnuel":that.getInteretAnnuelVal(),
				"frais":that.getFraisVal()
			});
			
		};

		var sliderCapitalEmprunte = function(handel,value){
			that.$el.find("#capitalEmprunte").val(value.value);
			updateModel();
		};
		var sliderDuree = function(handel,value){
			that.$el.find("#duree").val(value.value);
			updateModel();
		};
		var sliderInteretAnnuel = function(handel,value){
			that.$el.find("#interetAnnuel").val(value.value);
			updateModel();
		};
		var sliderFrais = function(handel,value){
			that.$el.find("#frais").val(value.value);
			updateModel();
		};

		this.$el.find("#sliderCapitalEmprunte").slider({
			min: 0,
			max: 1000000,
			step: 100,
			change : sliderCapitalEmprunte,
			value: app.default.capital,
			range: "min"
		});
		this.$el.find("#sliderDuree").slider({
			min: 0,
			max: 30,
			step: 1,
			change : sliderDuree,
			value: app.default.capital,
			range: "min"
		});
		this.$el.find("#sliderInteretAnnuel").slider({
			min: 0,
			max: 10,
			step: 0.1,
			change : sliderInteretAnnuel,
			value: app.default.capital,
			range: "min"
		});
		this.$el.find("#sliderFrais").slider({
			min: 0,
			max: 1,
			step: 0.01,
			change : sliderFrais,
			value: app.default.capital,
			range: "min"
		});	

		this.$el.find("#capitalEmprunte").on("change",updateModel);
		this.$el.find("#capitalEmprunte").on("keyup",updateModel);
		this.$el.find("#duree").on("change",updateModel);
		this.$el.find("#duree").on("keyup",updateModel);
		this.$el.find("#interetAnnuel").on("change",updateModel);
		this.$el.find("#interetAnnuel").on("keyup",updateModel);
		this.$el.find("#frais").on("change",updateModel);
		this.$el.find("#frais").on("keyup",updateModel);

		return this;
	},
	getCapitalVal: function(){
		return this.$el.find("#capitalEmprunte").val()!=""?+this.$el.find("#capitalEmprunte").val():app.default.capital;
	},
	getDureeVal: function(){
		return this.$el.find("#duree").val()!=""?+this.$el.find("#duree").val()*12:app.default.duree;
	},
	getInteretAnnuelVal: function(){
		return this.$el.find("#interetAnnuel").val()!=""?+this.$el.find("#interetAnnuel").val()/100:app.default.interetAnnuel;
	},
	getFraisVal: function(){
		return this.$el.find("#frais").val()!=""?+this.$el.find("#frais").val()/100:app.default.frais;
	}


});