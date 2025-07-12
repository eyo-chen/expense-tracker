import { useState, useEffect } from "react";
import StockChartPic from "./StockChartPic/StockChartPic";
import Loading from "../../../../UI/Loading/Loading";
import styles from "./StockChart.module.css";

function StockChart(props) {
  const [chartConfig, setChartConfig] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateChartConfig();
  }, [props.activeChartType, props.timePeriod]);

  function generateChartConfig() {
    setLoading(true);

    // Simulate API call
    fetchPortfolioData(props.timePeriod)
      .then((apiData) => {
        const config = createChartConfigByType(props.activeChartType, apiData);
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


// Simulate API call to fetch portfolio data
async function fetchPortfolioData(timePeriod) {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const mockData = generateMockApiResponse(timePeriod);
      resolve(mockData);
    }, 1000);
  });
}

function generateMockApiResponse(timePeriod) {
  const labels = [];
  const now = new Date();

  let monthsBack;
  switch (timePeriod) {
    case '6M':
      monthsBack = 6;
      break;
    case '9M':
      monthsBack = 9;
      break;
    case '12M':
    case '1Y':
      monthsBack = 12;
      break;
    case '2Y':
      monthsBack = 24;
      break;
    case '3Y':
      monthsBack = 36;
      break;
    case 'ALL':
      monthsBack = 60; // Assume 5 years for "All Time"
      break;
    default:
      monthsBack = 6;
  }

  // Generate month labels going backwards from current month
  for (let i = monthsBack; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
  }

  // Generate realistic portfolio values
  const portfolioValues = [];
  let baseValue = 50000; // Starting portfolio value

  for (let i = 0; i < labels.length; i++) {
    // Add some growth trend (average 8% annual growth)
    const monthlyGrowthRate = 0.08 / 12; // 8% annual = ~0.67% monthly
    const growthFactor = 1 + monthlyGrowthRate;

    // Add some random volatility (-5% to +10% monthly variation)
    const volatility = (Math.random() - 0.3) * 0.15; // -4.5% to +10.5%
    const monthlyChange = growthFactor + volatility;

    baseValue = baseValue * monthlyChange;

    // Ensure value doesn't go below reasonable minimum
    baseValue = Math.max(baseValue, 10000);

    portfolioValues.push(Math.round(baseValue));
  }

  // Return data in the format backend should provide
  return {
    timePeriod: timePeriod,
    labels: labels,
    portfolioValues: portfolioValues
  };
}


function createChartConfigByType(chartType, apiData) {
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
          labels: apiData.labels,
          datasets: [{
            label: 'Portfolio Value',
            data: apiData.portfolioValues,
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
                maxTicksLimit: apiData.timePeriod === 'ALL' || apiData.timePeriod === '3Y' || apiData.timePeriod === '2Y' ? 12 : undefined
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

    case 'gainloss':
      return {
        type: 'bar',
        data: {
          // labels: generateTimeLabels(timePeriod),
          datasets: [{
            label: 'Gain/Loss',
            // data: generateSampleData(timePeriod, -2000, 3000),
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
