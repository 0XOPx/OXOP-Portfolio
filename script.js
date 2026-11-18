const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");

menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const words = ["code.", "music.", "ideas.", "software."];
const changingWord = document.querySelector("#changing-word");
let wordIndex = 0;

window.setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    changingWord.animate([{ opacity: 0, transform: "translateY(9px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 450, easing: "ease-out" });
    changingWord.textContent = words[wordIndex];
}, 2600);

const projectsGrid = document.querySelector("#projects-grid");
const projectCount = document.querySelector("#project-count");

function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    const top = document.createElement("div");
    top.className = "project-top";

    const type = document.createElement("span");
    type.className = "project-type";
    type.textContent = project.category || "PROJECT";

    const arrow = document.createElement("span");
    arrow.className = "project-arrow";
    arrow.textContent = "↗";

    const title = document.createElement("h3");
    title.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    const links = document.createElement("div");
    links.className = "project-links";

    top.append(type, arrow);
    card.append(top, title, description);

    if (project.github) {
        const source = document.createElement("a");
        source.href = project.github;
        source.target = "_blank";
        source.rel = "noreferrer";
        source.textContent = "Source code ↗";
        links.append(source);
    }

    if (project.website) {
        const website = document.createElement("a");
        website.href = project.website;
        website.target = "_blank";
        website.rel = "noreferrer";
        website.textContent = "Visit project ↗";
        links.append(website);
    }

    if (links.childElementCount) card.append(links);
    return card;
}

async function loadProjects() {
    try {
        const response = await fetch("./projects.json", { cache: "no-store" });
        if (!response.ok) throw new Error("Could not load projects.json");
        const projects = await response.json();
        if (!Array.isArray(projects)) throw new Error("Project data must be an array");

        projectsGrid.replaceChildren();

        if (projects.length === 0) {
            projectsGrid.innerHTML = '<div class="projects-loading">No projects have been added yet.</div>';
            projectCount.textContent = "0 PROJECTS";
            return;
        }

        projects.forEach(project => projectsGrid.append(createProjectCard(project)));
        projectCount.textContent = String(projects.length).padStart(2, "0") + " PROJECTS";
        projectsGrid.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
    } catch (error) {
        projectsGrid.innerHTML = '<div class="projects-loading">Projects could not be loaded. Check projects.json.</div>';
        projectCount.textContent = "PROJECTS UNAVAILABLE";
    }
}

loadProjects();
