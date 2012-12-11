app.views.Home_Amortissement_Graphique = Backbone.View.extend({
	initialize: function(){

		this.render();
		this.collection.on("reset",this.updateChart,this);
		
	},
	render: function(){
		this.$el.html('template_Home_Amortissement_Graphique',{});
		this.addChart();
		return this;
	},
	addChart: function(){
		this.chart = new Highcharts.Chart({
			chart: {
				renderTo: "chartAmortissement",
				height: 400
			},
			title: {
                text: 'Amortissement'
            },
            xAxis: [{
                title: {
                	text: "Mois"
                }
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    formatter: function() {
                        return this.value +' €';
                    },
                    style: {
                        color: '#89A54E'
                    }
                },
                title: {
                    text: 'Capital restant dû',
                    style: {
                        color: '#89A54E'
                    }
                },
                min: 0
            }, { // Secondary yAxis
                title: {
                    text: 'Capital remboursé',
                    style: {
                        color: '#4572A7'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value +' €';
                    },
                    style: {
                        color: '#4572A7'
                    }
                },
                min: 0,
                opposite: true
            }],
            credits: {
                enabled: false
            },
            
            tooltip: {
            	
                formatter: function(){
            		
	            	var s = "<b>"+this.x+" Mois</b><br/>";

            		$.each(this.points, function(i, point) {
    	                s += '<br/>'+ '<b style="color:'+point.series.color+'">'+point.series.name +' : </b>'+
                        (Math.round(point.y*100)/100).toFixed(2)
                         +' €';
	                });
	                return s;
            	},

            	shared: true
            },
            
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor: '#FFFFFF'
            },
            series: [{
                name: 'Capital restant dû',
                color: '#4572A7',
                //type: 'column',
                type: 'spline',
                yAxis: 1,
                data: [0]
            }, {
                name: 'Capital remboursé',
                color: '#89A54E',
                type: 'spline',
                data: [0]
                
            }]
		});
	},
	updateChart: function(){
		
		var dataRestantDu = [];
		var dataRembourse = [];

		this.collection.each(function(model){
			dataRestantDu.push(model.get("capitalRestantDu"));
			dataRembourse.push(model.get("capitalRembourse"));
	    });

		this.chart.series[0].setData(dataRestantDu);
		this.chart.series[1].setData(dataRembourse);
        //this.chart.redraw();
	},
    show: function(){
        this.$el.show();
        console.log(this.chart);
        //this.chart.resize();
        this.chart.redraw();
    }

});