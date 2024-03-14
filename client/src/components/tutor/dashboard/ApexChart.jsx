import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export function ApexChart({ data, type }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const values = data.map(x => {
    return new Date(x.createdAt).getMonth() + 1
  })
  const countArray = Array.from({ length: 8 }, (_, index) => {
    const count = values.filter(value => value === index + 1).length;
    return count;
  });
  const yAxis = []
  const xAxis = []
  data.map(x => {
    yAxis.push(x.title)
    xAxis.push(x.subscribers?.length)
  })

  const result = countArray.map(count => (count !== undefined ? count : 1));
  const categories = type === 'line' ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] : yAxis
  const series = [
    {
      name: 'Inflation',
      data: type === 'line' ? result : xAxis
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories,
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      }
    },
    title: {
      text: type === 'line' ? 'courses published this year, 2023' : 'subscribers gained per course',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type={type} width={type === 'line' ? sm ? md ? lg ? 350 : 250 : 550 : 350 : sm ? lg ? 700 : 550 : 350} height={350} />
    </div>
  )
}