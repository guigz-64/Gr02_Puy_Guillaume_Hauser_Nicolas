const app = require('./lib/app')
const config = {
  port: 3001
}

app.listen(config.port, () => {
  console.log(`Chat is waiting for you at http://localhost:${config.port}`)
})