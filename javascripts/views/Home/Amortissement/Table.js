app.views.Home_Amortissement_Table = Backbone.View.extend({
	initialize: function(){

		this.render();
		this.collection.on("reset",this.render,this);	
	},
	render: function(){

		var that = this;

		this.$el.html('template_Home_Amortissement_Table',{});
		this.$el.find("tbody").empty();

	    this.collection.each(function(param1){
	    	that.addRow(param1);
	    });

	    //this.$el.find(".table").tableScroll({height:400});

		return this;
	},
	addRow : function(modelRow){
      this.$el.find("tbody").append(
        "<tr>"
        +"<td width=\"10%\">"+app.formatageNombre(modelRow.get("id"))+"</td>"
        +"<td width=\"20%\">"+app.formatageNombre((Math.round(modelRow.get("capitalRestantDu")*100)/100).toFixed(2))+"</td>"
        +"<td width=\"20%\">"+app.formatageNombre((Math.round(modelRow.get("interet")*100)/100).toFixed(2))+"</td>"
        +"<td width=\"20%\">"+app.formatageNombre((Math.round(modelRow.get("capitalRembourse")*100)/100).toFixed(2))+"</td>"
        +"<td width=\"10%\">"+app.formatageNombre((Math.round(modelRow.get("frais")*100)/100).toFixed(2))+"</td>"
        +"<td width=\"20%\">"+app.formatageNombre((Math.round(modelRow.get("mensualite")*100)/100).toFixed(2))+"</td>"
        +"</tr>"
      );
    }
});