$(document).ready(function() {
  
  var fqdn = 'http://young-stream-4848.herokuapp.com';

  var myyear;

  $("#year").change(function() {
    myyear = $('option:selected', this).attr('value');
    console.log('myyear: '+myyear);
    connect();
  })

  $('.connect').click(connect);
  
  function connect(e)
  {
  
    var data = {};
    if (!!myyear) data.year = myyear;

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
          $("#results").append("<li>"+data.result[i].year+"</li>");
        }
      }
    });
  }





});





/*$function ()
{
  $('#callall').on('click', $.getJSON('http://young-stream-4848.herokuapp.com/fuel/all', function(data) {
        var output="<ul>";
        for (var i in data.result) {
            output+="<li>" + data.result[i].manufacturer + " " + data.result[i].year + "--" + data.result[i].model+"</li>";
        }

        output+="</ul>";
        document.getElementById("placeholder").innerHTML=output;
  });)
}
*/