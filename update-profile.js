const fs = require('fs');
const https = require('https');

const projects = [{
    name: 'personal-website',
    projectName: 'personal website',
    url: 'https://gldnpz.com',
    notes: 'it looks ugly. reconstruction work in progress.',
    repo: 'https://github.com/gldnpz17/gldnpz.com'
  },{
    name: 'url-shortener',
    projectName: 'url shortener',
    url: 'https://short.gldnpz.com',
    notes: '',
    repo: 'https://github.com/gldnpz17/url-shortener'
  },{
    name: 'gimana-id',
    projectName: 'gimana.id',
    url: 'https://gimana.id',
    notes: 'made in collaboration with comfyte. taken down due to low server resource.',
    repo: 'https://github.com/gldnpz17/gimana.id'
  },{
    projectName: 'ga-bot',
    url: 'https://gabot.gldnpz.com/status',
    notes: '',
    repo: 'https://github.com/gldnpz17/ga-bot'
  },{
    projectName: 'regex-catalog',
    url: 'https://regex.gldnpz.com',
    notes: '',
    repo: 'https://github.com/gldnpz17/regex-catalog'
  }
]

const getBadge = (statusCode, isOnline) => {
  if (isOnline) {
    return '![onlineBadge](https://img.shields.io/badge/200-online-%234caf50)';
  } else {
    return `![offlineBadge](https://img.shields.io/badge/${statusCode}-offline-e53935)`;
  }
}

console.log('README.md update started.');

const updateReadme = async (content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('README.md', content, err => {
      console.log('README.md updated. Content:');
      console.log(content);

      resolve();
    });
  });
};

const getWebsiteStatus = (url) => {
  return new Promise((resolve, reject) => {
    let request = https.get(url, res => {
      resolve(res.statusCode);
    });

    request.setTimeout(10000, () => {
      resolve('timeout');
    });
  });
}

// TO-DO : continue work here!
const getProjectStatus = (project) => {
  let projectStatusData = {
    lastUpdateDateTime : null,
    totalUptimeMinutes: 0,
    lastIncidentDateTime: null,
    totalIncidents: 0
  }

  // Load project data
  fs.readFile(`./status-data/${project}`)

  // Save project data.
  fs.writeFile()

  // Return status.
  return ({
    statusCode : '',
    latency: '',
    uptime: '',
    lastIncidentDateTime: ''
  });
}

const main = async () => {
  // Process README
  let readmeContent = "";

  let projectsString = "";
  let projectUpdateStatus = "";
  try {
    projectsString = `| Project name | Status | Repository | Notes |\n` +
    `| --- | --- | --- | --- |\n`;
    results = [];
    
    await Promise.all(projects.map(async (project, index) => {
      let code = await getWebsiteStatus(project.url);
      results[index] = `| ${project.projectName} | ${(code === 200) ? getBadge(200, true) : getBadge(code, false)} | ${(project.repo === null) ? "`no repository`" : `[here](${project.repo})`} | \`${(project.notes === "") ? "no notes" : project.notes}\` |\n`;
    }));
    
    results.map((result) => {
      projectsString += result;  
    });

    let dateTime = new Date();
    projectUpdateStatus = `project statuses were last updated automatically on ${dateTime.toUTCString()}`;
  } catch {
    projectsString = "Welp 😛. Something went wrong updating the project status. A fix should be underway 👷‍♀️";
    projectUpdateStatus = "error updating project status"
  }

  readmeContent = `<h2 align=\"center\">Firdaus Bisma S</h2>\n` + 
  `A passionate amateur software developer. Usually programs in C#, javascript and typescript. Lives by the principle that every project is an opportunity to learn a new piece of technology. Recently started learning frontend web development. \n` +
  `</br> </br>\n\n` +
  `![dotnet-csharp](https://img.shields.io/badge/C%23%2F.NET-%23546e7a?logo=dotnet&style=flat&labelColor=37474f&logoColor=white) ` +
  `![javascript](https://img.shields.io/badge/JavaScript-%23546e7a?logo=javascript&style=flat&labelColor=37474f&logoColor=white) ` +
  `![expressjs](https://img.shields.io/badge/Express-%23546e7a?logo=express&style=flat&labelColor=37474f&logoColor=white) ` +
  `![typescript](https://img.shields.io/badge/TypeScript-%23546e7a?logo=typescript&style=flat&labelColor=37474f&logoColor=white) ` +
  `![nestjs](https://img.shields.io/badge/NestJS-%23546e7a?logo=nestjs&style=flat&labelColor=37474f&logoColor=white) ` +
  `![docker](https://img.shields.io/badge/Docker-%23546e7a?logo=docker&style=flat&labelColor=37474f&logoColor=white) ` +
  `![graphql](https://img.shields.io/badge/GraphQL-%23546e7a?logo=graphql&style=flat&labelColor=37474f&logoColor=white) ` +
  `![reactjs](https://img.shields.io/badge/React-%23546e7a?logo=react&style=flat&labelColor=37474f&logoColor=white) ` +
  `![mongodb](https://img.shields.io/badge/MongoDB-%23546e7a?logo=mongodb&style=flat&labelColor=37474f&logoColor=white) ` +
  `![postgresql](https://img.shields.io/badge/PostgreSQL-%23546e7a?logo=postgresql&style=flat&labelColor=37474f&logoColor=white) ` +
  `\n\n` +
  `### 🛠 Projects\n` +
  `${projectsString}\n` +
  `---\n` +
  `*<p align="center">${projectUpdateStatus}</p>*`;
  
  await updateReadme(readmeContent);
}

main().then(() => {
  console.log('Execution complete.');
  process.exit(0);
});
