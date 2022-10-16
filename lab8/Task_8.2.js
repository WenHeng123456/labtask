function init(){
    
	var w = 500;
    var h = 300;
    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w/2,h/2])
                        .scale(2450);

    var path = d3.geoPath()
                .projection(projection);
    
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");

    var color = d3.scaleQuantize()
                .range(["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"])

    d3.csv("VIC_LGA_unemployment.csv", function(d){

        d3.json("LGA_VIC.json").then(function(json){

            for (var i = 0; i<data.length; i++){
                var dataState = data[i].state;
                var dataValue = parseFloat(data[i].value);
                for(var j=0; j<json.features.length; j++){
                    var jsonState = json.features[j].properties.name;
                    if(dataState == jsonState){
                        json.features[j].properties.value = dataValue;

                        break;
                    }
                }
            }
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path);

        
        });


    });
        
}	
window.onload= init;
