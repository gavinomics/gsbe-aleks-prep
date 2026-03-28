const firebaseAuthModulePromise = import("https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js");
const firebaseFirestoreModulePromise = import("https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js");

async function waitForFirebaseAuth() {
  let attempts = 0;
  while (!window.firebaseAuth && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }
  return window.firebaseAuth;
}

async function waitForFirebaseDB() {
  let attempts = 0;
  while (!window.firebaseDB && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }
  return window.firebaseDB;
}

let resolveInitialAuthState;
const initialAuthStatePromise = new Promise((resolve) => {
  resolveInitialAuthState = resolve;
});

const screens = {
  login: document.getElementById("login-screen"),
  testSelection: document.getElementById("test-selection-screen"),
  aspireSelection: document.getElementById("aspire-selection-screen"),
  welcome: document.getElementById("welcome-screen"),
  challenge: document.getElementById("challenge-screen"),
  report: document.getElementById("report-screen"),
  studyPlan: document.getElementById("study-plan-screen"),
  reviewMistakes: document.getElementById("review-mistakes-screen"),
  quiz: document.getElementById("quiz-screen"),
  complete: document.getElementById("complete-screen")
};

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");
const guestButton = document.getElementById("guest-button");
const loginMessage = document.getElementById("login-message");
const heroStats = document.getElementById("hero-stats");
const appNav = document.getElementById("app-nav");
const saveStatusText = document.getElementById("save-status-text");
const appStepper = document.getElementById("app-stepper");
const stepperButtons = Array.from(appStepper.querySelectorAll("[data-step-button]"));
const appLiveRegion = document.getElementById("app-live-region");
const placementTrackButton = document.getElementById("placement-track-button");
const actTrackButton = document.getElementById("act-track-button");
const aspireTrackButton = document.getElementById("aspire-track-button");
const aspireGrade9Button = document.getElementById("aspire-grade9-button");
const aspireGrade10Button = document.getElementById("aspire-grade10-button");
const aspireSelectionBackButton = document.getElementById("aspire-selection-back-button");
const currentTrackText = document.getElementById("current-track-text");
const startAssessmentButton = document.getElementById("start-assessment-button");
const startChallengeButton = document.getElementById("start-challenge-button");
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

