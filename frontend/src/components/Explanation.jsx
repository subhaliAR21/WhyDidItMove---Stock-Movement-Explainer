import SentimentBadge from './SentimentBadge'

function Explanation({ data }) {
  return (
    <div className="explanation-card">
      <div className="explanation-header">
        <h2>{data.ticker}</h2>
        <SentimentBadge sentiment={data.sentiment} />
      </div>

      <div className="price-info">
        <span className="current-price">₹{data.current_price}</span>
        <span className={data.price_change_7d >= 0 ? 'positive' : 'negative'}>
          {data.price_change_7d >= 0 ? '+' : ''}{data.price_change_7d}% (7d)
        </span>
      </div>

      <p className="explanation-text">{data.explanation}</p>

      <div className="headlines">
        <h3>Related News</h3>
        <ul>
          {data.headlines.map((headline, index) => (
            <li key={index}>{headline}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Explanation