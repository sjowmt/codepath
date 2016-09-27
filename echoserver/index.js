let http = require('http')
let request = require('request')
let path = require('path')
let fs = require('fs')
let argv = require('yargs')
    .default('host', '127.0.0.1:8000')
    .argv

let scheme = 'http://'
let logPath = argv.log && path.join(__dirname, argv.log)
let getLogStream = ()=> logPath ? fs.createWriteStream(logPath) : process.stdout
let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80)
let destinationUrl = argv.url || scheme + argv.host + ':' + port

let logStream = logPath ? fs.createWriteStream(logPath) : process.stdout

http.createServer((req, res) => {
    console.log(`Request received at: ${req.url}`)

    req.pipe(res) 
    req.headers['x-destination-url']

     for (let header in req.headers) {
         res.setHeader(header, req.headers[header])
    }

   req.pipe(logStream, {end: false})
   logStream.write('Request headers: ' + JSON.stringify(req.headers))
}).listen(8000)
