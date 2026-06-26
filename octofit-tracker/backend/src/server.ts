import { startServer } from './index.js'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const publicUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

console.log(`Server listening on ${publicUrl}`)
void startServer()
