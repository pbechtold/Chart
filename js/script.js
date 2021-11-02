var divClass = document.getElementsByClassName('chdiv');
var div = [];
var j = 1;

for (let i = 0; i< divClass.length; i++) {
    
    let title, type, chId, chDataFormat, chCurrencySymbol, keyDiv, valueDiv, colorDiv, percDiv, chartDataSet, chartLabels, canVas, chDataTable, thisChart, optionsPie, optionsBar, symbol;

    div[i] = document.getElementById('chart_div_'+j).children;
    
    title = div[i].chart_title.value;
    type = div[i].chart_type.value;
    chId = div[i].chart_id.value;
    chDataFormat = div[i].chart_data_format.value;
    chCurrencySymbol = div[i].chart_currency_symbol.value;
    keyDiv = div[i].div_key.children;
    valueDiv = div[i].div_value.children;
    colorDiv = div[i].div_color.children;
    percDiv = div[i].div_percent.children;
    chartDataSet = {label:[], data:[], backgroundColor: [], borderColor: [], borderWidth: 1};
    chartLabels = {labels:[]};

    // chDataFormat 
    if (chDataFormat === "2") {
        for (let k = 0; k<keyDiv.length; k++) {
            chartDataSet.data[k] = percDiv[k].value;
        }
        symbol = function(value) {
            return value + ' %';
        };
    } else {
        for (let k = 0; k < keyDiv.length; k++) {
            let parseVal = [];
            parseVal[k] = parseFloat(valueDiv[k].value);
            chartDataSet.data[k] = parseVal[k];
        }
        symbol = function (value) {
            let parseVal = parseFloat(value);
            return parseVal.toLocaleString() + ' ' + chCurrencySymbol;
        };
    }

    for (let k = 0; k < keyDiv.length; k++) {
        chartLabels.labels[k] = keyDiv[k].value;
    }

    for (let k = 0; k < colorDiv.length; k++) {
        chartDataSet.backgroundColor[k] = "#" + colorDiv[k].value;
        chartDataSet.borderColor[k] = "#" + colorDiv[k].value;
    }

    optionsPie = {
        plugins: {
            datalabels: {
                align: 'end',
                anchor: 'center',
                backgroundColor: '#ffffff',
                borderColor: '#000000',
                borderRadius: 1,
                borderWidth: 0.5,
                color: '#000000',
                font: {
                  size: 13,
                  weight: 600
                },
                padding: 2,
                display: 'auto',
                formatter: symbol
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            labels:{
                boxWidth: 5,
                usePointStyle: true,
                boxHeight: 1
            }
        },
        title: {
            display: true,
            text: title
        }
    };

    optionsBar = {
            plugins: {
              datalabels: {
                align: 'start',
                anchor: 'end',
                backgroundColor: '#ffffff',
                borderColor: '#000000',
                borderRadius: 1,
                borderWidth: 0.5,
                color: '#000000',
                font: {
                  size: 13,
                  weight: 600
                },
                offset: 1,
                padding: 2,
                clamp: true,
                clip: true,
                display: 'auto',
                formatter: symbol
              }
            },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: false
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            tooltip: false
          };

    canVas = document.getElementById(chId).getContext('2d');
    console.log(symbol.value);


    if (type === 'pie') {
        chDataTable = {
            type: type,
            data: {
                labels: chartLabels.labels,
                datasets: [{
                    label: chartDataSet.label,
                    data: chartDataSet.data,
                    backgroundColor: chartDataSet.backgroundColor,
                    borderColor: '#000000',
                    borderWidth: 1
                }]
            },
            options: optionsPie
        };

        thisChart = new Chart(canVas, chDataTable);
    } else {
        chDataTable = {
            type: type,
            data: {
                labels: chartLabels.labels,
                datasets: [{
                    // inline label/key
                    label: chartDataSet.label,
                    // inline data/value
                    data: chartDataSet.data,
                    backgroundColor: chartDataSet.backgroundColor,
                    borderColor: '#000000',
                    borderWidth: 1,
                    barPercentage: 0.5,
                    barThickness: 24,
                    minBarLength: 10
                }]
            },
            options: optionsBar
        };

        thisChart = new Chart(canVas, chDataTable);
    }
    j++;
}

