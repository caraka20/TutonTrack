import http from 'http'
import app from './app'


// Setup HTTP Server
const server = http.createServer(app)

// Jalankan server hanya jika bukan import (misal: saat npx ts-node src/server.ts)
if (require.main === module) {
  const PORT = process.env.PORT || 3001
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
}
