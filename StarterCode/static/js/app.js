// Create a function to update the charts based on the selected sample
// Create a function to update the charts based on the selected sample
function updateCharts(sample) {
    console.log(sample);

    d3.json(URL).then(function (data) {
        let sampleNames = data.samples;
        let metaNames = data.metadata;

        let sampleName = sampleNames.filter(x => x.id == sample);
        let metaName = metaNames.filter(x => x.id == sample);
        console.log(metaName);
        console.log(sampleName);

        let result = sampleName[0];
        let metaResult = metaName[0];
        console.log(metaResult);
        console.log(result);

        let sampleValues = result.sample_values.slice(0, 10).reverse();
        let otuLabels = result.otu_labels.slice(0, 10).reverse();
        let otuIds = result.otu_ids.slice(0, 10).reverse();
        let wfreq = metaResult.wfreq;

        let panel = d3.select(`#sample-${metaResult.id}`).text(`Location: ${metaResult.location}`);
        console.log(panel);

        const barData = [{
            type: 'bar',
            x: sampleValues,
            y: otuIds.map(id => `OTU ${id}`),
            text: otuLabels,
            orientation: 'h'
        }];
        Plotly.newPlot('barChart', barData);

        const bubbleData = [{
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIds
            }
        }];
        Plotly.newPlot('bubbleChart', bubbleData);
    });
}

// Create a function to update the metadata based on the selected sample
function updateMetadata(sample) {
    // Your code to update metadata here...
}

// Initialize the dropdown and load initial data
function initializeDropdown() {
    const dropdown = document.getElementById('selDataset');

    // Populate the dropdown with sample IDs
    samples.forEach(sample => {
        const option = document.createElement('option');
        option.text = sample.id;
        option.value = sample.id;
        dropdown.appendChild(option);
    });

    // Event listener for dropdown change
    dropdown.addEventListener('change', (event) => {
        const selectedSample = event.target.value;
        updateCharts(selectedSample);
        updateMetadata(selectedSample);
    });
}

// Call the init function when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the dropdown and load initial data
    initializeDropdown();

    // Initial chart and metadata update
    const initialSample = samples[0].id; // Change this to your default sample ID
    updateCharts(initialSample);
    updateMetadata(initialSample);
});