const LEGACY_USERS_STORAGE_KEY = "codexapps_users";
const LEGACY_CURRENT_USER_STORAGE_KEY = "codexapps_current_user";
const APP_TITLE = "CEC Math Prep";
const APP_TITLE_SUFFIX = "Math Preparation for the Goddard School of Business & Economics";
const difficultyOrder = ["easy", "medium", "hard"];
const KNOWN_VIDEO_CHANNELS = [
  "Khan Academy",
  "Math Antics",
  "The Organic Chemistry Tutor",
  "PatrickJMT",
  "Algebra Basics"
];
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
const aspireGrade9AssessmentTopicOrder = [
  { label: "Numbers, Rates, and Percents", sourceTopicId: "numbers_rates_percents" },
  { label: "Expressions and Exponents", sourceTopicId: "expressions_exponents" },
  { label: "Linear Equations", sourceTopicId: "linear_equations" },
  { label: "Linear Inequalities and Absolute Value", sourceTopicId: "inequalities_absolute_value" },
  { label: "Systems of Equations and Modeling", sourceTopicId: "systems_modeling" },
  { label: "Functions and Linear Graphs", sourceTopicId: "functions_linear_graphs" },
  { label: "Exponential Relationships", sourceTopicId: "exponential_relationships" },
  { label: "Transformations and Congruence", sourceTopicId: "transformations_congruence" },
  { label: "Geometry and Coordinate Geometry", sourceTopicId: "geometry_coordinate" },
  { label: "Statistics, Probability, and Data", sourceTopicId: "statistics_probability_data" }
];
const aspireGrade10AssessmentTopicOrder = [
  { label: "Radicals, Rational Exponents, and Number Systems", sourceTopicId: "radicals_number_systems" },
  { label: "Polynomials and Factoring", sourceTopicId: "polynomials_factoring" },
  { label: "Quadratic Functions and Equations", sourceTopicId: "quadratic_functions_equations" },
  { label: "Functions and Transformations", sourceTopicId: "functions_transformations" },
  { label: "Exponential Functions and Modeling", sourceTopicId: "exponential_functions_modeling" },
  { label: "Similarity and Right Triangle Trigonometry", sourceTopicId: "similarity_trigonometry" },
  { label: "Circles and Coordinate Geometry", sourceTopicId: "circles_coordinate_geometry" },
  { label: "Probability and Conditional Probability", sourceTopicId: "probability_conditional" },
  { label: "Systems and Modeling", sourceTopicId: "systems_modeling" },
  { label: "Geometry Modeling and Measurement", sourceTopicId: "geometry_modeling_measurement" }
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
  },
  aspireGrade9: {
    key: "aspireGrade9",
    label: "Utah Aspire Plus Math",
    shortLabel: "Aspire Grade 9",
    assessmentTitle: "Utah Aspire Plus Grade 9 Assessment",
    welcomeTitle: "Start with a short Utah Aspire Plus Grade 9 assessment",
    welcomeDescription: "Answer 10 Grade 9 / Secondary Math I questions, see your recommended focus areas, and jump into a grade-specific study plan.",
    studyPlanHeading: "Your Utah Aspire Plus Grade 9 Study Plan",
    studyPlanDescription: "Recommended Grade 9 topics are shown first based on your assessment. Each topic keeps the matching study guide and practice together.",
    reportHeading: "Utah Aspire Plus Grade 9 Report",
    reviewHeading: "Review Grade 9 Mistakes",
    reviewDescription: "Review the Grade 9 questions you missed, see the correct answer, and study each explanation in one place.",
    completeHeading: "Grade 9 Practice Complete",
    assessmentTopicOrder: aspireGrade9AssessmentTopicOrder,
    defaultStudyGuides: {}
  },
  aspireGrade10: {
    key: "aspireGrade10",
    label: "Utah Aspire Plus Math",
    shortLabel: "Aspire Grade 10",
    assessmentTitle: "Utah Aspire Plus Grade 10 Assessment",
    welcomeTitle: "Start with a short Utah Aspire Plus Grade 10 assessment",
    welcomeDescription: "Answer 10 Grade 10 / Secondary Math II questions, see your recommended focus areas, and jump into a grade-specific study plan.",
    studyPlanHeading: "Your Utah Aspire Plus Grade 10 Study Plan",
    studyPlanDescription: "Recommended Grade 10 topics are shown first based on your assessment. Each topic keeps the matching study guide and practice together.",
    reportHeading: "Utah Aspire Plus Grade 10 Report",
    reviewHeading: "Review Grade 10 Mistakes",
    reviewDescription: "Review the Grade 10 questions you missed, see the correct answer, and study each explanation in one place.",
    completeHeading: "Grade 10 Practice Complete",
    assessmentTopicOrder: aspireGrade10AssessmentTopicOrder,
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
let lastTestMode = "assessment";
let currentUser = null;
let currentUserUid = null;
let currentUserProfile = null;
let isGuestMode = false;
let assessmentAttempts = 0;
let currentAssessmentLevel = 1;
let lastSaveMessage = "";
let isLoggingOut = false;
let isAuthRequestInFlight = false;
let authHydrationPromise = null;
let authHydrationUid = null;

function startPerfTimer(label, detail = "") {
  const startedAt = performance.now();
  console.log(`[perf] ${label} start @ ${startedAt.toFixed(1)}ms${detail ? ` ${detail}` : ""}`);
  return startedAt;
}

function endPerfTimer(label, startedAt, detail = "") {
  const duration = performance.now() - startedAt;
  console.log(`[perf] ${label} end +${duration.toFixed(1)}ms${detail ? ` ${detail}` : ""}`);
  return duration;
}

function logPerfPoint(label, detail = "") {
  console.log(`[perf] ${label} @ ${performance.now().toFixed(1)}ms${detail ? ` ${detail}` : ""}`);
}

function setLoginPending(isPending, pendingLabel = "Signing in...") {
  isAuthRequestInFlight = isPending;
  loginButton.disabled = isPending;
  emailInput.disabled = isPending;
  passwordInput.disabled = isPending;
  loginButton.textContent = isPending ? pendingLabel : "Login / Create Account";
}

function getLegacyUsers() {
  const rawUsers = localStorage.getItem(LEGACY_USERS_STORAGE_KEY);

  if (!rawUsers) {
    return {};
  }

  try {
    return JSON.parse(rawUsers);
  } catch (error) {
    return {};
  }
}

function saveLegacyUsers(users) {
  localStorage.setItem(LEGACY_USERS_STORAGE_KEY, JSON.stringify(users));
}

function scrubLegacyPasswordStorage() {
  localStorage.removeItem(LEGACY_CURRENT_USER_STORAGE_KEY);

  const legacyUsers = getLegacyUsers();
  let didChange = false;
  const sanitizedUsers = Object.entries(legacyUsers).reduce((result, [key, profile]) => {
    const sanitizedProfile = migrateProfile(profile);

    if (JSON.stringify(profile) !== JSON.stringify(sanitizedProfile)) {
      didChange = true;
    }

    result[key] = sanitizedProfile;
    return result;
  }, {});

  if (didChange) {
    saveLegacyUsers(sanitizedUsers);
  }
}

function getDefaultTrackProgress() {
  return {
    totalXp: 0,
    topicPerformance: {},
    mistakesByTopic: {},
    recommendedTopicIds: [],
    lastAssessmentPerfect: false,
    lastTestMode: "assessment",
    assessmentAttempts: 0
  };
}

function migrateProfile(profile) {
  if (!profile || typeof profile !== "object") {
    return {
      tracks: {
        placement: getDefaultTrackProgress(),
        act: getDefaultTrackProgress(),
        aspireGrade9: getDefaultTrackProgress(),
        aspireGrade10: getDefaultTrackProgress()
      }
    };
  }

  const nextProfile = { ...profile };

  if (!nextProfile.tracks) {
    nextProfile.tracks = {
      placement: nextProfile.progress || getDefaultTrackProgress(),
      act: getDefaultTrackProgress(),
      aspireGrade9: getDefaultTrackProgress(),
      aspireGrade10: getDefaultTrackProgress()
    };
  }

  if (!nextProfile.tracks.placement) {
    nextProfile.tracks.placement = nextProfile.progress || getDefaultTrackProgress();
  }

  if (!nextProfile.tracks.act) {
    nextProfile.tracks.act = getDefaultTrackProgress();
  }

  if (!nextProfile.tracks.aspireGrade9) {
    nextProfile.tracks.aspireGrade9 = getDefaultTrackProgress();
  }

  if (!nextProfile.tracks.aspireGrade10) {
    nextProfile.tracks.aspireGrade10 = getDefaultTrackProgress();
  }

  delete nextProfile.progress;
  delete nextProfile.password;
  return nextProfile;
}

function getActiveTrack() {
  return activeTrackKey ? trackCatalog[activeTrackKey] || null : null;
}

function getTrackProgress(profile, trackKey) {
  const migratedProfile = migrateProfile(profile);
  return migratedProfile.tracks[trackKey] || getDefaultTrackProgress();
}

function getDefaultUserProfile() {
  return {
    tracks: {
      placement: getDefaultTrackProgress(),
      act: getDefaultTrackProgress(),
      aspireGrade9: getDefaultTrackProgress(),
      aspireGrade10: getDefaultTrackProgress()
    }
  };
}

function sanitizeTrackProgress(progress = {}) {
  return {
    totalXp: progress.totalXp || 0,
    topicPerformance: progress.topicPerformance || {},
    mistakesByTopic: normalizeMistakesByTopic(progress.mistakesByTopic),
    recommendedTopicIds: Array.isArray(progress.recommendedTopicIds) ? progress.recommendedTopicIds : [],
    lastAssessmentPerfect: Boolean(progress.lastAssessmentPerfect),
    lastTestMode: progress.lastTestMode === "challenge" ? "challenge" : "assessment",
    assessmentAttempts: progress.assessmentAttempts || 0
  };
}

function getCurrentTrackProgressPayload() {
  return sanitizeTrackProgress({
    totalXp,
    topicPerformance,
    mistakesByTopic,
    recommendedTopicIds,
    lastAssessmentPerfect,
    lastTestMode,
    assessmentAttempts
  });
}

function cleanFirestoreValue(value) {
  if (value === undefined) {
    return null;
  }

  if (Array.isArray(value)) {
    return value.map((item) => cleanFirestoreValue(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, entryValue]) => entryValue !== undefined)
        .map(([key, entryValue]) => [key, cleanFirestoreValue(entryValue)])
    );
  }

  return value;
}

