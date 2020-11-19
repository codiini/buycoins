const express = require("express");
const app = express();
const fetch = require("node-fetch");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "index.html");
});

const token = process.env.GITHUB_TOKEN;
const githubUsername = "codiini";
const body = {
  query: `
    query{
        repositoryOwner(login: "${githubUsername}") {
          ... on User {
            name
            bio
            avatarUrl
            login
            twitterUsername
            email
            starredRepositories {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
            repositories(last: 20, privacy: PUBLIC) {
              nodes {
                name
                description
                url
                forkCount
                stargazerCount
                updatedAt
                primaryLanguage {
                  color
                  name
                }
              }
            }
          }
        }
      }
    `,
};

app.get("/api", (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
    body: JSON.stringify(body),
  };
  fetch(`https://api.github.com/graphql`, options)
    .then((redey) => redey.json())
    .then((data) => res.json(data));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
