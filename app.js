const screens = {
  login: document.getElementById("login-screen"),
  welcome: document.getElementById("welcome-screen"),
  report: document.getElementById("report-screen"),
  studyPlan: document.getElementById("study-plan-screen"),
  reviewMistakes: document.getElementById("review-mistakes-screen"),
  quiz: document.getElementById("quiz-screen"),
  complete: document.getElementById("complete-screen")
};

const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const guestButton = document.getElementById("guest-button");
const loginMessage = document.getElementById("login-message");
const startAssessmentButton = document.getElementById("start-assessment-button");
const viewStudyPlanButton = document.getElementById("view-study-plan-button");
const recommendedTopicList = document.getElementById("recommended-topic-list");
const allTopicList = document.getElementById("all-topic-list");
const studyPlanFocus = document.getElementById("study-plan-focus");
const reviewMistakesList = document.getElementById("review-mistakes-list");
const reviewMistakesEmpty = document.getElementById("review-mistakes-empty");
const reviewMistakesBackButton = document.getElementById("review-mistakes-back-button");
const reportScore = document.getElementById("report-score");
const focusText = document.getElementById("focus-text");
const recommendedNextButton = document.getElementById("recommended-next-button");
const reviewMistakesButton = document.getElementById("review-mistakes-button");
const currentUserText = document.getElementById("current-user-text");
const globalLevelText = document.getElementById("global-level-text");
const globalXpText = document.getElementById("global-xp-text");
const logoutButton = document.getElementById("logout-button");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const scoreText = document.getElementById("score-text");
const xpText = document.getElementById("xp-text");
const topicTitle = document.getElementById("topic-title");
const quizModeText = document.getElementById("quiz-mode-text");
const difficultyText = document.getElementById("difficulty-text");
const masteryText = document.getElementById("mastery-text");
const masteryFill = document.getElementById("mastery-fill");
const levelText = document.getElementById("level-text");
const encouragementText = document.getElementById("encouragement-text");
const reviewText = document.getElementById("review-text");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const questionCard = document.querySelector(".question-card");
const feedbackBox = document.getElementById("feedback-box");
const feedbackText = document.getElementById("feedback-text");
const explanationText = document.getElementById("explanation-text");
const dontKnowButton = document.getElementById("dont-know-button");
const tryAgainButton = document.getElementById("try-again-button");
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");
const completeMessage = document.getElementById("complete-message");
const completeScore = document.getElementById("complete-score");
const completeStreak = document.getElementById("complete-streak");
const completeMastery = document.getElementById("complete-mastery");
const replayButton = document.getElementById("replay-button");
const topicsButton = document.getElementById("topics-button");
const topicError = document.getElementById("topic-error");

const USERS_STORAGE_KEY = "codexapps_users";
const CURRENT_USER_STORAGE_KEY = "codexapps_current_user";
const difficultyOrder = ["easy", "medium", "hard"];
const superscriptMap = {
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
  "-": "⁻",
  "+": "⁺"
};
const subscriptMap = {
  0: "₀",
  1: "₁",
  2: "₂",
  3: "₃",
  4: "₄",
  5: "₅",
  6: "₆",
  7: "₇",
  8: "₈",
  9: "₉"
};
const assessmentTopicOrder = [
  {
    label: "Real Numbers & Arithmetic",
    sourceTopicName: "Real Numbers, Fractions, and Percents",
    questionMatcher: (question) => /\+|-|greatest|least|value/i.test(question.question)
  },
  {
    label: "Fractions, Decimals, Percents",
    sourceTopicName: "Real Numbers, Fractions, and Percents",
    questionMatcher: (question) => /fraction|percent|decimal|\/|\d+%/i.test(question.question)
  },
  {
    label: "Ratios, Proportions, Unit Conversions",
    sourceTopicName: "Ratios, Proportions, and Applied Arithmetic"
  },
  {
    label: "Linear Equations",
    sourceTopicName: "Linear Equations"
  },
  {
    label: "Inequalities",
    sourceTopicName: "Linear Inequalities and Absolute Value"
  },
  {
    label: "Systems of Equations",
    sourceTopicName: "Systems of Equations and Applications"
  },
  {
    label: "Exponents & Polynomials",
    sourceTopicName: "Algebraic Expressions and Exponents",
    questionMatcher: (question) => /\^|exponent|scientific notation/i.test(question.question)
  },
  {
    label: "Factoring",
    sourceTopicName: "Polynomials and Factoring",
    questionMatcher: (question) => /factor/i.test(question.question)
  },
  {
    label: "Rational Expressions",
    sourceTopicName: "Rational Expressions and Equations"
  },
  {
    label: "Radicals & Rational Exponents",
    sourceTopicName: "Radicals and Rational Exponents"
  },
  {
    label: "Functions & Graphs",
    sourceTopicName: "Functions and Graphs"
  },
  {
    label: "Geometry",
    sourceTopicName: "Geometry and Coordinate Geometry"
  },
  {
    label: "Trigonometry",
    sourceTopicName: "Trigonometry"
  },
  {
    label: "Exponential Functions",
    sourceTopicName: "Exponential and Logarithmic Models",
    questionMatcher: (question) => !/\blog\b|\bln\b/i.test(question.question)
  },
  {
    label: "Logarithms",
    sourceTopicName: "Exponential and Logarithmic Models",
    questionMatcher: (question) => /\blog\b|\bln\b/i.test(question.question)
  }
];
const topicOrderByName = assessmentTopicOrder.reduce((order, topic, index) => {
  if (!(topic.sourceTopicName in order)) {
    order[topic.sourceTopicName] = index;
  }

  return order;
}, {});
const correctMessages = ["Nice work 🔥", "Strong start ✨", "You've got this 💪"];
const incorrectMessages = ["Keep going 💪", "Take another look 👀", "One more try"];