async function loadUserProfileFromFirestore(uid) {
  const timer = startPerfTimer("loadUserProfileFromFirestore", `uid=${uid}`);
  const db = await waitForFirebaseDB();
  const firestore = await firebaseFirestoreModulePromise;

  if (!db) {
    endPerfTimer("loadUserProfileFromFirestore", timer, "firebaseDB unavailable");
    return getDefaultUserProfile();
  }

  const userRef = firestore.doc(db, "users", uid);
  const tracksRef = firestore.collection(db, "users", uid, "tracks");
  const [userSnapshot, tracksSnapshot] = await Promise.all([
    firestore.getDoc(userRef),
    firestore.getDocs(tracksRef)
  ]);
  const profile = getDefaultUserProfile();
  const userData = userSnapshot.exists() ? userSnapshot.data() : {};

  tracksSnapshot.forEach((trackDoc) => {
    profile.tracks[trackDoc.id] = sanitizeTrackProgress(trackDoc.data());
  });

  if (userData.activeTrackKey) {
    profile.activeTrackKey = userData.activeTrackKey;
  }

  endPerfTimer("loadUserProfileFromFirestore", timer, `tracks=${tracksSnapshot.size}`);
  return profile;
}

async function persistUserProfileMetadata() {
  if (!currentUserUid || !currentUser) {
    return;
  }

  const db = await waitForFirebaseDB();
  const firestore = await firebaseFirestoreModulePromise;

  if (!db) {
    return;
  }

  await firestore.setDoc(
    firestore.doc(db, "users", currentUserUid),
    {
      email: currentUser,
      activeTrackKey: activeTrackKey || null,
      updatedAt: Date.now()
    },
    { merge: true }
  );
}

async function saveProgressToFirestore(trackKey, progress) {
  if (!currentUserUid || !currentUser || !trackKey) {
    return;
  }

  const db = await waitForFirebaseDB();
  const firestore = await firebaseFirestoreModulePromise;

  if (!db) {
    return;
  }

  const cleanData = Object.fromEntries(
    Object.entries(progress)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, cleanFirestoreValue(value)])
  );

  await Promise.all([
    firestore.setDoc(
      firestore.doc(db, "users", currentUserUid),
      {
        email: currentUser,
        activeTrackKey: activeTrackKey || null,
        updatedAt: Date.now()
      },
      { merge: true }
    ),
    firestore.setDoc(
      firestore.doc(db, "users", currentUserUid, "tracks", trackKey),
      cleanData,
      { merge: true }
    )
  ]);
}

async function migrateLegacyProgressIfNeeded(email, uid, existingProfile) {
  const timer = startPerfTimer("migrateLegacyProgressIfNeeded", `email=${email}`);
  const legacyUsers = getLegacyUsers();
  const legacyProfile = legacyUsers[email];

  if (!legacyProfile) {
    endPerfTimer("migrateLegacyProgressIfNeeded", timer, "no legacy profile");
    return existingProfile;
  }

  const db = await waitForFirebaseDB();
  const firestore = await firebaseFirestoreModulePromise;

  if (!db) {
    endPerfTimer("migrateLegacyProgressIfNeeded", timer, "firebaseDB unavailable");
    return existingProfile;
  }

  const migratedLegacyProfile = migrateProfile(legacyProfile);
  const nextProfile = migrateProfile(existingProfile || getDefaultUserProfile());
  const writes = [];

  Object.keys(nextProfile.tracks).forEach((trackKey) => {
    const currentProgress = sanitizeTrackProgress(nextProfile.tracks[trackKey]);
    const hasCloudProgress = currentProgress.totalXp > 0
      || currentProgress.recommendedTopicIds.length > 0
      || currentProgress.assessmentAttempts > 0
      || Object.keys(currentProgress.topicPerformance).length > 0
      || Object.keys(currentProgress.mistakesByTopic).length > 0;

    if (hasCloudProgress) {
      return;
    }

    const legacyProgress = sanitizeTrackProgress(getTrackProgress(migratedLegacyProfile, trackKey));
    const hasLegacyProgress = legacyProgress.totalXp > 0
      || legacyProgress.recommendedTopicIds.length > 0
      || legacyProgress.assessmentAttempts > 0
      || Object.keys(legacyProgress.topicPerformance).length > 0
      || Object.keys(legacyProgress.mistakesByTopic).length > 0;

    if (!hasLegacyProgress) {
      return;
    }

    nextProfile.tracks[trackKey] = legacyProgress;
    writes.push(
      firestore.setDoc(
        firestore.doc(db, "users", uid, "tracks", trackKey),
        legacyProgress,
        { merge: true }
      )
    );
  });

  writes.push(
    firestore.setDoc(
      firestore.doc(db, "users", uid),
      {
        email,
        activeTrackKey: existingProfile?.activeTrackKey || migratedLegacyProfile.activeTrackKey || null,
        updatedAt: Date.now(),
        legacyMigratedAt: Date.now()
      },
      { merge: true }
    )
  );

  await Promise.all(writes);
  delete legacyUsers[email];
  saveLegacyUsers(legacyUsers);
  endPerfTimer("migrateLegacyProgressIfNeeded", timer, `writes=${writes.length}`);
  return nextProfile;
}

function announceStatus(message, options = {}) {
  if (!message) {
    return;
  }

  const { visible = false } = options;

  appLiveRegion.textContent = "";
  requestAnimationFrame(() => {
    appLiveRegion.textContent = message;
  });

  if (visible) {
    saveStatusText.textContent = message;
    saveStatusText.classList.remove("hidden");
  }
}

function getCurrentScreenName() {
  return Object.entries(screens).find(([, screen]) => !screen.hidden)?.[0] || "login";
}

function isTestMode(mode = currentMode) {
  return mode === "assessment" || mode === "challenge";
}

function getModeDisplayName(mode = currentMode) {
  return mode === "challenge" ? "Challenge Test" : "Assessment";
}

function getTestIntroScreen(mode = currentMode) {
  return mode === "challenge" ? "challenge" : "welcome";
}

function hasCompletedAnyTest() {
  return assessmentAttempts > 0 || lastAssessmentPerfect || recommendedTopicIds.length > 0;
}

function getScreenHeading(screen) {
  return screen?.querySelector("h2, h1, h3") || null;
}

