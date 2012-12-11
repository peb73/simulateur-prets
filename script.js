$(window).load(function(){

  $('#myModal').modal({
    show: false,
    
  });

  var calculateTableDuree = function(){

    var setObjRow = function(objRow){
      if(objRow.pourcentInteret+objRow.pourcentAssurance != 0){
        objRow.mensualite = objRow.capital*(objRow.pourcentInteret/12)/((1-Math.pow(1+(objRow.pourcentInteret/12),-(objRow.nbEcheance))));
        objRow.mensualitePourcentAssurance = objRow.capital*objRow.pourcentAssurance/objRow.nbEcheance;
      }else{
        objRow.mensualite = objRow.capital/objRow.nbEcheance;
        objRow.mensualitePourcentAssurance = 0;
      }

      objRow.mensualiteTotal = objRow.mensualite+objRow.mensualitePourcentAssurance;
      objRow.coutTotal = objRow.mensualiteTotal*objRow.nbEcheance-objRow.capital;
    };

    var addRow = function(objRow){
      $(".tableCredit tbody").append(
        "<tr data-echeance='"+objRow.nbEcheance
          +"' data-interet='"+(objRow.pourcentInteret*100).toFixed(2)
          +"' data-mensualite='"+(Math.round(objRow.mensualite*100)/100).toFixed(2)
          +"' data-capital='"+objRow.capital.toFixed(2)
          +"' data-frais='"+(Math.round(objRow.mensualitePourcentAssurance*100)/100).toFixed(2)
          +"'>"
        +"<td>"+objRow.id+" "+objRow.unit+"</td>"
        +"<td>"+objRow.nbEcheance+"</td>"
        +"<td>"+objRow.capital.toFixed(2)+"&nbsp;€</td>"
        +"<td>"+(objRow.pourcentInteret*100).toFixed(2)+"&nbsp;%</td>"
        +"<td>"+(Math.round(objRow.mensualite*100)/100).toFixed(2)+"&nbsp;€</td>"
        +"<td>"+(Math.round(objRow.mensualitePourcentAssurance*100)/100).toFixed(2)+"&nbsp;€</td>"
        +"<td>"+(Math.round(objRow.mensualiteTotal*100)/100).toFixed(2)+"&nbsp;€</td>"
        +"<td>"+(Math.round(objRow.coutTotal*100)/100).toFixed(2)+"&nbsp;€</td>"
        +"</tr>"
      );
    };

    var capital = $('#capitalEmprunte').val()!=""?+$('#capitalEmprunte').val():10000,
        pourcentInteret = $('#interetAnnuel').val()!=""?$("#interetAnnuel").val()/100:0.0315,
        pourcentAssurance = $('#frais').val()!=""?$("#frais").val()/100:0.0036,
        pourcent = pourcentInteret + pourcentAssurance,
        frais = 0,
        nbannee = 10,
        ammortissement = capital/nbannee,
        minDate = 3,
        maxDate = 18;

    if($('#duree').val()=="12-180"){
      minDate = 1;
      maxDate = 15;
    }
    if($('#duree').val()=="192-360"){
      minDate = 16;
      maxDate = 30;
    }

    $(".tableCredit tbody").empty();

    if(minDate==3 && maxDate==18){
      for(var i=minDate;i<=maxDate;i++){
        var objRow = {
          id: i,
          unit: "mois",
          nbEcheance: i,
          capital: capital,
          pourcentInteret: pourcentInteret,
          pourcentAssurance: pourcentAssurance,
          mensualite: 0,
          mensualitePourcentAssurance: 0,
          mensualiteTotal: 0,
          coutTotal: 0
        }

        setObjRow(objRow);

        addRow(objRow);

        addListenerTableCredit();
      }
    }else{
      for(var i=minDate;i<=maxDate;i++){
        var objRow = {
          id: i,
          unit: "années",
          nbEcheance: 12*i,
          capital: capital,
          pourcentInteret: pourcentInteret,
          pourcentAssurance: pourcentAssurance,
          mensualite: 0,
          mensualitePourcentAssurance: 0,
          mensualiteTotal: 0,
          coutTotal: 0
        }

        if(i==1) objRow.unit  ="année";

        setObjRow(objRow);

        addRow(objRow);

        addListenerTableCredit();
      }
    }
  };

  var calculateTableAmortissement = function(nbEcheance,interet,mensualite,capital,frais){

    var addRow = function(objRow){
      $(".tableAmortissement tbody").append(
        "<tr>"
        +"<td>"+objRow.id+"</td>"
        +"<td>"+(Math.round(objRow.capitalRestantDu*100)/100).toFixed(2)+"</td>"
        +"<td>"+(Math.round(objRow.interet*100)/100).toFixed(2)+"</td>"
        +"<td>"+(Math.round(objRow.capitalRembourse*100)/100).toFixed(2)+"</td>"
        +"<td>"+(Math.round(objRow.frais*100)/100).toFixed(2)+"</td>"
        +"<td>"+(Math.round(objRow.mensualite*100)/100).toFixed(2)+"</td>"
        +"</tr>"
      );
    };

    var capitalRestantDu = capital;
    $(".tableAmortissement tbody").empty();
    for(var i=1;i<=nbEcheance;i++){

      var objRow = {};
      objRow.id = i;
      objRow.capitalRestantDu = capitalRestantDu;
      objRow.interet = capitalRestantDu*interet/1200;
      if(i==nbEcheance){
        mensualite = objRow.capitalRestantDu +objRow.interet;
      }
      objRow.capitalRembourse = mensualite-objRow.interet;
      objRow.frais = frais;
      objRow.mensualite = mensualite*1+frais*1;
      addRow(objRow);

      capitalRestantDu = capitalRestantDu - objRow.capitalRembourse;
    }

    
    $('#myModal').modal('show')

  };
  
  var addListenerTableCredit = function(){
    $('.tableCredit tr').click(function(e){
      calculateTableAmortissement(
        $(e.currentTarget).attr('data-echeance'),
        $(e.currentTarget).attr('data-interet'),
        $(e.currentTarget).attr('data-mensualite'),
        $(e.currentTarget).attr('data-capital'),
        $(e.currentTarget).attr('data-frais')
      );
    });
  }

  calculateTableDuree();

  $('#capitalEmprunte').change(function(){
    /*
    var string ="";
    var obj = $('#capitalEmprunte');
    for(i in obj)
      string += i+":\n"+obj[i]+"\n--------------\n";

    alert(string);
    alert(obj.val());
    */
    calculateTableDuree();
  });
  $('#interetAnnuel').change(function(){calculateTableDuree();});
  $('#frais').change(function(){calculateTableDuree();});
  $('#duree').change(function(){calculateTableDuree();});
  addListenerTableCredit();
});