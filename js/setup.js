
// keydiv[n]
const labels = [];
const label = [];


// valuediv[]
const data ={
    labels: labels,
    datasets = {
        label: label,
        data: Array,
        bordercolor: Array, 
        backgroundColor: Array
    }
};

<div>
    <input></input>
    <input></input>
    <input></input>
    <div>
        <input>key1</input>
        <input>key2</input>
        <input>key3</input>
    </div>
    <div class="datasets">
        <div id="dataset1">
            <input>dataset1</input>
            <div id="data">
                <input>val1</input>
                <input>val2</input>
                <input>val3</input>
            </div>
        </div>
        <div id="dataset2">
            <input>dataset2</input>
            <div id="data">
                <input>val1</input>
                <input>val2</input>
                <input>val3</input>
            </div>
        </div>
    </div>
</div>

const NUMBER_CFG = {count: DATASET, min: -100, max: 100};

const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    },
    {
      label: 'Dataset 2',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
    }
  ]
};

for(let i = 0; i < labels.length; i++){
    datasets = {
        labels: labels[i],
        datasets: [
            {
                label: label,
                data: data[i],
                borderColor: borderColor[i],
                backgroundColor: backgroundColor[i]
            },
            {
                label: 'Dataset 2',
                data: Utils.numbers(NUMBER_CFG),
                borderColor: Utils.CHART_COLORS.blue,
                backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            }
        ]
    };
}