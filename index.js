const http = require("http");
require("dotenv").config();
const { addJokeToFileIfNotExists, fetchApi } = require("./utils/functions");

const server = http.createServer((req, res) => {
  const url = "https://api.chucknorris.io/jokes/random";
  // remove favicon request
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    return;
  }
  // fetch joke
  const fetchJoke = () => {
    fetchApi(url, (data) => {
        const added = addJokeToFileIfNotExists(data)

        if(added){
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
            console.log("Joke already exists in the file. Fetching a new one...")
            fetchJoke()
        }
    })
}
fetchJoke();
});

server.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
});
