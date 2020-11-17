// Variable definitions
const userName = document.getElementById("profile_name");
const avatar = document.getElementById("profile_avatar");
const userLogin = document.getElementById("profile_username");
const about = document.getElementById("profile_description");

fetch(`/api`)
  .then((res) => res.json())
  .then((res) => {
    createInfo(res);
    console.log(res);
  })
  .catch((err) => console.log(JSON.stringify(err)));

const createInfo = (res) => {
  const repos = document.getElementById("repositories_list");

  let {avatarUrl, name, login, bio} = res.data.repositoryOwner;
  const repositories = res.data.repositoryOwner.repositories.nodes;

  avatar.src = avatarUrl;
  userName.textContent = name;
  userLogin.textContent = login;
  about.textContent = bio;
  console.log(repositories);
  repositories.forEach((repo) => {
    let apidate = new Date(repo.updatedAt);

    let localDateString = apidate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    let splited = localDateString.split(" ");
    let date = splited.filter((splits) => splits != "2020");
    let unformatted = date.join(" ");

    let realDate =
      unformatted[unformatted.length - 1] == ","
        ? unformatted.replace(",", "")
        : unformatted;

    let starred = repo.viewerHasStarred
      ? `<button class="repo_star">
                  <svg class="octicon octicon_star-fill " viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg>
                  <p>Unstar</p>
                  </button>`
      : `<button class="repo_star">
                  <svg class="octicon octicon_star" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                  <p>star</p>
                  </button>`;

    let starCount = repo.stargazerCount
      ? `<div class="options">
                  <div class="options-symbol"><svg class="octicon octicon_star " viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg></div>
                  <p class="star-count">${repo.stargazerCount}</p>
                  </div>`
      : "";

    let fork = repo.parent
      ? `<p class="fork">forked from: ${repo.parent.nameWithOwner}`
      : "";

    let description = repo.description
      ? `<p class="repo_description">${repo.description}</p>`
      : "";

    let languages = repo.primaryLanguage
      ? repo.primaryLanguage.name
        ? `<div class="options">
                  <div class="options-symbol languages" style="background-color: ${repo.primaryLanguage.color}; width:14px; border-radius: 50%; height:14px"></div>
                  <p>${repo.primaryLanguage.name}</p>
                  </div>`
        : ""
      : "";

    let forkCount = repo.forkCount
      ? `<div class="options">
                  <div class="options-symbol"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg></div>
                  <p class="fork-count">${repo.forkCount}</p>
                  </div>`
      : "";

    var allholder = document.createElement("div");
    allholder.className = "repo";
    allholder.innerHTML = `
                  <div class="repo-left">
                      <a class="repo_name" href=${repo.url}><h3>${repo.name}</h3></a>
                      ${fork}
                      ${description}
                      <div class="repo-options">
                          ${languages}
                          ${forkCount}
                          ${starCount}
                          <div class="options">
                              <div class="options-symbol date"></div>
                              <p class="repo_update">Updated on ${realDate}</p>
                          </div>
                      </div>
                  </div>
                  <div class="repo-right">
                      ${starred}
                  </div>
              `;

    repos.appendChild(allholder);
  });

};