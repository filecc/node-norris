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
    console.log(joke)
    const jokes = readFileAndReturnArray()
    if(jokes.length === 0) {
        jokes.push(joke)
        fs.writeFileSync("norrisDb.json", JSON.stringify(jokes));
        return true
    } else {
        const jokeExists = jokes.find((singleJoke) => singleJoke.id === joke.id)
        if(!jokeExists) {
            jokes.push(joke)
            fs.writeFileSync("norrisDb.json", JSON.stringify(jokes));
            return true
        } else if(jokeExists) {
            return false
        }
    }
}

const fetchApi = (url, onSuccess) => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
          onSuccess(data)
      })
}


module.exports = {
    addJokeToFileIfNotExists,
    fetchApi
}