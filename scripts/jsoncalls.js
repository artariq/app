function connect(e)
{
  var term= {button:e};
  $.ajax({
  url:'http://young-stream-4848.herokuapp.com/fuel/all',
  type:'GET',
  data:term,
  dataType:'json',
  error:function(jqXHR,text_status,strError){
    alert("no connection");},
    timeout:60000,
    success:function(data){
      $("#results").html("");
      for(var i in data.result){
        $("#results").append("<li>"+data.result[i].year+"</li>");
      }
    }
});}

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