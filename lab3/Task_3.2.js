	function init(){
    
    var w = 600;
	var h = 300;
	var barPadding = 30;
	var dataset=[ 
					[5, 20], 
					[480, 90],  
					[250, 50],  
					[100, 33], 
					[330, 95], 
					[410, 12],  
					[475, 44],  
					[25, 67],  
					[85, 21],  
					[220, 88] 
				]; 
	
	var max = d3.max(dataset, function (d) {
    			return d[0]
			});
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
	var xScale = d3.scaleLinear()
                    .domain([d3.min(dataset,function(d){
                        return d[0]-29;
                    }),d3.max(dataset,function(d){
                        return d[0]+50;
                    })])
                    .range ([10,350]);
    var yScale = d3.scaleLinear()
                    .domain([d3.min(dataset,function(d){
                        return d[1]-10;
                    }),d3.max(dataset,function(d){
                        return d[1]+50;
                    })])
                    .range ([h-barPadding,barPadding]);
    
    var xAxis=d3.axisBottom()
                    .ticks(5)
                .scale(xScale);
    var yAxis=d3.axisLeft()
                    .ticks(5)
                .scale(yScale);
    	
	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", function(d,i){
			return xScale(d[0]+50);
			})
		.attr("cy", function(d){
			return yScale(d[1]);
			})
		.attr("r", 5)
		.attr("fill", "slategrey")
		.style("fill",function(d,i){
			if(d[0]==max){
				return "red";
			}
		});


	svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.attr("x",(item)=>{
				return xScale(item[0]+60)
			})
			.attr("y",(item)=>{
				return yScale(item[1])
			})
			.text((item)=>{
				return item[0]+", "+item[1]
			})
    
    svg.append("g")
        .attr("transform","translate(0, "+(h - barPadding) +")")
        .call(xAxis);
    svg.append("g")
        .attr("transform","translate("+(barPadding-5) +")")
        .call(yAxis);
}
window.onload= init;
