import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import {getDashboardData} from "../Data/serverData";
import dateFormat from 'dateformat';


const BarChart = ({data,to,v1,v2}) => {
  const [chartData,setChartData] = useState({});
  const [chartOption,setChartOption] = useState({})
  useEffect(()=>{
    getDashboardData(to, data.time).then(res=>{
          setChartOption({
            update: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
          });
      setChartData({
        labels:
            res.map(item=> dateFormat(item.date, "dd/mm")),
        datasets: [
          {
            label: null,
            id: "yaxis 1",
            data: res.map(item=>item[v1]),
            backgroundColor: '#6AFF6A',
          },
          {
            label: null,
            id: "yaxis 2",
            data: res.map(item=>item[v2]),
            backgroundColor: '#FF8383',
          },
        ],
      })
    });
    return ()=>{
      setChartData({});
      setChartOption({});
    }
  },[data,v1,v2,to]);
  return (
      <Bar data={chartData} options={chartOption}/>
  )
}
export default BarChart;

