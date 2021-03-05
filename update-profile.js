const fs = require('fs');
const https = require('https');
const { performance } = require('perf_hooks');

const projects = [{
    projectName: 'personal website',
    url: 'https://gldnpz.com',
    notes: '',
    repo: 'https://github.com/gldnpz17/gldnpz.com'
  },{
    projectName: 'url shortener',
    url: 'https://short.gldnpz.com',
    notes: '',
    repo: 'https://github.com/gldnpz17/url-shortener'
  },{
    projectName: 'gimana.id',
    url: 'https://gimana.id',
    notes: 'made in collaboration with comfyte',
    repo: 'https://github.com/gldnpz17/gimana.id'
  },{
    projectName: 'bacod-bot',
    url: 'https://bacod-bot.herokuapp.com/status',
    notes: '',
    repo: 'https://github.com/gldnpz17/bacod-bot'
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

const getProjectStatus = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      resolve(res.statusCode);
    });
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
      let code = await getProjectStatus(project.url);
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
  `A passionate amateur software developer. Usually programs in C# and javascript. Lives by the principle that every project is an opportunity to learn a new piece of technology.\n` +
  `\n` +
  `### 🛠 Projects\n` +
  `${projectsString}\n` +
  `---\n` +
  `*<p align="center">${projectUpdateStatus}</p>*`;
  
  await updateReadme(readmeContent);
}

main().then(() => console.log('Execution complete.'));
