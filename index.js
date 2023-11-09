const http = require('http')
require('dotenv').config()
const { addJokeToFileIfNotExists, fetchApi } = require('./utils/functions')


const server = http.createServer((req, res) => {
    const url = "https://api.chucknorris.io/jokes/random"
    // remove favicon request
    if(req.url === '/favicon.ico') {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.end();
        return
    }
 
        
        const joke = fetchApi(url, (data) => {
            // call addJokeToFileIfNotExists
            const added = addJokeToFileIfNotExists(data)

            if(added){
                // add joke to file if not exists
                const added = addJokeToFileIfNotExists(data)
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
            } else {
                joke()
            }
            
        })
       
        

        
       
   
})



server.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`)
})