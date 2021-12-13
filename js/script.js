var divClass = document.getElementsByClassName('chdiv');
var div = [];
var j = 1;

for (let i = 0; i< divClass.length; i++) {
    
    let title, type, chId, chDataFormat, chCurrencySymbol, keyDiv, valueDiv, colorDiv, percDiv, chartDataSet, chartLabels, canVas, chDataTable, thisChart, optionsPie, optionsBar, optionsLine, symbol;

    div[i] = document.getElementById('chart_div_'+j).children;
    
    title = div[i].chart_title.value;
    type = div[i].chart_type.value;
    chId = div[i].chart_id.value;
    chDataFormat = div[i].chart_data_format.value;
    chCurrencySymbol = div[i].chart_currency_symbol.value;

    // Key (1)
    keyDiv = div[i].div_key.children;
    // value (n<5)
    valueDiv = div[i].div_value.children;
    colorDiv = div[i].div_color.children;
    percDiv = div[i].div_percent.children;

    /**
     * @todo multi Datasets
     */
    chartDataSet = {label:[], data:[], backgroundColor: [], borderColor: []};

    // key1
    chartLabels = {labels:[]};

    // Percent(2)/Currency
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
                size: 12,
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
                stacked: false
            }],
            yAxes: [{
                stacked: false
            }]
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
        },
        tooltip: false
    };
    optionsLine = {
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
                size: 12,
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
        // scales: {
        //     xAxes: [{
        //         stacked: false
        //     }],
        //     yAxes: [{
        //         stacked: false
        //     }]
        // },
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
        },
        tooltip: false
    };

    canVas = document.getElementById(chId).getContext('2d');

    /**
     * @todo create diff datasets
     * @todo only pie backgroundColor: chartDataSet.backgroundColor !!!!
     * 
     */
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
                    borderWidth: 2
                },
            {
                label: chartDataSet.label,
                    data: chartDataSet.data,
                    backgroundColor: chartDataSet.backgroundColor,
                    borderColor: '#000000',
                    borderWidth: 2
            }]
            },
            options: optionsPie
        };

        thisChart = new Chart(canVas, chDataTable);
    }else if (type === 'line'){
        chDataTable = {
            type: type,
            data: {
                labels: chartLabels.labels,
                datasets: [{
                    label: "Dataset 1",
                    data: chartDataSet.data,
                    backgroundColor: "blue",
                    borderColor: 'blue',
                    fill: false,
                    tension: 0.0,
                },
                {
                    label: "Dataset 2",
                    data: chartDataSet.data,
                    backgroundColor: "red",
                    borderColor: 'red',
                    fill: false,
                    tension: 0.4,
                },
                {
                    label: "Dataset 3",
                    data: chartDataSet.data,
                    backgroundColor: "green",
                    borderColor: 'green',
                    fill: false,
                    tension: 0.0,
                }]
            },
            options: optionsLine
        };

        thisChart = new Chart(canVas, chDataTable);
    }else {
        chDataTable = {
            type: type,
            data: {
                labels: chartLabels.labels,
                datasets: [{
                    label: "Dataset 1",
                    data: chartDataSet.data,
                    backgroundColor: "blue",
                    borderColor: '#000000',
                    borderWidth: 1,
                    barPercentage: 0.8,
                    //barThickness: 24,
                    minBarLength: 25
                },
                {
                    label: "Dataset 2",
                    data: chartDataSet.data,
                    backgroundColor: "red",
                    borderColor: '#000000',
                    borderWidth: 1,
                    barPercentage: 0.8,
                    //barThickness: 24,
                    minBarLength: 25
                },
                {
                    label: "Dataset 3",
                    data: chartDataSet.data,
                    backgroundColor: "green",
                    borderColor: '#000000',
                    borderWidth: 1,
                    barPercentage: 0.8,
                    //barThickness: 24,
                    minBarLength: 25
                }]
            },
            options: optionsBar
        };

        thisChart = new Chart(canVas, chDataTable);
    }
    j++;
}