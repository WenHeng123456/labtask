function init(){
    
	var w = 600;
    var h = 200;
	var barPadding=10;
    var maxValue = 25;
    var dataset = [14, 5, 20, 23, 9, 23, 13, 15, 20, 29, 30, 12, 5, 4, 13, 15, 28, 26, 27, 25];

    var yScale = d3.scaleLinear()
                .domain([d3.max(dataset,function(d){
                        return 30;
                    }),
                    d3.min(dataset,function(d){
                        return 0;
                    })])
                    .range([0,h]);

    var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .rangeRound([0,w])
                .paddingInner(0.05);

    //Scale
    var xAxis=d3.axisBottom()
                .ticks(5)
                .scale(xScale);

    var yAxis=d3.axisLeft()
                .ticks(5)
                .scale(yScale);

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w+50)
                .attr("height", h+30);
    
    var bars=svg.selectAll("rect")
                .data(dataset);
    var lables = svg.selectAll("text")
                    .data(dataset)

                //Update
                d3.select("#button")
                    .on("click", function(){
                    
                var newNumber = Math.floor(Math.random() * maxValue);
                dataset.push(newNumber);
          
                var bars = svg.selectAll("rect").data(dataset);
                var labels = svg.selectAll("text").data(dataset);
                xScale.domain(d3.range(dataset.length));
          
                bars.enter()
                  .append("rect")
                  .attr("x",w)
                  .attr("x", function(d, i){
                      return xScale(i)+20
                  })
                  .attr("y", function(d) {
                    return  yScale(d);
                  })
                  .merge(bars)
                  .transition()
                  .delay(500)
                  .attr("x", function(d, i) {
                    return xScale(i)+20;
                  })
                  .attr("y", function(d) {
                    return  yScale(d);
                  })
                  .attr("width", xScale.bandwidth())
                  .attr("height", function(d) {
                    return h-yScale(d);
                  })
                  .attr("fill", function(d){
                        return "rgb(0, 0, " + (d * 10) + ")";
                    }); 
                  console.log(dataset.length) 

               labels.enter()
              .append("text")
              .merge(labels)
              .transition()
              .duration(500)
              .text(function(d) {
                  return d;
              })
              .attr("x", function(d, i) {
                  return xScale(i) +20+ xScale.bandwidth()/2;
              })
              .attr("y", function(d) {
                  return yScale(d) + 14;
              })
              .attr("fill", "white")
              .attr("text-anchor", "middle")
			  .attr("font-size", "11px")
			  .attr("font-family", "sans-serif");
            });
             
            //Remove
            d3.select("#button2")
                .on("click", function(){
                    dataset.shift();
                    //dataset.pop() remove right side first

                    var bars = svg.selectAll("rect").data(dataset);
                    var labels = svg.selectAll("text").data(dataset);
                    xScale.domain(d3.range(dataset.length));

                    bars.exit()
                        .transition()
                        .duration(500)
                        .attr("x",w)
                        .remove()

                    bars.transition()
                    //Update Smoothly
                    .delay(500)
                    .attr("x", function(d, i){
                        return xScale(i)+20;
                    })
                    .attr("y", function(d){
                        return yScale(d);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function(d) {
                        return h-yScale(d);})
                    .attr("fill", function(d){
                        return "rgb(0, 0, " + (d * 10) + ")";
                    });
                        console.log(dataset);

                    labels.exit()
                            .transition()
                            .duration(500)
                            .attr("x", w)
                            .remove()

                    labels.transition()
                        .delay(500)
                        .text(function(d) {
                            return d;
                        })
                        .attr("x", function(d, i) {
                            return xScale(i) +20+ xScale.bandwidth()/2;
                        })
                        .attr("y", function(d) {
                            return yScale(d) + 14;
                        })
                        .attr("text-anchor", "middle")
                        .attr("fill", "white")
						.attr("font-size", "11px")
					  	.attr("font-family", "sans-serif");   
            }); 
                    
    svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function(d, i){
                return xScale(i)+20;
                })
                .attr("y", function(d){
                    return yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return h-yScale(d)})
                .attr("fill", function(d){
                        return "rgb(0, 0, " + (d * 10) + ")";
                 });

    svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                return d;
            })
            .attr("text-anchor", "middle")
            .attr("x", function(d, i) {
                return xScale(i)+ 20 +xScale.bandwidth()/2;
            })
            .attr("y", function(d) {
                return yScale(d)+14;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");  

		}

	//svg.append("g")
    //    .attr("transform","translate(0, "+(h - barPadding+10) +")")
    //    .call(xAxis);
    //svg.append("g")
    //    .attr("transform","translate("+(barPadding+10) +")")
    //    .call(yAxis);
	
window.onload= init;
