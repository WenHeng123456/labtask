function init(){
    
	var w = 500;
    var h = 300;
    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w/2,h/2])
                        .scale(2450);

    var path = d3.geoPath()
                .projection(projection);
    
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");

    var color = d3.scaleQuantize()
                .range(["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"])

    d3.csv("VIC_LGA_unemployment.csv", function(data){

        color.domain([
            d3.min(data, function(d) {
                return d.LGA; 
            }),
            d3.max(data, function(d) {
                return d.unemployed; 
            })
        ]);

        d3.json("LGA_VIC.json", function(json){

            for (var i = 0; i<data.length; i++){
                var dataLGA = data[i].LGA;
                var dataUnemployed = parseFloat(data[i].unemployed);
                for(var j=0; j<json.features.length; j++){
                    var jsonLGA = json.features[j].properties.LGA_name;
                    if(dataLGA == jsonLGA){
                        json.features[j].properties.unemployed = dataUnemployed;

                        break;
                    }
                }
            }
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function(d){
                    //get data value
                    var value = d.properties.unemployed;
                    if(value) {
                        return color(value);
                    }else {
                        return "#ccc";
                    };
        
                });

            d3.csv("VIC_city.csv", function(data){

                svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d){
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("cy", function(d){
                        return projection([d.lon, d.lat])[1];
                    })
                    .attr("r", 5)
                    .style("fill", "yellow")
                    .style("stroke", "gray")
                    .style("stroke-width", 0.25)
                    .style("opacity", 0.75);
                svg.selectAll("text")
                    .data(data)
                    .enter()
                    .append("text")
                    .text(function(d){
                        return d.place;
                    })
                    .attr("x", function(d){
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("y", function(d){
                        return projection([d.lon, d.lat])[1];
                    })
                    .attr("fill", "black");
            });

        });
        
    });
}	
window.onload= init;
