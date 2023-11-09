const http = require('http')
const fs = require('fs')
const path = require("path");
const { addJokeToFileIfNotExists } = require('./utils/functions')
const url = "https://api.chucknorris.io/jokes/random"



const server = http.createServer((req, res) => {
    // remove favicon request
    if(req.url === '/favicon.ico') {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.end();
        return
    }
    // fetch joke from API
    fetch(url)
      .then((data) => data.json())
      .then((data) => {

        // add joke to file if not exists
        addJokeToFileIfNotExists(data)
        
        // write response
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(
          `<main style="padding: 2rem;">
          <div style="text-align: center">
                <img style="max-width: 300px" src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" />
          </div>
          <h1>Your Daily Chuck Norris Phrase:</h1>
          <h2 style="font-weight: light">${data.value}</h2>
          </main>`
        );
        res.end();
      });
})



server.listen(3000, () => {
    console.log('Server is running on port 3000')
})