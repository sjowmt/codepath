let destinationUrl = '127.0.0.1:8000'
let http = require('http')
let request = require('request')

http.createServer((req, res) => {
  console.log(`Proxying request to: ${destinationUrl + req.url}`)
   let options = {
        headers: req.headers,
        url: `http://${destinationUrl}${req.url}`
    }
   options.method = req.method
   req.pipe(request(options)).pipe(res)

   process.stdout.write('\n\n\n' + JSON.stringify(req.headers))
   req.pipe(process.stdout)
}).listen(8001)
