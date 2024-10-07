import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  // Dados do gráfico (pode ser obtido de uma API, banco de dados, etc.)
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Vendas Mensais",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <h3>Total de Chamados</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
