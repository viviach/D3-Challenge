function responsive(){

// Step 1: Set up our chart
//=================================
    var svgWidth = 970;
    var svgHeight = 500;

    var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
    var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Step 3:
// Import data from the donuts.csv file
// =================================
    d3.csv("./assets/data/data.csv").then(function(data) {

        console.log(data);
    
    // Format the data
        data.abbr = data.map(data => data.abbr);  
        data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        });

    // Step 5: Create the scales for the chart
    // =================================
        var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.poverty), d3.max(data, d => d.poverty)])
        .range([0, width]);

        var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.healthcare), d3.max(data, d => d.healthcare)])
        .range([height, 0]);

    // Step 7: Create the axes
    // =================================
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

    // Step 8: Append the axes to the chartGroup
    // ==============================================
    // Add x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Add y-axis
    chartGroup.append("g").call(leftAxis);


    // Step 5: Create Circles
    // ==============================
        var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "green")
        .attr("opacity", ".5");


    }).catch(function(error) {
    console.log(error);
    });
} 

responsive();