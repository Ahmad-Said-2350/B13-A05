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
        
        card.classList.add("card", "bg-base-100" ,"w-full", "shadow-sm", 'min-h-[280px]')
        card.innerHTML = `
                
        <div class="">
  
<div class="card-body">
<div class="show flex justify-between items-center ">

    <img src="./assets/Open-Status.png" alt="">
    <div class= " badge badge-outline badge-warning">${issues.priority}</div>

    
</div>

<h2 class="text-2xl font-bold text-[#1F2937]">${issues.title}</h2>
<p class=" text-base text-[#64748B] line-clamp-2">${issues.description}</p>
<p class="badge badge-outline badge-error">${issues.labels}</p>

  <div class="divider my-2"></div>

<p class="text-base text-[#64748B] ">${issues.author}</p>
<p class="text-base text-[#64748B] ">${issues.createdAt}</p>
    
  </div>

</div>



        `


        container.appendChild(card);

        
    });
  }

