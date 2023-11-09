const fs = require('fs')
const path = require("path");


const readFileAndReturnArray = () => {
    const jokesPath = path.join(__dirname, "../", "norrisDb.json");
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

module.exports = {
    addJokeToFileIfNotExists
}