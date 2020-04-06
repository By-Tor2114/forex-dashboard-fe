import React, { useState, useEffect } from 'react';

import { Chart } from 'react-google-charts';
import './PairOutcomesChart.css';

const PairOutcomesChart = ({ trades }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const tradeTotals = {};
    const formattedData = [];

    trades.forEach((trade) => {
      tradeTotals[trade.currencyPair] = { totalProfit: 0, totalLoss: 0 };
    });

    trades.forEach((trade) => {
      if (trade.outcome === 'Winner') {
        tradeTotals[trade.currencyPair].totalProfit +=
          trade.profitLoss + trade.swap - trade.commission;
      } else {
        tradeTotals[trade.currencyPair].totalLoss +=
          trade.profitLoss - trade.swap + trade.commission;
      }
    });

    for (const pair in tradeTotals) {
      formattedData.push([
        pair,
        tradeTotals[pair].totalProfit,
        tradeTotals[pair].totalLoss,
      ]);
    }
    setChartData(formattedData);
  }, [trades]);

  return (
    <div className="PairOutcomesChart">
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[['Currency Pairs', 'Profits', 'Losses'], ...chartData]}
      />
    </div>
  );
};

export default PairOutcomesChart;
