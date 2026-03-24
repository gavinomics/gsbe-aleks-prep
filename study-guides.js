const STUDY_GUIDES = {
  "Real Numbers, Fractions, and Percents": {
    summary: [
      "Compare integers, decimals, and fractions on the same number line.",
      "Convert smoothly between fractions, decimals, and percents.",
      "Use place value and signs carefully when ordering real numbers."
    ],
    videos: [
      { title: "Pre-Algebra - Real Numbers", url: "https://www.youtube.com/watch?v=WEsmCkHrgqI" },
      { title: "Real Numbers: Converting Between Fractions, Decimals, and Percents", url: "https://www.youtube.com/watch?v=Non4IEBw6q4" },
      { title: "Converting Fractions, Decimals, Percents, and Ratios", url: "https://www.youtube.com/watch?v=aKxvEK_39eA" }
    ]
  },
  "Ratios, Proportions, and Applied Arithmetic": {
    summary: [
      "Set up ratios in matching units before solving.",
      "Use proportions to solve scale, rate, and percent problems.",
      "Check whether your answer makes sense in the real-world context."
    ],
    videos: [
      { title: "Khan Academy: Introduction to Ratios", url: "https://www.youtube.com/watch?v=HpdMJaKaXXc" },
      { title: "Math Antics: Ratios and Rates", url: "https://www.youtube.com/watch?v=RQ2nYUBVvqI" },
      { title: "Ratio and Proportion Word Problems", url: "https://www.youtube.com/watch?v=JOZSFwuyqok" }
    ]
  },
  "Algebraic Expressions and Exponents": {
    summary: [
      "Translate words into algebraic expressions with the right operations.",
      "Combine like terms and simplify step by step.",
      "Apply exponent rules carefully when multiplying, dividing, or raising powers."
    ],
    videos: [
      { title: "Algebra Basics: Algebraic Expressions", url: "https://www.youtube.com/watch?v=U-7nq7OG18s" },
      { title: "Math Antics: Intro to Exponents", url: "https://www.youtube.com/watch?v=-zUmvpkhvW8" },
      { title: "Math Antics: Laws of Exponents", url: "https://www.youtube.com/watch?v=LkhPRz7Hocg" }
    ]
  },
  "Linear Equations": {
    summary: [
      "Isolate the variable using inverse operations.",
      "Keep both sides balanced as you simplify.",
      "Check your solution by substituting it back into the equation."
    ],
    videos: [
      { title: "Khan Academy: Linear Equations 1", url: "https://www.youtube.com/watch?v=bAerID24QJ0" },
      { title: "The Organic Chemistry Tutor: Linear Equations", url: "https://www.youtube.com/watch?v=7DPWeBszNSM" },
      { title: "Math Antics: Solving 2-Step Equations", url: "https://www.youtube.com/watch?v=LDIiYKYvvdA" }
    ]
  },
  "Linear Inequalities and Absolute Value": {
    summary: [
      "Solve inequalities like equations, but flip the sign when multiplying or dividing by a negative.",
      "Graph solution sets to show all valid values.",
      "Treat absolute value as distance from zero when solving."
    ],
    videos: [
      { title: "Math Antics: Inequalities in Algebra", url: "https://www.youtube.com/watch?v=RyesLifeUBw" },
      { title: "Introduction to Linear Inequalities", url: "https://www.youtube.com/watch?v=rb6pj8hgieI" },
      { title: "Khan Academy: Absolute Value Equations and Inequalities", url: "https://www.youtube.com/watch?v=ISrPPDKs7yU" }
    ]
  },
  "Systems of Equations and Applications": {
    summary: [
      "Use substitution, elimination, or graphing to find where equations meet.",
      "A solution must satisfy both equations at the same time.",
      "Translate word problems into two equations before solving."
    ],
    videos: [
      { title: "Khan Academy: Solving Systems by Substitution", url: "https://www.youtube.com/watch?v=V7H1oUHXPkg" },
      { title: "PatrickJMT: Solving Linear Systems Using Substitution", url: "https://www.youtube.com/watch?v=cwHR_B9zK7k" },
      { title: "PatrickJMT: Solving a Linear System by Graphing", url: "https://www.youtube.com/watch?v=WNkPKv0OTGI" }
    ]
  },
  "Functions and Graphs": {
    summary: [
      "Read function notation as input-output rules.",
      "Evaluate functions by substituting values carefully.",
      "Connect tables, equations, and graphs as different views of the same relationship."
    ],
    videos: [
      { title: "Khan Academy: Evaluating with Function Notation", url: "https://www.youtube.com/watch?v=EmTvdKkAUtE" },
      { title: "Function Notation", url: "https://www.youtube.com/watch?v=IiBbKOTi12E" },
      { title: "The Organic Chemistry Tutor: Linear Functions", url: "https://www.youtube.com/watch?v=BtcKotD6Ni8" }
    ]
  },
  "Polynomials and Factoring": {
    summary: [
      "Add, subtract, and multiply polynomials by combining like terms correctly.",
      "Factor out common factors before trying other methods.",
      "Use factoring patterns to rewrite expressions in simpler pieces."
    ],
    videos: [
      { title: "The Organic Chemistry Tutor: Polynomials (Operations)", url: "https://www.youtube.com/watch?v=ZvL9aDGNHqA" },
      { title: "The Organic Chemistry Tutor: Factoring Polynomials", url: "https://www.youtube.com/watch?v=mXvt9OumKH8" },
      { title: "Khan Academy: Factoring Completely with a Common Factor", url: "https://www.youtube.com/watch?v=FoTD41xzF5Q" }
    ]
  },
  "Quadratics": {
    summary: [
      "Solve quadratics by factoring, completing the square, or using the quadratic formula.",
      "Use the discriminant to predict how many real solutions exist.",
      "Check whether the equation is already in a form that makes solving easier."
    ],
    videos: [
      { title: "Khan Academy / Intro: Using the Quadratic Formula", url: "https://www.youtube.com/watch?v=EeVqtpuMFOU" },
      { title: "PatrickJMT: Using the Discriminant for Quadratic Equations", url: "https://www.youtube.com/watch?v=lGZNaoHGsM8" },
      { title: "PatrickJMT: Solving Quadratic Equations by Factoring and the Quadratic Formula", url: "https://www.youtube.com/watch?v=6edth-ZEpKo" }
    ]
  },
  "Rational Expressions and Equations": {
    summary: [
      "Simplify rational expressions by factoring first.",
      "Find excluded values before solving rational equations.",
      "Watch for asymptotes and domain restrictions in rational functions."
    ],
    videos: [
      { title: "Khan Academy: Rational Equations Intro", url: "https://www.youtube.com/watch?v=BoLO8UXhtgk" },
      { title: "PatrickJMT: Solving a Basic Rational Equation", url: "https://www.youtube.com/watch?v=ZWTZm6Aveqg" },
      { title: "Rational Functions: Finding Asymptotes", url: "https://www.youtube.com/watch?v=f4s7POhnEGU" }
    ]
  },
  "Radicals and Rational Exponents": {
    summary: [
      "Rewrite radicals as exponents and exponents as radicals.",
      "Use rational exponent rules to simplify expressions.",
      "Check whether the final answer should stay in radical or exponent form."
    ],
    videos: [
      { title: "Khan Academy: Rational Exponents", url: "https://www.youtube.com/watch?v=wDqjIw730mA" },
      { title: "Math Antics: Exponents and Square Roots", url: "https://www.youtube.com/watch?v=B4zejSI8zho" },
      { title: "Basic Fractional Exponents", url: "https://www.youtube.com/watch?v=lZfXc4nHooo" }
    ]
  },
  "Exponential and Logarithmic Models": {
    summary: [
      "Recognize when a situation changes by a constant factor instead of a constant amount.",
      "Use logarithms to undo exponential growth or decay.",
      "Interpret model parameters in the context of the problem."
    ],
    videos: [
      { title: "Khan Academy: Exponential Growth Functions", url: "https://www.youtube.com/watch?v=6WMZ7J0wwMI" },
      { title: "The Organic Chemistry Tutor: Exponential and Logarithmic Equations", url: "https://www.youtube.com/watch?v=6CrXFvvwsaE" },
      { title: "Exponential and Logarithmic Models", url: "https://www.youtube.com/watch?v=K6t163WNJwU" }
    ]
  },
  "Geometry and Coordinate Geometry": {
    summary: [
      "Use coordinates, distance, and slope to describe geometric relationships.",
      "Apply area, perimeter, and the Pythagorean Theorem when shapes are graphed.",
      "Sketching points and segments often makes the problem clearer."
    ],
    videos: [
      { title: "Introduction to the Coordinate Plane", url: "https://www.youtube.com/watch?v=U5VZJnubg-Q" },
      { title: "Math Antics: The Pythagorean Theorem", url: "https://www.youtube.com/watch?v=WqhlG3Vakw8" },
      { title: "Area and Perimeter on the Coordinate Plane", url: "https://www.youtube.com/watch?v=1Og0oMCK5IQ" }
    ]
  },
  "Trigonometry": {
    summary: [
      "Use sine, cosine, and tangent to connect angles and side lengths.",
      "Label opposite, adjacent, and hypotenuse before choosing a ratio.",
      "Set up the trig equation first, then solve with a calculator if needed."
    ],
    videos: [
      { title: "The Organic Chemistry Tutor: Trigonometry for Beginners", url: "https://www.youtube.com/watch?v=PUB0TaZ7bhA" },
      { title: "Khan Academy: Introduction to the Sine, Cosine, and Tangent Ratios", url: "https://www.youtube.com/watch?v=WQDqTVI89B4" },
      { title: "Khan Academy: Right Triangle Trigonometry", url: "https://www.youtube.com/watch?v=oIfrWZyjooI" }
    ]
  },
  "Probability, Sets, and Statistics": {
    summary: [
      "Use set notation to organize overlaps, unions, and intersections.",
      "Find averages and basic statistics from data sets.",
      "Write probability as favorable outcomes over total possible outcomes."
    ],
    videos: [
      { title: "Khan Academy: Intersection and Union of Sets", url: "https://www.youtube.com/watch?v=jAfNg3ylZAI" },
      { title: "Khan Academy: Statistics - The Average", url: "https://www.youtube.com/watch?v=uhxtUt_-GyM" },
      { title: "Math Antics: Basic Probability", url: "https://www.youtube.com/watch?v=KzfWUEJjG18" }
    ]
  }
};
