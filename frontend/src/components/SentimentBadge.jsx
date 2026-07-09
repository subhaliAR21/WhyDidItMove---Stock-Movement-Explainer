function SentimentBadge({ sentiment }) {
  const colors = {
    BULLISH: '#22c55e',
    BEARISH: '#ef4444',
    NEUTRAL: '#f59e0b'
  }

  return (
    <span style={{
      backgroundColor: colors[sentiment] || '#f59e0b',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '14px'
    }}>
      {sentiment}
    </span>
  )
}

export default SentimentBadge