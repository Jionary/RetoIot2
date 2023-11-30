import React from 'react';
import CarritoList from './components/CarritoList';
import { Line } from 'react-chartjs-2';

const App = () => {
  return (
    <div>
      <CarritoList />

      <div>
        <h2>Temperature Chart</h2>
        <LineChart variable="temperatura" />
      </div>

      <div>
        <h2>Distance Chart</h2>
        <LineChart variable="distancia" />
      </div>

      <div>
        <h2>Pressure Chart</h2>
        <LineChart variable="presion" />
      </div>

      <div>
        <h2>Acceleration Chart</h2>
        <LineChart variable="aceleracion" />
      </div>
    </div>
  );
};

const LineChart = ({ variable }) => {
  // Fetch data for the specific variable
  const fetchData = async () => {
    try {
      const response = await fetch('arn:aws:lambda:us-east-2:443863838521:function:lambda_handler', {
        method: 'GET',
      });
      const data = await response.json();
      const values = data.map((item) => item[variable]);

      return values;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Use state to store the data for the chart
  const [chartData, setChartData] = React.useState([]);

  // Fetch data and update the chartData state on component mount
  React.useEffect(() => {
    fetchData().then((data) => setChartData(data));
  }, [variable]);

  // Chart.js configuration
  const chartConfig = {
    labels: chartData.map((_, index) => index),
    datasets: [
      {
        label: variable,
        data: chartData,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Line data={chartConfig} />;
};

export default App;
