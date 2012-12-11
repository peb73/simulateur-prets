app.views.Home_ChartCoutMensualite = Backbone.View.extend({
	initialize: function(){
		this.render();
		this.model.on("change",this.updateChart, this);
	},
	render: function(){
		this.$el.html('template_Home_Chart',{});
		this.addChart();
		return this;
	},
	addChart: function(){
		this.chart = new Highcharts.Chart({
			chart: {
				renderTo: "chartCoutMensualite",
				height: 400
			},
			
			title: {
                text: 'Coût/Mensualite'
            },
            
            xAxis: [{
                /*categories: [
                '0', '1 an', '2 ans', '3 ans', '4ans', '5 ans','6 ans','7 ans','8 ans','9 ans','10 ans',
                '11 ans', '12 ans', '13 ans', '14 ans', '15 ans', '16 ans', '17 ans', '18 ans', '19 ans', '20 ans',
                '21 ans', '22 ans', '23 ans', '24 ans', '25 ans', '26 ans', '27 ans', '28 ans', '29 ans', '30 ans'
                ]*/
                title: {
                	text: "Année"
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
                    text: 'Mensualite',
                    style: {
                        color: '#89A54E'
                    }
                },
                min: 0
            }, { // Secondary yAxis
                title: {
                    text: 'Coût',
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
            tooltip: {
            	formatter: function(){
            		if(this.x>1)
	            		var s = "<b>"+this.x+" Années</b><br/>";
	            	else
	            		var s="<b>"+this.x+" Année</b><br/>";

            		$.each(this.points, function(i, point) {
    	                s += '<br/>'+ '<b style="color:'+point.series.color+'">'+point.series.name +' : </b>'+
                        (Math.round(point.y*100)/100).toFixed(2) +' €';
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
            credits: {
                enabled: false
            },
            series: [{
                name: 'Coût',
                color: '#4572A7',
                //type: 'column',
                type: 'spline',
                yAxis: 1,
                
                data: [0]
                
    
            }, {
                name: 'Mensualite',
                color: '#89A54E',
                type: 'spline',
                data: [0]
                
            }]
		});
	},
	updateChart: function(){
		
		var dataMensualite = [];
		var dataCoutTotal = [];

		for(var i=0;i<=30;i++){
			var nbEcheance = (i!=0?i*12:12);
			var mensualiteHF = this.model.get("capital")*( this.model.get("interetAnnuel")/12)/(1-Math.pow(1+(this.model.get("interetAnnuel")/12),-(nbEcheance)));
			var frais 		= this.model.get("capital")*this.model.get("frais")/12;

			if(i!=0){
				var mensualite = mensualiteHF+frais;
				var coutTotal = mensualite*nbEcheance;
			}else{
				mensualite = mensualiteHF+frais;
				coutTotal = this.model.get("capital");
			}


			dataMensualite.push(mensualite);
			dataCoutTotal.push(coutTotal);
		}

		this.chart.series[0].setData(dataCoutTotal);
		this.chart.series[1].setData(dataMensualite);
        //this.chart.redraw();
	}

});