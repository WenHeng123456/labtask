	function init(){
    
    var w = 500;
	var h = 150;
	var barPadding = 10;
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
                        return d[0];
                    }),d3.max(dataset,function(d){
                        return d[0];
                    })])
                    .range ([10,350]);
    var yScale = d3.scaleLinear()
                    .domain([d3.min(dataset,function(d){
                        return d[1];
                    }),d3.max(dataset,function(d){
                        return d[1];
                    })])
                    .range ([h-barPadding,barPadding]);
    	
	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", function(d,i){
			return xScale(d[0]);
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
				return xScale(item[0]+5)
			})
			.attr("y",(item)=>{
				return yScale(item[1])
			})
			.text((item)=>{
				return item[0]+", "+item[1]
			})

}
window.onload= init;
