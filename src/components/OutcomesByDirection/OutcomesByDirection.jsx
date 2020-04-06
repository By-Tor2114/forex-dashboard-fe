import React, { useState, useEffect } from 'react';

import { Chart } from 'react-google-charts';
import './OutcomesByDirection.css';

const OutcomesByDirection = ({ trades }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const tradeTotals = { Buy: 0, Sell: 0 };
    const formattedData = [];

    trades.forEach((trade) => {
      tradeTotals[trade.tradeDirection] = { totalProfit: 0, totalLoss: 0 };
    });

    trades.forEach((trade) => {
      if (trade.outcome === 'Winner') {
        tradeTotals[trade.tradeDirection].totalProfit +=
          trade.profitLoss + trade.swap - trade.commission;
      } else {
        tradeTotals[trade.tradeDirection].totalLoss +=
          trade.profitLoss - trade.swap + trade.commission;
      }
    });

    for (const outcome in tradeTotals) {
      formattedData.push([
        outcome,
        tradeTotals[outcome].totalProfit,
        tradeTotals[outcome].totalLoss,
      ]);
    }

    setChartData(formattedData);
  }, [trades]);

  return (
    <div className="OutcomesByDirection">
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[['Direction', 'Winners', 'Losers'], ...chartData]}
        options={{
          legend: 'top',
          series: {
            0: { color: 'limeGreen' },
            1: { color: 'red' },
          },
        }}
      />
    </div>
  );
};

export default OutcomesByDirection;
