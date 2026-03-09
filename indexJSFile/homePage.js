const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const loadingSpinner = document.getElementById("loadingSpinner");

const buttons = [allBtn, openBtn, closeBtn];

const gitIssuesContainer = document.getElementById("gitIssuesContainer");
const issuesCount = document.getElementById("issuesCount");

let allIssues = [];

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  gitIssuesContainer.innerHTML = "";
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

// button active system
buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    buttons.forEach((button) => button.classList.remove("btn-primary"));
    btn.classList.add("btn-primary");
  });
});

// fetch API
async function loadGithubIssues() {
  showLoading();

  setTimeout(async () => {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );

    const data = await res.json();

    allIssues = data.data;

    renderIssues(allIssues);
    hideLoading();
  },500);
}

// render cards
function renderIssues(issues) {
  gitIssuesContainer.innerHTML = "";

  issuesCount.innerText = issues.length;

  issues.forEach((issue) => {
    const card = document.createElement("div");

    const borderColor =
      issue.status === "open" ? "border-green-600" : "border-[#A855F7]";

    card.className = `px-[16px] py-[16px] bg-white rounded-md shadow-xl border-t-[4px] ${borderColor}`;

    let labelsHTML = "";

    if (issue.labels.includes("bug")) {
      labelsHTML += `
      <div class="bg-[#FEECEC] text-[#EF4444] px-[12px] py-[8px] rounded-3xl font-medium text-[12px]">
        <i class="fa-solid fa-bug"></i> BUG
      </div>
      `;
    }

    if (issue.labels.includes("help wanted")) {
      labelsHTML += `
      <div class="bg-[#FFF8DB] text-[#D97706] px-[12px] py-[8px] rounded-3xl font-medium text-[12px]">
        <i class="fa-solid fa-life-ring"></i> HELP WANTED
      </div>
      `;
    }

    card.innerHTML = `
        <div class="flex justify-between items-center mb-[12px]">
          <img class="h-[24px] w-[24px]" src="assets/Open-Status.png" alt="">
          <div class="w-[80px] h-[24px] bg-[#FEECEC] rounded-2xl">
            <p class="text-center text-[#EF4444]">${issue.priority}</p>
          </div>
        </div>

        <h1 class="font-semibold text-[14px] mb-[8px]">
          ${issue.title}
        </h1>

        <p class="text-[#64748B] text-[12px] mb-[12px] line-clamp-2">
          ${issue.description}
        </p>

        <div class="flex items-center gap-[8px] mb-[16px] min-h-[32px]">
          ${labelsHTML}
        </div>

        <div class="border-t-[2px] border-[#E4E4E7] -mx-[16px] px-[16px] pt-[12px] flex justify-between">
          <p class="text-[12px] text-[#64748B]">#${issue.id} by ${issue.author}</p>
          <p class="text-[12px] text-[#64748B]">
            ${new Date(issue.createdAt).toLocaleDateString()}
          </p>
        </div>
    `;

    gitIssuesContainer.appendChild(card);
  });
}

// filters
allBtn.addEventListener("click", () => {
  renderIssues(allIssues);
});

openBtn.addEventListener("click", () => {
  const openIssues = allIssues.filter((issue) => issue.status === "open");
  renderIssues(openIssues);
});

closeBtn.addEventListener("click", () => {
  const closedIssues = allIssues.filter((issue) => issue.status === "closed");
  renderIssues(closedIssues);
});

loadGithubIssues();
