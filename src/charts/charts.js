/* eslint-disable no-undef */
// Visual options for the Google Chart
var json = require('../appOptions/options.js'),
    options = json.default['chart-options'];

export function chartOptions() {
    return {
        title: options.title,
        width: options.width,
        legend: options.legend,
        axes: {
            y: { 0: { side: 'left', label: options.yAxesLabel} },
            x: { 0: { side: 'bottom', label: options.xAxesLabel} }
        },
        bar: { groupWidth: options.barGroupWidth }
    };
}

// Create a new array to be used with Google Charts
export function arrayForChart(data) {
    let chartArray = [['Movie', 'Crawl Length']],
        bar;

    for(let i = 0; i < data.length; i++) {
        bar = [data[i].title, data[i].crawlLength];
        chartArray.push(bar);
    }

    return chartArray;
}

// Build bar chart using Google Charts
export function loadChart(chartArray) {
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(function() {

        var data = new google.visualization.arrayToDataTable(chartArray),
            options = chartOptions(),
            chart = new google.charts.Bar(document.getElementById('chart'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    });
}