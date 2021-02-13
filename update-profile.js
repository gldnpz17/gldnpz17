const fs = require('fs');
const https = require('https');
const { performance } = require('perf_hooks');

const projects = [{
    projectName: "personal website",
    url: "https://gldnpz.com",
    notes: "",
    repo: "https://github.com/gldnpz17/gldnpz.com"
  },{
    projectName: "url shortener",
    url: "https://short.gldnpz.com",
    notes: "",
    repo: "https://github.com/gldnpz17/url-shortener"
  },{
    projectName: "gimana.id",
    url: "https://gimana.id",
    notes: "made in collaboration with comfyte",
    repo: "https://github.com/gldnpz17/gimana.id"
  },{
    projectName: "jenkins server",
    url: "https://jenkins.gldnpz.com",
    notes: "Jenkins was too heavy for my puny vps. 😥",
    repo: null
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
      projectsString = `| Project name | Status | Repository | Notes |\n` +
      `| --- | --- | --- | --- |\n`;
      await Promise.all(projects.map(async (project) => {
        let code = await getProjectStatus(project.url);
        projectsString += `| ${project.projectName} | ${(code === 200) ? onlineBadge : offlineBadge} | ${(project.repo === null) ? "`no repository`" : `[here](${project.repo})`} | \`${(project.notes === "") ? "no notes" : project.notes}\` |\n`;
      }));
  
      let dateTime = new Date();
      projectUpdateStatus = `project statuses were last updated on ${dateTime.toUTCString()}`;
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
    
    updateReadme(readmeContent);
  });
}

updateReadmeAsync();