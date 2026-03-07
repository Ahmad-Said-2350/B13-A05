  async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayIssues(data.data);
  }

  const displayIssues = (issues) => {
   
    const container  = document.getElementById("issueContainer");
    container.innerHTML = "";

    issues.forEach(issues => {

        const card = document.createElement("div");
        card.innerHTML = `
                
        <p>${issues.priority}</p>
        <h2>${issues.title}</h2>
        <p>${issues.description}</p>
        <p>${issues.labels}</p>
        <p>${issues.author}</p>
        <p>${issues.updatedAt}</p>
        `


        container.appendChild(card);

        
    });
  }