function getScreenTitle(screenName) {
  const titles = {
    login: "Login",
    testSelection: "Choose Test",
    aspireSelection: "Choose Aspire Test",
    welcome: "Assessment",
    challenge: "Challenge Test",
    report: "Assessment",
    studyPlan: "Study Plan",
    reviewMistakes: "Study Plan",
    quiz: isTestMode() ? getModeDisplayName() : "Study Plan",
    complete: "Study Plan"
  };

  const screenTitle = titles[screenName];

  if (!screenTitle) {
    return `${APP_TITLE} | ${APP_TITLE_SUFFIX}`;
  }

  return `${screenTitle} | ${APP_TITLE} | ${APP_TITLE_SUFFIX}`;
}

function getStepperStep(screenName) {
  if (screenName === "testSelection") {
    return "choose";
  }

  if (screenName === "aspireSelection") {
    return "choose";
  }

  if (["welcome", "report"].includes(screenName)) {
    return "assessment";
  }

  if (screenName === "challenge") {
    return "challenge";
  }

  if (screenName === "quiz") {
    if (currentMode === "assessment") {
      return "assessment";
    }

    if (currentMode === "challenge") {
      return "challenge";
    }

    return "study";
  }

  if (["studyPlan", "reviewMistakes", "complete"].includes(screenName)) {
    return "study";
  }

  return null;
}

function hasAssessmentStartedOrCompleted(screenName = getCurrentScreenName()) {
  return Boolean(
    getActiveTrack() &&
    (
      assessmentAttempts > 0 ||
      ["welcome", "report"].includes(screenName) ||
      (screenName === "quiz" && currentMode === "assessment")
    )
  );
}

function hasAssessmentCompleted() {
  return hasCompletedAnyTest();
}

function getAssessmentNavigationTarget(screenName = getCurrentScreenName()) {
  if (screenName === "quiz" && currentMode === "assessment") {
    return "quiz";
  }

  return "welcome";
}

function getChallengeNavigationTarget(screenName = getCurrentScreenName()) {
  if (screenName === "quiz" && currentMode === "challenge") {
    return "quiz";
  }

  return "challenge";
}

function canNavigateToStep(stepName, screenName = getCurrentScreenName()) {
  if (stepName === "choose") {
    return true;
  }

  if (stepName === "assessment") {
    return Boolean(getActiveTrack());
  }

  if (stepName === "study") {
    return hasAssessmentCompleted();
  }

  if (stepName === "challenge") {
    return Boolean(getActiveTrack());
  }

  return false;
}

function handleStepperNavigation(stepName) {
  if (!canNavigateToStep(stepName)) {
    return;
  }

  if (stepName === "choose") {
    openTestSelection();
    return;
  }

  if (stepName === "assessment") {
    showScreen(getAssessmentNavigationTarget());
    return;
  }

  if (stepName === "study") {
    showStudyPlan();
    return;
  }

  if (stepName === "challenge") {
    showScreen(getChallengeNavigationTarget());
  }
}

function updateStepper(screenName) {
  const currentStep = getStepperStep(screenName);
  const shouldShow = Boolean((currentUser || isGuestMode) && currentStep && screenName !== "login");

  appStepper.classList.toggle("hidden", !shouldShow);
  appStepper.setAttribute("aria-hidden", shouldShow ? "false" : "true");

  appStepper.querySelectorAll("[data-step]").forEach((stepItem) => {
    const stepName = stepItem.dataset.step;
    const isCurrent = stepName === currentStep;
    const stepButton = stepItem.querySelector("[data-step-button]");
    const isEnabled = canNavigateToStep(stepName, screenName);

    stepItem.classList.toggle("is-current", isCurrent);

    if (stepButton) {
      stepButton.disabled = !isEnabled;

      if (isCurrent) {
        stepButton.setAttribute("aria-current", "step");
      } else {
        stepButton.removeAttribute("aria-current");
      }
    }
  });
}

function focusScreenHeading(screenName) {
  const heading = getScreenHeading(screens[screenName]);

  if (!heading) {
    return;
  }

  heading.setAttribute("tabindex", "-1");
  heading.focus();
}

function updateSaveStatus() {
  const hasSession = currentUser || isGuestMode;

  if (!hasSession) {
    saveStatusText.textContent = "";
    saveStatusText.classList.add("hidden");
    return;
  }

  if (isGuestMode) {
    saveStatusText.textContent = "Guest mode: progress is not saved";
  } else if (lastSaveMessage) {
    saveStatusText.textContent = `Saved to your account. ${lastSaveMessage}`;
  } else {
    saveStatusText.textContent = "Saved to your account";
  }

  saveStatusText.classList.remove("hidden");
}

function updateAppChrome(screenName) {
  const hasSession = Boolean(currentUser || isGuestMode);
  const showActions = hasSession;

  heroStats.classList.toggle("hidden", !hasSession);
  appNav.classList.toggle("hidden", !showActions);
  updateSaveStatus();
  updateStepper(screenName);
}

