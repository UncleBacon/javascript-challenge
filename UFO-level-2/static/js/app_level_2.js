// from data.js
var tableData = data;



var button = d3.select("#filter-btn");
var info = [];
var cities = [];
var states = [];
var countries = [];
var shapes = [];
var filter_by = d3.select("#filter-by");
var filter_id;
var dropdowns = tableData.map(ufo => [ufo.city, ufo.state,ufo.country,ufo.shape]);


// document.getElementById("body")
//     .addEventListener("keyup", function(event) {
//     event.preventDefault();
//     if (event.keyCode == 13) {
//         document.button.click();
//     }
// });

// Select table body
var table = d3.select("tbody")

// function to capitalize first letter
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
//function to convert html to plain text
function strip(html)
{
   var tmp = document.implementation.createHTMLDocument("New").body;
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

//function to populate arays used for filter lists
function dropdownList(arr){
    //iterate through items in each array and push unique values to arrays
    arr.forEach(([city,state,country,shape])=>{
        if (!cities.includes(city)){
            cities.push(city);
        }
        if (!states.includes(state)){
            states.push(state);
        }
        if (!countries.includes(country)){
            countries.push(country);
        }
        if (!shapes.includes(shape)){
            shapes.push(shape);
        }
    });
}
//populate "Filter by" dropdown
function filter_Keys(){   
    var keys = Object.keys(data[0]);
    var sliced_keys = keys.slice(0,5);
    var date_index = sliced_keys.indexOf("datetime");
    sliced_keys[date_index]="date";

    //append keys to dropdown
    sliced_keys.sort().forEach(filter=>{
        filter_by.append("option").text(filter)
    });
    return filter_by;
}

// Function to display input field
function Dynentry(label, phold){
    var ulist = d3.select("#dynamic-filter");
    var input = ulist.append("li").attr('class',"filter list-group-item");
    input.append("label").attr('for','date').text(`${label}`);
    input.append("input").attr('class',"form-control").attr('id',"datetime").attr('type',"text").attr(`placeholder,${phold}`);

}   
function list_entry(label){
    var ulist = d3.select("#dynamic-filter-list");
    var input = ulist.append("li").attr('class',"filter list-group-item");
    input.append("label").attr('for','date').text(`${label}`);
    input.append("select").attr('class','form-control').attr('id','filter_option').attr('placeholder','Choose a Filter');
}

filter_Keys();
dropdownList(dropdowns);
filter_by.on("change",function(){
    d3.select("#dynamic-filter").html(" ");
    d3.select("#dynamic-filter-list").html(" ");

    if ((filter_by.property("value")!== "duration") || (filter_by.property("value")!== "date")){
        list_entry(`Choose a ${filter_by.property("value")} to filter by`);
        filter_id = d3.select("#filter_option");
    }
    if(filter_by.property("value")==='state'){

        filter_id.append("option").text('State').attr('selected',"true").attr('disabled',"disabled");
        states.sort().forEach(state=>{
            filter_id.append("option").text(state);
        });
        
    }
    else if(filter_by.property("value")==='country'){
        filter_id.append("option").text('Country');
        countries.sort().forEach(country=>{
            filter_id.append("option").text(country);
        });
    }
    else if(filter_by.property("value")==='shape'){
        filter_id.append("option").text('Shape');
        shapes.sort().forEach(shape=>{
            filter_id.append("option").text(shape);
        });
    }
    else if(filter_by.property("value")==='city'){
        filter_id.append("option").text('City');
        cities.sort().forEach(city=>{
            filter_id.append("option").text(city);
        });
        
    }
    else if(filter_by.property("value")==='duration'){
        d3.select("#dynamic-filter-list").html(" ");
        Dynentry("Enter minimum duration below","Time (minutes)");
        
    }
    else if(filter_by.property("value")==='date'){
        d3.select("#dynamic-filter-list").html(" ");
        Dynentry("Enter a date to search below","1/11/2011");

    }

    filter_id.on("change",function(){
        var val = filter_id.property("value");
        return val, console.log(val)
    });

});

button.on("click",function(){
    //prevenet page from refreshing on submit
    d3.event.preventDefault();

    if(filter_by.property("value")===""){
        info = tableData.map(ufo => [ufo.datetime,ufo.city,ufo.state,ufo.country,ufo.shape,ufo.durationMinutes,ufo.comments]);
    }
    else if (filter_by.property("value")==="date"){

        if(document.body.contains(document.getElementById('datetime'))){
            var inputID = d3.select("#datetime");

            //get user input from text box
            var inputVal = inputID.property("value");
            console.log(inputVal);

            //map filtered data to array
            if(inputVal ===""){
                info = tableData.map(ufo => [ufo.datetime,ufo.city,ufo.state,ufo.country,ufo.shape,ufo.durationMinutes,ufo.comments]);
            }
            else {
            //filter data based on input
            var ufoData = tableData.filter(ufo =>ufo.datetime === inputVal);
            info = ufoData.map(ufo => [ufo.datetime,ufo.city,ufo.state,ufo.country,ufo.shape,ufo.durationMinutes,ufo.comments]);
            }
        }
    }
    else{
        var value = filter_id.property("value");
        var search = filter_by.property("value");
        console.log("else statement: ",value);
        // console.log("else search: ",search);
        var ufoData = tableData.filter(ufo =>ufo[`${search}`]=== value);
            info = ufoData.map(ufo => [ufo.datetime,ufo.city,ufo.state,ufo.country,ufo.shape,ufo.durationMinutes,ufo.comments]);
    }
    
    // Remove any existing table data
    table.html(" ");
    // Append new data to table
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

    // console.log("State Filter: ",stateFilter);
    // // var CityFilter = Cityfilt.property("value")
    // // console.log("City: ",CityFilter)
    // var stateFilter = Statefilt.property("value")
    // console.log("State: ",stateFilter) 
    // var CountryFilter = Countryfilt.property("value")
    // console.log("Country: ",CountryFilter)

});