let appTitle = "Weber State ALEKS Prep";
let quizTopics = [];
let diagnosticQuestions = [];
let recommendedTopicIds = [];
let assessmentResults = [];
let currentMode = "assessment";
let currentSessionType = "assessment";
let currentTopic = null;
let currentQuestionSet = [];
let currentQuestion = null;
let currentQuestionIndex = 0;
let hasAnsweredCurrentQuestion = false;
let retryUsed = false;
let questionMissed = false;
let score = 0;
let streak = 0;
let bestStreak = 0;
let xp = 0;
let totalXp = 0;
let topicPerformance = {};
let mistakesByTopic = {};
let lastAssessmentPerfect = false;
let currentUser = null;
let isGuestMode = false;

function getStoredUsers() {
  const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if (!rawUsers) {
    return {};
  }

  try {
    return JSON.parse(rawUsers);
  } catch (error) {
    return {};
  }
}

function saveStoredUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getDefaultProfile(password) {
  return {
    password,
    progress: {
      totalXp: 0,
      topicPerformance: {},
      mistakesByTopic: {},
      recommendedTopicIds: [],
      lastAssessmentPerfect: false
    }
  };
}

function showScreen(screenName) {
  topicError.classList.add("hidden");
  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  screens[screenName].classList.remove("hidden");
}

function showLoginMessage(message, isError = false) {
  loginMessage.textContent = message;
  loginMessage.classList.remove("hidden");
  loginMessage.classList.toggle("error", isError);
}

function clearLoginMessage() {
  loginMessage.textContent = "";
  loginMessage.classList.add("hidden");
  loginMessage.classList.remove("error");
}

function getLevelFromXp(xpAmount) {
  return Math.floor(xpAmount / 100) + 1;
}

function updateHeaderIdentity() {
  if (currentUser || isGuestMode) {
    currentUserText.textContent = isGuestMode ? "User: Guest" : `User: ${currentUser}`;
    currentUserText.classList.remove("hidden");
    logoutButton.classList.remove("hidden");
  } else {
    currentUserText.classList.add("hidden");
    logoutButton.classList.add("hidden");
  }
}

function updateGlobalLevelDisplay() {
  globalLevelText.textContent = `Level ${getLevelFromXp(totalXp)}`;
  globalXpText.textContent = `Total XP: ${totalXp}`;
  updateHeaderIdentity();
}

function getTopicId(topic, index) {
  return topic.id || `topic-${index + 1}`;
}

function getQuestionChoices(question) {
  return question.choices || question.options || [];
}

