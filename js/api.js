  
let allIssues = [];

  async function loadIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  allIssues = data.data;

  displayIssues(allIssues);
}

async function loadSingleIssue(id) {

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

  const data = await res.json();

  showIssueModal(data.data);

}

async function handleSearch(e){

const searchText = e.target.value;

if(searchText === ""){
displayIssues(allIssues);
return;
}

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`
);

const data = await res.json();

displayIssues(data.data);

}


 const displayIssues = (issues) => {

const container  = document.getElementById("issueContainer");
const count = document.getElementById("issueCount");

count.innerText = issues.length + " Issues";

container.innerHTML = "";

issues.forEach(issues => {

  let borderClass = issues.status === "open"? "border-t-2 border-green-500" : 
  "border-t-2 border-[#A855F7]";





      let statusImage = "";

if(issues.status === "open"){
  statusImage = "./assets/Open-Status.png";
  
}
else{
  statusImage = "./assets/Closed-Status.png";
}


let priorityClass = "";

if(issues.priority === "high"){
  priorityClass = "badge-outline badge-error";
}
else if(issues.priority === "medium"){
  priorityClass = "badge-outline badge-warning";
}
else{
  priorityClass = "badge-outline bg-[whit]"
}



let labelsHTML = "";

issues.labels.forEach(label => {

let labelClass = "";

if(label === "bug"){
labelClass = "badge-outline badge-error";
}
else if(label === "help wanted"){
labelClass = "badge-outline badge-warning";
}
else{
labelClass = "badge-outline badge-success";
}

labelsHTML += `<span class="badge ${labelClass}">${label}</span>`;

});
        const card = document.createElement("div");
        
        card.className = `${borderClass}`
        card.classList.add("card", "bg-base-100" ,"w-full", "shadow-sm", 'min-h-[280px]')
        card.innerHTML = `
                
        <div class="">
  
<div class="card-body">
<div class="show flex justify-between items-center ">

<img src="${statusImage}" alt="">

    <div class="badge ${priorityClass}">
${issues.priority}
</div>

  </div>

<h2 class="text-2xl font-bold text-[#1F2937]">${issues.title}</h2>
<p class=" text-base text-[#64748B] line-clamp-2">${issues.description}</p>

<div class="flex flex-wrap gap-2">
${labelsHTML}
</div>

  <div class="divider my-2"></div>
  

<p class="text-base text-[#64748B] ">${issues.author}</p>
<p class="text-base text-[#64748B] ">${issues.createdAt}</p>
    
  </div>

</div>



        `
card.addEventListener("click", () => {
loadSingleIssue(issues.id);
});

        container.appendChild(card);

        
    });
  }


  

  // Tab click logic

  document.getElementById("tab-all").addEventListener("click", () => {
  displayIssues(allIssues);
});

document.getElementById("tab-open").addEventListener("click", () => {

  const openIssues = allIssues.filter(issue => issue.status === "open");

  displayIssues(openIssues);

});

document.getElementById("tab-closed").addEventListener("click", () => {

  const closedIssues = allIssues.filter(issue => issue.status === "closed");

  displayIssues(closedIssues);

});



// modal 

function showIssueModal(issue){

  
const modalContent = document.getElementById("modalContent");

let statusClass = "";
let statusText = "";

if(issue.status === "open"){
statusClass = "badge-success";
statusText = "Opened";
}
else{
statusClass = "badge-secondary";
statusText = "Closed";
}

let labelsHTML = "";

issue.labels.forEach(label => {

let labelClass = "";

if(label === "bug"){
labelClass = "badge-error";
}
else if(label === "help wanted"){
labelClass = "badge-warning";
}
else{
labelClass = "badge-neutral";
}

labelsHTML += `<span class="badge badge-outline ${labelClass}">${label}</span>`;

});

let priorityClass = "";

if(issue.priority === "high"){
priorityClass = "badge-error";
}
else if(issue.priority === "medium"){
priorityClass = "badge-warning";
}
else{
priorityClass = "badge-neutral";
}

modalContent.innerHTML = `

<h2 class="text-2xl font-bold mb-2">
${issue.title}
</h2>

<div class="flex items-center gap-3 mb-3">

<span class="badge ${statusClass}">
${statusText}
</span>

<p class="text-sm text-gray-500">
Opened by ${issue.author} • ${issue.createdAt}
</p>

</div>

<div class="flex gap-2 mb-4">
${labelsHTML}
</div>

<p class="text-gray-600 mb-6">
${issue.description}
</p>

<div class="flex justify-between mb-6">

<div>
<p class="text-sm text-gray-500">Assignee:</p>
<p class="font-semibold">${issue.author}</p>
</div>

<div>
<p class="text-sm text-gray-500">Priority:</p>
<span class="badge ${priorityClass}">
${issue.priority}
</span>
</div>

</div>

<div class="text-right">
<button class="btn btn-primary" onclick="issueModal.close()">
Close
</button>
</div>

`;

document.getElementById("issueModal").showModal();

}

// search

document
.getElementById("searchInput")
.addEventListener("input", handleSearch);

document
.getElementById("searchInput")
.addEventListener("keyup", function(e){

if(e.key === "Enter"){
handleSearch(e);
}

});