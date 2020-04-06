import React, { useEffect, useState } from 'react';

import { dateFormatter } from '../../utils/helper-funcs';
import { Chart } from 'react-google-charts';
import './LineChart.css';

const LineChart = ({ trades, user }) => {
  // Formatted trades for line chart
  const [formattedTrades, setFormattedTrades] = useState([]);

  useEffect(() => {
    let localBalance = user.accountBalance;
    const runningBalanceCalc = (trade) => {
      return trade.outcome === 'Winner'
        ? (localBalance += trade.profitLoss + trade.swap - trade.commission)
        : (localBalance -= trade.profitLoss - trade.swap + trade.commission);
    };

    const formattedData = trades.map((trade) => [
      dateFormatter(trade.dateClosed) + '...',
      runningBalanceCalc(trade),
    ]);

    setFormattedTrades(formattedData);
  }, [trades, user.accountBalance]);

  return (
    <div className="LineChart">
      {formattedTrades.length < 2 ? (
        <p className="span-highlight mt-2">
          The equity chart requires at least two trades in trade history
        </p>
      ) : (
        <Chart
          width={'100%'}
          height={'100%'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[['Date', 'Running Balance'], ...formattedTrades]}
          options={{
            legend: 'top',
            vAxis: { title: 'Equity Curve' },
            series: {
              0: { color: 'limeGreen' },
            },
          }}
        />
      )}
    </div>
  );
};

export default LineChart;
