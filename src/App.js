import { useState, useEffect } from 'react'

export const API_URL = 'https://api.site.com'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/brands`)
      .then((res) => res.json())
      .then(setData)
  }, [])

  if (data?.message) {
    return <div role="alert">{data.message}</div>
  }

  if (data?.data?.length === 0) {
    return <p>No data</p>
  }

  return <div>{data ? <div>{data.data}</div> : null}</div>
}

export default App
