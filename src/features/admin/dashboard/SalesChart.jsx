import {
  eachDayOfInterval,
  format,
  isSameDay,
  subDays,
} from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { colors } from '../../../../theme';
import { Box, Typography } from '@mui/material';

const chartColors = {
  // totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
  totalSales: { stroke: colors.green[700], fill: '#dcfce7' },
  text: '#374151',
  background: '#fff',
};

function SalesChart({ bookings, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        ?.filter((booking) =>
          isSameDay(date, new Date(booking.createdAt))
        )
        .reduce((acc, cur) => acc + cur.price, 0),
    };
  });

  return (
    <Box
      sx={{
        width: '100%',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '10px',
        border: `1px solid ${colors.grey[200]}`,
        flex: 1,
      }}
    >
      <Typography
        style={{
          color: colors.grey[500],
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '1rem',
          textAlign: 'left',
          marginBottom: '2rem',
        }}
      >
        Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1), 'MMM dd yyyy')}{' '}
      </Typography>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: chartColors.text }}
            tickLine={{ stroke: chartColors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: chartColors.text }}
            tickLine={{ stroke: chartColors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{ backgroundColor: chartColors.background }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={chartColors.totalSales.stroke}
            fill={chartColors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default SalesChart;