function formatMathText(text) {
  if (typeof text !== "string") {
    return text;
  }

  return text
    .replace(/sqrt\s*\(/gi, "√(")
    .replace(/sqrt/gi, "√")
    .replace(/log_(\d+)/gi, (_, digits) => `log${digits.split("").map((digit) => subscriptMap[digit] || digit).join("")}`)
    .replace(/\^([+-]?\d+)/g, (_, exponent) => exponent.split("").map((character) => superscriptMap[character] || character).join(""))
    .replace(/\^\(([-+]?\d+)\)/g, (_, exponent) => exponent.split("").map((character) => superscriptMap[character] || character).join(""));
}

function getCorrectAnswerIndex(question) {
  return typeof question.answer === "number" ? question.answer : question.correctIndex;
}

function getQuestionKey(question) {
  if (question.id) {
    return question.id;
  }

  return `${question.topicId || question.topicName || "topic"}::${question.question || ""}`;
}

function normalizeMistakeQuestion(question) {
  if (!question || !question.question) {
    return null;
  }

  const choices = getQuestionChoices(question).slice();
  const correctAnswerIndex = getCorrectAnswerIndex(question);

  return {
    id: getQuestionKey(question),
    sourceQuestionId: question.id || null,
    question: question.question,
    choices,
    correctAnswerIndex,
    correctAnswer: choices[correctAnswerIndex] || "",
    explanation: question.explanation || "",
    topicId: question.topicId || null,
    topicName: question.topicName || currentTopic?.name || "Unknown Topic"
  };
}

function normalizeMistakesByTopic(rawMistakes = {}) {
  return Object.entries(rawMistakes).reduce((result, [topicId, questions]) => {
    const normalizedQuestions = Array.isArray(questions)
      ? questions.map((question) => normalizeMistakeQuestion(question)).filter(Boolean)
      : [];

    if (normalizedQuestions.length > 0) {
      result[topicId] = normalizedQuestions;
    }

    return result;
  }, {});
}

function mapDifficultyLevel(value) {
  if (typeof value === "string") {
    const normalized = value.toLowerCase();

    if (difficultyOrder.includes(normalized)) {
      return normalized;
    }

    const numericValue = Number.parseInt(value, 10);

    if (!Number.isNaN(numericValue)) {
      value = numericValue;
    } else {
      return "medium";
    }
  }

  if (typeof value !== "number") {
    return "medium";
  }

  if (value <= 1) {
    return "easy";
  }

  if (value >= 4) {
    return "hard";
  }

  return "medium";
}

function inferDifficulty(question, topicName) {
  if (question.difficulty !== undefined && question.difficulty !== null) {
    return mapDifficultyLevel(question.difficulty);
  }

  const prompt = `${topicName} ${question.question} ${question.explanation}`.toLowerCase();
  const hardSignals = ["system", "inequality", "slope", "function", "sqrt", "√", "quadratic", "mixture", "point-slope", "model"];
  const easySignals = ["evaluate", "simplify", "equivalent", "sale price", "real number", "fraction", "percent"];

  if (hardSignals.some((signal) => prompt.includes(signal))) {
    return "hard";
  }

  if (easySignals.some((signal) => prompt.includes(signal))) {
    return "easy";
  }

  return "medium";
}

function buildQuestionId(topicId, index) {
  return `${topicId}-question-${index + 1}`;
}

function getDifficultyLabel(difficulty) {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getDifficultyRank(difficulty) {
  const rank = difficultyOrder.indexOf(difficulty);
  return rank === -1 ? 1 : rank;
}

function compareQuestionsByDifficulty(firstQuestion, secondQuestion) {
  const difficultyDifference = getDifficultyRank(firstQuestion.difficulty) - getDifficultyRank(secondQuestion.difficulty);

  if (difficultyDifference !== 0) {
    return difficultyDifference;
  }

  return (firstQuestion.sourceIndex || 0) - (secondQuestion.sourceIndex || 0);
}

function getOrderedQuestions(questions) {
  return questions.slice().sort(compareQuestionsByDifficulty);
}

function getTopicSortRank(topic) {
  if (topic.name in topicOrderByName) {
    return topicOrderByName[topic.name];
  }

  return assessmentTopicOrder.length + (topic.sourceIndex || 0);
}

function getOrderedTopics(topics = quizTopics) {
  return topics.slice().sort((firstTopic, secondTopic) => getTopicSortRank(firstTopic) - getTopicSortRank(secondTopic));
}

function getUniqueTopicIds(items) {
  return items.filter((item, index, list) => list.indexOf(item) === index);
}

function getTopicByName(topicName) {
  return quizTopics.find((topic) => topic.name === topicName) || null;
}

function buildAssessmentQuestion(config, usedQuestionIds = new Set()) {
  const topic = getTopicByName(config.sourceTopicName);

  if (!topic) {
    return null;
  }

  const orderedQuestions = getOrderedQuestions(topic.questions).filter((question) => !usedQuestionIds.has(question.id));
  const matchedQuestions = typeof config.questionMatcher === "function"
    ? orderedQuestions.filter((question) => config.questionMatcher(question))
    : orderedQuestions;
  const selectedQuestion = matchedQuestions[0] || orderedQuestions[0];

  if (!selectedQuestion) {
    return null;
  }

  return {
    ...selectedQuestion,
    area: config.label,
    assessmentLabel: config.label,
    topicId: topic.id,
    topicName: topic.name
  };
}

function resetRunStats() {
  hasAnsweredCurrentQuestion = false;
  retryUsed = false;
  questionMissed = false;
  score = 0;
  streak = 0;
  bestStreak = 0;
  xp = 0;
}

function resetTransientState() {
  diagnosticQuestions = buildDiagnosticQuestions();
  assessmentResults = [];
  currentMode = "assessment";
  currentSessionType = "assessment";
  currentTopic = null;
  currentQuestionSet = [];
  currentQuestion = null;
  currentQuestionIndex = 0;
  resetRunStats();
}

function getTopicStats(topicId) {
  if (!topicPerformance[topicId]) {
    topicPerformance[topicId] = { correct: 0, incorrect: 0 };
  }

  return topicPerformance[topicId];
}

function getTopicMastery(topicId) {
  const stats = getTopicStats(topicId);
  const attempts = stats.correct + stats.incorrect;
  return attempts === 0 ? 0 : Math.round((stats.correct / attempts) * 100);
}

function getCurrentMastery() {
  if (!currentTopic) {
    return 0;
  }

  if (currentSessionType === "review" && currentQuestion?.topicId) {
    return getTopicMastery(currentQuestion.topicId);
  }

  return getTopicMastery(currentTopic.id);
}

function saveCurrentUserProgress() {
  if (isGuestMode || !currentUser) {
    return;
  }

  const users = getStoredUsers();
  const profile = users[currentUser];

  if (!profile) {
    return;
  }

  profile.progress = {
    totalXp,
    topicPerformance,
    mistakesByTopic,
    recommendedTopicIds,
    lastAssessmentPerfect
  };

  users[currentUser] = profile;
  saveStoredUsers(users);
}

function loadSavedProgress(progress = {}) {
  totalXp = progress.totalXp || 0;
  topicPerformance = progress.topicPerformance || {};
  mistakesByTopic = normalizeMistakesByTopic(progress.mistakesByTopic);
  recommendedTopicIds = progress.recommendedTopicIds || [];
  lastAssessmentPerfect = Boolean(progress.lastAssessmentPerfect);
  updateGlobalLevelDisplay();
}

function loginAsSavedUser(username, profile) {
  currentUser = username;
  isGuestMode = false;
  localStorage.setItem(CURRENT_USER_STORAGE_KEY, username);
  loadSavedProgress(profile.progress);
  resetTransientState();
  buildStudyPlan();
  updateHeaderIdentity();
  showScreen("welcome");
}

function handleLogin(event) {
  event.preventDefault();
  clearLoginMessage();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    showLoginMessage("Enter both a username and password.", true);
    return;
  }

  const users = getStoredUsers();
  const existingUser = users[username];

  if (existingUser) {
    if (existingUser.password !== password) {
      showLoginMessage("Password does not match this user.", true);
      return;
    }

    loginAsSavedUser(username, existingUser);
    showLoginMessage(`Welcome back, ${username}.`);
  } else {
    users[username] = getDefaultProfile(password);
    saveStoredUsers(users);
    loginAsSavedUser(username, users[username]);
    showLoginMessage(`Account created for ${username}.`);
  }

  usernameInput.value = "";
  passwordInput.value = "";
}

function handleGuestMode() {
  clearLoginMessage();
  currentUser = null;
  isGuestMode = true;
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  resetTransientState();
  updateGlobalLevelDisplay();
  showScreen("welcome");
  showLoginMessage("Guest mode is active. Progress will not be saved.");
}

function handleLogout() {
  saveCurrentUserProgress();
  currentUser = null;
  isGuestMode = false;
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  resetTransientState();
  updateGlobalLevelDisplay();
  clearLoginMessage();
  usernameInput.value = "";
  passwordInput.value = "";
  showScreen("login");
}

function updateGameStats(answeredCount = currentQuestionIndex) {
  const questionCount = currentQuestionSet.length || 1;
  const progressPercent = (answeredCount / questionCount) * 100;

  progressFill.style.width = `${progressPercent}%`;
  scoreText.textContent = `Score: ${score} | Streak: ${streak}${streak > 0 ? " 🔥" : ""}`;
  xpText.textContent = `XP: ${xp}`;

  if (currentTopic) {
    const mastery = getCurrentMastery();
    masteryText.textContent = `Mastery: ${mastery}%`;
    masteryFill.style.width = `${mastery}%`;
  } else {
    masteryText.textContent = "Mastery: Assessment";
    masteryFill.style.width = "0%";
  }

  levelText.textContent = `Level ${getLevelFromXp(totalXp)}`;
}

function playQuestionFlash(className) {
  questionText.classList.remove("flash-correct", "flash-incorrect");
  questionCard.classList.remove("correct-flash", "incorrect-flash");
  void questionText.offsetWidth;
  questionText.classList.add(className);
  questionCard.classList.add(className === "flash-correct" ? "correct-flash" : "incorrect-flash");
}

function buildDiagnosticQuestions() {
  const usedQuestionIds = new Set();

  return assessmentTopicOrder
    .map((config) => {
      const question = buildAssessmentQuestion(config, usedQuestionIds);

      if (question) {
        usedQuestionIds.add(question.id);
      }

      return question;
    })
    .filter(Boolean);
}

function addMistake(question) {
  const savedQuestion = normalizeMistakeQuestion(question);

  if (!savedQuestion) {
    return;
  }

  const topicId = savedQuestion.topicId || "general";

  if (!mistakesByTopic[topicId]) {
    mistakesByTopic[topicId] = [];
  }

  const exists = mistakesByTopic[topicId].some(
    (existingQuestion) => (existingQuestion.sourceQuestionId || existingQuestion.id) === (savedQuestion.sourceQuestionId || savedQuestion.id)
  );

  if (!exists) {
    mistakesByTopic[topicId].push(savedQuestion);
  }
}

function clearMistake(question) {
  const topicId = question.topicId || "general";

  if (!mistakesByTopic[topicId]) {
    return;
  }

  const questionKey = getQuestionKey(question);

  mistakesByTopic[topicId] = mistakesByTopic[topicId].filter(
    (savedQuestion) => (savedQuestion.sourceQuestionId || savedQuestion.id) !== questionKey
  );

  if (mistakesByTopic[topicId].length === 0) {
    delete mistakesByTopic[topicId];
  }
}

function getAllMistakes() {
  return Object.values(mistakesByTopic)
    .flat()
    .slice()
    .sort((firstQuestion, secondQuestion) => {
      const firstTopic = quizTopics.find((topic) => topic.id === firstQuestion.topicId);
      const secondTopic = quizTopics.find((topic) => topic.id === secondQuestion.topicId);
      const topicDifference = getTopicSortRank(firstTopic || {}) - getTopicSortRank(secondTopic || {});

      if (topicDifference !== 0) {
        return topicDifference;
      }

      return (firstQuestion.question || "").localeCompare(secondQuestion.question || "");
    });
}

function updateReviewMistakesButton() {
  const mistakeCount = getAllMistakes().length;
  reviewMistakesButton.classList.toggle("hidden", lastAssessmentPerfect);
  reviewMistakesButton.textContent = mistakeCount > 0 ? `Review Mistakes (${mistakeCount})` : "Review Mistakes";
}

function getWeakestTopicId() {
  const practicedTopics = quizTopics.filter((topic) => {
    const stats = getTopicStats(topic.id);
    return stats.correct + stats.incorrect > 0;
  });

  if (practicedTopics.length === 0) {
    return null;
  }

  return practicedTopics
    .slice()
    .sort((first, second) => getTopicMastery(first.id) - getTopicMastery(second.id))[0].id;
}

function getRecommendedNextTopicId() {
  if (recommendedTopicIds.length > 0) {
    return recommendedTopicIds[0];
  }

  return getWeakestTopicId() || getOrderedTopics()[0]?.id || null;
}

function buildTopicButton(topic, isRecommended) {
  const button = document.createElement("button");
  const mastery = getTopicMastery(topic.id);
  button.className = "topic-button";
  if (isRecommended) {
    button.classList.add("recommended");
  }
  button.type = "button";
  button.innerHTML = `
    <span>${topic.name} (${topic.questions.length} questions)</span>
    <span class="topic-meta">Mastery ${mastery}%</span>
  `;
  button.addEventListener("click", () => startTopic(topic.id));
  return button;
}

function buildStudyPlan() {
  recommendedTopicList.innerHTML = "";
  allTopicList.innerHTML = "";
  updateReviewMistakesButton();
  const recommendedTopics = getOrderedTopics(quizTopics.filter((topic) => recommendedTopicIds.includes(topic.id)));
  const orderedTopics = getOrderedTopics();

  if (lastAssessmentPerfect) {
    studyPlanFocus.textContent = "Great work. We recommend you study all areas so you are as prepared as possible.";
  } else if (recommendedTopics.length > 0) {
    studyPlanFocus.textContent = `Priority areas: ${recommendedTopics.map((topic) => topic.name).join(", ")}`;
  } else {
    studyPlanFocus.textContent = "Complete the diagnostic to see priority study areas.";
  }

  orderedTopics.forEach((topic) => {
    const allButton = buildTopicButton(topic, false);
    allTopicList.appendChild(allButton);
  });

  recommendedTopics.forEach((topic) => {
    recommendedTopicList.appendChild(buildTopicButton(topic, true));
  });

  if (recommendedTopicList.children.length === 0) {
    const message = document.createElement("p");
    message.className = "panel-text";
    message.textContent = "You are in good shape across the diagnostic. Start anywhere for extra review.";
    recommendedTopicList.appendChild(message);
  }
}

function renderReviewMistakes() {
  const reviewQuestions = getAllMistakes();
  reviewMistakesList.innerHTML = "";
  reviewMistakesEmpty.classList.toggle("hidden", reviewQuestions.length > 0);

  reviewQuestions.forEach((question) => {
    const card = document.createElement("article");
    card.className = "review-card";

    const topicLabel = document.createElement("p");
    topicLabel.className = "review-topic";
    topicLabel.textContent = question.topicName;
    card.appendChild(topicLabel);

    const questionTitle = document.createElement("h3");
    questionTitle.className = "review-question";
    questionTitle.textContent = formatMathText(question.question);
    card.appendChild(questionTitle);

    const choices = document.createElement("div");
    choices.className = "review-choices";

    question.choices.forEach((choice, index) => {
      const choiceItem = document.createElement("div");
      choiceItem.className = "review-choice";

      if (index === question.correctAnswerIndex) {
        choiceItem.classList.add("correct");
      }

      choiceItem.textContent = formatMathText(choice);
      choices.appendChild(choiceItem);
    });

    card.appendChild(choices);

    const explanation = document.createElement("p");
    explanation.className = "panel-text review-explanation";
    explanation.textContent = `Explanation: ${formatMathText(question.explanation)}`;
    card.appendChild(explanation);

    reviewMistakesList.appendChild(card);
  });
}

function startAssessment() {
  currentMode = "assessment";
  currentSessionType = "assessment";
  currentTopic = null;
  diagnosticQuestions = buildDiagnosticQuestions();
  currentQuestionSet = diagnosticQuestions;
  currentQuestionIndex = 0;
  assessmentResults = [];
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  resetRunStats();
  renderQuestion();
  showScreen("quiz");
}

function startTopic(topicId) {
  currentMode = "topic";
  currentSessionType = "topic";
  currentTopic = quizTopics.find((topic) => topic.id === topicId);
  currentQuestionSet = getOrderedQuestions(currentTopic.questions).map((question) => ({
    ...question,
    area: currentTopic.name,
    topicId: currentTopic.id,
    topicName: currentTopic.name
  }));
  currentQuestionIndex = 0;
  currentQuestion = null;
  getTopicStats(currentTopic.id);
  resetRunStats();
  renderQuestion();
  showScreen("quiz");
}

function startReviewMistakes() {
  renderReviewMistakes();
  showScreen("reviewMistakes");
}

function renderQuestion() {
  const isAssessment = currentMode === "assessment";
  const question = currentQuestionSet[currentQuestionIndex];

  if (!question) {
    showCompleteScreen();
    return;
  }

  currentQuestion = question;
  topicTitle.textContent = isAssessment ? "Diagnostic Assessment" : currentTopic.name;
  quizModeText.textContent = isAssessment
    ? "Answer these mixed questions to build your study plan."
    : currentSessionType === "review"
      ? "Revisit missed questions and lock in the right steps."
      : "Work through the topic and build your score.";
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestionSet.length}`;
  difficultyText.textContent = `Difficulty: ${getDifficultyLabel(question.difficulty || "medium")}`;
  encouragementText.textContent = isAssessment ? "Show what you know." : "Stay focused and keep building.";
  reviewText.classList.toggle("hidden", !question.isReview);
  questionText.textContent = formatMathText(question.question);
  answerList.innerHTML = "";
  updateGameStats(currentQuestionIndex);

  feedbackBox.classList.add("hidden");
  tryAgainButton.classList.add("hidden");
  nextButton.classList.add("hidden");
  dontKnowButton.classList.remove("hidden");
  dontKnowButton.disabled = false;
  feedbackText.textContent = "";
  explanationText.textContent = "";
  feedbackText.className = "feedback-text";
  questionText.classList.remove("flash-correct", "flash-incorrect");
  questionCard.classList.remove("correct-flash", "incorrect-flash");
  hasAnsweredCurrentQuestion = false;
  retryUsed = false;
  questionMissed = false;

  getQuestionChoices(question).forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = formatMathText(option);
    button.addEventListener("click", () => handleAnswer(index));
    answerList.appendChild(button);
  });
}

function handleAnswer(selectedIndex, options = {}) {
  if (hasAnsweredCurrentQuestion) {
    return;
  }

  hasAnsweredCurrentQuestion = true;
  const assessmentQuestion = currentQuestionSet[currentQuestionIndex];
  const activeQuestion = currentMode === "assessment" ? assessmentQuestion : currentQuestion;
  const answerButtons = answerList.querySelectorAll(".answer-button");
  const correctAnswerIndex = getCorrectAnswerIndex(activeQuestion);
  const wasSkipped = Boolean(options.wasSkipped);
  const isCorrect = !wasSkipped && selectedIndex === correctAnswerIndex;

  if (isCorrect && !questionMissed) {
    score += 10;
    streak += 1;
    xp += 10;
    totalXp += 10;
    bestStreak = Math.max(bestStreak, streak);
  } else if (!isCorrect) {
    streak = 0;
    questionMissed = true;
  }

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === correctAnswerIndex) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && !isCorrect) {
      button.classList.add("incorrect");
    }
  });
  dontKnowButton.disabled = true;

  if (currentMode === "assessment" && !retryUsed) {
    assessmentResults[currentQuestionIndex] = {
      area: activeQuestion.area,
      topicId: activeQuestion.topicId,
      topicName: activeQuestion.topicName,
      correct: isCorrect
    };
  }

  if (!retryUsed && !isCorrect) {
    addMistake(activeQuestion);
  }

  if (currentMode === "topic" && !retryUsed) {
    if (isCorrect) {
      getTopicStats(activeQuestion.topicId).correct += 1;
      clearMistake(activeQuestion);
    } else {
      getTopicStats(activeQuestion.topicId).incorrect += 1;
    }
  }

  playQuestionFlash(isCorrect ? "flash-correct" : "flash-incorrect");
  updateGameStats(currentQuestionIndex + 1);
  updateGlobalLevelDisplay();
  saveCurrentUserProgress();

  if (isCorrect) {
    encouragementText.textContent = getRandomMessage(correctMessages);
    feedbackText.textContent = questionMissed ? "Correct on retry. Good recovery." : "Correct answer. +10 XP";
  } else {
    encouragementText.textContent = getRandomMessage(incorrectMessages);
    feedbackText.textContent = wasSkipped ? "Marked incorrect." : "Incorrect answer.";
  }

  feedbackText.classList.add(isCorrect ? "correct" : "incorrect");
  explanationText.textContent = formatMathText(activeQuestion.explanation);
  feedbackBox.classList.remove("hidden");

  if (!isCorrect && !retryUsed && !wasSkipped) {
    tryAgainButton.classList.remove("hidden");
  }

  const isLastQuestion = currentMode === "assessment"
    ? currentQuestionIndex === currentQuestionSet.length - 1
    : currentQuestionIndex === currentQuestionSet.length - 1;

  nextButton.textContent = isLastQuestion
    ? (currentMode === "assessment" ? "View Report" : "Finish Level")
    : "Next Question";
  nextButton.classList.remove("hidden");

  if (wasSkipped) {
    handleNextStep();
  }
}

function handleTryAgain() {
  retryUsed = true;
  hasAnsweredCurrentQuestion = false;
  feedbackBox.classList.add("hidden");
  tryAgainButton.classList.add("hidden");
  dontKnowButton.disabled = false;
  feedbackText.textContent = "";
  explanationText.textContent = "";
  feedbackText.className = "feedback-text";
  encouragementText.textContent = "Take your time and try again.";
  questionCard.classList.remove("correct-flash", "incorrect-flash");

  answerList.querySelectorAll(".answer-button").forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct", "incorrect");
  });
}

function handleNextStep() {
  const isLastQuestion = currentMode === "assessment"
    ? currentQuestionIndex === currentQuestionSet.length - 1
    : currentQuestionIndex === currentQuestionSet.length - 1;

  if (isLastQuestion) {
    if (currentMode === "assessment") {
      showAssessmentReport();
    } else {
      showCompleteScreen();
    }
    return;
  }

  currentQuestionIndex += 1;
  renderQuestion();
}

function showAssessmentReport() {
  const correctCount = assessmentResults.filter((result) => result.correct).length;
  const questionCount = assessmentResults.length || 1;
  const scorePercent = Math.round((correctCount / questionCount) * 100);
  const missedResults = assessmentResults.filter((result) => !result.correct);
  const missedTopicIds = getUniqueTopicIds(missedResults.map((result) => result.topicId));
  const focusTopics = missedTopicIds
    .map((topicId) => quizTopics.find((topic) => topic.id === topicId))
    .filter(Boolean);

  recommendedTopicIds = missedTopicIds;
  lastAssessmentPerfect = scorePercent === 100;

  reportScore.textContent = `Overall score: ${correctCount}/${questionCount} (${scorePercent}%)`;
  focusText.textContent = lastAssessmentPerfect
    ? "Great work. We recommend you study all areas so you are as prepared as possible."
    : `Focus on: ${focusTopics.map((topic) => topic.name).join(", ")}`;

  buildStudyPlan();
  saveCurrentUserProgress();
  showScreen("report");
}

function showStudyPlan() {
  buildStudyPlan();
  showScreen("studyPlan");
}

function showCompleteScreen() {
  const completedTopicId = currentSessionType === "review" ? (getWeakestTopicId() || recommendedTopicIds[0]) : currentTopic?.id;
  const mastery = completedTopicId ? getTopicMastery(completedTopicId) : 0;

  completeMessage.textContent = currentSessionType === "review"
    ? "You finished Review Mistakes. Head back to the study plan or jump into your next recommended topic."
    : `You finished ${currentTopic.name}. Replay it to raise your score or continue with another recommended topic.`;
  completeScore.textContent = `Final Score: ${score} | Total XP: ${xp}`;
  completeStreak.textContent = `Best Streak: ${bestStreak}`;
  completeMastery.textContent = `Topic Mastery: ${mastery}% | Overall Level ${getLevelFromXp(totalXp)}`;

  buildStudyPlan();
  saveCurrentUserProgress();
  showScreen("complete");
}

function handleBack() {
  if (currentMode === "assessment") {
    showScreen("welcome");
    return;
  }

  showStudyPlan();
}

async function loadQuizData() {
  try {
    const response = await fetch("apps/aleks.json");

    if (!response.ok) {
      throw new Error("Quiz file could not be loaded.");
    }

    const data = await response.json();
    appTitle = data.title || appTitle;
    document.title = appTitle;
    quizTopics = (data.topics || []).map((topic, index) => ({
      ...topic,
      id: getTopicId(topic, index),
      sourceIndex: index,
      questions: (topic.questions || []).map((question, questionIndex) => ({
        ...question,
        id: question.id || buildQuestionId(getTopicId(topic, index), questionIndex),
        sourceIndex: questionIndex,
        difficulty: inferDifficulty(question, topic.name)
      }))
    }));

    resetTransientState();

    const savedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    const users = getStoredUsers();

    if (savedUser && users[savedUser]) {
      loginAsSavedUser(savedUser, users[savedUser]);
    } else {
      updateGlobalLevelDisplay();
      showScreen("login");
    }
  } catch (error) {
    topicError.textContent = "Could not load the quiz content. Make sure the JSON file is available.";
    topicError.classList.remove("hidden");
  }
}

loginForm.addEventListener("submit", handleLogin);
guestButton.addEventListener("click", handleGuestMode);
startAssessmentButton.addEventListener("click", startAssessment);
viewStudyPlanButton.addEventListener("click", showStudyPlan);
recommendedNextButton.addEventListener("click", () => {
  const topicId = getRecommendedNextTopicId();
  if (topicId) {
    startTopic(topicId);
  }
});
reviewMistakesButton.addEventListener("click", startReviewMistakes);
reviewMistakesBackButton.addEventListener("click", showStudyPlan);
dontKnowButton.addEventListener("click", () => handleAnswer(-1, { wasSkipped: true }));
tryAgainButton.addEventListener("click", handleTryAgain);
nextButton.addEventListener("click", handleNextStep);
backButton.addEventListener("click", handleBack);
replayButton.addEventListener("click", () => {
  if (currentSessionType === "review") {
    startReviewMistakes();
    return;
  }

  startTopic(currentTopic.id);
});
topicsButton.addEventListener("click", showStudyPlan);
logoutButton.addEventListener("click", handleLogout);

loadQuizData();
