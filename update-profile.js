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
  `A passionate amateur software developer. Usually programs in C# and javascript. Lives by the principle that every project is an opportunity to learn a new piece of technology. Recently started learning frontend web development.\n` +
  `\n` +
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
