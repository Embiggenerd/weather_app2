import app from './App'

const port = process.env.PORT || '3002'

app.listen(port, err => {
  if (err) {
    return console.log(err)
  }
  return console.log(`server listening on ${port}`)
})