$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!

    $.mobile.allowCrossDomainPages = true;
});

  $('#slider-1').on('slidestop', function(e, ui) {
      console.log("slider has stopped.");
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

  var mydistance;
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

  /*$( "#slider-1").on('slidestop', function( event ) {
    var slider_value=$("#slider-1").slider().val();
    alert('Value: '+slider_value);
  });*/

console.log("Befor slider");

  /*$('#slider-1').on('slidestop', function(e, ui) {
      console.log("slider has stopped.");
  });*/

  /*$( "#slider-1").change(function( event ) {
    console.log("Inside slider");
    var slider_value=$("#slider-1").slider().val();
    alert('Value: '+slider_value);
  });*/

  $('.connect').click(connect);
  
  function calculate(highway, city) {
/*    var fuel_cons = (highway / 100) * mydistance;  */
  }

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
          calculate(data.result[i].fuel_cons.highway.metric, data.result[i].fuel_cons.city.metric);
          $("#results").append("<li><h3>"+data.result[i].manufacturer+" "+data.result[i].model+" "+data.result[i].year+"</h3></li>");
          $("#results").append("<h4 class='spend'>Fuel Spend: </h4>");
          $("#results").append("<h4 class='spend'>CO2 Emissions: </h4>");
          $("#results").append("<hr>");
        }
      }
    });
  }
});