import Head from 'next/head';
import { Inter } from '@next/font/google';
import React, { useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

const inter = Inter({ subsets: ['latin'] });

interface Cereal {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  sodium: number;
  fiber: number;
  carbo: number;
  sugars: number;
  potass: number;
  vitamins: number;
  shelf: number;
  weight: number;
  cups: number;
  rating: number;
}

export default function Home(props: any) {
  const AXIS_PROPERTIES: Array<keyof Cereal> = [
    'calories', 'protein', 'fat', 'sodium', 'fiber', 'carbo', 'sugars',
    'potass', 'vitamins', 'shelf', 'weight', 'cups', 'rating'
  ];
  const [xAxis, setXAxis] = useState<keyof Cereal>('calories');
  const [yAxis, setYAxis] = useState<keyof Cereal>('carbo');
  const chartInstanceRef = React.useRef<Chart | null>(null);

  const handleXAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as keyof Cereal;
    setXAxis(selectedValue);
  };

  const handleYAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as keyof Cereal;
    setYAxis(selectedValue);
  };

  React.useEffect(() => {
    let myChart: any = null;
    const cereals = props.cereals.map((cereal: any) => {
      return { x: cereal[xAxis], y: cereal[yAxis] };
    });
    const config: ChartConfiguration<'scatter', number[], { x: number, y: number }> = {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: '80 Cereals',
            backgroundColor: 'rgb(255, 99, 132)',
            data: cereals,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: xAxis,
              font: {
                size: 20,
                weight: 'bold',
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: yAxis,
              font: {
                size: 20,
                weight: 'bold',
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
        },
      },
    };
    // 既存のチャートをクリア
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    // 新たなチャートインスタンスを作成して状態に保存
    chartInstanceRef.current = new Chart(
        document.getElementById('myChart') as HTMLCanvasElement,
        config
    );
  }, [xAxis, yAxis]);
  return (
    <>
      <Head>
        <title>chart-js-app</title>
        <meta name="description" content="Chart.jsで散布図を表示するアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <select value={xAxis} onChange={handleXAxisChange}>
          {AXIS_PROPERTIES.map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
          ))}
        </select>
        <select value={yAxis} onChange={handleYAxisChange}>
          {AXIS_PROPERTIES.map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
          ))}
        </select>
        <section style={{ padding: '10pt' }}>
          <h1>chart-js-app</h1>
          <p>シリアルのデータ</p>
          <div style={{ width: '400pt' }}>
            <canvas id="myChart" width="300" height="300"></canvas>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const response = await fetch('http://localhost:3000/api/cereals');
  const cereals = await response.json();
  return {
    props: { cereals },
  };
}
