'use strict'
import {dataTables} from './data.js';

let prodChart;
let dashSection;
let chartLabels =[];
let chartValues =[];

const DocumentReady =() =>{
  dashSection = document.getElementById('myChart');

  document.addEventListener("dataChanged", () =>{
    refreshChart();
  });
} 

document.addEventListener("DOMContentLoaded",DocumentReady);

const refreshChart = () =>{
  const chartData = dataTables.getTable(0);
  const chartData2 = dataTables.getTable(1);
  chartLabels =[];
  chartValues =[];

  for (let i=0; i<chartData.length;i++){
    chartLabels.push (chartData[i]["name"]);
    chartValues.push (chartData[i]["price"]);
  }

  const data ={
    labels:  chartLabels,
    datasets:[{
      data: chartValues,
      borderColor: ['red', 'green', 'blue', 'yellow'],
      backgroundColor: ['red', 'green', 'blue', 'yellow'],
      borderWidth: 1,
      borderColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)'],
    }],
    options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
    }
  }

  if (prodChart) prodChart.destroy();

  prodChart = new Chart(dashSection, {type: 'bar',  data: data});
}