const chartData = {
    type: 'bar',
    height: 100,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        colors: ['#4680ff'],
        plotOptions: {
            bar: {
                columnWidth: '80%'
            }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
            crosshairs: {
                width: 1
            }
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: (seriesName) => 'Amount'
                }
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }
    ]
};
export default chartData;
