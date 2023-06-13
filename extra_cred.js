// Fetch the JSON data and add to console
d3.json(url).then(function(data) {
    console.log(data);
  });
  
  // Initialize 
  function init() {
  
      // Tie to the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
  
      // Tie to sample names, drop-down
      d3.json(url).then((data) => {
          
          // Create a variable for names
          let names = data.names;
  
          // Samples -> drop down
          names.forEach((id) => {
  
              // Log the value in the loop
              console.log(id);
  
              dropdownMenu.append("option")
              .text(id)
              .property("value",id);
          });
  
          // Point to first name
          let sample_one = names[0];
  
          // Log it
          console.log(sample_one);
  
          // Plot it
          buildGaugeChart(sample_one);
      });
  };
  
  // Use function for guage chart
  function buildGaugeChart(sample) {
  
      // Pull the json
      d3.json(url).then((data) => {
  
          // Make a variable for metadata
          let metadata = data.metadata;
  
          // Filter the metadata
          let value = metadata.filter(result => result.id == sample);
  
          // Log the filtered metadata results
          console.log(value)
  
          // Point to the first filtered result
          let valueData = value[0];
  
          // Pull the key/values for the demographic box
          let washFrequency = Object.values(valueData)[6];
          
          // Use trace to activate chart
          let trace2 = {
              value: washFrequency,
              domain: {x: [0,1], y: [0,1]},
              title: {
                  text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                  font: {color: "black", size: 18}
              },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                  axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                  bar: {color: "blue"},
                  steps: [
                      {range: [0, 1], color: "rgba(255, 0, 0, 1)"},
                      {range: [1, 2], color: "rgba(230, 26, 0, 1)"},
                      {range: [2, 3], color: "rgba(204, 51, 0, 1)"},
                      {range: [3, 4], color: "rgba(179, 77, 0, 1)"},
                      {range: [4, 5], color: "rgba(153, 102, 0, 1)"},
                      {range: [5, 6], color: "rgba(128, 128, 0, 1)"},
                      {range: [6, 7], color: "rgba(102, 153, 0, 1)"},
                      {range: [7, 8], color: "rgba(77, 179, 0, 1)"},
                      {range: [8, 9], color: "rgba(51, 204, 0, 1)"},
                      {range: [9, 10], color: "rgba(0, 255, 0, 1)"},
                  ]
              } 
          };
  
          // Layout settings
          let layout = {
              width: 378, 
              height: 450,
              margin: {t: 0, b:0}
          };
  
          // use Plotly to run the chart
          Plotly.newPlot("gauge", [trace2], layout)
      });
  };
  
  // Call the initialize function
  init();