function showScreen(screenName, options = {}) {
  const { focusHeading = true } = options;
  topicError.classList.add("hidden");
  Object.entries(screens).forEach(([name, screen]) => {
    const isActive = name === screenName;

    screen.classList.toggle("hidden", !isActive);
    screen.hidden = !isActive;
    screen.setAttribute("aria-hidden", isActive ? "false" : "true");

    if ("inert" in screen) {
      screen.inert = !isActive;
    }
  });

  document.title = getScreenTitle(screenName);
  updateAppChrome(screenName);

  if (focusHeading) {
    requestAnimationFrame(() => focusScreenHeading(screenName));
  }
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
  updateAppChrome(getCurrentScreenName());
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

function getQuestionsForAssessmentConfig(config, usedQuestionIds = new Set()) {
  const topic = getTopicByConfig(config);

  if (!topic) {
    return [];
  }

  return getOrderedQuestions(topic.questions)
    .filter((question) => !usedQuestionIds.has(question.id))
    .filter((question) => (
      typeof config.questionMatcher === "function"
        ? config.questionMatcher(question)
        : true
    ))
    .map((question) => ({
      ...question,
      area: config.label,
      assessmentLabel: config.label,
      topicId: topic.id,
      topicName: topic.name
    }));
}

function shuffleItems(items) {
  const shuffled = items.slice();

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
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

function buildChallengeQuestions(questionCount = 15) {
  const activeTrack = getActiveTrack();

  if (!activeTrack) {
    return [];
  }

  const areaPools = activeTrack.assessmentTopicOrder
    .map((config, orderIndex) => {
      const areaQuestions = getQuestionsForAssessmentConfig(config);

      if (areaQuestions.length === 0) {
        return null;
      }

      const hardestLevel = areaQuestions.reduce(
        (highestLevel, question) => Math.max(highestLevel, question.difficultyLevel || 1),
        1
      );

      return {
        orderIndex,
        questions: areaQuestions.filter((question) => (question.difficultyLevel || 1) === hardestLevel)
      };
    })
    .filter((pool) => pool && pool.questions.length > 0);
  const selectedQuestions = [];
  const usedQuestionIds = new Set();

  areaPools.slice(0, questionCount).forEach((pool) => {
    const selectedQuestion = shuffleItems(pool.questions).find((question) => !usedQuestionIds.has(question.id));

    if (!selectedQuestion) {
      return;
    }

    usedQuestionIds.add(selectedQuestion.id);
    selectedQuestions.push(selectedQuestion);
  });

  if (selectedQuestions.length < questionCount) {
    shuffleItems(
      areaPools.flatMap((pool) => pool.questions.filter((question) => !usedQuestionIds.has(question.id)))
    )
      .slice(0, questionCount - selectedQuestions.length)
      .forEach((question) => {
        usedQuestionIds.add(question.id);
        selectedQuestions.push(question);
      });
  }

  return selectedQuestions;
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

async function saveCurrentUserProgress() {
  if (isGuestMode || !currentUser || !currentUserUid || !activeTrackKey) {
    return;
  }

  const nextProfile = migrateProfile(currentUserProfile || getDefaultUserProfile());
  const progress = getCurrentTrackProgressPayload();
  nextProfile.tracks[activeTrackKey] = progress;
  nextProfile.activeTrackKey = activeTrackKey;

  currentUserProfile = nextProfile;

  try {
    await saveProgressToFirestore(activeTrackKey, progress);
    lastSaveMessage = "Last saved just now.";
    updateSaveStatus();
    announceStatus("Progress saved to your account.");
  } catch (error) {
    console.error("Progress save failed:", error.message);
    lastSaveMessage = "Could not sync right now.";
    updateSaveStatus();
  }
}

function loadSavedProgress(progress = {}) {
  totalXp = progress.totalXp || 0;
  topicPerformance = progress.topicPerformance || {};
  mistakesByTopic = normalizeMistakesByTopic(progress.mistakesByTopic);
  recommendedTopicIds = progress.recommendedTopicIds || [];
  lastAssessmentPerfect = Boolean(progress.lastAssessmentPerfect);
  lastTestMode = progress.lastTestMode === "challenge" ? "challenge" : "assessment";
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

  if (!currentUserProfile) {
    return getDefaultTrackProgress();
  }

  return getTrackProgress(currentUserProfile, trackKey);
}

function openTestSelection() {
  void saveCurrentUserProgress();
  activeTrackKey = null;
  if (currentUserProfile) {
    currentUserProfile.activeTrackKey = null;
    void persistUserProfileMetadata();
  }
  quizTopics = [];
  studyGuides = {};
  resetTransientState();
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  lastTestMode = "assessment";
  assessmentAttempts = 0;
  currentAssessmentLevel = 1;
  updateGlobalLevelDisplay();
  announceStatus("Choose the test you want to prepare for.");
  showScreen("testSelection");
}

function openAspireSelection() {
  void saveCurrentUserProgress();
  activeTrackKey = null;
  if (currentUserProfile) {
    currentUserProfile.activeTrackKey = null;
    void persistUserProfileMetadata();
  }
  quizTopics = [];
  studyGuides = {};
  resetTransientState();
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  lastTestMode = "assessment";
  assessmentAttempts = 0;
  currentAssessmentLevel = 1;
  updateTrackContent();
  updateGlobalLevelDisplay();
  announceStatus("Choose the Utah Aspire Plus grade you want to prepare for.");
  showScreen("aspireSelection");
}

function enterTrack(trackKey) {
  const progress = getProgressForCurrentUser(trackKey);
  loadTrackState(trackKey, progress);
  if (currentUserProfile) {
    currentUserProfile.activeTrackKey = trackKey;
    void persistUserProfileMetadata();
  }
  buildStudyPlan();
  updateHeaderIdentity();
  announceStatus(`${getActiveTrack()?.shortLabel || "Track"} selected.`);
  showScreen(hasCompletedAnyTest() ? "studyPlan" : "welcome");
}

function clearAuthenticatedSessionState() {
  currentUser = null;
  currentUserUid = null;
  currentUserProfile = null;
  authHydrationUid = null;
  authHydrationPromise = null;
  isGuestMode = false;
  activeTrackKey = null;
  lastSaveMessage = "";
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  lastTestMode = "assessment";
  assessmentAttempts = 0;
  currentAssessmentLevel = 1;
  resetTransientState();
  updateTrackContent();
  updateGlobalLevelDisplay();
}

function loginAsAuthenticatedUser(email, uid, profile) {
  const timer = startPerfTimer("loginAsAuthenticatedUser", `email=${email}`);
  currentUser = email;
  currentUserUid = uid;
  currentUserProfile = migrateProfile(profile || getDefaultUserProfile());
  isGuestMode = false;
  lastSaveMessage = "";
  activeTrackKey = null;
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  lastTestMode = "assessment";
  assessmentAttempts = 0;
  currentAssessmentLevel = 1;
  resetTransientState();
  updateTrackContent();
  updateGlobalLevelDisplay();
  clearLoginMessage();
  logPerfPoint("showScreen(\"testSelection\") call");
  showScreen("testSelection");
  endPerfTimer("loginAsAuthenticatedUser", timer, `uid=${uid}`);
}

async function applyAuthenticatedSessionState(user, options = {}) {
  const source = options.source || "unknown";
  const timer = startPerfTimer("applyAuthenticatedSessionState", `source=${source}`);

  if (!user?.email || !user?.uid) {
    endPerfTimer("applyAuthenticatedSessionState", timer, "missing user");
    return;
  }

  if (currentUserUid !== user.uid || isGuestMode || !currentUser) {
    loginAsAuthenticatedUser(user.email, user.uid, getDefaultUserProfile());
  }

  if (authHydrationUid === user.uid && authHydrationPromise) {
    console.log(`[perf] applyAuthenticatedSessionState reuse hydration uid=${user.uid}`);
    await authHydrationPromise;
    endPerfTimer("applyAuthenticatedSessionState", timer, `source=${source} reused`);
    return;
  }

  authHydrationUid = user.uid;
  authHydrationPromise = (async () => {
    try {
      let profile = await loadUserProfileFromFirestore(user.uid);
      profile = await migrateLegacyProgressIfNeeded(user.email, user.uid, profile);

      if (currentUserUid === user.uid) {
        currentUserProfile = migrateProfile(profile || getDefaultUserProfile());
      }
    } catch (error) {
      console.error("Firestore profile load failed:", error.message);
      if (currentUserUid === user.uid && !currentUserProfile) {
        currentUserProfile = getDefaultUserProfile();
      }
    } finally {
      if (authHydrationUid === user.uid) {
        authHydrationUid = null;
        authHydrationPromise = null;
      }
    }
  })();

  await authHydrationPromise;
  endPerfTimer("applyAuthenticatedSessionState", timer, `source=${source}`);
}

async function handleLogin(event) {
  event.preventDefault();
  const submitTimer = startPerfTimer("login submit");
  console.log("Login handler triggered");

  if (isAuthRequestInFlight) {
    endPerfTimer("login submit", submitTimer, "duplicate submit ignored");
    return;
  }

  clearLoginMessage();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  console.log("Email:", email);

  if (!email || !password) {
    showLoginMessage("Enter both an email and password.", true);
    endPerfTimer("login submit", submitTimer, "missing credentials");
    return;
  }

  setLoginPending(true, "Signing in...");

  try {
    console.log("Attempting Firebase login...");
    const userCredential = await window.firebaseSignIn(email, password);
    console.log("Firebase login success");
    void applyAuthenticatedSessionState(userCredential.user, { source: "handleLogin-success" });
  } catch (error) {
    console.error("Firebase login error:", error.message);
    if (error?.code === "auth/user-not-found") {
      try {
        const userCredential = await window.firebaseCreateAccount(email, password);
        console.log("Firebase account creation success");
        void applyAuthenticatedSessionState(userCredential.user, { source: "handleLogin-createAccount" });
      } catch (createError) {
        if (createError?.code === "auth/email-already-in-use") {
          showLoginMessage("This email already exists. Check your password and try again.", true);
          endPerfTimer("login submit", submitTimer, "email already in use");
          return;
        }

        if (createError?.code === "auth/invalid-email") {
          showLoginMessage("Enter a valid email address.", true);
          endPerfTimer("login submit", submitTimer, "invalid email");
          return;
        }

        console.error("Firebase account creation failed:", createError.message);
        showLoginMessage("Could not create the account right now.", true);
        endPerfTimer("login submit", submitTimer, `create account failed code=${createError?.code || "unknown"}`);
        return;
      }
    } else if (error?.code === "auth/wrong-password" || error?.code === "auth/invalid-credential") {
      showLoginMessage("Incorrect password for this email.", true);
      endPerfTimer("login submit", submitTimer, `sign in failed code=${error.code}`);
      return;
    } else if (error?.code === "auth/invalid-email") {
      showLoginMessage("Enter a valid email address.", true);
      endPerfTimer("login submit", submitTimer, "invalid email");
      return;
    } else if (error?.code === "auth/too-many-requests") {
      showLoginMessage("Too many login attempts. Try again later.", true);
      endPerfTimer("login submit", submitTimer, "too many requests");
      return;
    } else {
      console.error("Firebase login failed:", error.message);
      showLoginMessage("Could not sign in right now.", true);
      endPerfTimer("login submit", submitTimer, `sign in failed code=${error?.code || "unknown"}`);
      return;
    }
  } finally {
    setLoginPending(false);
  }

  emailInput.value = "";
  passwordInput.value = "";
  endPerfTimer("login submit", submitTimer, "auth request completed");
}

function handleGuestMode() {
  clearLoginMessage();
  currentUser = null;
  currentUserUid = null;
  currentUserProfile = null;
  isGuestMode = true;
  lastSaveMessage = "";
  activeTrackKey = null;
  totalXp = 0;
  topicPerformance = {};
  mistakesByTopic = {};
  recommendedTopicIds = [];
  lastAssessmentPerfect = false;
  lastTestMode = "assessment";
  assessmentAttempts = 0;
  currentAssessmentLevel = 1;
  resetTransientState();
  updateTrackContent();
  updateGlobalLevelDisplay();
  showScreen("testSelection");
  showLoginMessage("Guest mode is active. Progress will not be saved.");
  announceStatus("Guest mode is active. Progress will not be saved.", { visible: true });
}

async function handleLogout() {
  await saveCurrentUserProgress();
  isLoggingOut = true;

  try {
    await window.firebaseSignOut();
  } catch (error) {
    console.error("Firebase sign-out error:", error.message);
  }

  clearAuthenticatedSessionState();
  clearLoginMessage();
  emailInput.value = "";
  passwordInput.value = "";
  showScreen("login");
  isLoggingOut = false;
}

window.firebaseCreateAccount = async function(email, password) {
  const timer = startPerfTimer("firebaseCreateAccount", `email=${email}`);
  const auth = await waitForFirebaseAuth();

  if (!auth) {
    endPerfTimer("firebaseCreateAccount", timer, "firebaseAuth unavailable");
    throw new Error("Firebase Auth still not available");
  }

  const { createUserWithEmailAndPassword } = await firebaseAuthModulePromise;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  console.log("Firebase account created:", userCredential.user);
  endPerfTimer("firebaseCreateAccount", timer, `uid=${userCredential.user?.uid || "unknown"}`);
  return userCredential;
};

window.firebaseSignIn = async function(email, password) {
  const timer = startPerfTimer("firebaseSignIn", `email=${email}`);
  const auth = await waitForFirebaseAuth();

  if (!auth) {
    endPerfTimer("firebaseSignIn", timer, "firebaseAuth unavailable");
    throw new Error("Firebase Auth still not available");
  }

  const { signInWithEmailAndPassword } = await firebaseAuthModulePromise;
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log("Firebase signed in:", userCredential.user);
  endPerfTimer("firebaseSignIn", timer, `uid=${userCredential.user?.uid || "unknown"}`);
  return userCredential;
};

window.firebaseSignOut = async function() {
  const auth = await waitForFirebaseAuth();

  if (!auth) {
    throw new Error("Firebase Auth still not available");
  }

  const { signOut } = await firebaseAuthModulePromise;
  await signOut(auth);
  console.log("Firebase signed out");
};

firebaseAuthModulePromise
  .then(async (firebaseAuthModule) => {
    const auth = await waitForFirebaseAuth();

    if (!firebaseAuthModule || !auth) {
      resolveInitialAuthState?.();
      return;
    }

    firebaseAuthModule.onAuthStateChanged(auth, async (user) => {
      logPerfPoint("onAuthStateChanged fire", user?.email ? `email=${user.email}` : "signedOut");
      try {
        if (user?.email) {
          console.log("Firebase user logged in:", user.email);
          void applyAuthenticatedSessionState(user, { source: "onAuthStateChanged" });
        } else if (!isGuestMode && !isLoggingOut) {
          console.log("No Firebase user logged in");
          clearAuthenticatedSessionState();
          showScreen("login");
        }
      } catch (error) {
        console.error("Firebase auth listener error:", error.message);
        if (!isGuestMode && !isLoggingOut) {
          clearAuthenticatedSessionState();
          showScreen("login");
        }
      } finally {
        resolveInitialAuthState?.();
        resolveInitialAuthState = null;
      }
    });
  })
  .catch((error) => {
    console.error("Firebase auth listener error:", error.message);
    resolveInitialAuthState?.();
    resolveInitialAuthState = null;
  });

function updateTrackContent() {
  const activeTrack = getActiveTrack();
  const shortLabel = activeTrack?.shortLabel || "Math Prep";

  startAssessmentButton.textContent = activeTrack?.key === "act"
    ? "Start ACT Assessment"
    : activeTrack?.key?.startsWith("aspire")
      ? `Start ${activeTrack.shortLabel} Assessment`
      : "Start Assessment";
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

  retakeAssessmentButton.textContent = activeTrack?.key === "act"
    ? "Retake ACT Assessment"
    : activeTrack?.key?.startsWith("aspire")
      ? `Retake ${activeTrack.shortLabel} Assessment`
      : "Retake Assessment";
  reviewMistakesBackButton.textContent = activeTrack ? `Back to ${shortLabel} Study Plan` : "Back to Study Plan";
  topicsButton.textContent = activeTrack ? `Back to ${shortLabel} Study Plan` : "Back to Study Plan";
  recommendedNextButton.textContent = recommendedTopicIds.length > 0 ? "Recommended Next" : "Start Practice";
  updateHeaderIdentity();
}

function getDefaultStudyPlanDescription() {
  return getActiveTrack()?.studyPlanDescription || "Recommended topics are shown first based on your assessment. You can still study any topic.";
}

function getStudyPlanSummaryMessage() {
  if (!hasCompletedAnyTest()) {
    return getDefaultStudyPlanDescription();
  }

  if (lastAssessmentPerfect) {
    return `${getModeDisplayName(lastTestMode)} complete. You are in strong shape.`;
  }

  return `${getModeDisplayName(lastTestMode)} complete. Focus on the areas below to tighten up the gaps.`;
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
    masteryText.textContent = `Mastery: ${getModeDisplayName()}`;
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
  title.textContent = "Build mastery";
  card.appendChild(title);

  const meta = document.createElement("p");
  meta.className = "study-card-text";
  meta.textContent = `${topic.questions.length} questions ready for practice`;
  card.appendChild(meta);

  const button = document.createElement("button");
  button.className = "topic-button practice-button";
  button.type = "button";
  button.innerHTML = `
    <span>${isRecommended ? "Practice This Topic" : "Start Practice"}</span>
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
  title.textContent = "Review key ideas";
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
    link.textContent = formatVideoLabel(video.title);
    videoList.appendChild(link);
  });

  card.appendChild(videoList);
  return card;
}

function formatVideoLabel(title = "") {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return "YouTube";
  }

  if (trimmedTitle.includes(":")) {
    return trimmedTitle;
  }

  const matchedChannel = KNOWN_VIDEO_CHANNELS.find((channel) => trimmedTitle.startsWith(channel));

  if (!matchedChannel) {
    return `YouTube: ${trimmedTitle}`;
  }

  const normalizedTitle = trimmedTitle
    .slice(matchedChannel.length)
    .replace(/^[\s/\\|:-]+/, "")
    .trim();

  return normalizedTitle ? `${matchedChannel}: ${normalizedTitle}` : matchedChannel;
}

function getTopicRecommendationReason(topic, isRecommended) {
  if (isRecommended) {
    return "Recommended because this topic needs more review from your latest test.";
  }

  if (lastAssessmentPerfect) {
    return "Optional review to stay sharp across all areas.";
  }

  return "You can still study this topic any time.";
}

function buildStudyPlanRow(topic, isRecommended) {
  const row = document.createElement("section");
  row.className = "study-plan-row";

  if (isRecommended) {
    row.classList.add("recommended-row");
  }

  const header = document.createElement("div");
  header.className = "topic-unit-header";

  const title = document.createElement("h4");
  title.className = "topic-unit-title";
  title.textContent = topic.name;
  header.appendChild(title);

  const reason = document.createElement("p");
  reason.className = "topic-unit-reason";
  reason.textContent = getTopicRecommendationReason(topic, isRecommended);
  header.appendChild(reason);

  const cards = document.createElement("div");
  cards.className = "topic-unit-cards";
  cards.appendChild(buildStudyGuideCard(topic));
  cards.appendChild(buildPracticeCard(topic, isRecommended));

  row.appendChild(header);
  row.appendChild(cards);
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
  studyPlanDescription.textContent = getStudyPlanSummaryMessage();

  const recommendedTopics = getOrderedTopics(quizTopics.filter((topic) => recommendedTopicIds.includes(topic.id)));
  const orderedTopics = getOrderedTopics();

  if (lastAssessmentPerfect) {
    studyPlanFocus.textContent = "Great work. You covered every tested area correctly, so use the full plan for extra review.";
  } else if (recommendedTopics.length > 0) {
    studyPlanFocus.textContent = `Start where it matters most: ${recommendedTopics.map((topic) => topic.name).join(", ")}`;
  } else {
    studyPlanFocus.textContent = hasCompletedAnyTest()
      ? "No weak areas were identified. Use the full plan for extra review."
      : "Complete the diagnostic to see priority study areas.";
  }

  recommendedTopics.forEach((topic) => {
    recommendedTopicList.appendChild(buildStudyPlanRow(topic, true));
  });

  orderedTopics.forEach((topic) => {
    allTopicList.appendChild(buildStudyPlanRow(topic, false));
  });

  if (recommendedTopicList.children.length === 0) {
    const message = document.createElement("div");
    message.className = "success-state";
    message.innerHTML = `
      <p class="success-state-title">${hasCompletedAnyTest() ? "No priority topics right now." : "No recommended topics yet."}</p>
      <p class="panel-text">${hasCompletedAnyTest() ? "Study all areas for extra review, or jump into any topic to stay ready." : "Complete a test to unlock a focused recommendation list."}</p>
    `;
    recommendedTopicList.appendChild(message);
  }

  announceStatus("Study recommendations updated.");
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

function startChallengeTest() {
  if (!getActiveTrack()) {
    return;
  }

  currentMode = "challenge";
  currentSessionType = "challenge";
  currentTopic = null;
  currentQuestionSet = buildChallengeQuestions();
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
  const isAssessment = isTestMode();
  const isChallenge = currentMode === "challenge";
  const activeTrack = getActiveTrack();
  const question = currentQuestionSet[currentQuestionIndex];

  if (!question) {
    if (isAssessment) {
      finalizeTestSession();
    } else {
      showCompleteScreen();
    }
    return;
  }

  currentQuestion = question;
  topicTitle.textContent = isAssessment
    ? (isChallenge ? "Challenge Test" : activeTrack?.assessmentTitle || "Diagnostic Assessment")
    : currentTopic.name;
  quizModeText.textContent = isAssessment
    ? (isChallenge
      ? "Answer these hardest-tier questions to see whether you are ready across all areas."
      : "Answer these mixed questions to build your study plan.")
    : currentSessionType === "review"
      ? "Revisit missed questions and lock in the right steps."
      : "Work through the topic and build your score.";
  assessmentNoticeText.textContent = !isChallenge && isAssessment && currentAssessmentLevel > 1
    ? "You are taking a more advanced assessment."
    : "";
  assessmentNoticeText.classList.toggle("hidden", !(isAssessment && !isChallenge && currentAssessmentLevel > 1));
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestionSet.length}`;
  difficultyText.textContent = isAssessment
    ? `${isChallenge ? "Challenge" : "Assessment"} level: ${question.difficultyLevel || currentAssessmentLevel} of 5`
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

  if (isTestMode() && !retryUsed) {
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
  void saveCurrentUserProgress();

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
    ? (isTestMode() ? "View Study Plan" : "Finish Level")
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
    if (isTestMode()) {
      finalizeTestSession();
    } else {
      showCompleteScreen();
    }
    return;
  }

  currentQuestionIndex += 1;
  renderQuestion();
}

function finalizeTestSession() {
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
  lastTestMode = currentMode === "challenge" ? "challenge" : "assessment";
  if (currentMode === "assessment") {
    assessmentAttempts += 1;
  }
  currentAssessmentLevel = getAssessmentLevelFromAttempts();

  reportScore.textContent = `Overall score: ${correctCount}/${questionCount} (${scorePercent}%)`;
  focusText.textContent = lastAssessmentPerfect
    ? "Great work. We recommend you study all areas so you are as prepared as possible."
    : `Focus on: ${focusTopics.map((topic) => topic.name).join(", ")}`;

  buildStudyPlan();
  void saveCurrentUserProgress();
  announceStatus(`${getModeDisplayName(lastTestMode)} complete. Recommendations updated.`);
  showStudyPlan();
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
  void saveCurrentUserProgress();
  announceStatus(currentSessionType === "review" ? "Review session complete." : "Practice session complete.");
  showScreen("complete");
}

function handleBack() {
  if (isTestMode()) {
    if (hasCompletedAnyTest()) {
      showStudyPlan();
    } else {
      showScreen(getTestIntroScreen());
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

function normalizeTopicStudyGuides(data) {
  return (data.topics || []).reduce((guides, topic) => {
    guides[topic.topicId || topic.name] = topic;
    return guides;
  }, {});
}

async function loadTrackCatalog() {
  const [
    placementResponse,
    actResponse,
    actGuidesResponse,
    aspireGrade9Response,
    aspireGrade10Response,
    aspireGrade9GuidesResponse,
    aspireGrade10GuidesResponse
  ] = await Promise.all([
    fetch("apps/aleks.json"),
    fetch("apps/act_math_bank_actlike_v2_app.json"),
    fetch("apps/act_math_study_guides_actlike_v2.json"),
    fetch("apps/aspire_plus_grade9_math_bank.json"),
    fetch("apps/aspire_plus_grade10_math_bank.json"),
    fetch("apps/aspire_plus_grade9_study_guides.json"),
    fetch("apps/aspire_plus_grade10_study_guides.json")
  ]);

  if (
    !placementResponse.ok ||
    !actResponse.ok ||
    !actGuidesResponse.ok ||
    !aspireGrade9Response.ok ||
    !aspireGrade10Response.ok ||
    !aspireGrade9GuidesResponse.ok ||
    !aspireGrade10GuidesResponse.ok
  ) {
    throw new Error("Quiz files could not be loaded.");
  }

  const [
    placementData,
    actData,
    actGuidesData,
    aspireGrade9Data,
    aspireGrade10Data,
    aspireGrade9GuidesData,
    aspireGrade10GuidesData
  ] = await Promise.all([
    placementResponse.json(),
    actResponse.json(),
    actGuidesResponse.json(),
    aspireGrade9Response.json(),
    aspireGrade10Response.json(),
    aspireGrade9GuidesResponse.json(),
    aspireGrade10GuidesResponse.json()
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
    },
    aspireGrade9: {
      ...trackConfigs.aspireGrade9,
      title: aspireGrade9Data.title || trackConfigs.aspireGrade9.label,
      topics: normalizeTopics(aspireGrade9Data),
      studyGuides: normalizeTopicStudyGuides(aspireGrade9GuidesData)
    },
    aspireGrade10: {
      ...trackConfigs.aspireGrade10,
      title: aspireGrade10Data.title || trackConfigs.aspireGrade10.label,
      topics: normalizeTopics(aspireGrade10Data),
      studyGuides: normalizeTopicStudyGuides(aspireGrade10GuidesData)
    }
  };
}

async function initializeApp() {
  try {
    scrubLegacyPasswordStorage();
    await loadTrackCatalog();
    resetTransientState();
    updateTrackContent();
    await initialAuthStatePromise;

    if (!currentUser && !isGuestMode) {
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
aspireTrackButton.addEventListener("click", openAspireSelection);
aspireGrade9Button.addEventListener("click", () => enterTrack("aspireGrade9"));
aspireGrade10Button.addEventListener("click", () => enterTrack("aspireGrade10"));
aspireSelectionBackButton.addEventListener("click", openTestSelection);
startAssessmentButton.addEventListener("click", startAssessment);
startChallengeButton.addEventListener("click", startChallengeTest);
stepperButtons.forEach((button) => {
  button.addEventListener("click", () => handleStepperNavigation(button.dataset.stepButton));
});
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
