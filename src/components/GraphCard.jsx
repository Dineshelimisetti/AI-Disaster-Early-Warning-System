import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend);

const GraphCard = ({ type = 'line', data }) => {
  if (!data) return null;
  const Chart = type === 'bar' ? Bar : type === 'doughnut' ? Doughnut : Line;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', align: 'end', labels: { color: '#94a3b8', font: { size: 10, weight: 600, family: "'Inter', sans-serif" }, boxWidth: 6, boxHeight: 6, padding: 20, usePointStyle: true } },
      tooltip: { backgroundColor: '#0f172a', titleColor: '#fff', bodyColor: '#94a3b8', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, padding: 12, cornerRadius: 12, titleFont: { size: 12, weight: 700, family: "'Outfit', sans-serif" }, bodyFont: { size: 11, weight: 600 }, displayColors: false },
    },
    scales: type !== 'doughnut' ? {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: '#94a3b8', font: { size: 10, weight: 600 } } },
      y: { grid: { color: 'rgba(0,0,0,0.03)', drawBorder: false }, border: { display: false }, ticks: { color: '#94a3b8', font: { size: 10, weight: 600 }, padding: 10 } },
    } : undefined,
  };

  return (
    <div className="h-[260px] w-full">
      <Chart data={data} options={options} />
    </div>
  );
};

export default GraphCard;
