function init(){
    
    var w = 600;
	var h = 270;
	var barPadding = 10;
	var dataset=[14, 5, 20, 23, 9, 23, 13, 15, 20, 29, 30, 12, 5, 4, 13, 15, 28, 26, 27, 25];
	
	var xScale = d3.scaleBand()
					.domain(d3.range(dataset.length))
					.rangeRound([0, w+10])
					.paddingInner(0.05);
					
	var yScale = d3.scaleLinear()
					.domain([d3.max(dataset,function(d){
						return 30;
					}),
					d3.min(dataset,function(d){
						return 0;
					})])
					.range([5, h]);

	var xAxis=d3.axisBottom()
                    .ticks(5)
                .scale(xScale);

    var yAxis=d3.axisLeft()
                    .ticks(5)
                .scale(yScale);
	//Create SVG element
	var svg = d3.select("body") //Reference the id of the HTML element
	.append("svg")
	.attr("width", w+50)
	.attr("height", h+30);
	
	//Create bars	
	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", function(d, i) {
			return xScale(i)+15; //Reference the column-name to get value
		})
		.attr("y", function(d) {
			return yScale(d);
		})
		.attr("width", xScale.bandwidth())
		.attr("height", function(d) {
				return h - yScale(d);
		})
		.attr("fill", function(d) {
			return "rgb(0, 0, " + Math.round(d * 10) + ")";
			});
			
	//Create labels
	svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
			.text(function(d) {
				return d;
			})
			.attr("text-anchor", "middle")
            .attr("x", function(d, i) {
                return xScale(i)+15 + xScale.bandwidth() / 2;
            })
            .attr("y", function(d) {
                return yScale(d) + 14;
            })
            .attr("font-family", "sans-serif")
			.attr("font-size", "11px")
            .attr("fill", "white");
	
	//On click, update with new data
	d3.select("#button")
		.on("click", function() {
			
			//New values for dataset
			//dataset = [11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 5, 10, 13, 19, 21, 25, 22, 18, 15, 13];
			var numValues = dataset.length;
			dataset=[];
			var maxValue = 25;
			
			for (var i=0; i < numValues; i++){
				var newNumber = Math.floor(Math.random()* maxValue);
                        dataset.push(newNumber);
			}

			//Update all rects
			svg.selectAll("rect")
			.data(dataset)
			.attr("y", function(d) {
				return yScale(d);
			})
			.attr("height", function(d) {
				return h - yScale(d);
			});
			
			//Update all texts
			svg.selectAll("text")
            .data(dataset)
			.text(function(d) {
				return d;
			})
			.attr("text-anchor", "middle")
            .attr("x", function(d, i) {
                return xScale(i) +15+ xScale.bandwidth() / 2;
            })
            .attr("y", function(d) {
                return yScale(d) + 14;
            })
            .attr("font-family", "sans-serif")
			.attr("font-size", "11px")
            .attr("fill", "white");
		});

	svg.append("g")
        .attr("transform","translate(0, "+(h - barPadding+10) +")")
        .call(xAxis);
    svg.append("g")
        .attr("transform","translate("+(barPadding+10) +")")
        .call(yAxis);
}
window.onload= init;
