const PASSING_PERCENTAGE = 67;

function isArray(value) {
  return Array.isArray(value);
}

export function validateQuizData(data) {
  if (typeof data !== "object" || data === null || isArray(data)) {
    return false;
  }

  const { quizTitle, correctAnswers, attempts } = data;

  if (typeof quizTitle !== "string" || quizTitle.length === 0) {
    return false;
  }

  if (!isArray(correctAnswers) || correctAnswers.length === 0) {
    return false;
  }

  if (!isArray(attempts) || attempts.length === 0) {
    return false;
  }

  for (const attempt of attempts) {
    if (typeof attempt !== "object" || attempt === null || isArray(attempt)) {
      return false;
    }
    if (typeof attempt.name !== "string" || attempt.name.trim().length === 0) {
      return false;
    }
    if (!isArray(attempt.answers) || attempt.answers.length !== correctAnswers.length) {
      return false;
    }
  }

  return true;
}

export function calculateAttempt(attempt, correctAnswers) {
  if (!isArray(correctAnswers) || !isArray(attempt?.answers)) {
    return null;
  }
  const name = attempt.name.trim();
  const score = attempt.answers.reduce((count, answer, index) => {
    return answer === correctAnswers[index] ? count + 1 : count;
  }, 0);
  const percentage = Math.round((score / correctAnswers.length) * 100);
  const passed = percentage >= PASSING_PERCENTAGE;
  return { name, score, percentage, passed };
}

export function calculateReport(data) {
  if (data === null || typeof data !== "object") {
    return null;
  }
  const { quizTitle, correctAnswers, attempts } = data;

  const calculateAttempts = attempts.map((attempt) =>
    calculateAttempt(attempt, correctAnswers),
  );

  const quizTitleTrim = quizTitle.trim();
  const questionCount = correctAnswers.length;
  const participantCount = calculateAttempts.length;
  const averagePercentage = Math.round(
    calculateAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) /
      participantCount,
  );
  const passedCount = calculateAttempts.filter(
    (attempt) => attempt.passed,
  ).length;
  const threshold = PASSING_PERCENTAGE
  const best = calculateAttempts.reduce((best, current) => {
    return current.score > best.score ? current : best
  })

  return {
    quizTitle: quizTitleTrim,
    questionCount,
    participantCount,
    averagePercentage,
    passedCount,
    threshold,
    best,
    attempts: calculateAttempts,
  };
}
