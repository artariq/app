$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!

    $.mobile.allowCrossDomainPages = true;
});

$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  });

$(document).ready(function() {
  
  var fqdn = 'http://young-stream-4848.herokuapp.com';
  /*var fqdn = "http://api.getautoscout.com";*/

  var myyear;
  var mymake;
  var mymodel;

  var workd;
  var shopd;
  var leisured;

  var mydistance = '100';
  var myspeed;

  $("#year").change(function() {
    myyear = $('option:selected', this).attr('value');
    console.log('myyear: '+myyear);
  })

  $("#make").change(function() {
    mymake = $('option:selected', this).attr('value');
    console.log('mymake: '+mymake);

    $.ajax({
      url: fqdn + '/fuel/cars',
      type:'GET',
      data: "manufacturer=" + mymake,
      dataType:'json',
      error:function(jqXHR,text_status,strError){
        alert("no connection");},
      timeout:60000,
      success:function(data){
        var option = '';
        $.each(data.result, function(index, value) {
          option += '<option>' + value.model + '</option>';
        });
        console.log("Option: " + option);
        $('#model').html(option);
      }
    });
  })

  $("#model").change(function() {
    myyear = $('option:selected', this).attr('value');
    console.log('mymodel: '+mymodel);
  })

  console.log("Before slider");

  var work = $('.slider1');
  var shopping = $('.slider2');
  var leisure = $('.slider3');

  // Run noUiSlider
  $(work).noUiSlider({
    range: [30, 200]
    ,start: 40
    ,step: 5
    ,handles: 1
    ,set: getComputeWork.bind(work, 'work')
    ,serialization: {
    to: [ $("#work"), 'html' ]
    }
  });

  // Run noUiSlider
  $(shopping).noUiSlider({
    range: [20, 100]
    ,start: 30
    ,step: 5
    ,handles: 1
    ,set: getComputeShopping.bind(shopping, 'shopping')
    ,serialization: {
    to: [ $("#shopping"), 'html' ]
    }
  });

  // Run noUiSlider
  $(leisure).noUiSlider({
    range: [20, 100]
    ,start: 30
    ,step: 5
    ,handles: 1
    ,set: getComputeLeisure.bind(leisure, 'leisure')
    ,serialization: {
    to: [ $("#leisure"), 'html' ]
    }
  });

  mydistance = parseInt($('.slider1').val()) + parseInt($('.slider2').val()) + parseInt($('.slider3').val());
  $('#totaldist').text(mydistance + " km");
  

  function getComputeWork(name) {
    mydistance = parseInt($('.slider1').val()) + parseInt($('.slider2').val()) + parseInt($('.slider3').val());
    $('#totaldist').text(mydistance + " km");
  }

  function getComputeShopping(name) {
    mydistance = parseInt($('.slider1').val()) + parseInt($('.slider2').val()) + parseInt($('.slider3').val());
    $('#totaldist').text(mydistance + " km");
  }

  function getComputeLeisure(name) {
    mydistance = parseInt($('.slider1').val()) + parseInt($('.slider2').val()) + parseInt($('.slider3').val());
    $('#totaldist').text(mydistance + " km");
  }

  $('.connect').click(connect);
  
  function connect(e)
  {
    var data = {};

    if (!!myyear) data.year = myyear;

    if (!!mymake) data.manufacturer = mymake;

    if (!!mymodel) data.model = mymodel;

    $.ajax({
      url: fqdn + '/fuel/cars',
      type:'GET',
      data: data,
      dataType:'json',
      error:function(jqXHR,text_status,strError){
        alert("no connection");},
      timeout:60000,
      success:function(data){
        $("#results").html("");
        console.log("Data: ", data);
        for(var i in data.result){
          var fuelspent = calculate(data.result[i].fuel_cons.highway.metric, data.result[i].fuel_cons.city.metric);
          $("#results").append("<li><h3>"+data.result[i].manufacturer+" "+data.result[i].model+" "+data.result[i].year+"</h3></li>");
          $("#results").append("<h4 class='spend'>Fuel Spend: "+ fuelspent + " Litres/Week </h4>");
          $("#results").append("<h4 class='spend'>Fuel Cost: "+ (fuelspent * 1.37).toFixed(2) + " $/Week </h4>");
          $("#results").append("<h4 class='spend'>Annual CO2 Emissions: " + data.result[i].co2_emissions+" KG/year </h4>");
          $("#results").append("<h4 class='spend'>Transmission: " + data.result[i].transmission+" </h4>");
          $("#results").append("<hr>");
        }
      }
    });
  }

  function calculate(highway, city) {
    var mileage = mydistance;
    var hgRatio = $('#driving option:selected').attr('value');
    var ctRatio = 100 - hgRatio;
    var hgFuel = (mileage/100) * (hgRatio/100) * highway;
    var ctFuel = (mileage/100) * (ctRatio/100) * city;
    var totFuel = hgFuel + ctFuel;
    return totFuel.toFixed(2);
  }

});