const screens = {
  login: document.getElementById("login-screen"),
  testSelection: document.getElementById("test-selection-screen"),
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
const placementTrackButton = document.getElementById("placement-track-button");
const actTrackButton = document.getElementById("act-track-button");
const chooseTestButton = document.getElementById("choose-test-button");
const currentTrackText = document.getElementById("current-track-text");
const startAssessmentButton = document.getElementById("start-assessment-button");
const viewStudyPlanButton = document.getElementById("view-study-plan-button");
const recommendedTopicList = document.getElementById("recommended-topic-list");
const allTopicList = document.getElementById("all-topic-list");
const studyPlanHeading = document.getElementById("study-plan-heading");
const studyPlanDescription = document.getElementById("study-plan-description");
const studyPlanFocus = document.getElementById("study-plan-focus");
const retakeAssessmentButton = document.getElementById("retake-assessment-button");
const reviewMistakesList = document.getElementById("review-mistakes-list");
const reviewMistakesEmpty = document.getElementById("review-mistakes-empty");
const reviewMistakesHeading = document.getElementById("review-mistakes-heading");
const reviewMistakesDescription = document.getElementById("review-mistakes-description");
const reviewMistakesBackButton = document.getElementById("review-mistakes-back-button");
const reportHeading = document.getElementById("report-heading");
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
const assessmentNoticeText = document.getElementById("assessment-notice-text");
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
const completeHeading = document.getElementById("complete-heading");
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
const placementAssessmentTopicOrder = [
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
const actAssessmentTopicOrder = [
  { label: "Number Sense, Fractions, and Percents", sourceTopicId: "real_numbers" },
  { label: "Ratios, Proportions, and Unit Rates", sourceTopicId: "ratios_proportions" },
  { label: "Algebraic Expressions and Exponents", sourceTopicId: "expressions_exponents" },
  { label: "Linear Equations", sourceTopicId: "linear_equations" },
  { label: "Linear Inequalities and Absolute Value", sourceTopicId: "inequalities_abs" },
  { label: "Systems of Equations and Modeling", sourceTopicId: "systems" },
  { label: "Functions and Graphs", sourceTopicId: "functions_graphs" },
  { label: "Polynomials and Factoring", sourceTopicId: "polynomials_factoring" },
  { label: "Quadratic Functions and Equations", sourceTopicId: "quadratics" },
  { label: "Rational Expressions and Equations", sourceTopicId: "rational_expr" },
  { label: "Radicals and Rational Exponents", sourceTopicId: "radicals" },
  { label: "Exponential and Logarithmic Functions", sourceTopicId: "exp_logs" },
  { label: "Geometry and Coordinate Geometry", sourceTopicId: "geometry" },
  { label: "Trigonometry", sourceTopicId: "trigonometry" },
  { label: "Statistics, Probability, and Data", sourceTopicId: "prob_stats" }
];
const correctMessages = ["Nice work 🔥", "Strong start ✨", "You've got this 💪"];
const incorrectMessages = ["Keep going 💪", "Take another look 👀", "One more try"];

const trackConfigs = {
  placement: {
    key: "placement",
    label: "Math Placement (ALEKS / ACCUPLACER)",
    shortLabel: "Math Placement",
    assessmentTitle: "Diagnostic Assessment",
    welcomeTitle: "Start with a short diagnostic assessment",
    welcomeDescription: "Answer a few mixed math questions, see your recommended focus areas, and get a study plan before you practice.",
    studyPlanHeading: "Your Study Plan",
    studyPlanDescription: "Recommended topics are shown first based on your assessment. You can still study any topic.",
    reportHeading: "Assessment Report",
    reviewHeading: "Review Mistakes",
    reviewDescription: "Review the questions you missed, see the correct answer, and study each explanation in one place.",
    completeHeading: "Level Complete",
    assessmentTopicOrder: placementAssessmentTopicOrder,
    defaultStudyGuides: typeof STUDY_GUIDES === "object" ? STUDY_GUIDES : {}
  },
  act: {
    key: "act",
    label: "ACT Math",
    shortLabel: "ACT Math",
    assessmentTitle: "ACT Assessment",
    welcomeTitle: "Start with a short ACT Math assessment",
    welcomeDescription: "Answer 15 ACT-style questions, see your recommended focus areas, and jump into an ACT-specific study plan.",
    studyPlanHeading: "Your ACT Study Plan",
    studyPlanDescription: "Recommended ACT topics are shown first based on your ACT assessment. Each topic includes an ACT lesson and practice questions.",
    reportHeading: "ACT Assessment Report",
    reviewHeading: "Review ACT Mistakes",
    reviewDescription: "Review the ACT questions you missed, see the correct answer, and study each explanation in one place.",
    completeHeading: "ACT Practice Complete",
    assessmentTopicOrder: actAssessmentTopicOrder,
    defaultStudyGuides: {}
  }
};

let trackCatalog = {};
let activeTrackKey = null;
let quizTopics = [];
let studyGuides = {};
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
let assessmentAttempts = 0;
let currentAssessmentLevel = 1;

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

function getDefaultTrackProgress() {
  return {
    totalXp: 0,
    topicPerformance: {},
    mistakesByTopic: {},
    recommendedTopicIds: [],
    lastAssessmentPerfect: false,
    assessmentAttempts: 0
  };
}

function migrateProfile(profile) {
  const nextProfile = { ...profile };

  if (!nextProfile.tracks) {
    nextProfile.tracks = {
      placement: nextProfile.progress || getDefaultTrackProgress(),
      act: getDefaultTrackProgress()
    };
  }

  if (!nextProfile.tracks.placement) {
    nextProfile.tracks.placement = nextProfile.progress || getDefaultTrackProgress();
  }

  if (!nextProfile.tracks.act) {
    nextProfile.tracks.act = getDefaultTrackProgress();
  }

  delete nextProfile.progress;
  return nextProfile;
}

function getDefaultProfile(password) {
  return {
    password,
    tracks: {
      placement: getDefaultTrackProgress(),
      act: getDefaultTrackProgress()
    }
  };
}

function getActiveTrack() {
  return activeTrackKey ? trackCatalog[activeTrackKey] || null : null;
}

function getTrackProgress(profile, trackKey) {
  const migratedProfile = migrateProfile(profile);
  return migratedProfile.tracks[trackKey] || getDefaultTrackProgress();
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

  const activeTrack = getActiveTrack();
  currentTrackText.classList.toggle("hidden", !activeTrack);
  currentTrackText.textContent = activeTrack ? `Track: ${activeTrack.shortLabel}` : "";
  chooseTestButton.classList.toggle("hidden", !(currentUser || isGuestMode) || !activeTrack);
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
    .replace(/\^\(([-+]?\d+)\)/g, (_, exponent) => exponent.split("").map((character) => superscriptMap[character] || character).join(""))
    .replace(/\^([+-]?\d+)/g, (_, exponent) => exponent.split("").map((character) => superscriptMap[character] || character).join(""));
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

function normalizeDifficultyLevel(value) {
  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue)) {
    return null;
  }

  return Math.min(5, Math.max(1, parsedValue));
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

function inferDifficultyLevel(question, topicName) {
  const explicitDifficultyLevel = normalizeDifficultyLevel(question.difficulty);

  if (explicitDifficultyLevel !== null) {
    return explicitDifficultyLevel;
  }

  const mappedDifficulty = inferDifficulty(question, topicName);

  if (mappedDifficulty === "easy") {
    return 1;
  }

  if (mappedDifficulty === "hard") {
    return 5;
  }

  return 3;
}

function buildQuestionId(topicId, index) {
  return `${topicId}-question-${index + 1}`;
}

function getDifficultyLabel(difficulty) {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

function getAssessmentLevelFromAttempts(attempts = assessmentAttempts) {
  return Math.min(Math.max((attempts || 0) + 1, 1), 5);
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

function getTrackOrderValue(config) {
  return config.sourceTopicId || config.sourceTopicName || config.label;
}

function getTopicOrderMap() {
  const activeTrack = getActiveTrack();

  if (!activeTrack) {
    return {};
  }

  return activeTrack.assessmentTopicOrder.reduce((order, topicConfig, index) => {
    const orderKey = getTrackOrderValue(topicConfig);

    if (!(orderKey in order)) {
      order[orderKey] = index;
    }

    return order;
  }, {});
}

function getTopicSortRank(topic) {
  const orderMap = getTopicOrderMap();

  if (topic?.id in orderMap) {
    return orderMap[topic.id];
  }

  if (topic?.name in orderMap) {
    return orderMap[topic.name];
  }

  return (getActiveTrack()?.assessmentTopicOrder.length || 0) + (topic?.sourceIndex || 0);
}

function getOrderedTopics(topics = quizTopics) {
  return topics.slice().sort((firstTopic, secondTopic) => getTopicSortRank(firstTopic) - getTopicSortRank(secondTopic));
}

function getUniqueTopicIds(items) {
  return items.filter((item, index, list) => item && list.indexOf(item) === index);
}

function getTopicByConfig(config) {
  if (config.sourceTopicId) {
    return quizTopics.find((topic) => topic.id === config.sourceTopicId) || null;
  }

  if (config.sourceTopicName) {
    return quizTopics.find((topic) => topic.name === config.sourceTopicName) || null;
  }

  return null;
}

function buildAssessmentQuestion(config, usedQuestionIds = new Set()) {
  const topic = getTopicByConfig(config);

  if (!topic) {
    return null;
  }

  const orderedQuestions = getOrderedQuestions(topic.questions).filter((question) => !usedQuestionIds.has(question.id));
  const matchedQuestions = typeof config.questionMatcher === "function"
    ? orderedQuestions.filter((question) => config.questionMatcher(question))
    : orderedQuestions;

  if (matchedQuestions.length === 0) {
    return null;
  }

  const availableLevels = matchedQuestions
    .map((question) => question.difficultyLevel)
    .filter((level, index, levels) => level !== null && levels.indexOf(level) === index)
    .sort((firstLevel, secondLevel) => firstLevel - secondLevel);
  const closestLevel = availableLevels.reduce((bestLevel, level) => {
    if (bestLevel === null) {
      return level;
    }

    const bestDifference = Math.abs(bestLevel - currentAssessmentLevel);
    const levelDifference = Math.abs(level - currentAssessmentLevel);

    if (levelDifference !== bestDifference) {
      return levelDifference < bestDifference ? level : bestLevel;
    }

    return level < bestLevel ? level : bestLevel;
  }, null);
  const levelMatchedQuestions = matchedQuestions.filter((question) => question.difficultyLevel === closestLevel);
  const selectedQuestion = levelMatchedQuestions[0] || matchedQuestions[0];

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

function buildDiagnosticQuestions() {
  const activeTrack = getActiveTrack();
  const usedQuestionIds = new Set();

  if (!activeTrack) {
    return [];
  }

  return activeTrack.assessmentTopicOrder
    .map((config) => {
      const question = buildAssessmentQuestion(config, usedQuestionIds);

      if (question) {
        usedQuestionIds.add(question.id);
      }

      return question;
    })
    .filter(Boolean);
}

function resetTransientState() {
  diagnosticQuestions = getActiveTrack() ? buildDiagnosticQuestions() : [];
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
  if (isGuestMode || !currentUser || !activeTrackKey) {
    return;
  }

  const users = getStoredUsers();
  const profile = users[currentUser];

  if (!profile) {
    return;
  }

  const nextProfile = migrateProfile(profile);
  nextProfile.tracks[activeTrackKey] = {
    totalXp,
    topicPerformance,
    mistakesByTopic,
    recommendedTopicIds,
    lastAssessmentPerfect,
    assessmentAttempts
  };

  users[currentUser] = nextProfile;
  saveStoredUsers(users);
}

function loadSavedProgress(progress = {}) {
  totalXp = progress.totalXp || 0;
  topicPerformance = progress.topicPerformance || {};
  mistakesByTopic = normalizeMistakesByTopic(progress.mistakesByTopic);
  recommendedTopicIds = progress.recommendedTopicIds || [];
  lastAssessmentPerfect = Boolean(progress.lastAssessmentPerfect);
  assessmentAttempts = progress.assessmentAttempts || 0;
  currentAssessmentLevel = getAssessmentLevelFromAttempts(assessmentAttempts);
  updateGlobalLevelDisplay();
}

function loadTrackState(trackKey, progress = getDefaultTrackProgress()) {
  const track = trackCatalog[trackKey];

  activeTrackKey = trackKey;
  quizTopics = track?.topics || [];
  studyGuides = track?.studyGuides || {};
  loadSavedProgress(progress);
  resetTransientState();
  updateTrackContent();
}

function getProgressForCurrentUser(trackKey) {
  if (isGuestMode || !currentUser) {
    return getDefaultTrackProgress();
  }

  const users = getStoredUsers();
  const savedProfile = users[currentUser];

  if (!savedProfile) {
    return getDefaultTrackProgress();
  }

  const migratedProfile = migrateProfile(savedProfile);
  users[currentUser] = migratedProfile;
  saveStoredUsers(users);
  return getTrackProgress(migratedProfile, trackKey);
}

function openTestSelection() {
  saveCurrentUserProgress();
  activeTrackKey = null;
  quizTopics = [];
  studyGuides = {};
  resetTransientState();
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  assessmentAttempts = 0;
  currentAssessmentLevel = 1;
  updateGlobalLevelDisplay();
  showScreen("testSelection");
}

function enterTrack(trackKey) {
  const progress = getProgressForCurrentUser(trackKey);
  loadTrackState(trackKey, progress);
  buildStudyPlan();
  updateHeaderIdentity();
  showScreen(recommendedTopicIds.length > 0 || assessmentAttempts > 0 ? "studyPlan" : "welcome");
}

function loginAsSavedUser(username, profile) {
  currentUser = username;
  isGuestMode = false;
  const users = getStoredUsers();
  users[username] = migrateProfile(profile);
  saveStoredUsers(users);
  localStorage.setItem(CURRENT_USER_STORAGE_KEY, username);
  activeTrackKey = null;
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  assessmentAttempts = 0;
  currentAssessmentLevel = 1;
  resetTransientState();
  updateTrackContent();
  updateGlobalLevelDisplay();
  showScreen("testSelection");
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
  activeTrackKey = null;
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  assessmentAttempts = 0;
  currentAssessmentLevel = 1;
  resetTransientState();
  updateTrackContent();
  updateGlobalLevelDisplay();
  showScreen("testSelection");
  showLoginMessage("Guest mode is active. Progress will not be saved.");
}

function handleLogout() {
  saveCurrentUserProgress();
  currentUser = null;
  isGuestMode = false;
  activeTrackKey = null;
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  assessmentAttempts = 0;
  currentAssessmentLevel = 1;
  resetTransientState();
  updateTrackContent();
  updateGlobalLevelDisplay();
  clearLoginMessage();
  usernameInput.value = "";
  passwordInput.value = "";
  showScreen("login");
}

function updateTrackContent() {
  const activeTrack = getActiveTrack();
  const shortLabel = activeTrack?.shortLabel || "Math Prep";

  document.title = activeTrack ? `${activeTrack.label} Prep` : "Weber State Math Prep";
  startAssessmentButton.textContent = activeTrack?.key === "act" ? "Start ACT Assessment" : "Start Assessment";
  reportHeading.textContent = activeTrack?.reportHeading || "Assessment Report";
  studyPlanHeading.textContent = activeTrack?.studyPlanHeading || "Your Study Plan";
  studyPlanDescription.textContent = activeTrack?.studyPlanDescription || "Recommended topics are shown first based on your assessment. You can still study any topic.";
  reviewMistakesHeading.textContent = activeTrack?.reviewHeading || "Review Mistakes";
  reviewMistakesDescription.textContent = activeTrack?.reviewDescription || "Review the questions you missed, see the correct answer, and study each explanation in one place.";
  completeHeading.textContent = activeTrack?.completeHeading || "Level Complete";
  topicTitle.textContent = currentMode === "assessment" && activeTrack ? activeTrack.assessmentTitle : topicTitle.textContent;

  const welcomeBadge = document.getElementById("welcome-track-badge");
  const welcomeTitle = document.getElementById("welcome-title");
  const welcomeDescription = document.getElementById("welcome-description");

  if (welcomeBadge) {
    welcomeBadge.textContent = activeTrack ? activeTrack.shortLabel : "Guided Learning Path";
  }

  if (welcomeTitle) {
    welcomeTitle.textContent = activeTrack?.welcomeTitle || "Start with a short diagnostic assessment";
  }

  if (welcomeDescription) {
    welcomeDescription.textContent = activeTrack?.welcomeDescription || "Answer a few mixed math questions, see your recommended focus areas, and get a study plan before you practice.";
  }

  viewStudyPlanButton.textContent = activeTrack?.key === "act" ? "View ACT Study Plan" : "View Study Plan";
  retakeAssessmentButton.textContent = activeTrack?.key === "act" ? "Retake ACT Assessment" : "Retake Assessment";
  reviewMistakesBackButton.textContent = activeTrack ? `Back to ${shortLabel} Study Plan` : "Back to Study Plan";
  topicsButton.textContent = activeTrack ? `Back to ${shortLabel} Study Plan` : "Back to Study Plan";
  updateHeaderIdentity();
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

function buildPracticeCard(topic, isRecommended) {
  const card = document.createElement("article");
  card.className = "study-card practice-card";

  if (isRecommended) {
    card.classList.add("recommended");
  }

  const label = document.createElement("p");
  label.className = "study-card-label";
  label.textContent = "Practice";
  card.appendChild(label);

  const title = document.createElement("h4");
  title.className = "study-card-title";
  title.textContent = topic.name;
  card.appendChild(title);

  const meta = document.createElement("p");
  meta.className = "study-card-text";
  meta.textContent = `${topic.questions.length} questions ready for practice`;
  card.appendChild(meta);

  const button = document.createElement("button");
  button.className = "topic-button practice-button";
  button.type = "button";
  button.innerHTML = `
    <span>Start Practice</span>
    <span class="topic-meta">Mastery ${getTopicMastery(topic.id)}%</span>
  `;
  button.addEventListener("click", () => startTopic(topic.id));
  card.appendChild(button);

  return card;
}

function buildStudyGuideCard(topic) {
  const guide = studyGuides[topic.id] || studyGuides[topic.name];
  const card = document.createElement("article");
  card.className = "study-card";

  const label = document.createElement("p");
  label.className = "study-card-label";
  label.textContent = "Study Guide";
  card.appendChild(label);

  const title = document.createElement("h4");
  title.className = "study-card-title";
  title.textContent = topic.name;
  card.appendChild(title);

  if (guide?.lesson) {
    const lesson = document.createElement("p");
    lesson.className = "study-card-text";
    lesson.textContent = guide.lesson;
    card.appendChild(lesson);
  }

  const summaryItems = guide?.summary || guide?.keySkills || [];
  const summaryList = document.createElement("ul");
  summaryList.className = "study-guide-summary";

  (summaryItems.length > 0 ? summaryItems : ["Review the core ideas, work a few examples, and then try practice questions."]).forEach((item) => {
    const bullet = document.createElement("li");
    bullet.textContent = item;
    summaryList.appendChild(bullet);
  });

  card.appendChild(summaryList);

  const videosHeading = document.createElement("p");
  videosHeading.className = "study-card-subtitle";
  videosHeading.textContent = "Watch Videos";
  card.appendChild(videosHeading);

  const videoList = document.createElement("div");
  videoList.className = "study-guide-links";

  (guide?.videos || []).slice(0, 3).forEach((video) => {
    const link = document.createElement("a");
    link.className = "study-guide-link";
    link.href = video.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = video.title;
    videoList.appendChild(link);
  });

  card.appendChild(videoList);
  return card;
}

function buildStudyPlanRow(topic, isRecommended) {
  const row = document.createElement("div");
  row.className = "study-plan-row";

  if (isRecommended) {
    row.classList.add("recommended-row");
  }

  row.appendChild(buildStudyGuideCard(topic));
  row.appendChild(buildPracticeCard(topic, isRecommended));
  return row;
}

function buildStudyPlan() {
  if (!getActiveTrack()) {
    recommendedTopicList.innerHTML = "";
    allTopicList.innerHTML = "";
    return;
  }

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

  recommendedTopics.forEach((topic) => {
    recommendedTopicList.appendChild(buildStudyPlanRow(topic, true));
  });

  orderedTopics.forEach((topic) => {
    allTopicList.appendChild(buildStudyPlanRow(topic, false));
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
  if (!getActiveTrack()) {
    return;
  }

  currentMode = "assessment";
  currentSessionType = "assessment";
  currentTopic = null;
  currentAssessmentLevel = getAssessmentLevelFromAttempts();
  diagnosticQuestions = buildDiagnosticQuestions();
  currentQuestionSet = diagnosticQuestions;
  currentQuestionIndex = 0;
  assessmentResults = [];
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
  const activeTrack = getActiveTrack();
  const question = currentQuestionSet[currentQuestionIndex];

  if (!question) {
    showCompleteScreen();
    return;
  }

  currentQuestion = question;
  topicTitle.textContent = isAssessment ? activeTrack?.assessmentTitle || "Diagnostic Assessment" : currentTopic.name;
  quizModeText.textContent = isAssessment
    ? "Answer these mixed questions to build your study plan."
    : currentSessionType === "review"
      ? "Revisit missed questions and lock in the right steps."
      : "Work through the topic and build your score.";
  assessmentNoticeText.textContent = isAssessment && currentAssessmentLevel > 1
    ? "You are taking a more advanced assessment."
    : "";
  assessmentNoticeText.classList.toggle("hidden", !(isAssessment && currentAssessmentLevel > 1));
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestionSet.length}`;
  difficultyText.textContent = isAssessment
    ? `Assessment level: ${question.difficultyLevel || currentAssessmentLevel} of 5`
    : `Difficulty: ${getDifficultyLabel(question.difficulty || "medium")}`;
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

  const isLastQuestion = currentQuestionIndex === currentQuestionSet.length - 1;

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
  const isLastQuestion = currentQuestionIndex === currentQuestionSet.length - 1;

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
  assessmentAttempts += 1;
  currentAssessmentLevel = getAssessmentLevelFromAttempts();

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
  const activeTrack = getActiveTrack();

  completeMessage.textContent = currentSessionType === "review"
    ? `You finished ${activeTrack?.shortLabel || "Review Mistakes"}. Head back to the study plan or jump into your next recommended topic.`
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
    if (recommendedTopicIds.length > 0 || assessmentAttempts > 0) {
      showStudyPlan();
    } else {
      showScreen("welcome");
    }
    return;
  }

  showStudyPlan();
}

function normalizeTopics(data) {
  return (data.topics || []).map((topic, index) => ({
    ...topic,
    id: getTopicId(topic, index),
    sourceIndex: index,
    questions: (topic.questions || []).map((question, questionIndex) => ({
      ...question,
      id: question.id || buildQuestionId(getTopicId(topic, index), questionIndex),
      sourceIndex: questionIndex,
      difficulty: inferDifficulty(question, topic.name),
      difficultyLevel: inferDifficultyLevel(question, topic.name)
    }))
  }));
}

function normalizeActStudyGuides(data) {
  return (data.topics || []).reduce((guides, topic) => {
    guides[topic.topicId] = topic;
    return guides;
  }, {});
}

async function loadTrackCatalog() {
  const [placementResponse, actResponse, actGuidesResponse] = await Promise.all([
    fetch("apps/aleks.json"),
    fetch("apps/act_math_bank_actlike_v2_app.json"),
    fetch("apps/act_math_study_guides_actlike_v2.json")
  ]);

  if (!placementResponse.ok || !actResponse.ok || !actGuidesResponse.ok) {
    throw new Error("Quiz files could not be loaded.");
  }

  const [placementData, actData, actGuidesData] = await Promise.all([
    placementResponse.json(),
    actResponse.json(),
    actGuidesResponse.json()
  ]);

  trackCatalog = {
    placement: {
      ...trackConfigs.placement,
      title: placementData.title || trackConfigs.placement.label,
      topics: normalizeTopics(placementData),
      studyGuides: trackConfigs.placement.defaultStudyGuides
    },
    act: {
      ...trackConfigs.act,
      title: actData.title || trackConfigs.act.label,
      topics: normalizeTopics(actData),
      studyGuides: normalizeActStudyGuides(actGuidesData)
    }
  };
}

async function initializeApp() {
  try {
    await loadTrackCatalog();
    resetTransientState();
    updateTrackContent();

    const savedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    const users = getStoredUsers();

    if (savedUser && users[savedUser]) {
      loginAsSavedUser(savedUser, users[savedUser]);
    } else {
      updateGlobalLevelDisplay();
      showScreen("login");
    }
  } catch (error) {
    topicError.textContent = "Could not load the quiz content. Make sure the JSON files are available.";
    topicError.classList.remove("hidden");
  }
}

loginForm.addEventListener("submit", handleLogin);
guestButton.addEventListener("click", handleGuestMode);
placementTrackButton.addEventListener("click", () => enterTrack("placement"));
actTrackButton.addEventListener("click", () => enterTrack("act"));
chooseTestButton.addEventListener("click", openTestSelection);
startAssessmentButton.addEventListener("click", startAssessment);
viewStudyPlanButton.addEventListener("click", showStudyPlan);
recommendedNextButton.addEventListener("click", () => {
  const topicId = getRecommendedNextTopicId();

  if (topicId) {
    startTopic(topicId);
  }
});
reviewMistakesButton.addEventListener("click", startReviewMistakes);
retakeAssessmentButton.addEventListener("click", startAssessment);
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

initializeApp();
