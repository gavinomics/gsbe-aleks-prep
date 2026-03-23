const screens = {
  login: document.getElementById("login-screen"),
  welcome: document.getElementById("welcome-screen"),
  report: document.getElementById("report-screen"),
  studyPlan: document.getElementById("study-plan-screen"),
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
const reportScore = document.getElementById("report-score");
const weakAreasText = document.getElementById("weak-areas-text");
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
const correctMessages = ["Nice work 🔥", "Strong start ✨", "You've got this 💪"];
const incorrectMessages = ["Keep going 💪", "Take another look 👀", "One more try"];

let appTitle = "Weber State ALEKS Prep";
let quizTopics = [];
let diagnosticQuestions = [];
let recommendedTopicIds = [];
let assessmentResults = [];
let weakAreas = [];
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
let adaptiveDifficultyIndex = 1;
let consecutiveCorrectAnswers = 0;
let topicQuestionPool = [];
let usedQuestionIds = [];
let reviewQueue = [];
let topicPerformance = {};
let topicSessionLength = 0;
let mistakesByTopic = {};
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
      weakAreas: []
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

function getCorrectAnswerIndex(question) {
  return typeof question.answer === "number" ? question.answer : question.correctIndex;
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

function normalizeAreaName(topicName) {
  if (topicName.includes("Linear Equations")) {
    return "Linear Equations";
  }

  if (topicName.includes("Fractions")) {
    return "Fractions";
  }

  if (topicName.includes("Geometry")) {
    return "Geometry";
  }

  if (topicName.includes("Functions")) {
    return "Functions";
  }

  if (topicName.includes("System")) {
    return "Systems";
  }

  return topicName;
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
  adaptiveDifficultyIndex = 1;
  consecutiveCorrectAnswers = 0;
  topicQuestionPool = [];
  usedQuestionIds = [];
  reviewQueue = [];
  topicSessionLength = 0;
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
    weakAreas
  };

  users[currentUser] = profile;
  saveStoredUsers(users);
}

function loadSavedProgress(progress = {}) {
  totalXp = progress.totalXp || 0;
  topicPerformance = progress.topicPerformance || {};
  mistakesByTopic = progress.mistakesByTopic || {};
  recommendedTopicIds = progress.recommendedTopicIds || [];
  weakAreas = progress.weakAreas || [];
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
  weakAreas = [];
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
  weakAreas = [];
  resetTransientState();
  updateGlobalLevelDisplay();
  clearLoginMessage();
  usernameInput.value = "";
  passwordInput.value = "";
  showScreen("login");
}

function updateGameStats(answeredCount = currentQuestionIndex) {
  const questionCount = currentMode === "topic" ? (topicSessionLength || 1) : (currentQuestionSet.length || 1);
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
  const questions = [];
  let round = 0;

  while (questions.length < 6) {
    let addedInRound = false;

    quizTopics.forEach((topic) => {
      const question = topic.questions[round];

      if (question && questions.length < 6) {
        questions.push({
          ...question,
          area: normalizeAreaName(topic.name),
          topicId: topic.id,
          topicName: topic.name
        });
        addedInRound = true;
      }
    });

    if (!addedInRound) {
      break;
    }

    round += 1;
  }

  return questions;
}

function getAdaptiveQuestion(questionId) {
  return topicQuestionPool.find((question) => question.id === questionId);
}

function getPendingReviewQuestion() {
  const readyReview = reviewQueue.find((item) => item.showAfter <= currentQuestionIndex);
  return readyReview ? getAdaptiveQuestion(readyReview.questionId) : null;
}

function getQuestionsByDifficulty(targetDifficulty) {
  return topicQuestionPool.filter((question) => {
    return !usedQuestionIds.includes(question.id) && question.difficulty === targetDifficulty;
  });
}

function getNextAdaptiveQuestion() {
  const reviewQuestion = getPendingReviewQuestion();

  if (reviewQuestion) {
    return { ...reviewQuestion, isReview: true };
  }

  const targetDifficulty = difficultyOrder[adaptiveDifficultyIndex];
  const orderedDifficulties = [
    targetDifficulty,
    difficultyOrder[Math.max(0, adaptiveDifficultyIndex - 1)],
    difficultyOrder[Math.min(difficultyOrder.length - 1, adaptiveDifficultyIndex + 1)]
  ].filter((difficulty, index, list) => list.indexOf(difficulty) === index);

  for (const difficulty of orderedDifficulties) {
    const match = getQuestionsByDifficulty(difficulty)[0];

    if (match) {
      return { ...match, isReview: false };
    }
  }

  if (reviewQueue.length > 0) {
    const fallbackReview = getAdaptiveQuestion(reviewQueue[0].questionId);

    if (fallbackReview) {
      return { ...fallbackReview, isReview: true };
    }
  }

  return null;
}

function scheduleReview(question) {
  const existingReview = reviewQueue.find((item) => item.questionId === question.id);

  if (existingReview) {
    existingReview.showAfter = currentQuestionIndex + 2;
    return;
  }

  reviewQueue.push({
    questionId: question.id,
    showAfter: currentQuestionIndex + 2
  });
  topicSessionLength += 1;
}

function removeScheduledReview(questionId) {
  reviewQueue = reviewQueue.filter((item) => item.questionId !== questionId);
}

function addMistake(question) {
  if (!mistakesByTopic[question.topicId]) {
    mistakesByTopic[question.topicId] = [];
  }

  const exists = mistakesByTopic[question.topicId].some((savedQuestion) => savedQuestion.id === question.id);

  if (!exists) {
    mistakesByTopic[question.topicId].push({ ...question });
  }
}

function clearMistake(question) {
  if (!mistakesByTopic[question.topicId]) {
    return;
  }

  mistakesByTopic[question.topicId] = mistakesByTopic[question.topicId].filter(
    (savedQuestion) => savedQuestion.id !== question.id
  );
}

function getWeakestTopicId() {
  const practicedTopics = quizTopics.filter((topic) => {
    const stats = getTopicStats(topic.id);
    return stats.correct + stats.incorrect > 0;
  });

  const sourceTopics = practicedTopics.length > 0
    ? practicedTopics
    : quizTopics.filter((topic) => recommendedTopicIds.includes(topic.id));

  if (sourceTopics.length === 0) {
    return quizTopics[0]?.id || null;
  }

  return sourceTopics
    .slice()
    .sort((first, second) => getTopicMastery(first.id) - getTopicMastery(second.id))[0].id;
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

  studyPlanFocus.textContent = weakAreas[0] === "No major weak areas detected"
    ? "Priority areas: Balanced review across all topics"
    : `Priority areas: ${weakAreas.slice(0, 2).join(" and ")}`;

  quizTopics.forEach((topic) => {
    const allButton = buildTopicButton(topic, false);
    allTopicList.appendChild(allButton);

    if (recommendedTopicIds.includes(topic.id)) {
      recommendedTopicList.appendChild(buildTopicButton(topic, true));
    }
  });

  if (recommendedTopicList.children.length === 0) {
    const message = document.createElement("p");
    message.className = "panel-text";
    message.textContent = "You are in good shape across the diagnostic. Start anywhere for extra review.";
    recommendedTopicList.appendChild(message);
  }
}

function startAssessment() {
  currentMode = "assessment";
  currentSessionType = "assessment";
  currentTopic = null;
  currentQuestionSet = diagnosticQuestions;
  currentQuestionIndex = 0;
  assessmentResults = [];
  weakAreas = [];
  recommendedTopicIds = [];
  resetRunStats();
  renderQuestion();
  showScreen("quiz");
}

function startTopic(topicId) {
  currentMode = "topic";
  currentSessionType = "topic";
  currentTopic = quizTopics.find((topic) => topic.id === topicId);
  currentQuestionSet = currentTopic.questions.map((question) => ({
    ...question,
    area: normalizeAreaName(currentTopic.name),
    topicId: currentTopic.id,
    topicName: currentTopic.name
  }));
  currentQuestionIndex = 0;
  currentQuestion = null;
  adaptiveDifficultyIndex = 1;
  consecutiveCorrectAnswers = 0;
  usedQuestionIds = [];
  reviewQueue = [];
  topicQuestionPool = currentQuestionSet.map((question) => ({ ...question }));
  getTopicStats(currentTopic.id);
  topicSessionLength = currentQuestionSet.length;
  resetRunStats();
  renderQuestion();
  showScreen("quiz");
}

function startReviewMistakes() {
  const reviewQuestions = Object.values(mistakesByTopic).flat();

  if (reviewQuestions.length === 0) {
    topicError.textContent = "No mistakes to review yet. Complete a topic first.";
    topicError.classList.remove("hidden");
    return;
  }

  currentMode = "topic";
  currentSessionType = "review";
  currentTopic = { id: "review-mode", name: "Review Mistakes" };
  currentQuestionSet = reviewQuestions.map((question) => ({ ...question, isReview: true }));
  currentQuestionIndex = 0;
  currentQuestion = null;
  adaptiveDifficultyIndex = 0;
  consecutiveCorrectAnswers = 0;
  usedQuestionIds = [];
  reviewQueue = [];
  topicQuestionPool = currentQuestionSet.map((question) => ({ ...question }));
  topicSessionLength = currentQuestionSet.length;
  resetRunStats();
  renderQuestion();
  showScreen("quiz");
}

function renderQuestion() {
  const isAssessment = currentMode === "assessment";
  const question = isAssessment ? currentQuestionSet[currentQuestionIndex] : getNextAdaptiveQuestion();

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
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${isAssessment ? currentQuestionSet.length : topicSessionLength}`;
  difficultyText.textContent = `Difficulty: ${getDifficultyLabel(question.difficulty || "medium")}`;
  encouragementText.textContent = isAssessment ? "Show what you know." : "Stay focused and keep building.";
  reviewText.classList.toggle("hidden", !question.isReview);
  questionText.textContent = question.question;
  answerList.innerHTML = "";
  updateGameStats(currentQuestionIndex);

  feedbackBox.classList.add("hidden");
  tryAgainButton.classList.add("hidden");
  nextButton.classList.add("hidden");
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
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(index));
    answerList.appendChild(button);
  });
}

function handleAnswer(selectedIndex) {
  if (hasAnsweredCurrentQuestion) {
    return;
  }

  hasAnsweredCurrentQuestion = true;
  const assessmentQuestion = currentQuestionSet[currentQuestionIndex];
  const activeQuestion = currentMode === "assessment" ? assessmentQuestion : currentQuestion;
  const answerButtons = answerList.querySelectorAll(".answer-button");
  const correctAnswerIndex = getCorrectAnswerIndex(activeQuestion);
  const isCorrect = selectedIndex === correctAnswerIndex;

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

  if (currentMode === "assessment" && !retryUsed) {
    assessmentResults[currentQuestionIndex] = {
      area: activeQuestion.area,
      topicId: activeQuestion.topicId,
      correct: isCorrect
    };
  }

  if (currentMode === "topic" && !retryUsed) {
    if (isCorrect) {
      getTopicStats(activeQuestion.topicId).correct += 1;
      consecutiveCorrectAnswers += 1;
      clearMistake(activeQuestion);

      if (consecutiveCorrectAnswers >= 2) {
        adaptiveDifficultyIndex = Math.min(adaptiveDifficultyIndex + 1, difficultyOrder.length - 1);
        consecutiveCorrectAnswers = 0;
      }

      if (activeQuestion.isReview) {
        removeScheduledReview(activeQuestion.id);
      }
    } else {
      getTopicStats(activeQuestion.topicId).incorrect += 1;
      consecutiveCorrectAnswers = 0;
      adaptiveDifficultyIndex = Math.max(adaptiveDifficultyIndex - 1, 0);
      addMistake(activeQuestion);
      if (currentSessionType !== "review") {
        scheduleReview(activeQuestion);
      }
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
    feedbackText.textContent = "Incorrect answer.";
  }

  feedbackText.classList.add(isCorrect ? "correct" : "incorrect");
  explanationText.textContent = activeQuestion.explanation;
  feedbackBox.classList.remove("hidden");

  if (!isCorrect && !retryUsed) {
    tryAgainButton.classList.remove("hidden");
  }

  const isLastQuestion = currentMode === "assessment"
    ? currentQuestionIndex === currentQuestionSet.length - 1
    : currentQuestionIndex === topicSessionLength - 1;

  nextButton.textContent = isLastQuestion
    ? (currentMode === "assessment" ? "View Report" : "Finish Level")
    : "Next Question";
  nextButton.classList.remove("hidden");
}

function handleTryAgain() {
  retryUsed = true;
  hasAnsweredCurrentQuestion = false;
  feedbackBox.classList.add("hidden");
  tryAgainButton.classList.add("hidden");
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
  if (currentMode === "topic" && currentQuestion && !usedQuestionIds.includes(currentQuestion.id)) {
    usedQuestionIds.push(currentQuestion.id);
  }

  const isLastQuestion = currentMode === "assessment"
    ? currentQuestionIndex === currentQuestionSet.length - 1
    : currentQuestionIndex === topicSessionLength - 1;

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
  const missesByArea = {};

  assessmentResults.forEach((result) => {
    if (!result.correct) {
      missesByArea[result.area] = (missesByArea[result.area] || 0) + 1;
    }
  });

  weakAreas = Object.entries(missesByArea)
    .sort((first, second) => second[1] - first[1])
    .map(([area]) => area);

  if (weakAreas.length === 0) {
    weakAreas = ["No major weak areas detected"];
  }

  recommendedTopicIds = quizTopics
    .filter((topic) => weakAreas.includes(normalizeAreaName(topic.name)))
    .map((topic) => topic.id);

  if (recommendedTopicIds.length === 0) {
    recommendedTopicIds = quizTopics.slice(0, 2).map((topic) => topic.id);
  }

  reportScore.textContent = `Overall score: ${correctCount}/${questionCount} (${scorePercent}%)`;
  weakAreasText.textContent = weakAreas.join(", ");
  focusText.textContent = weakAreas[0] === "No major weak areas detected"
    ? "Focus on: Keep practicing across all topics"
    : `Focus on: ${weakAreas.slice(0, 2).join(" and ")}`;

  buildStudyPlan();
  saveCurrentUserProgress();
  showScreen("report");
}

function showStudyPlan() {
  buildStudyPlan();
  showScreen("studyPlan");
}

function showCompleteScreen() {
  const completedTopicId = currentSessionType === "review" ? getWeakestTopicId() : currentTopic?.id;
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
      questions: (topic.questions || []).map((question, questionIndex) => ({
        ...question,
        id: question.id || buildQuestionId(getTopicId(topic, index), questionIndex),
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
  const topicId = getWeakestTopicId();
  if (topicId) {
    startTopic(topicId);
  }
});
reviewMistakesButton.addEventListener("click", startReviewMistakes);
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
