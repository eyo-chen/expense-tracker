import { useState, useEffect } from "react";
import StockChartPic from "./StockChartPic/StockChartPic";
import Loading from "../../../../UI/Loading/Loading";
import fetcher from "../../../../../Others/Fetcher/fetcher";
import { mapTimePeriodToDateOption } from "../../../../../Others/Constants/dateOptions";
import styles from "./StockChart.module.css";

function StockChart(props) {
  const [chartConfig, setChartConfig] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateChartConfig();
  }, [props.activeChartType, props.timePeriod]);

  function generateChartConfig() {
    setLoading(true);

    fetchPortfolioData(props.activeChartType, props.timePeriod)
      .then((apiData) => {
        const config = createChartConfigByType(props.activeChartType, apiData, props.timePeriod);
        setChartConfig(config);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
        setLoading(false);
      });
  }


  let chartContent = (
    <div className={styles.placeholder}>
      <p>Select a chart type to display data</p>
    </div>
  );

  if (loading) {
    chartContent = <Loading className={styles.loading} />;
  } else if (chartConfig) {
    chartContent = (
      <StockChartPic
        chartConfig={chartConfig}
        chartType={props.activeChartType}
        className={styles.chartPic}
      />
    );
  }

  return (
    <div className={styles.stockChart}>
      <div className={styles.chartContainer}>
        {chartContent}
      </div>
    </div>
  );
}

export default StockChart;


async function fetchPortfolioData(chartType, timePeriod) {
  const dateOption = mapTimePeriodToDateOption(timePeriod);
  let endpoint = `v1/historical/portfolio?date_option=${dateOption}`;
  if (chartType === "gainloss") endpoint = `v1/historical/gain?date_option=${dateOption}`;
  if (chartType === "stock-composition") endpoint = `v1/historical/stock-composition?date_option=${dateOption}`;

  const response = await fetcher(endpoint, "GET");
  return response;
}

function createChartConfigByType(chartType, apiData, timePeriod) {
  const baseConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  switch (chartType) {
    case 'portfolio':
      return {
        type: 'line',
        data: {
          labels: apiData.dates,
          datasets: [{
            label: 'Portfolio Value',
            data: apiData.values,
            borderColor: 'rgb(100, 141, 255)',
            backgroundColor: 'rgba(100, 141, 255, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: 'rgb(100, 141, 255)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }]
        },
        options: {
          ...baseConfig,
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: function (value) {
                  return '$' + value.toLocaleString();
                }
              }
            },
            x: {
              ticks: {
                maxTicksLimit: timePeriod === 'ALL' || timePeriod === '3Y' || timePeriod === '2Y' ? 12 : undefined
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return 'Portfolio Value: $' + context.parsed.y.toLocaleString();
                }
              }
            }
          }
        }
      };

    case 'performance':
      return {
        type: 'line',
        data: {
          // labels: generateTimeLabels(timePeriod),
          datasets: [{
            label: 'Performance %',
            // data: generateSampleData(timePeriod, -10, 25),
            borderColor: 'rgb(39, 196, 152)',
            backgroundColor: 'rgba(39, 196, 152, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          ...baseConfig,
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return value + '%';
                }
              }
            }
          }
        }
      };

    case 'allocation':
      return {
        type: 'doughnut',
        data: {
          labels: ['Stocks', 'ETFs', 'Cash'],
          datasets: [{
            data: [60, 30, 10],
            backgroundColor: [
              'rgb(100, 141, 255)',
              'rgb(140, 94, 248)',
              'rgb(39, 196, 152)'
            ],
            borderWidth: 2,
            borderColor: 'var(--bg)'
          }]
        },
        options: {
          ...baseConfig,
          plugins: {
            legend: {
              position: 'bottom',
            },
          }
        }
      };

    case 'stock-composition':
      return {
        type: 'line',
        data: {
          labels: apiData.dates,
          datasets: apiData.stocks.map((stock, index) => ({
            label: stock.symbol,
            data: stock.percentages,
            borderColor: getStockColor(index),
            backgroundColor: getStockColor(index, 0.3),
            fill: index === apiData.stocks.length - 1 ? 'origin' : '+1',
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5
          }))
        },
        options: {
          ...baseConfig,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            x: {
              ticks: {
                maxTicksLimit: timePeriod === 'ALL' || timePeriod === '3Y' || timePeriod === '2Y' ? 12 : undefined
              }
            },
            y: {
              beginAtZero: true,
              max: 100,
              stacked: true,
              ticks: {
                callback: function (value) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                },
                footer: function (tooltipItems) {
                  const total = tooltipItems.reduce((sum, item) => sum + item.parsed.y, 0);
                  return 'Total: ' + total.toFixed(1) + '%';
                }
              }
            },
            legend: {
              position: 'top',
            }
          }
        }
      };

    case 'gainloss':
      return {
        type: 'bar',
        data: {
          labels: apiData.dates,
          datasets: [{
            label: 'Gain/Loss',
            data: apiData.values,
            backgroundColor: function (context) {
              const value = context.parsed.y;
              return value >= 0 ? 'rgba(39, 196, 152, 0.8)' : 'rgba(245, 103, 119, 0.8)';
            },
            borderColor: function (context) {
              const value = context.parsed.y;
              return value >= 0 ? 'rgb(39, 196, 152)' : 'rgb(245, 103, 119)';
            },
            borderWidth: 1
          }]
        },
        options: {
          ...baseConfig,
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return '$' + value.toLocaleString();
                }
              }
            }
          }
        }
      };

    default:
      return null;
  }
}

function getStockColor(index, alpha = 1) {
  const colors = [
    `rgba(100, 141, 255, ${alpha})`,   // Blue - AAPL
    `rgba(140, 94, 248, ${alpha})`,    // Purple - MSFT  
    `rgba(245, 103, 119, ${alpha})`,   // Red - TSLA
    `rgba(39, 196, 152, ${alpha})`,    // Green - GOOGL
    `rgba(255, 159, 64, ${alpha})`,    // Orange - AMZN
    `rgba(255, 99, 132, ${alpha})`,    // Pink - NVDA
    `rgba(54, 162, 235, ${alpha})`,    // Light Blue - META
    `rgba(153, 102, 255, ${alpha})`,   // Light Purple - BRK-B
    `rgba(255, 206, 86, ${alpha})`,    // Yellow
    `rgba(75, 192, 192, ${alpha})`,    // Teal
  ];

  return colors[index % colors.length];
}
