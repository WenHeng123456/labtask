	function init(){
    	d3.csv("Task_2.4_data.csv").then(function(data){
			console.log(data);
			wombatSightings=data;
		
			barChart(wombatSightings);
			
		});

	var w = 500;
	var h = 100;
	var barPadding=5;
	var svg1 = d3.select("#chart")
				.append("svg")
				.attr("width",w)
				.attr("height",h);

	function barChart(wombatSightings){
	svg1.selectAll("rect")
		.data(wombatSightings)
		.enter()
		.append("rect")
		.attr("x", function(d,i){
			return i * (w / wombatSightings.length);
			})
		.attr("y", function(d){
			return h - (d.wombats * 4);
			})
		.attr("fill", function(d) {
    		return "rgb(0, 0, " + (d.wombats * 10) + ")";
			})
		.attr("width", function(d){
			return (w / wombatSightings.length - barPadding);
			})
		.attr("height", function(d){
			return (d.wombats * 4);
			});
		
	}
	
}
window.onload= init;
