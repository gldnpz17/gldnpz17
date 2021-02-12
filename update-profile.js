const { rejects } = require('assert');
const fs = require('fs');
const https = require('https');
const { resolve } = require('path');

const projects = [{
    projectName: "personal website",
    url: "https://gldnpz.com",
    notes: ""
  },{
    projectName: "url shortener",
    url: "https://short.gldnpz.com",
    notes: ""
  },{
    projectName: "jenkins server",
    url: "https://jenkins.gldnpz.com",
    notes: "Jenkins was too heavy for my puny vps. 😥"
  }
]

const onlineBadge = "![onlineBadge](https://img.shields.io/badge/status-online-%234caf50)";
const offlineBadge = "![offlineBadge](https://img.shields.io/badge/status-offline-e53935)";

console.log('README.md update started');

const updateReadme = (content) => {
  fs.writeFile('README.md', content, err => {
    console.log('README.md updated.');
    console.log(content);
  });
};

const getProjectStatus = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      resolve(res.statusCode);
    });
  });
}

const updateReadmeAsync = () => {
  fs.readFile('README.md', 'utf-8', async (err, data) => {
    if (err) {
      updateReadme("uhoh 🙃\nError updating README.md");
      return;
    }
  
    // Process readme
    let readmeContent = "";
  
    let projectsString = "";
    let projectUpdateStatus = "";
    try {
      projectsString = `| Project name | Status | Notes |\n` +
      `| --- | --- | --- |\n`;
      await Promise.all(projects.map(async (project) => {
        let code = await getProjectStatus(project.url);
        projectsString += `| ${project.projectName} | ${(code === 200) ? onlineBadge : offlineBadge} | \`${(project.notes === "") ? "no notes" : project.notes}\` |\n`;
      }));
  
      let dateTime = new Date();
      projectUpdateStatus = `project statuses were last updated on ${dateTime.toUTCString()}`;
    } catch {
      projectsString = "Welp 😛. Something went wrong updating the project status. A fix should be underway 👷‍♀️";
      projectUpdateStatus = "error updating project status"
    }
  
    readmeContent = `<h2 align=\"center\">Firdaus Bisma S</h2>\n` + 
    `A passionate amateur software developer. Usually programs in C# and javascript.\n` +
    `\n` +
    `### 🛠 Projects\n` +
    `${projectsString}\n` +
    `---\n` +
    `*<p align="center">${projectUpdateStatus}</p>*`;
    
    updateReadme(readmeContent);
  });
}

updateReadmeAsync();