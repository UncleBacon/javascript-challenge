// from data.js
var tableData = data;
var inputID = d3.select("#datetime");
var button = d3.select("#filter-btn");

function strip(html)
{
   var tmp = document.implementation.createHTMLDocument("New").body;
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

button.on("click",function(){
    //get user input from text box
    var inputVal = inputID.property("value");
    //filter data based on input
    var ufoData = tableData.filter(ufo =>ufo.datetime === inputVal);
    //map filtered data to array
    if(inputVal != ""){
    var info = ufoData.map(ufo => [ufo.datetime,ufo.city,ufo.state,ufo.country,ufo.shape,ufo.durationMinutes,ufo.comments]);
    }
    else{
        info = tableData.map(ufo => [ufo.datetime,ufo.city,ufo.state,ufo.country,ufo.shape,ufo.durationMinutes,ufo.comments]);
    }
    // Select table body
    var table = d3.select("tbody")
    // Remove any existing table data
    table.html(" ");
    // Append new data
    info.forEach(([date, city, state, country, shape, time, comment])=>{
        var row = table.append("tr");
        row.append("td").text(date);
        row.append("td").text(city);
        row.append("td").text(state);
        row.append("td").text(country);
        row.append("td").text(shape);
        row.append("td").text(time);
        row.append("td").text(strip(comment));
    });
     
});
