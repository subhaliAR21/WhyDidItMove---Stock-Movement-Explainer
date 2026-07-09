import { useState } from 'react'
function SearchBar({ onSearch, loading }) {
  const [ticker, setTicker] = useState('')

  const handleSubmit = () => {
    if (ticker.trim()) onSearch(ticker.toUpperCase())
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter stock ticker (e.g. INFY, TCS, RELIANCE)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  )
}

export default SearchBar