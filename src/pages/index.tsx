import Head from 'next/head';
import { Inter } from '@next/font/google';
import React, { useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import styles from '../styles/styles.module.css';

const inter = Inter({ subsets: ['latin'] });

interface Cereal {
  name: String,
  mfr: String,
  type: String,
  calories: String,
  protein: String,
  fat: String,
  sodium: String,
  fiber: String,
  carbo: String,
  sugars: String,
  potass: String,
  vitamins: String,
  shelf: String,
  weight: String,
  cups: String,
  rating: String,
}

export default function Home(props: any) {
  const AXIS_PROPERTIES: Array<keyof Cereal> = [
    'calories', 'protein', 'fat', 'sodium', 'fiber', 'carbo', 'sugars',
    'potass', 'vitamins', 'shelf', 'weight', 'cups', 'rating'
  ];
  const [xAxis, setXAxis] = useState<keyof Cereal>('calories');
  const [yAxis, setYAxis] = useState<keyof Cereal>('carbo');
  const chartInstanceRef = React.useRef<Chart | null>(null);

  const [selectedMfr, setSelectedMfr] = React.useState<string>('');
  const [selectedType, setSelectedType] = React.useState<string>('');

  const uniqueMfrs = React.useMemo(() => Array.from(new Set(props.cereals.map((cereal: Cereal) => cereal.mfr))), [props.cereals]);
  const uniqueTypes = React.useMemo(() => Array.from(new Set(props.cereals.map((cereal: Cereal) => cereal.type))), [props.cereals]);

  const handleXAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as keyof Cereal;
    setXAxis(selectedValue);
  };

  const handleYAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as keyof Cereal;
    setYAxis(selectedValue);
  };

  const filteredCereals = props.cereals.filter((cereal: Cereal) => {
    return (!selectedMfr || cereal.mfr === selectedMfr) && (!selectedType || cereal.type === selectedType);
  });

  React.useEffect(() => {
    let myChart: any = null;
    const cereals = filteredCereals.map((cereal: Cereal) => {
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
  }, [xAxis, yAxis, selectedMfr, selectedType]);
  return (
    <>
      <Head>
        <title>chart-js-app</title>
        <meta name="description" content="Chart.jsで散布図を表示するアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <select className={styles.selectBox} value={xAxis} onChange={handleXAxisChange}>
            {AXIS_PROPERTIES.map((property) => (
                <option key={property} value={property}>
                  {property}
                </option>
            ))}
          </select>
          <select className={styles.selectBox} value={yAxis} onChange={handleYAxisChange}>
            {AXIS_PROPERTIES.map((property) => (
                <option key={property} value={property}>
                  {property}
                </option>
            ))}
          </select>
        </section>
        <section style={{ padding: '10pt' }}>
          <select className={styles.selectBox} value={selectedMfr} onChange={(e) => setSelectedMfr(e.target.value)}>
            <option value=''>Select Mfr</option>
            {uniqueMfrs.map(mfr => (
                <option key={mfr} value={mfr}>{mfr}</option>
            ))}
          </select>
          <select className={styles.selectBox} value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value=''>Select Type</option>
            {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </section>
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
