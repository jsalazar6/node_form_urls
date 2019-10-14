const express = require("express");
const multer = require("multer");
const Link = require("./modules/link.js");

const app = express();
const upload = multer();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.static("public"));

const links = [];
links.push(new Link ("Hacker News", "https://news.ycombinator.com", "Baptiste"));
links.push(new Link ("Reddit", "https://reddit.com", "Thomas"));
links.push(new Link ("Boing Boing", "boingboing.net", "Daniel"));

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`);
});

app.get("/api/links", (request, response) => {
    response.json(links);
});

app.post ("/links", upload.array(), (request, response) => {

    const title = request.body.title;
    const url = request.body.url;
    const author = request.body.author;
    const link = new Link(title, url, author);

    links.unshift(link);

    response.json(link);
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
