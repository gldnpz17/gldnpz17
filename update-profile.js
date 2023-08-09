const fs = require('fs');
const https = require('https');

console.log('README.md update started.');

const summary = 
'A passionate amateur software engineer. ' + 
'Most of the time uses JavaScript and TypeScript. ' +
'Lives by the principle that every project is an opportunity to learn a new piece of technology. '

const technologies = {
  workedWith: {
    languages: [
      {
        label: 'C#/.NET',
        iconId: 'dotnet'
      },
      {
        label: 'JavaScript',
        iconId: 'javascript'
      },
      {
        label: 'TypeScript',
        iconId: 'typescript'
      },
      {
        label: 'Kotlin',
        iconId: 'kotlin'
      },
      {
        label: 'Micropython',
        iconId: 'micropython'
      }
    ],
    frameworks: [
      {
        label: 'NestJS',
        iconId: 'nestjs'
      },
      {
        label: 'Express',
        iconId: 'express'
      },
      {
        label: 'Next.js',
        iconId: 'nextdotjs'
      },
      {
        label: 'React',
        iconId: 'react'
      },
      {
        label: 'ASP.NET Core',
        iconId: null
      },
      {
        label: 'NUnit',
        iconId: null
      },
      {
        label: 'Boostrap',
        iconId: 'bootstrap'
      },
      {
        label: 'MaterialUI',
        iconId: 'materialui'
      },
      {
        label: 'TailwindCSS',
        iconId: 'tailwindcss'
      },
    ],
    tools: [
      {
        label: 'Docker',
        iconId: 'docker'
      },
      {
        label: 'GraphQL',
        iconId: 'graphql'
      },
      {
        label: 'Redis',
        iconId: 'redis'
      },
      {
        label: 'MongoDB',
        iconId: 'mongodb'
      },
      {
        label: 'PostgreSQL',
        iconId: 'postgresql'
      },
      {
        label: 'SQLite',
        iconId: 'sqlite'
      },
      {
        label: 'Firebase',
        iconId: 'firebase'
      },
      {
        label: 'Strapi',
        iconId: 'strapi'
      },
      {
        label: 'Contentful',
        iconId: 'contentful'
      },
    ]
  },
  learning: [
    {
      label: 'Flutter',
      iconId: 'flutter'
    },
    {
      label: 'Java',
      iconId: 'java'
    },
    {
      label: 'Spring',
      iconId: 'spring'
    },
    {
      label: 'Apache',
      iconId: 'apache'
    },
    {
      label: 'Nginx',
      iconId: 'nginx'
    },
    {
      label: 'Vue',
      iconId: 'vuedotjs'
    },
    {
      label: 'Nuxt.js',
      iconId: 'nuxtdotjs'
    },
  ],
  interested: [
    {
      label: 'Redux',
      iconId: 'redux'
    },
    {
      label: 'Next.js',
      iconId: 'nextdotjs'
    },
    {
      label: 'Kubernetes',
      iconId: 'kubernetes'
    },
    {
      label: 'Jest',
      iconId: 'jest'
    },
    {
      label: 'Electron',
      iconId: 'electron'
    },
    {
      label: 'JUnit',
      iconId: 'junit5'
    },
  ]
}

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
  },{
    projectName: 'beringtoyou.com',
    url: 'https://beringtoyou.com',
    notes: 'PKM(Program Kreativitas Mahasiswa) project',
    repo: null
  }
]

const getTechnologyBadge = (label, iconId) => {
  let params = new URLSearchParams('')
  
  params.append('style', 'flat')
  params.append('labelColor', '37474')

  if (iconId) {
    params.append('logo', iconId)
    params.append('logoColor', 'white')
  }

  return `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-%23546e7a?${params.toString()})`
}

const getBadge = (statusCode, isOnline) => {
  if (isOnline) {
    return '![onlineBadge](https://img.shields.io/badge/200-online-%234caf50)';
  } else if ('?') {
    return `![offlineBadge](https://img.shields.io/badge/%3F-failure-e53935)`;
  } else {
    return `![offlineBadge](https://img.shields.io/badge/${statusCode}-offline-e53935)`;
  }
}

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
    }).on('error', (err) => {
      reject(err)
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

const projectWriter = {
  writeProjects: async () => {
    let projectsString =      
    `| Project name | Status | Repository | Notes |\n` +
    `| --- | --- | --- | --- |\n`;
    
    let projectUpdateStatus = '';
    
    try {
      results = [];
      
      await Promise.all(projects.map(async (project, index) => {
        console.log(`Fetching status for ${project.url}`)

        let code = null
        try {
          code = await getWebsiteStatus(project.url);
        } catch(err) {
          code = '?'
        }

        results[index] = `| [${project.projectName}](${project.url}) | ${(code === 200) ? getBadge(200, true) : getBadge(code, false)} | ${(project.repo === null) ? "`private repository`" : `[here](${project.repo})`} | \`${(project.notes === "") ? "no notes" : project.notes}\` |\n`;
      }));
      
      results.map(result => {
        projectsString += result;  
      });

      let dateTime = new Date();
      projectUpdateStatus = `project statuses were last updated automatically on ${dateTime.toUTCString()}`;
    } catch {
      projectsString = "Welp 😛. Something went wrong updating the project status. A fix should be underway 👷‍♀️";
      projectUpdateStatus = "error updating project status"
    }

    return ({
      tableString: projectsString,
      statusString: projectUpdateStatus
    })
  }
}

const technologyWriter = {
  listTechnologies: (technologies) => {
    const technologyStrings = technologies.map(technology => {
      return getTechnologyBadge(technology.label, technology.iconId)
    })

    console.log(technologyStrings)

    return technologyStrings.join(' ')
  }
}

const main = async () => {
  let projectStrings = await projectWriter.writeProjects(projects)

  let readmeContent = 
  `<h2 align=\"center\">Firdaus Bisma S</h2>\n` + 
  `${summary} \n` +
  `</br> </br>\n\n` +
  `**Technologies i've worked with:**` +
  `\n\n` +
  `| Languages | Frameworks | Tools/Misc. |\n` +
  `| --- | --- | --- |\n` +
  `| ${technologyWriter.listTechnologies(technologies.workedWith.languages)} | ${technologyWriter.listTechnologies(technologies.workedWith.frameworks)} | ${technologyWriter.listTechnologies(technologies.workedWith.tools)} |` +
  `\n\n` +
  `**Technologies i'm currently learning:**` +
  `\n\n` +
  technologyWriter.listTechnologies(technologies.learning) +
  `\n\n` +
  `**Technologies i'm interested in learning in the future:**` +
  `\n\n` +
  technologyWriter.listTechnologies(technologies.interested) +
  `\n\n` +
  `### 🛠 Projects\n` +
  `Note: All projects are currently down in anticipation of the expiry of the Microsoft Azure for students plan\n` +
  `${projectStrings.tableString}\n` +
  `---\n` +
  `*<p align="center">${projectStrings.statusString}</p>*`;
  
  await updateReadme(readmeContent);
}

main().then(() => {
  console.log('Execution complete.');
  process.exit(0);
});
