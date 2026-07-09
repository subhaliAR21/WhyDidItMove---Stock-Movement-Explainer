import { useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import Explanation from './components/Explanation'
import PriceChart from './components/PriceChart'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (ticker) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const BASE_URL = import.meta.env.VITE_API_URL || ''
      const response = await axios.get(`${BASE_URL}/analyze/${ticker}`)
      setData(response.data)
    } catch (err) {
      setError('Could not fetch data. Check ticker and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>WhyDidItMove</h1>
        <p>Enter a stock ticker to understand why it moved</p>
      </div>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && <p className="error">{error}</p>}

      {loading && <p className="loading">Analyzing market data...</p>}

      {data && (
        <>
          <PriceChart priceData={[
            { date: '7d ago', price: data.current_price - (data.current_price * data.price_change_7d / 100) },
            { date: 'Today', price: data.current_price }
          ]} />
          <Explanation data={data} />
        </>
      )}
    </div>
  )
}

export default App