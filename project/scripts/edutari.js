const subjects = [
  {
    name: "Mathematics",
    level: "exam",
    summary: "Step-by-step practice for numeracy, algebra, geometry, and exam-style problem solving.",
    topics: ["Number skills", "Algebra", "Geometry"]
  },
  {
    name: "English",
    level: "senior",
    summary: "Reading, grammar, writing, and comprehension lessons that students can repeat offline.",
    topics: ["Reading", "Grammar", "Writing"]
  },
  {
    name: "Science",
    level: "junior",
    summary: "Clear explanations and quizzes for biology, chemistry, physics, and everyday science.",
    topics: ["Life science", "Matter", "Energy"]
  },
  {
    name: "Social Studies",
    level: "junior",
    summary: "History, geography, citizenship, and community-focused lessons connected to real life.",
    topics: ["History", "Geography", "Citizenship"]
  },
  {
    name: "Exam Preparation",
    level: "exam",
    summary: "Past-paper style practice, timed questions, and revision checklists for confident review.",
    topics: ["Timed quizzes", "Topic review", "Study plans"]
  },
  {
    name: "Digital Skills",
    level: "senior",
    summary: "Basic technology confidence, responsible device use, and offline research habits.",
    topics: ["Device care", "Typing", "Study tools"]
  }
];

const learningStages = [
  {
    title: "Upper Primary",
    subtitle: "Grades 4 to 6",
    color: "blue",
    subjects: ["Mathematics", "English", "Science", "Computing", "Integrated Studies"]
  },
  {
    title: "Lower Secondary",
    subtitle: "Grades 7 to 9",
    color: "pink",
    subjects: ["Mathematics", "English", "Science", "Computing", "Digital Skills"]
  },
  {
    title: "Exam Preparation",
    subtitle: "Senior review",
    color: "green",
    subjects: ["English", "Mathematics", "Science", "Timed quizzes", "Study plans"]
  },
  {
    title: "Community Learning",
    subtitle: "Offline support",
    color: "orange",
    subjects: ["Device care", "Progress checks", "Shared study spaces", "Parent support", "Low-data updates"]
  }
];

function setCurrentYear() {
  const yearElements = document.querySelectorAll("#year");
  yearElements.forEach((element) => {
    element.textContent = `${new Date().getFullYear()}`;
  });
}

function setupNavigation() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", `${isOpen}`);
  });
}

function subjectCardTemplate(subject) {
  const topicItems = subject.topics.map((topic) => `<li>${topic}</li>`).join("");
  const levelLabel = subject.level === "exam" ? "Exam focus" : `${subject.level} level`;

  return `
    <article class="subject-card">
      <span class="tag">${levelLabel}</span>
      <h3>${subject.name}</h3>
      <p>${subject.summary}</p>
      <ul>${topicItems}</ul>
    </article>
  `;
}

function learningStageTemplate(stage) {
  const subjectItems = stage.subjects.map((subject) => `<li>${subject}</li>`).join("");

  return `
    <article class="stage-card ${stage.color}">
      <h3>${stage.title}</h3>
      <p>${stage.subtitle}</p>
      <ul>${subjectItems}</ul>
    </article>
  `;
}

function renderFeaturedSubjects() {
  const list = document.querySelector("#featured-subject-list");

  if (!list) {
    return;
  }

  const featuredCards = subjects
    .slice(0, 3)
    .map((subject) => subjectCardTemplate(subject))
    .join("");

  list.innerHTML = featuredCards;
}

function renderSubjects() {
  const list = document.querySelector("#subject-list");

  if (!list) {
    return;
  }

  list.innerHTML = learningStages
    .map((stage) => learningStageTemplate(stage))
    .join("");
}

function setupGoalForm() {
  const form = document.querySelector("#goal-form");
  const message = document.querySelector("#saved-goal");

  if (!form || !message) {
    return;
  }

  const savedGoal = JSON.parse(localStorage.getItem("edutariGoal") || "null");

  if (savedGoal) {
    message.textContent = `Saved goal: ${savedGoal.hours} hours of ${savedGoal.subject} each week.`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const subject = form.elements["goal-subject"].value;
    const hours = Number(form.elements["goal-hours"].value);

    if (hours < 1 || hours > 30) {
      message.textContent = `Please choose a weekly goal between 1 and 30 hours.`;
      return;
    }

    const goal = { subject, hours };
    localStorage.setItem("edutariGoal", JSON.stringify(goal));
    message.textContent = `Saved goal: ${hours} hours of ${subject} each week.`;
    form.reset();
  });
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  const response = document.querySelector("#contact-response");

  if (!form || !response) {
    return;
  }

  const savedContact = JSON.parse(localStorage.getItem("edutariContact") || "null");

  if (savedContact) {
    response.textContent = `Last saved message: ${savedContact.name}, ${savedContact.role}.`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const contact = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      role: form.elements.role.value,
      message: form.elements.message.value.trim()
    };

    if (contact.message.length < 10) {
      response.textContent = `Please include a message of at least 10 characters.`;
      return;
    }

    localStorage.setItem("edutariContact", JSON.stringify(contact));
    response.textContent = `Thank you, ${contact.name}. Your ${contact.role.toLowerCase()} message was saved on this device. Edutari can also be reached at info@edutari.com.`;
    form.reset();
  });
}

setCurrentYear();
setupNavigation();
renderFeaturedSubjects();
renderSubjects();
setupGoalForm();
setupContactForm();
