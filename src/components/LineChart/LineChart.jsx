import React, { useEffect, useState } from 'react';

import { dateFormatter } from '../../utils/helper-funcs';
import { Chart } from 'react-google-charts';
import './LineChart.css';

const LineChart = ({ trades, user }) => {
  console.log(trades, 'LineChart');

  // CONTEXT

  const [formattedTrades, setFormattedTrades] = useState([]);

  useEffect(() => {
    let localBalance = user.accountBalance;
    const runningBalanceCalc = (trade) => {
      console.log(trade);

      return trade.outcome === 'Winner'
        ? (localBalance += trade.profitLoss + trade.swap - trade.commission)
        : (localBalance -= trade.profitLoss - trade.swap + trade.commission);
    };

    const formattedData = trades.map((trade) => [
      dateFormatter(trade.dateClosed) + '..',
      runningBalanceCalc(trade),
    ]);

    setFormattedTrades(formattedData);
  }, [trades, user.accountBalance]);

  return (
    <div className="LineChart">
      <h1>In Line Chart</h1>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[['Date', 'Running Balance'], ...formattedTrades]}
        options={{
          vAxis: { title: 'Equity Curve' },
          series: {
            0: { color: 'limeGreen' },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
