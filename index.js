const http = require('http')
const fs = require('fs')
const path = require("path");
const url = "https://api.chucknorris.io/jokes/random"

const readFileAndReturnArray = () => {
    const jokesPath = path.join(__dirname, "norrisDb.json");
    try {
        const jokes = fs.readFileSync(jokesPath, "utf-8");
        return JSON.parse(jokes);
      } catch (err) {
        console.log(err.message);
        return [];
      }
}

const addJokeToFileIfNotExists = (joke) => {
    const jokes = readFileAndReturnArray()
    if(jokes.length === 0) {
        jokes.push(joke)
        fs.writeFileSync("norrisDb.json", JSON.stringify(jokes));
    } else {
        const jokeExists = jokes.find((j) => j.id === joke.id)
        if(!jokeExists) {
            jokes.push(joke)
            fs.writeFileSync("norrisDb.json", JSON.stringify(jokes));
        }
    }
}

const server = http.createServer((req, res) => {

    fetch(url)
      .then((data) => data.json())
      .then((data) => {

        addJokeToFileIfNotExists(data)
        
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