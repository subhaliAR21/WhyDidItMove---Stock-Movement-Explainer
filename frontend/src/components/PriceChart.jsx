import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function PriceChart({ priceData }) {
  return (
    <div className="price-chart">
      <h3>7-Day Price Movement</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={priceData}>
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart