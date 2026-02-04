/**
 * Live Chart Component
 * Real-time bar chart using Chart.js
 */

'use client';

import * as React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CandidateData {
  id: number;
  name: string;
  votes: number;
  percentage: number;
}

interface LiveChartProps {
  data: CandidateData[];
}

export function LiveChart({ data }: LiveChartProps) {
  // Sort by votes descending
  const sortedData = [...data].sort((a, b) => b.votes - a.votes);

  // Generate gradient colors for top 3
  const getBarColor = (index: number) => {
    if (index === 0) return 'rgba(6, 182, 212, 0.8)'; // Cyan for 1st
    if (index === 1) return 'rgba(59, 130, 246, 0.8)'; // Blue for 2nd
    if (index === 2) return 'rgba(139, 92, 246, 0.8)'; // Purple for 3rd
    return 'rgba(148, 163, 184, 0.6)'; // Gray for others
  };

  const chartData = {
    labels: sortedData.map((c) => c.name),
    datasets: [
      {
        label: 'Vòt',
        data: sortedData.map((c) => c.votes),
        backgroundColor: sortedData.map((_, index) => getBarColor(index)),
        borderColor: sortedData.map((_, index) => getBarColor(index).replace('0.8', '1')),
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: (context) => {
            const candidate = sortedData[context.dataIndex];
            return [
              `Vòt: ${candidate.votes.toLocaleString()}`,
              `Pousantaj: ${candidate.percentage.toFixed(2)}%`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.8)',
          font: {
            size: 11,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.8)',
          font: {
            size: 12,
          },
          callback: (value) => {
            if (typeof value === 'number') {
              return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
            }
            return value;
          },
        },
      },
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="h-[450px]">
      <Bar data={chartData} options={options} />
    </div>
  );
}
