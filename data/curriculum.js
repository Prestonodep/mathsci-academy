// ============================================================
// MathSci Academy — Curriculum Data
// ============================================================

window.CURRICULUM = {

  stages: [
    { id:'S1', num:1, name:'Foundations',              color:'#818cf8', weeks:'8 weeks',  meta:'Numbers, algebra & geometry' },
    { id:'S2', num:2, name:'Pre-Calculus & Trig',      color:'#6ee7b7', weeks:'10 weeks', meta:'Functions, logs & angles' },
    { id:'S3', num:3, name:'Calculus',                 color:'#f9a8d4', weeks:'12 weeks', meta:'Derivatives, integrals & ODEs' },
    { id:'S4', num:4, name:'Linear Algebra & Stats',   color:'#fbbf24', weeks:'12 weeks', meta:'Matrices, vectors & data' },
    { id:'S5', num:5, name:'Advanced Mastery',         color:'#fb923c', weeks:'16 weeks', meta:'PDEs, Fourier & complex analysis' },
  ],

  lessons: {

    // ══════════════════════════════════════════
    // STAGE 1
    // ══════════════════════════════════════════
    'W1L1': {
      stageId:'S1', week:1, title:'Numbers & the Number Line', xp:120, readMin:20,
      tags:['numbers','number-line','integers','fractions','absolute-value'],
      sections: [
        { type:'intro', text:'The number line is the backbone of all mathematics. Every number has exactly one position on it — negative numbers sit left of zero, positive numbers to the right.' },
        { type:'visual', kind:'number-line', range:[-5,5] },
        { type:'h2', text:'Types of numbers' },
        { type:'table', rows:[
          ['Symbol','Set','Examples'],
          ['ℕ','Natural','1, 2, 3, 4 …'],
          ['ℤ','Integers','… −2, −1, 0, 1, 2 …'],
          ['ℚ','Rational','½, −¾, 0.333…'],
          ['𝕀','Irrational','√2, π, e'],
          ['ℝ','Real','All of the above'],
        ]},
        { type:'h2', text:'Absolute value' },
        { type:'p', text:'The absolute value |x| is the distance from x to zero — always non-negative.' },
        { type:'formula', text:'|x| = x  if x ≥ 0   |x| = −x  if x < 0' },
        { type:'worked', label:'Examples', steps:[
          ['|7| = 7','Already positive'],
          ['|−5| = 5','Negative → flip sign'],
          ['|−3.7| = 3.7','Works for decimals'],
          ['|0| = 0','Zero distance from itself'],
        ]},
        { type:'h2', text:'Ordering numbers' },
        { type:'p', text:'Use < (less than) and > (greater than). On the number line: right = larger.' },
        { type:'worked', label:'Ordering: arrange −½, 3, −4, 0, 1.5, −2.7 from smallest to largest', steps:[
          ['Answer','−4 < −2.7 < −½ < 0 < 1.5 < 3'],
        ]},
        { type:'h2', text:'Fractions ↔ Decimals ↔ Percentages' },
        { type:'worked', label:'Conversions', steps:[
          ['Fraction → Decimal','Divide top by bottom: 3/4 = 0.75'],
          ['Decimal → Percentage','Multiply by 100: 0.75 × 100 = 75%'],
          ['Percentage → Fraction','Divide by 100: 75% = 75/100 = 3/4'],
        ]},
        { type:'science', text:'In chemistry, 0.25 mol/L = 250 mmol/L. In physics, efficiency 3/5 = 0.6 = 60%. Fluency with these conversions is used every day in science.' },
        { type:'h2', text:'Prime numbers & factorisation' },
        { type:'p', text:'A prime has exactly two factors: 1 and itself. Every integer has a unique prime factorisation (Fundamental Theorem of Arithmetic).' },
        { type:'worked', label:'Factorise 360', steps:[
          ['360 = 2 × 180','Divide by 2'],
          ['180 = 2 × 90','Divide by 2 again'],
          ['90 = 2 × 45 = 2 × 3 × 15 = 2 × 3 × 3 × 5','Continue'],
          ['360 = 2³ × 3² × 5','Final answer'],
        ]},
        { type:'keypoints', points:[
          'Number line: left = smaller, right = larger',
          'Absolute value = distance from zero, always ≥ 0',
          'Natural ⊂ Integer ⊂ Rational ⊂ Real',
          'Fractions, decimals, percentages are the same number in different dress',
          'Every integer has a unique prime factorisation',
        ]},
      ]
    },

    'W1L2': {
      stageId:'S1', week:2, title:'Order of Operations', xp:120, readMin:18,
      tags:['operations','pemdas','bodmas','brackets','arithmetic'],
      sections:[
        { type:'intro', text:'Without a universal rule for evaluating expressions, 2 + 3 × 4 could mean 20 or 14. PEMDAS/BODMAS ensures everyone gets the same answer.' },
        { type:'formula', text:'PEMDAS / BODMAS\nParentheses · Exponents · Multiplication · Division · Addition · Subtraction' },
        { type:'note', text:'Multiplication and Division are equal priority — evaluate left to right. Same for Addition and Subtraction.' },
        { type:'worked', label:'Example 1 — mixed operations: evaluate 3 + 4 × 2 − 1', steps:[
          ['Multiply first','4 × 2 = 8'],
          ['Left to right','3 + 8 − 1 = 10'],
        ]},
        { type:'worked', label:'Example 2 — brackets and exponents: evaluate (3 + 2)² ÷ 5', steps:[
          ['Brackets first','(3+2) = 5'],
          ['Exponent','5² = 25'],
          ['Divide','25 ÷ 5 = 5'],
        ]},
        { type:'worked', label:'Example 3 — nested brackets: 4 × [2 + (8 − 3)] ÷ 2', steps:[
          ['Inner brackets','(8−3) = 5'],
          ['Square brackets','2 + 5 = 7'],
          ['Multiply','4 × 7 = 28'],
          ['Divide','28 ÷ 2 = 14'],
        ]},
        { type:'science', text:'Density = mass ÷ volume. If mass = (3+7) kg and volume = 2 m³, evaluate the bracket first: 10 ÷ 2 = 5 kg/m³. Missing brackets changes the answer entirely.' },
        { type:'keypoints', points:[
          'Parentheses/Brackets are always evaluated first',
          'Exponents (powers and roots) come next',
          'Multiplication and Division: equal priority, left to right',
          'Addition and Subtraction: equal priority, left to right',
          'Nested brackets: work from innermost outward',
        ]},
      ]
    },

    'W1L3': {
      stageId:'S1', week:3, title:'Powers, Roots & Scientific Notation', xp:120, readMin:22,
      tags:['powers','exponents','roots','scientific-notation','significant-figures'],
      sections:[
        { type:'intro', text:'Powers and scientific notation are how science handles the enormous range of quantities in the universe — from the mass of an electron (9.1 × 10⁻³¹ kg) to the distance to the Andromeda galaxy (2.4 × 10²² m).' },
        { type:'h2', text:'Laws of exponents' },
        { type:'formula', text:'aᵐ × aⁿ = aᵐ⁺ⁿ\naᵐ ÷ aⁿ = aᵐ⁻ⁿ\n(aᵐ)ⁿ = aᵐⁿ\na⁰ = 1\na⁻ⁿ = 1/aⁿ' },
        { type:'worked', label:'Applying exponent laws', steps:[
          ['2³ × 2⁴ = 2⁷ = 128','Add exponents (same base)'],
          ['5⁶ ÷ 5² = 5⁴ = 625','Subtract exponents'],
          ['(3²)³ = 3⁶ = 729','Multiply exponents'],
          ['7⁰ = 1','Anything to the power 0'],
          ['2⁻³ = 1/2³ = 1/8','Negative exponent → reciprocal'],
        ]},
        { type:'h2', text:'Roots' },
        { type:'formula', text:'√x = x^(1/2)    ∛x = x^(1/3)    ⁿ√x = x^(1/n)' },
        { type:'h2', text:'Scientific notation' },
        { type:'p', text:'A number in scientific notation has the form a × 10ⁿ where 1 ≤ |a| < 10.' },
        { type:'worked', label:'Converting to/from scientific notation', steps:[
          ['0.00045 → ?','Move decimal 4 places right → 4.5 × 10⁻⁴'],
          ['3,200,000 → ?','Move decimal 6 places left → 3.2 × 10⁶'],
          ['6.02 × 10²³ → ?','Move decimal 23 places right → 602,000,000,000,000,000,000,000'],
        ]},
        { type:'h2', text:'Significant figures' },
        { type:'p', text:'Significant figures express the precision of a measurement. Leading zeros are never significant; trailing zeros after a decimal point are.' },
        { type:'worked', label:'Counting sig figs', steps:[
          ['0.00307','3 sig figs (3, 0, 7) — leading zeros not significant'],
          ['1200','2 sig figs (ambiguous without decimal point)'],
          ['1200.0','5 sig figs (trailing zeros after decimal are significant)'],
          ['6.02 × 10²³','3 sig figs'],
        ]},
        { type:'science', text:"Avogadro's number N_A = 6.022 × 10²³ mol⁻¹. The speed of light c = 2.998 × 10⁸ m/s. Scientific notation and sig figs let scientists communicate precision unambiguously." },
        { type:'keypoints', points:[
          'Exponent laws: multiply → add, divide → subtract, power of power → multiply',
          'Negative exponent means reciprocal: a⁻ⁿ = 1/aⁿ',
          'Scientific notation: a × 10ⁿ where 1 ≤ |a| < 10',
          'Sig figs: leading zeros don\'t count, trailing zeros after decimal do',
        ]},
      ]
    },

    'W1L4': {
      stageId:'S1', week:4, title:'Ratios, Proportions & Percentages', xp:120, readMin:20,
      tags:['ratios','proportions','percentages','scale','concentration'],
      sections:[
        { type:'intro', text:'Ratios, proportions and percentages are the quantitative language of comparing things. They appear in chemistry concentrations, physics efficiencies, and biological statistics.' },
        { type:'h2', text:'Ratios' },
        { type:'p', text:'A ratio compares two quantities. 3:4 means for every 3 of one thing, there are 4 of another. Simplify by dividing by the HCF.' },
        { type:'worked', label:'Simplifying ratios', steps:[
          ['24:36','HCF = 12 → 2:3'],
          ['150 g : 1 kg','Convert units first: 150:1000 → 3:20'],
        ]},
        { type:'h2', text:'Direct & inverse proportion' },
        { type:'formula', text:'Direct: y = kx   (y doubles when x doubles)\nInverse: y = k/x  (y halves when x doubles)' },
        { type:'science', text:'Boyle\'s Law: P × V = constant (inverse proportion). If pressure doubles, volume halves. Charles\'s Law: V/T = constant (direct proportion at constant pressure).' },
        { type:'h2', text:'Percentage change' },
        { type:'formula', text:'% change = (new − old) / old × 100' },
        { type:'worked', label:'Examples', steps:[
          ['Price rises from $40 to $52','(52−40)/40 × 100 = 30% increase'],
          ['Population falls from 500 to 350','(350−500)/500 × 100 = −30% (30% decrease)'],
        ]},
        { type:'worked', label:'Dilution problem (chemistry)', steps:[
          ['Stock: 2 mol/L, target: 0.5 mol/L in 500 mL','C₁V₁ = C₂V₂'],
          ['2 × V₁ = 0.5 × 500','V₁ = 250/2 = 125 mL of stock needed'],
        ]},
        { type:'keypoints', points:[
          'Simplify ratios by dividing by the HCF',
          'Direct proportion: y = kx; inverse: y = k/x',
          '% change = (new − old) / old × 100',
          'Always convert to the same units before writing a ratio',
        ]},
      ]
    },

    'W1L5': {
      stageId:'S1', week:5, title:'Linear Equations & Inequalities', xp:120, readMin:20,
      tags:['linear-equations','inequalities','algebra','solving'],
      sections:[
        { type:'intro', text:'A linear equation is one where the unknown appears to the first power (no x², no x³). Solving means isolating x by performing the same operation on both sides.' },
        { type:'h2', text:'Solving linear equations' },
        { type:'formula', text:'Golden rule: whatever you do to one side, do to the other' },
        { type:'worked', label:'Two-step equation: 3x + 7 = 22', steps:[
          ['Subtract 7 from both sides','3x = 15'],
          ['Divide both sides by 3','x = 5'],
          ['Check: 3(5) + 7 = 22','✓'],
        ]},
        { type:'worked', label:'Variables on both sides: 4x − 3 = 2x + 9', steps:[
          ['Subtract 2x from both sides','2x − 3 = 9'],
          ['Add 3 to both sides','2x = 12'],
          ['Divide by 2','x = 6'],
        ]},
        { type:'h2', text:'Inequalities' },
        { type:'p', text:'Solve like equations BUT: when you multiply or divide by a negative number, flip the inequality sign.' },
        { type:'worked', label:'Inequality: −2x + 5 > 11', steps:[
          ['Subtract 5','−2x > 6'],
          ['Divide by −2 — FLIP the sign','x < −3'],
        ]},
        { type:'science', text:"Ohm's Law: V = IR. Solving for R: R = V/I. Solving for I: I = V/R. Every physics formula is a linear equation waiting to be rearranged." },
        { type:'keypoints', points:[
          'Isolate x by undoing operations in reverse PEMDAS order',
          'Whatever you do to one side, do to the other',
          'Multiplying or dividing by a negative flips the inequality',
          'Always check your answer by substituting back',
        ]},
      ]
    },

    'W1L6': {
      stageId:'S1', week:6, title:'Rearranging Formulas', xp:120, readMin:18,
      tags:['rearranging','formulas','subject','substitution'],
      sections:[
        { type:'intro', text:'Every formula in science is an equation. Being able to rearrange it to solve for any variable is one of the most practical mathematical skills you will ever learn.' },
        { type:'h2', text:'Making x the subject' },
        { type:'p', text:'Work backwards: identify what operations are being done to x and undo them in reverse order.' },
        { type:'worked', label:'Rearrange v = u + at to find t', steps:[
          ['Subtract u from both sides','v − u = at'],
          ['Divide both sides by a','t = (v − u) / a'],
        ]},
        { type:'worked', label:'Rearrange E = ½mv² to find v', steps:[
          ['Multiply both sides by 2','2E = mv²'],
          ['Divide both sides by m','2E/m = v²'],
          ['Take the square root','v = √(2E/m)'],
        ]},
        { type:'worked', label:'Rearrange PV = nRT to find T', steps:[
          ['Divide both sides by nR','T = PV / (nR)'],
        ]},
        { type:'science', text:"The most important formulas you'll rearrange: F = ma (solve for a or m), E = hf (solve for f), s = ½at² (solve for t), λ = v/f (solve for v or f)." },
        { type:'keypoints', points:[
          'Identify what is being done to your target variable',
          'Undo each operation in reverse order (like PEMDAS backwards)',
          'Square roots and squares are inverse operations',
          'Double-check by substituting numbers into both forms',
        ]},
      ]
    },

    'W1L7': {
      stageId:'S1', week:7, title:'Graphing Lines & Slope', xp:120, readMin:20,
      tags:['graphing','slope','linear','cartesian','intercept'],
      sections:[
        { type:'intro', text:'The Cartesian plane is where algebra becomes visual. Understanding straight-line graphs is essential for interpreting experimental data, velocity-time graphs, and linear relationships in science.' },
        { type:'h2', text:'The slope-intercept form' },
        { type:'formula', text:'y = mx + c\n\nm = slope (rise/run)   c = y-intercept' },
        { type:'worked', label:'Finding slope from two points: (1, 3) and (4, 9)', steps:[
          ['slope m = (y₂ − y₁) / (x₂ − x₁)','m = (9 − 3) / (4 − 1)'],
          ['m = 6 / 3 = 2','slope is 2'],
        ]},
        { type:'worked', label:'Graph y = −2x + 5', steps:[
          ['y-intercept: set x = 0','y = 5 → plot (0, 5)'],
          ['slope = −2: go right 1, down 2','next point: (1, 3)'],
          ['Draw line through both points',''],
        ]},
        { type:'h2', text:'Parallel & perpendicular' },
        { type:'formula', text:'Parallel lines: same slope (m₁ = m₂)\nPerpendicular lines: slopes multiply to −1 (m₁ × m₂ = −1)' },
        { type:'science', text:'A distance-time graph has slope = speed. A velocity-time graph has slope = acceleration. Beer-Lambert law: A = εlc is linear in concentration c, with slope εl.' },
        { type:'keypoints', points:[
          'y = mx + c: m is slope, c is y-intercept',
          'Slope = rise/run = (y₂−y₁)/(x₂−x₁)',
          'Positive slope → going up left to right; negative → going down',
          'Parallel lines share the same slope; perpendicular slopes multiply to −1',
        ]},
      ]
    },

    // ══════════════════════════════════════════
    // STAGE 2
    // ══════════════════════════════════════════
    'W2L1': {
      stageId:'S2', week:1, title:'Functions & Notation', xp:150, readMin:20,
      tags:['functions','domain','range','composition','notation'],
      sections:[
        { type:'intro', text:'A function is a rule that assigns exactly one output to each input. Functions are the fundamental objects of mathematics — everything from physics laws to neural networks are functions.' },
        { type:'formula', text:'f(x) = [rule applied to x]\n\nf: domain → codomain' },
        { type:'worked', label:'Evaluating functions', steps:[
          ['f(x) = 2x² − 3, find f(−2)','f(−2) = 2(4) − 3 = 5'],
          ['g(x) = √(x+1), find g(3)','g(3) = √4 = 2'],
        ]},
        { type:'h2', text:'Domain & range' },
        { type:'p', text:'Domain: all valid inputs. Range: all possible outputs. Restrict domain when the function breaks (division by zero, square root of negative).' },
        { type:'worked', label:'Finding domain', steps:[
          ['f(x) = √(x − 4)','Need x − 4 ≥ 0, so domain: x ≥ 4'],
          ['g(x) = 1/(x−2)','Need x ≠ 2, domain: x ∈ ℝ, x ≠ 2'],
        ]},
        { type:'h2', text:'Composition of functions' },
        { type:'formula', text:'(f ∘ g)(x) = f(g(x))   — apply g first, then f' },
        { type:'worked', label:'Composition example: f(x) = x², g(x) = x+1', steps:[
          ['(f ∘ g)(x) = f(g(x)) = f(x+1) = (x+1)²',''],
          ['(g ∘ f)(x) = g(f(x)) = g(x²) = x²+1','Note: order matters!'],
        ]},
        { type:'keypoints', points:['A function gives exactly one output per input','Domain: valid inputs; Range: possible outputs','f(x) notation means "the function f evaluated at x"','Composition: (f∘g)(x) = f(g(x)) — apply right to left'] },
      ]
    },

    'W2L2': {
      stageId:'S2', week:2, title:'Quadratic Functions', xp:150, readMin:22,
      tags:['quadratic','parabola','factoring','discriminant','vertex'],
      sections:[
        { type:'intro', text:'Quadratic functions model anything that goes up then comes down (or vice versa): projectile motion, profit curves, lens focal points.' },
        { type:'formula', text:'f(x) = ax² + bx + c  (standard form)\nf(x) = a(x−h)² + k  (vertex form at (h,k))' },
        { type:'h2', text:'Solving quadratics' },
        { type:'worked', label:'Method 1 — Factoring: x² − 5x + 6 = 0', steps:[
          ['Find two numbers multiplying to 6, adding to −5','−2 and −3'],
          ['Factor: (x−2)(x−3) = 0',''],
          ['Solutions: x = 2 or x = 3',''],
        ]},
        { type:'formula', text:'Quadratic Formula: x = (−b ± √(b²−4ac)) / 2a' },
        { type:'worked', label:'Method 2 — Formula: 2x² + 3x − 2 = 0', steps:[
          ['a=2, b=3, c=−2','discriminant = 9 + 16 = 25'],
          ['x = (−3 ± 5) / 4',''],
          ['x = ½  or  x = −2',''],
        ]},
        { type:'science', text:'Projectile height: h(t) = −½gt² + v₀t + h₀. Setting h=0 and using the quadratic formula gives the time of landing. This is how mission control calculates re-entry.' },
        { type:'keypoints', points:['Discriminant b²−4ac: positive → 2 real roots, zero → 1 root, negative → no real roots','Vertex at x = −b/2a','Quadratic formula always works when factoring is hard'] },
      ]
    },

    'W2L3': {
      stageId:'S2', week:3, title:'Exponential Functions', xp:150, readMin:20,
      tags:['exponential','growth','decay','half-life','base-e'],
      sections:[
        { type:'intro', text:'Exponential functions describe processes where the rate of change is proportional to the current value — bacterial growth, radioactive decay, compound interest, population dynamics.' },
        { type:'formula', text:'f(x) = a · bˣ\n\na = initial value,  b = growth factor\nb > 1: growth   0 < b < 1: decay' },
        { type:'h2', text:'The natural base e' },
        { type:'p', text:'e ≈ 2.71828… is the most natural base for exponential functions. It arises whenever a quantity grows continuously at a rate proportional to itself.' },
        { type:'formula', text:'Continuous growth/decay: N(t) = N₀ · e^(kt)\nk > 0: growth   k < 0: decay' },
        { type:'worked', label:'Half-life problem: Carbon-14 has half-life 5730 years. A sample has 80% remaining. How old is it?', steps:[
          ['Model: N(t) = N₀ · e^(kt)','At half-life: 0.5 = e^(5730k)'],
          ['k = ln(0.5)/5730 = −0.0001209',''],
          ['0.8 = e^(−0.0001209 · t)','ln(0.8) = −0.0001209t'],
          ['t = −0.22314 / −0.0001209 ≈ 1846 years',''],
        ]},
        { type:'science', text:'Radiocarbon dating uses exactly this model. First-order chemical reactions, pharmacokinetics (drug elimination), and Newton\'s law of cooling all follow N(t) = N₀e^(kt).' },
        { type:'keypoints', points:['bˣ with b>1 grows; 0<b<1 decays','e ≈ 2.718 is the natural base','N(t) = N₀e^(kt): k<0 for decay, k>0 for growth','Half-life T½ = ln(2)/|k|'] },
      ]
    },

    'W2L4': {
      stageId:'S2', week:4, title:'Logarithms', xp:150, readMin:22,
      tags:['logarithms','log-laws','natural-log','pH','exponential-equations'],
      sections:[
        { type:'intro', text:'A logarithm answers: "to what power must I raise the base to get this number?" Logarithms compress enormous scales and are fundamental to chemistry (pH), seismology (Richter scale), and acoustics (decibels).' },
        { type:'formula', text:'log_b(x) = y  ↔  bʸ = x\n\nlog₁₀(x) = log(x)   (common log)\nlog_e(x) = ln(x)    (natural log)' },
        { type:'h2', text:'The three log laws' },
        { type:'formula', text:'Product: log(AB) = log(A) + log(B)\nQuotient: log(A/B) = log(A) − log(B)\nPower: log(Aⁿ) = n·log(A)' },
        { type:'worked', label:'Solving exponential equations using logs', steps:[
          ['Solve 3ˣ = 50','Take log of both sides: x·log(3) = log(50)'],
          ['x = log(50)/log(3) = 1.699/0.477','x ≈ 3.56'],
        ]},
        { type:'worked', label:'pH Calculation', steps:[
          ['pH = −log₁₀[H⁺]','[H⁺] = 10⁻⁷ mol/L'],
          ['pH = −log(10⁻⁷) = −(−7) = 7','Neutral solution'],
          ['If [H⁺] = 2.5×10⁻⁴','pH = −log(2.5×10⁻⁴) = 3.60 (acidic)'],
        ]},
        { type:'science', text:'pH, decibels (dB = 10log(I/I₀)), Richter scale, and information entropy (Shannon: H = −Σ p·log₂(p)) are all logarithmic. Logs turn multiplication into addition — immensely useful.' },
        { type:'keypoints', points:['log_b(x)=y ↔ bʸ=x — convert between forms freely','Product→sum, quotient→difference, power→coefficient','ln(eˣ) = x and e^(ln x) = x — inverses','pH = −log[H⁺]'] },
      ]
    },

    'W2L5': {
      stageId:'S2', week:5, title:'Right-Triangle Trigonometry', xp:150, readMin:22,
      tags:['trigonometry','SOH-CAH-TOA','right-triangle','inverse-trig','pythagoras'],
      sections:[
        { type:'intro', text:'Trigonometry connects angles to side lengths. It is the mathematical language of waves, oscillations, and spatial geometry — from optics to structural engineering.' },
        { type:'formula', text:'sin θ = opposite/hypotenuse\ncos θ = adjacent/hypotenuse\ntan θ = opposite/adjacent\n\nMemory: SOH-CAH-TOA' },
        { type:'worked', label:'Finding an unknown side: angle = 35°, hypotenuse = 20 m, find opposite', steps:[
          ['sin(35°) = opposite / 20',''],
          ['opposite = 20 × sin(35°)','= 20 × 0.5736 = 11.47 m'],
        ]},
        { type:'worked', label:'Resolving a 50 N force at 40° above horizontal', steps:[
          ['Horizontal component = 50 cos(40°)','= 50 × 0.766 = 38.3 N'],
          ['Vertical component = 50 sin(40°)','= 50 × 0.643 = 32.1 N'],
        ]},
        { type:'h2', text:'Inverse trig functions' },
        { type:'formula', text:'θ = sin⁻¹(ratio) = arcsin(ratio)\nθ = cos⁻¹(ratio) = arccos(ratio)\nθ = tan⁻¹(ratio) = arctan(ratio)' },
        { type:'science', text:'Forces in static equilibrium, inclined planes, vector decomposition in 2D, refraction angles (Snell\'s law: n₁sin θ₁ = n₂sin θ₂) — all use basic trigonometry.' },
        { type:'keypoints', points:['SOH-CAH-TOA: sin=opp/hyp, cos=adj/hyp, tan=opp/adj','Inverse trig (arcsin, arccos, arctan) gives the angle','Pythagoras: a²+b²=c² always holds in right triangles','Always check your calculator is in the correct mode (degrees vs radians)'] },
      ]
    },

    'W2L6': {
      stageId:'S2', week:6, title:'Unit Circle & Radians', xp:150, readMin:20,
      tags:['unit-circle','radians','exact-values','reference-angles','trig-graphs'],
      sections:[
        { type:'intro', text:'The unit circle extends trigonometry beyond right triangles to all angles. Radians are the natural unit for angles in calculus and physics.' },
        { type:'formula', text:'Radians ↔ Degrees:\nradians = degrees × π/180\ndegrees = radians × 180/π' },
        { type:'h2', text:'Key exact values' },
        { type:'table', rows:[
          ['Angle (°)','Angle (rad)','sin','cos','tan'],
          ['0°','0','0','1','0'],
          ['30°','π/6','1/2','√3/2','1/√3'],
          ['45°','π/4','√2/2','√2/2','1'],
          ['60°','π/3','√3/2','1/2','√3'],
          ['90°','π/2','1','0','undefined'],
        ]},
        { type:'p', text:'For angles beyond 90°, use the CAST rule: in Q1 All positive, Q2 Sin positive, Q3 Tan positive, Q4 Cos positive.' },
        { type:'science', text:"Simple harmonic motion: x(t) = A cos(ωt + φ). Wave equation: y = A sin(kx − ωt). All physics involving oscillations uses radian-measure trig." },
        { type:'keypoints', points:['π radians = 180°','Unit circle: point (cos θ, sin θ) for any angle θ','Memorise exact values at 0, π/6, π/4, π/3, π/2','CAST rule for signs in each quadrant'] },
      ]
    },

    'W2L7': {
      stageId:'S2', week:7, title:'Vectors in 2D', xp:150, readMin:20,
      tags:['vectors','magnitude','direction','dot-product','vector-addition'],
      sections:[
        { type:'intro', text:'A vector has both magnitude and direction. Vectors are used to represent forces, velocities, electric fields, and any quantity where direction matters.' },
        { type:'formula', text:'Vector: v = (vₓ, v_y) = vₓî + v_yĵ\nMagnitude: |v| = √(vₓ² + v_y²)\nDirection: θ = arctan(v_y / vₓ)' },
        { type:'worked', label:'Adding vectors: a = (3,4), b = (−1,2)', steps:[
          ['a + b = (3+(−1), 4+2) = (2, 6)','Add components'],
          ['|a + b| = √(4+36) = √40 ≈ 6.32','Magnitude of resultant'],
        ]},
        { type:'h2', text:'Dot product' },
        { type:'formula', text:'a · b = aₓbₓ + a_yb_y = |a||b|cos θ\n\nIf a · b = 0, the vectors are perpendicular' },
        { type:'worked', label:'Find angle between (1,0) and (1,1)', steps:[
          ['a · b = 1(1) + 0(1) = 1',''],
          ['|a| = 1, |b| = √2',''],
          ['cos θ = 1/(1·√2) = 1/√2','θ = 45°'],
        ]},
        { type:'science', text:'Work = F · d = |F||d|cos θ. If force is perpendicular to motion, no work is done. The dot product quantifies how aligned two vectors are.' },
        { type:'keypoints', points:['Add vectors component by component','Magnitude: |v| = √(vₓ²+v_y²)','Dot product: a·b = |a||b|cosθ — measures alignment','Perpendicular vectors have dot product = 0'] },
      ]
    },

    // ══════════════════════════════════════════
    // STAGE 3 (representative lessons)
    // ══════════════════════════════════════════
    'W3L1': {
      stageId:'S3', week:1, title:'Limits & Continuity', xp:180, readMin:22,
      tags:['limits','continuity','epsilon-delta','limit-laws'],
      sections:[
        { type:'intro', text:'Limits are the foundation of all calculus. They answer: "what value does a function approach as the input gets close to some point?" Without limits, differentiation and integration have no rigorous meaning.' },
        { type:'formula', text:'lim(x→a) f(x) = L\nMeans: f(x) gets arbitrarily close to L as x→a\n(NOT necessarily f(a) itself)' },
        { type:'h2', text:'Limit laws' },
        { type:'formula', text:'lim[f(x) ± g(x)] = lim f(x) ± lim g(x)\nlim[f(x)·g(x)] = lim f(x) · lim g(x)\nlim[f(x)/g(x)] = lim f(x) / lim g(x)  (if denominator ≠ 0)' },
        { type:'worked', label:'Algebraic evaluation: lim(x→2) (x²−4)/(x−2)', steps:[
          ['Direct substitution gives 0/0 (indeterminate)','Factor the numerator'],
          ['(x²−4) = (x−2)(x+2)','Cancel (x−2)'],
          ['lim = (x+2) as x→2 = 4','Answer: 4'],
        ]},
        { type:'h2', text:'Continuity' },
        { type:'p', text:'f is continuous at x=a if: (1) f(a) is defined, (2) the limit exists, (3) the limit equals f(a). A function is continuous if you can draw it without lifting your pen.' },
        { type:'keypoints', points:['Limits describe approach, not arrival','0/0 is indeterminate — try factoring, rationalising, or L\'Hôpital','A function is continuous if limit = function value','Polynomials and trig functions are continuous everywhere on their domain'] },
      ]
    },

    'W3L2': {
      stageId:'S3', week:2, title:'The Derivative', xp:180, readMin:25,
      tags:['derivative','rate-of-change','tangent-line','power-rule','velocity'],
      sections:[
        { type:'intro', text:'The derivative measures instantaneous rate of change — the slope of the curve at a single point. It is the central concept of differential calculus.' },
        { type:'formula', text:'f\'(x) = lim(h→0) [f(x+h) − f(x)] / h' },
        { type:'h2', text:'The power rule' },
        { type:'formula', text:'d/dx [xⁿ] = nxⁿ⁻¹\n\nAlso:\nd/dx [eˣ] = eˣ\nd/dx [ln x] = 1/x\nd/dx [sin x] = cos x\nd/dx [cos x] = −sin x' },
        { type:'worked', label:'Applying the power rule', steps:[
          ['d/dx [x⁵] = 5x⁴','Bring down exponent, subtract 1'],
          ['d/dx [3x²] = 6x','Constant multiplier stays'],
          ['d/dx [√x] = d/dx [x^½] = ½x^(−½)','√x = x^½'],
          ['d/dx [7] = 0','Derivative of a constant is zero'],
        ]},
        { type:'worked', label:'Physics application: s(t) = 4t² + 2t + 1 (position)', steps:[
          ['Velocity: v(t) = s\'(t) = 8t + 2','Differentiate each term'],
          ['Acceleration: a(t) = v\'(t) = 8','Constant acceleration'],
          ['Find velocity at t=3: v(3) = 24+2 = 26 m/s',''],
        ]},
        { type:'science', text:'Newton\'s second law F=ma can be written F = m·d²s/dt². Every rate of change in physics — velocity, acceleration, current, reaction rate — is a derivative.' },
        { type:'keypoints', points:['Derivative = slope of tangent = instantaneous rate of change','Power rule: d/dx[xⁿ] = nxⁿ⁻¹','d/dx[eˣ]=eˣ, d/dx[ln x]=1/x, d/dx[sin x]=cos x','Velocity = ds/dt, acceleration = dv/dt = d²s/dt²'] },
      ]
    },

    'W3L3': {
      stageId:'S3', week:3, title:'Differentiation Rules', xp:180, readMin:22,
      tags:['product-rule','quotient-rule','chain-rule','differentiation'],
      sections:[
        { type:'intro', text:'Real-world functions are combinations of simpler ones. The product, quotient, and chain rules let you differentiate any combination.' },
        { type:'formula', text:'Product rule: d/dx[uv] = u\'v + uv\'\nQuotient rule: d/dx[u/v] = (u\'v − uv\') / v²\nChain rule: d/dx[f(g(x))] = f\'(g(x)) · g\'(x)' },
        { type:'worked', label:'Product rule: differentiate x²·sin x', steps:[
          ['u = x², v = sin x','u\' = 2x, v\' = cos x'],
          ['d/dx[x²sin x] = 2x·sin x + x²·cos x',''],
        ]},
        { type:'worked', label:'Chain rule: differentiate sin(3x²)', steps:[
          ['Outer function: sin(u), inner: u=3x²','f\'(u) = cos(u), g\'(x) = 6x'],
          ['d/dx[sin(3x²)] = cos(3x²)·6x',''],
        ]},
        { type:'worked', label:'Quotient rule: differentiate (x²+1)/(x−1)', steps:[
          ['u=x²+1, v=x−1','u\'=2x, v\'=1'],
          ['= (2x(x−1) − (x²+1)·1) / (x−1)²',''],
          ['= (2x²−2x − x²−1) / (x−1)² = (x²−2x−1)/(x−1)²',''],
        ]},
        { type:'keypoints', points:['Product rule: (uv)\' = u\'v + uv\'','Quotient rule: (u/v)\' = (u\'v−uv\')/v²','Chain rule: work from outside in','Chain rule is the most used rule in calculus — master it'] },
      ]
    },

    'W3L4': { stageId:'S3', week:4, title:'Optimisation & Applications', xp:180, readMin:22, tags:['optimisation','critical-points','second-derivative','maxima','minima'], sections:[
      { type:'intro', text:'The derivative is zero at local maxima and minima. This lets us find optimal values in engineering, economics, and science.' },
      { type:'formula', text:'Critical points: f\'(x) = 0\nSecond derivative test:\n  f\'\'(x) > 0 → local minimum (concave up)\n  f\'\'(x) < 0 → local maximum (concave down)' },
      { type:'worked', label:'Find extrema of f(x) = x³ − 6x² + 9x + 1', steps:[
        ['f\'(x) = 3x² − 12x + 9 = 0','Divide by 3: x²−4x+3=0'],
        ['(x−1)(x−3) = 0','x=1 or x=3'],
        ['f\'\'(x) = 6x−12','f\'\'(1) = −6 < 0 → local max; f\'\'(3) = 6 > 0 → local min'],
      ]},
      { type:'keypoints', points:['Set f\'(x)=0 to find critical points','Second derivative test confirms max/min','Global extrema may occur at boundaries','Real problems: maximise area, minimise cost, find peak concentration'] },
    ]},

    'W3L5': { stageId:'S3', week:5, title:'Introduction to Integration', xp:180, readMin:22, tags:['integration','antiderivative','indefinite-integral','riemann-sum','area'], sections:[
      { type:'intro', text:'Integration is the reverse of differentiation. It accumulates change — finding area under curves, total displacement, total charge, and total energy.' },
      { type:'formula', text:'Indefinite integral: ∫f(x)dx = F(x) + C\nwhere F\'(x) = f(x)\n\nBasic integrals:\n∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ −1)\n∫eˣ dx = eˣ + C\n∫(1/x) dx = ln|x| + C\n∫sin x dx = −cos x + C\n∫cos x dx = sin x + C' },
      { type:'worked', label:'Basic integration examples', steps:[
        ['∫3x² dx = x³ + C','Power rule reversed'],
        ['∫(2x + 5) dx = x² + 5x + C','Integrate term by term'],
        ['∫e²ˣ dx = ½e²ˣ + C','Chain rule in reverse'],
      ]},
      { type:'science', text:'Displacement = ∫velocity dt. Total charge = ∫current dt. Work = ∫F dx. Integration converts rates into totals.' },
      { type:'keypoints', points:['Integration reverses differentiation','∫xⁿ dx = xⁿ⁺¹/(n+1) + C','Always add +C for indefinite integrals','The area under a curve = definite integral'] },
    ]},

    'W3L6': { stageId:'S3', week:6, title:'Fundamental Theorem of Calculus', xp:180, readMin:22, tags:['FTC','definite-integral','net-change','area','antiderivative'], sections:[
      { type:'intro', text:'The FTC is one of the greatest results in mathematics. It reveals that differentiation and integration are inverse operations — bridging the gap between rates and totals.' },
      { type:'formula', text:'FTC Part 1: d/dx[∫ₐˣ f(t)dt] = f(x)\n\nFTC Part 2: ∫ₐᵇ f(x)dx = F(b) − F(a)\nwhere F is any antiderivative of f' },
      { type:'worked', label:'Evaluate ∫₀³ (2x+1) dx', steps:[
        ['Antiderivative: F(x) = x² + x',''],
        ['F(3) − F(0) = (9+3) − 0 = 12',''],
      ]},
      { type:'worked', label:'Find area under y = x² from x=1 to x=3', steps:[
        ['∫₁³ x² dx = [x³/3]₁³ = 27/3 − 1/3 = 26/3 ≈ 8.67',''],
      ]},
      { type:'keypoints', points:['FTC Part 2: ∫ₐᵇ f dx = F(b)−F(a)','Find antiderivative, then evaluate at bounds','Definite integral gives signed area','Net change = ∫(rate of change) dt'] },
    ]},

    'W3L7': { stageId:'S3', week:7, title:'Differential Equations', xp:180, readMin:24, tags:['ODE','separable','initial-value','exponential-growth','decay'], sections:[
      { type:'intro', text:'A differential equation (ODE) contains derivatives. Most physical laws are ODEs: Newton\'s second law, radioactive decay, population growth, electrical circuits.' },
      { type:'formula', text:'Separable ODE: dy/dx = g(x)·h(y)\n\nSolve by separating: dy/h(y) = g(x)dx\nthen integrate both sides' },
      { type:'worked', label:'Solve dy/dx = 2y', steps:[
        ['Separate: dy/y = 2 dx',''],
        ['Integrate: ln|y| = 2x + C',''],
        ['Exponentiate: y = Ae²ˣ (A = eᶜ)','General solution'],
        ['With y(0)=3: 3=Ae⁰=A, so y = 3e²ˣ','Particular solution'],
      ]},
      { type:'worked', label:'Radioactive decay: dN/dt = −λN', steps:[
        ['Separate: dN/N = −λ dt',''],
        ['Integrate: ln|N| = −λt + C',''],
        ['N(t) = N₀e^(−λt)',''],
        ['Half-life: T½ = ln(2)/λ','e.g. C-14: λ=1.21×10⁻⁴/yr → T½≈5730 yr'],
      ]},
      { type:'science', text:'Newton\'s law of cooling: dT/dt = −k(T−Tₑ). First-order chemical reactions: d[A]/dt = −k[A]. All solved by the same separation of variables technique.' },
      { type:'keypoints', points:['Separate variables: dy/h(y)=g(x)dx then integrate both sides','Solution contains arbitrary constant C','Initial condition pins down the particular solution','N(t)=N₀e^(kt) solves dN/dt=kN'] },
    ]},

    // ══════════════════════════════════════════
    // STAGE 4 (representative)
    // ══════════════════════════════════════════
    'W4L1': { stageId:'S4', week:1, title:'Vectors in 3D', xp:200, readMin:22, tags:['vectors-3D','dot-product','cross-product','torque'], sections:[
      { type:'intro', text:'3D vectors underpin all of classical mechanics, electromagnetism, and computer graphics. The cross product gives us torque, angular momentum, and surface normals.' },
      { type:'formula', text:'a = (a₁,a₂,a₃)\n|a| = √(a₁²+a₂²+a₃²)\n\nDot product: a·b = a₁b₁+a₂b₂+a₃b₃\nCross product: a×b = |i  j  k |\n                      |a₁ a₂ a₃|\n                      |b₁ b₂ b₃|' },
      { type:'worked', label:'Cross product: a=(1,2,3), b=(4,5,6)', steps:[
        ['a×b = (2·6−3·5, 3·4−1·6, 1·5−2·4)',''],
        ['= (12−15, 12−6, 5−8) = (−3, 6, −3)',''],
      ]},
      { type:'science', text:'Torque τ = r × F. If r=(0.5,0,0) m and F=(0,10,0) N, τ=(0,0,5) N·m — the torque is along the z-axis, causing rotation in the xy-plane.' },
      { type:'keypoints', points:['Cross product gives a vector perpendicular to both inputs','|a×b| = |a||b|sin θ — zero if parallel','a×b = −b×a (anti-commutative)','Applications: torque, angular momentum, surface area'] },
    ]},

    'W4L2': { stageId:'S4', week:2, title:'Matrices: Structure & Operations', xp:200, readMin:22, tags:['matrices','matrix-multiplication','transpose','dimensions'], sections:[
      { type:'intro', text:'A matrix is a rectangular array of numbers. Matrices represent linear transformations, systems of equations, and data. Matrix multiplication is non-commutative — order matters.' },
      { type:'formula', text:'[A]ₘₓₙ: m rows, n columns\n\nAB is defined only if cols(A) = rows(B)\nResult: [AB]ₘₓₚ if A is m×n and B is n×p' },
      { type:'worked', label:'2×2 matrix multiplication', steps:[
        ['A = [[1,2],[3,4]]  B = [[5,6],[7,8]]',''],
        ['AB[1,1] = 1×5+2×7 = 19',''],
        ['AB[1,2] = 1×6+2×8 = 22',''],
        ['AB[2,1] = 3×5+4×7 = 43',''],
        ['AB[2,2] = 3×6+4×8 = 50',''],
        ['AB = [[19,22],[43,50]]',''],
      ]},
      { type:'keypoints', points:['Matrix multiplication is NOT commutative: AB ≠ BA in general','Dimensions: (m×n)(n×p) = m×p','Identity matrix I: AI = IA = A','Transpose: swap rows and columns'] },
    ]},

    'W4L3': { stageId:'S4', week:3, title:'Systems of Equations', xp:200, readMin:22, tags:['gaussian-elimination','row-operations','augmented-matrix','systems'], sections:[
      { type:'intro', text:'Systems of linear equations appear everywhere: circuit analysis, structural forces, chemical stoichiometry. Gaussian elimination is a systematic algorithmic solution.' },
      { type:'p', text:'Write the augmented matrix [A|b] and use row operations to reach row echelon form.' },
      { type:'worked', label:'Solve: 2x+y=5, x−y=1', steps:[
        ['Augmented matrix: [[2,1,5],[1,−1,1]]',''],
        ['R1 ↔ R2: [[1,−1,1],[2,1,5]]',''],
        ['R2 − 2R1: [[1,−1,1],[0,3,3]]',''],
        ['R2/3: [[1,−1,1],[0,1,1]]','y=1'],
        ['R1+R2: [[1,0,2],[0,1,1]]','x=2, y=1'],
      ]},
      { type:'keypoints', points:['Augmented matrix [A|b] encodes the system','Row operations: swap, scale, add multiple of one row to another','Back-substitution from row echelon form','No solution: contradiction row; infinite solutions: free variable'] },
    ]},

    'W4L4': { stageId:'S4', week:4, title:'Eigenvalues & Eigenvectors', xp:200, readMin:25, tags:['eigenvalues','eigenvectors','characteristic-polynomial','diagonalisation'], sections:[
      { type:'intro', text:'Eigenvalues and eigenvectors reveal the "natural directions" of a linear transformation. They are fundamental to quantum mechanics (energy levels), Google\'s PageRank, principal component analysis, and stability analysis.' },
      { type:'formula', text:'Av = λv\n\nλ = eigenvalue (scalar)\nv = eigenvector (non-zero vector)\n\nFind λ: det(A − λI) = 0 (characteristic equation)' },
      { type:'worked', label:'Find eigenvalues of A = [[3,1],[0,2]]', steps:[
        ['det(A−λI) = (3−λ)(2−λ) − 0 = 0',''],
        ['(3−λ)(2−λ) = 0',''],
        ['λ₁ = 3, λ₂ = 2','Two eigenvalues'],
        ['For λ=3: (A−3I)v=0 → [0,1;0,−1]v=0 → v=(1,0)',''],
        ['For λ=2: (A−2I)v=0 → [1,1;0,0]v=0 → v=(−1,1)',''],
      ]},
      { type:'science', text:'In quantum mechanics, the Schrödinger equation Hψ = Eψ is an eigenvalue equation: ψ is the eigenfunction (state), E is the eigenvalue (energy). Molecular orbitals are eigenvectors of the Hamiltonian.' },
      { type:'keypoints', points:['Solve det(A−λI)=0 for eigenvalues λ','Then solve (A−λI)v=0 for eigenvectors','Eigenvalues can be complex','Symmetric matrices always have real eigenvalues'] },
    ]},

    'W4L5': { stageId:'S4', week:5, title:'Probability Foundations', xp:200, readMin:22, tags:['probability','conditional','bayes','independence','sample-space'], sections:[
      { type:'intro', text:'Probability quantifies uncertainty. Bayes\' theorem lets us update our beliefs as new evidence arrives — it underpins medical diagnosis, machine learning, and scientific inference.' },
      { type:'formula', text:'P(A) ∈ [0,1]\nP(A ∪ B) = P(A) + P(B) − P(A ∩ B)\nP(A|B) = P(A ∩ B) / P(B)\n\nBayes\' Theorem:\nP(A|B) = P(B|A)·P(A) / P(B)' },
      { type:'worked', label:'Medical test (Bayes): disease prevalence 1%, test 99% accurate', steps:[
        ['P(D)=0.01, P(+|D)=0.99, P(+|¬D)=0.01',''],
        ['P(+) = 0.99×0.01 + 0.01×0.99 = 0.0198',''],
        ['P(D|+) = (0.99×0.01)/0.0198 = 0.5','Only 50% chance!'],
        ['Low prevalence dramatically reduces positive predictive value',''],
      ]},
      { type:'keypoints', points:['P(A|B) = P(A∩B)/P(B) — conditional probability','Bayes: P(A|B) = P(B|A)·P(A)/P(B)','Independent events: P(A∩B)=P(A)·P(B)','Rare diseases + imperfect tests → many false positives'] },
    ]},

    'W4L6': { stageId:'S4', week:6, title:'Distributions & Statistics', xp:200, readMin:22, tags:['normal-distribution','z-scores','hypothesis-testing','p-value'], sections:[
      { type:'intro', text:'The normal distribution is the most important distribution in statistics — the central limit theorem ensures that averages of large samples are approximately normal, regardless of the original distribution.' },
      { type:'formula', text:'Normal: X ~ N(μ, σ²)\nZ-score: z = (x − μ) / σ\n\nEmpirical rule:\n  68% within 1σ\n  95% within 2σ\n  99.7% within 3σ' },
      { type:'worked', label:'Hypothesis testing: is a coin fair? 60 heads in 100 flips', steps:[
        ['H₀: p=0.5, H₁: p≠0.5','Two-tailed test'],
        ['z = (0.6−0.5)/√(0.25/100) = 0.1/0.05 = 2.0',''],
        ['p-value = 2×P(Z>2) ≈ 0.046',''],
        ['p < 0.05 → reject H₀ at 5% significance','Evidence coin is biased'],
      ]},
      { type:'keypoints', points:['Z-score = (value−mean)/std — standardises to N(0,1)','p-value: probability of observed result if H₀ true','p < α: reject H₀; p ≥ α: fail to reject','95% CI: x̄ ± 1.96σ/√n'] },
    ]},

    'W4L7': { stageId:'S4', week:7, title:'Linear Regression', xp:200, readMin:20, tags:['regression','least-squares','r-squared','residuals','correlation'], sections:[
      { type:'intro', text:'Linear regression finds the best-fit straight line through data. It is the most widely used statistical method in science for modelling relationships between variables.' },
      { type:'formula', text:'ŷ = β₀ + β₁x\n\nLeast-squares: minimise Σ(yᵢ − ŷᵢ)²\n\nβ₁ = Σ(xᵢ−x̄)(yᵢ−ȳ) / Σ(xᵢ−x̄)²\nβ₀ = ȳ − β₁x̄\n\nR² = 1 − SSres/SStot' },
      { type:'p', text:'R² (coefficient of determination) measures the proportion of variance explained by the model. R²=1 means perfect fit; R²=0 means the model explains nothing.' },
      { type:'science', text:'Beer-Lambert law: A = εlc. Plotting absorbance A vs concentration c should give a straight line through the origin with slope εl. The R² value tells you how linear your calibration curve is.' },
      { type:'keypoints', points:['Regression finds the line minimising sum of squared residuals','β₁ is the slope, β₀ is the intercept','R² ∈ [0,1]: proportion of variance explained','Correlation r = √R² (for simple regression)'] },
    ]},

    // ══════════════════════════════════════════
    // STAGE 5 (representative)
    // ══════════════════════════════════════════
    'W5L1': { stageId:'S5', week:1, title:'Multivariable Functions', xp:250, readMin:24, tags:['partial-derivatives','gradient','surfaces','level-curves'], sections:[
      { type:'intro', text:'Functions of multiple variables describe the real world — temperature varies in 3D space, potential energy depends on position, pressure depends on volume and temperature simultaneously.' },
      { type:'formula', text:'f(x,y): partial derivative\n∂f/∂x = derivative w.r.t. x, treating y as constant\n∂f/∂y = derivative w.r.t. y, treating x as constant\n\nGradient: ∇f = (∂f/∂x, ∂f/∂y)' },
      { type:'worked', label:'Find partial derivatives of f(x,y) = x²y + sin(y)', steps:[
        ['∂f/∂x = 2xy','y treated as constant'],
        ['∂f/∂y = x² + cos(y)','x treated as constant'],
        ['∇f = (2xy, x²+cos y)','Gradient vector'],
      ]},
      { type:'science', text:'The gradient ∇T of temperature T points in the direction of steepest increase. Heat flows opposite to the gradient: J = −k∇T (Fourier\'s law of heat conduction).' },
      { type:'keypoints', points:['∂f/∂x: differentiate w.r.t. x, freeze all other variables','Gradient ∇f points in direction of steepest ascent','|∇f| = rate of maximum increase','Level curves: f(x,y)=c are perpendicular to the gradient'] },
    ]},

    'W5L2': { stageId:'S5', week:2, title:'Gradient, Divergence & Curl', xp:250, readMin:24, tags:['gradient','divergence','curl','vector-calculus','del'], sections:[
      { type:'intro', text:'Vector calculus operators — gradient, divergence, and curl — are the language of electromagnetism, fluid dynamics, and heat transfer. Maxwell\'s equations are written entirely in these operators.' },
      { type:'formula', text:'∇ = (∂/∂x, ∂/∂y, ∂/∂z)  (del operator)\n\nGradient of scalar f: ∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)\nDivergence of vector F: ∇·F = ∂F₁/∂x+∂F₂/∂y+∂F₃/∂z\nCurl of vector F: ∇×F = det[i j k; ∂x ∂y ∂z; F₁ F₂ F₃]' },
      { type:'science', text:'Maxwell\'s equations: ∇·E = ρ/ε₀ (Gauss), ∇·B = 0 (no monopoles), ∇×E = −∂B/∂t (Faraday), ∇×B = μ₀J + μ₀ε₀∂E/∂t (Ampère). These four equations describe all classical electromagnetism.' },
      { type:'keypoints', points:['∇f points in direction of steepest ascent of f','∇·F measures source strength (flux per unit volume)','∇×F measures rotation/circulation (vorticity)','Conservative field: ∇×F=0 and ∇·F=0'] },
    ]},

    'W5L3': { stageId:'S5', week:3, title:'Double & Triple Integrals', xp:250, readMin:24, tags:['double-integral','triple-integral','fubini','polar-coordinates','volume'], sections:[
      { type:'intro', text:'Double and triple integrals extend single-variable integration to regions in 2D and 3D space. They compute areas, volumes, masses of non-uniform objects, and flux through surfaces.' },
      { type:'formula', text:'Double: ∬_D f(x,y) dA = ∫∫ f(x,y) dy dx (Fubini\'s theorem)\nTriple: ∭_V f(x,y,z) dV\n\nPolar: dA = r dr dθ (useful for circles)\nCylindrical: dV = r dr dθ dz\nSpherical: dV = ρ² sin φ dρ dφ dθ' },
      { type:'worked', label:'Evaluate ∫₀¹ ∫₀² (x+y) dy dx', steps:[
        ['Inner integral: ∫₀² (x+y) dy = [xy+y²/2]₀² = 2x+2',''],
        ['Outer integral: ∫₀¹ (2x+2) dx = [x²+2x]₀¹ = 1+2 = 3',''],
      ]},
      { type:'keypoints', points:['Fubini: integrate in either order for rectangular regions','Choose coordinates to simplify the region: polar for circles, spherical for balls','Volume = ∭ dV, Mass = ∭ ρ(x,y,z) dV','Always check integration limits carefully'] },
    ]},

    'W5L4': { stageId:'S5', week:4, title:'Fourier Series & Transforms', xp:250, readMin:26, tags:['fourier-series','fourier-transform','harmonics','frequency-domain'], sections:[
      { type:'intro', text:'Any periodic function can be decomposed into a sum of sines and cosines. This is Fourier analysis — the mathematical foundation of signal processing, MRI imaging, quantum mechanics, and audio engineering.' },
      { type:'formula', text:'Fourier series of f(x) on [−L,L]:\nf(x) = a₀/2 + Σ[aₙcos(nπx/L) + bₙsin(nπx/L)]\n\naₙ = (1/L)∫₋ₗᴸ f(x)cos(nπx/L)dx\nbₙ = (1/L)∫₋ₗᴸ f(x)sin(nπx/L)dx\n\nFourier Transform: F̂(ω) = ∫f(t)e^(−iωt)dt' },
      { type:'science', text:'MRI machines use Fourier transforms to reconstruct images from k-space data. Your phone\'s audio equaliser splits sound into frequency bands using FFT (Fast Fourier Transform). NMR spectroscopy is Fourier analysis of free induction decay signals.' },
      { type:'keypoints', points:['Any periodic function = sum of sinusoids at different frequencies','Coefficients aₙ, bₙ give the amplitude at each frequency','Fourier transform extends this to non-periodic functions','FFT computes the DFT in O(N log N) — enables real-time signal processing'] },
    ]},

    'W5L5': { stageId:'S5', week:5, title:'Partial Differential Equations', xp:250, readMin:26, tags:['PDE','heat-equation','wave-equation','separation-of-variables','boundary-conditions'], sections:[
      { type:'intro', text:'PDEs describe how quantities change over both space and time. The heat equation models temperature diffusion; the wave equation models sound, light, and quantum wavefunctions.' },
      { type:'formula', text:'Heat equation: ∂u/∂t = k∂²u/∂x²\nWave equation: ∂²u/∂t² = c²∂²u/∂x²\nLaplace equation: ∇²u = 0\n\nMethod of separation of variables: assume u(x,t) = X(x)T(t)' },
      { type:'worked', label:'Solve heat equation ∂u/∂t = ∂²u/∂x² on [0,π] with u(0)=u(π)=0', steps:[
        ['Assume u = X(x)T(t)','Substitute into PDE'],
        ['T\'/T = X\'/X = −λ','Both sides must equal same constant'],
        ['X\'+ λX = 0, X(0)=X(π)=0','Eigenvalue problem'],
        ['Xₙ = sin(nx), λₙ = n²','n = 1,2,3,…'],
        ['Tₙ = e^(−n²t)','Solving T\' = −λT'],
        ['u(x,t) = Σ bₙ sin(nx) e^(−n²t)','General solution'],
      ]},
      { type:'keypoints', points:['PDEs: functions of multiple variables with partial derivatives','Separation of variables: u(x,t)=X(x)T(t) → two ODEs','Boundary conditions determine allowed eigenvalues','The heat equation solution decays exponentially in time'] },
    ]},

    'W5L6': { stageId:'S5', week:6, title:'Complex Analysis', xp:250, readMin:24, tags:['complex-numbers','euler-formula','analytic-functions','cauchy-riemann'], sections:[
      { type:'intro', text:'Complex analysis is mathematics of breathtaking elegance. Euler\'s formula eⁱθ = cos θ + i sin θ is one of the most beautiful equations ever written, connecting five fundamental constants.' },
      { type:'formula', text:'z = a + bi  (Cartesian)\nz = re^(iθ)  (polar/exponential)\n\nEuler\'s formula: e^(iθ) = cos θ + i sin θ\ne^(iπ) + 1 = 0  (Euler\'s identity)\n\nConjugate: z̄ = a − bi\n|z| = √(a²+b²)' },
      { type:'worked', label:'Convert z = 1 + i to polar form', steps:[
        ['|z| = √(1+1) = √2',''],
        ['θ = arctan(1/1) = π/4',''],
        ['z = √2 · e^(iπ/4)',''],
      ]},
      { type:'science', text:'AC circuits: impedance Z = R + iωL − i/ωC. Complex exponentials make sinusoidal analysis algebraic. Quantum mechanics uses complex wavefunctions ψ throughout.' },
      { type:'keypoints', points:['e^(iθ) = cos θ + i sin θ — the most important formula in mathematics','Polar form: z = re^(iθ) simplifies multiplication and powers','Analytic functions satisfy Cauchy-Riemann equations','|z|² = z·z̄ — always real, never imaginary'] },
    ]},

    'W5L7': { stageId:'S5', week:7, title:'Laplace Transforms', xp:250, readMin:24, tags:['laplace','transfer-function','ODE-solving','inverse-laplace'], sections:[
      { type:'intro', text:'The Laplace transform converts differential equations into algebraic equations, solving them becomes a matter of table lookups and algebra. It is the standard tool in control systems and electrical engineering.' },
      { type:'formula', text:'ℒ{f(t)} = F(s) = ∫₀^∞ e^(−st) f(t) dt\n\nKey transforms:\nℒ{1} = 1/s\nℒ{t} = 1/s²\nℒ{e^(at)} = 1/(s−a)\nℒ{sin(ωt)} = ω/(s²+ω²)\nℒ{cos(ωt)} = s/(s²+ω²)\nℒ{f\'} = sF(s) − f(0)' },
      { type:'worked', label:'Solve y\'\' + 3y\' + 2y = 0, y(0)=1, y\'(0)=0', steps:[
        ['Take Laplace: s²Y−s+3(sY−1)+2Y=0',''],
        ['(s²+3s+2)Y = s+3',''],
        ['Y = (s+3)/[(s+1)(s+2)] = 2/(s+1) − 1/(s+2)','Partial fractions'],
        ['y(t) = 2e^(−t) − e^(−2t)','Inverse transform'],
      ]},
      { type:'keypoints', points:['Laplace converts derivatives to multiplication by s','Solve algebraically in s-domain, then invert','ℒ{f\'} = sF(s)−f(0) encodes initial conditions','Transfer function = Laplace of output / Laplace of input'] },
    ]},

  }, // end lessons

  // ══════════════════════════════════════════
  // EXAM QUESTIONS
  // ══════════════════════════════════════════
  exams: {
    'S1': { title:'Stage 1 — Foundations Exam', stage:'S1', duration:2700, passPct:75, questions:[
      { q:'Which is the correct ascending order?', opts:['−3, −1, 0, 2, 5','−3, −1, 0, 5, 2','5, 2, 0, −1, −3','−1, −3, 0, 2, 5'], ans:0, tags:['number-line'], exp:'On the number line numbers increase left to right. −3<−1<0<2<5 is correct ascending order.' },
      { q:'What is |−8.4|?', opts:['−8.4','8.4','84','0.84'], ans:1, tags:['absolute-value'], exp:'Absolute value = distance from zero — always positive. |−8.4| = 8.4.' },
      { q:'Evaluate: 3 + 4 × 2 − 1', opts:['13','6','10','15'], ans:2, tags:['pemdas'], exp:'PEMDAS: multiply first → 4×2=8; then left-to-right: 3+8−1=10.' },
      { q:'√2 belongs to which number set?', opts:['Rational','Integer','Irrational','Natural'], ans:2, tags:['numbers'], exp:'√2≈1.41421… is non-repeating and non-terminating → irrational.' },
      { q:'Convert ¾ to a percentage.', opts:['25%','34%','75%','0.75%'], ans:2, tags:['fractions'], exp:'¾=0.75; multiply by 100: 75%.' },
      { q:'Prime factorisation of 48?', opts:['2⁴×3','2³×6','4×12','2²×12'], ans:0, tags:['prime-factorisation'], exp:'48=2×24=4×12=2×2×2×2×3=2⁴×3.' },
      { q:'Solve: 3x + 7 = 22', opts:['x=3','x=5','x=7','x=15'], ans:1, tags:['linear-equations'], exp:'3x=15; x=5. Check: 3(5)+7=22 ✓' },
      { q:'Distance between −6 and 4 on the number line:', opts:['2','10','−2','8'], ans:1, tags:['number-line'], exp:'|4−(−6)|=|10|=10.' },
      { q:'Evaluate (2 + 3)² ÷ 5', opts:['2+9÷5=3.8','5²÷5=5','25÷5=5 (after brackets+exponent)','3.6'], ans:2, tags:['pemdas'], exp:'Brackets: (2+3)=5; exponent: 5²=25; divide: 25÷5=5.' },
      { q:'Express 0.00045 in scientific notation.', opts:['45×10⁻⁵','4.5×10⁻⁴','4.5×10⁴','0.45×10⁻³'], ans:1, tags:['scientific-notation'], exp:'Move decimal 4 places right: 4.5. Number < 1 → negative exponent: 4.5×10⁻⁴.' },
      { q:'Rearrange v = u + at to solve for t.', opts:['t=v+u/a','t=a(v−u)','t=(v−u)/a','t=v/(u+a)'], ans:2, tags:['rearranging'], exp:'Subtract u: v−u=at; divide by a: t=(v−u)/a.' },
      { q:'Line with slope −2 through (0,5):', opts:['y=2x+5','y=−2x−5','y=−2x+5','y=5x−2'], ans:2, tags:['graphing'], exp:'y=mx+c: m=−2, c=5 → y=−2x+5.' },
      { q:'Significant figures in 0.00307?', opts:['5','2','3','6'], ans:2, tags:['significant-figures'], exp:'Leading zeros not significant. Sig figs: 3,0,7 → 3 sig figs.' },
      { q:'Density when mass=(2+8)kg, volume=5m³?', opts:['3.6','2','5','50'], ans:1, tags:['pemdas'], exp:'Bracket first: (2+8)=10; density=10/5=2 kg/m³.' },
      { q:'Which number is between −3.5 and −3.1?', opts:['−4','−3.2','−3','3.3'], ans:1, tags:['number-line'], exp:'−3.5 < −3.2 < −3.1 ✓' },
      { q:'Simplify the ratio 24:36', opts:['6:9','2:3','3:4','12:18'], ans:1, tags:['ratios'], exp:'HCF(24,36)=12. 24÷12=2, 36÷12=3. Answer: 2:3.' },
      { q:'2³ × 2⁴ = ?', opts:['2¹²','4⁷','2⁷','2¹'], ans:2, tags:['powers'], exp:'Same base → add exponents: 2³×2⁴=2^(3+4)=2⁷=128.' },
      { q:'Solve: −2x + 5 > 11', opts:['x>−3','x<−3','x>3','x<3'], ans:1, tags:['inequalities'], exp:'−2x>6; divide by −2 (flip sign): x<−3.' },
      { q:'The slope of the line through (1,3) and (4,9) is:', opts:['2','3','6','½'], ans:0, tags:['graphing'], exp:'m=(9−3)/(4−1)=6/3=2.' },
      { q:'Which is an irrational number?', opts:['0.5','−7','√9','π'], ans:3, tags:['numbers'], exp:'π≈3.14159… is non-repeating and non-terminating → irrational. √9=3 is rational.' },
    ]},

    'S2': { title:'Stage 2 — Pre-Calculus Exam', stage:'S2', duration:2700, passPct:75, questions:[
      { q:'f(x)=2x²−3, find f(−2)', opts:['5','−11','−5','13'], ans:0, tags:['functions'], exp:'f(−2)=2(4)−3=8−3=5.' },
      { q:'log₂(32)=?', opts:['4','5','6','16'], ans:1, tags:['logarithms'], exp:'2⁵=32, so log₂(32)=5.' },
      { q:'Simplify log(100)+log(10)', opts:['log(110)','log(1000)','3','log(10)'], ans:2, tags:['logarithms'], exp:'Product rule: log(1000)=3 since 10³=1000.' },
      { q:'Period of y=sin(2x):', opts:['2π','π','4π','½π'], ans:1, tags:['trig-graphs'], exp:'Period=2π/B=2π/2=π.' },
      { q:'In right triangle: opp=5, hyp=13, sin θ=?', opts:['13/5','12/13','5/13','5/12'], ans:2, tags:['SOH-CAH-TOA'], exp:'sin θ=opp/hyp=5/13.' },
      { q:'π/3 radians = how many degrees?', opts:['30°','45°','60°','90°'], ans:2, tags:['radians'], exp:'(π/3)×(180/π)=60°.' },
      { q:'Domain of f(x)=√(x−4):', opts:['x>4','x≥0','x≥4','all reals'], ans:2, tags:['domain-range'], exp:'Need x−4≥0 → x≥4.' },
      { q:'ln(e³)=?', opts:['e³','3','1/3','3e'], ans:1, tags:['logarithms'], exp:'ln and e are inverses: ln(eˣ)=x. So ln(e³)=3.' },
      { q:'Sum of vectors a=(3,4) and b=(1,−2):', opts:['(4,2)','(2,6)','(4,6)','(3,−8)'], ans:0, tags:['vectors'], exp:'Component-wise: (3+1,4+(−2))=(4,2).' },
      { q:'cos(0)=?', opts:['0','1','−1','undefined'], ans:1, tags:['unit-circle'], exp:'At θ=0 on unit circle, x-coordinate=1. cos(0)=1.' },
      { q:'Solution to x²−5x+6=0?', opts:['x=1','x=6','x=2','x=−2'], ans:2, tags:['quadratic'], exp:'Factor: (x−2)(x−3)=0 → x=2 or x=3.' },
      { q:'Exponential decay model:', opts:['y=aˣ (a>1)','y=ae^(kt) (k>0)','y=ae^(kt) (k<0)','y=a log x'], ans:2, tags:['exponential'], exp:'Decay: quantity decreases → k<0 in N(t)=N₀e^(kt).' },
      { q:'Magnitude of v=(−3,4):', opts:['7','1','5','25'], ans:2, tags:['vectors'], exp:'|v|=√(9+16)=√25=5.' },
      { q:'[H⁺]=10⁻⁴ mol/L → pH=?', opts:['4','−4','0.0001','10000'], ans:0, tags:['logarithms'], exp:'pH=−log(10⁻⁴)=4.' },
      { q:'Always-true identity:', opts:['sin²x+cos²x=2','sin²x−cos²x=1','sin²x+cos²x=1','tan²x+1=cos²x'], ans:2, tags:['trig-identities'], exp:'Pythagorean identity: sin²θ+cos²θ=1 always holds.' },
      { q:'Roots of x²−4x+4=0:', opts:['x=2 only','x=4 only','x=2 and x=4','x=0 and x=4'], ans:0, tags:['quadratic'], exp:'(x−2)²=0 → x=2 (double root).' },
      { q:'Inverse of f(x)=2x+1:', opts:['f⁻¹(x)=(x−1)/2','f⁻¹(x)=2x−1','f⁻¹(x)=x/2+1','f⁻¹(x)=1/(2x+1)'], ans:0, tags:['functions'], exp:'Swap x and y: x=2y+1 → y=(x−1)/2.' },
      { q:'Direction of a=(1,√3):', opts:['30°','45°','60°','90°'], ans:2, tags:['vectors'], exp:'θ=arctan(√3/1)=arctan(√3)=60°.' },
      { q:'log(x²)=2log(x) illustrates which law?', opts:['Product','Quotient','Power','Change of base'], ans:2, tags:['logarithms'], exp:'Power rule: log(xⁿ)=n·log(x).' },
      { q:'f(x)=x², g(x)=x+1: (f∘g)(2)=?', opts:['5','9','6','25'], ans:1, tags:['functions'], exp:'(f∘g)(2)=f(g(2))=f(3)=9.' },
    ]},

    'S3': { title:'Stage 3 — Calculus Exam', stage:'S3', duration:2700, passPct:75, questions:[
      { q:'d/dx [x⁵]=?', opts:['5x⁴','x⁴','5x⁶','4x⁵'], ans:0, tags:['derivative'], exp:'Power rule: nxⁿ⁻¹=5x⁴.' },
      { q:'If f(x)=eˣ, f\'(x)=?', opts:['eˣ⁻¹','xeˣ⁻¹','eˣ','e'], ans:2, tags:['derivative'], exp:'eˣ is its own derivative.' },
      { q:'∫3x² dx=?', opts:['6x','x³+C','3x³+C','x²+C'], ans:1, tags:['integration'], exp:'∫3x² dx=3·x³/3+C=x³+C.' },
      { q:'lim(x→2) (x²−4)/(x−2)=?', opts:['0','undefined','4','2'], ans:2, tags:['limits'], exp:'Factor: (x−2)(x+2)/(x−2)=x+2→4.' },
      { q:'Slope of tangent to y=x² at x=3:', opts:['9','6','3','12'], ans:1, tags:['derivative'], exp:'y\'=2x. At x=3: 2(3)=6.' },
      { q:'d/dx[sin(3x)]=?', opts:['cos(3x)','3sin(3x)','3cos(3x)','−3cos(3x)'], ans:2, tags:['chain-rule'], exp:'Chain rule: cos(3x)×3=3cos(3x).' },
      { q:'∫₀² x dx=?', opts:['4','2','1','0'], ans:1, tags:['FTC'], exp:'[x²/2]₀²=4/2−0=2.' },
      { q:'f\'\'(x)<0 at critical point means:', opts:['Local min','Inflection','Local max','Discontinuity'], ans:2, tags:['optimisation'], exp:'Second derivative test: f\'\'<0 → concave down → local maximum.' },
      { q:'v(t)=3t², s(0)=0 → s(t)=?', opts:['6t','t³','3t³/2','t³+C'], ans:1, tags:['integration'], exp:'s=∫3t² dt=t³+C. s(0)=0 → C=0.' },
      { q:'dy/dx=2y solution:', opts:['y=2x+C','y=Ce²ˣ','y=e²ˣ+C','y=2eˣ'], ans:1, tags:['ODE'], exp:'Separate: dy/y=2dx → ln|y|=2x+C → y=Ce²ˣ.' },
      { q:'d/dx[ln(x)]=?', opts:['ln(x)','1/x','x⁻²','eˣ'], ans:1, tags:['derivative'], exp:'d/dx[ln x]=1/x is fundamental.' },
      { q:'∫₀³ (2x+1) dx=?', opts:['6','12','7','9'], ans:1, tags:['FTC'], exp:'[x²+x]₀³=9+3=12.' },
      { q:'FTC says:', opts:['Every function has antiderivative','Integration and differentiation are inverse','All continuous → differentiable','∫f(x)dx=f(x)+C always'], ans:1, tags:['FTC'], exp:'FTC: differentiation and integration are inverse processes.' },
      { q:'Product rule d/dx[uv]=?', opts:['u\'v\'','u\'v+uv\'','u\'v−uv\'','uv\''], ans:1, tags:['product-rule'], exp:'Product rule: (uv)\'=u\'v+uv\'.' },
      { q:'d/dx[x²sin x]=?', opts:['2x cos x','2x sin x+x² cos x','x² cos x','2 sin x+cos x'], ans:1, tags:['product-rule'], exp:'Product rule: 2x·sin x+x²·cos x.' },
      { q:'Antiderivative of 1/x:', opts:['1/x²+C','−1/x+C','ln|x|+C','eˣ+C'], ans:2, tags:['integration'], exp:'∫(1/x)dx=ln|x|+C.' },
      { q:'Evaluate ∫₁⁴ √x dx:', opts:['14/3','4','14','8'], ans:0, tags:['FTC'], exp:'∫x^½ dx=[x^(3/2)/(3/2)]₁⁴=(2/3)[x^(3/2)]₁⁴=(2/3)(8−1)=14/3.' },
      { q:'Implicit diff of x²+y²=25: dy/dx=?', opts:['2x+2y','x/y','−x/y','y/x'], ans:2, tags:['chain-rule'], exp:'2x+2y(dy/dx)=0 → dy/dx=−x/y.' },
      { q:'d/dx[e^(x²)]=?', opts:['e^(x²)','2x·e^(x²)','x²e^(x²)','2e^(x²)'], ans:1, tags:['chain-rule'], exp:'Chain rule: e^(x²)×2x=2xe^(x²).' },
      { q:'Separable ODE dP/dt=kP models:', opts:['Simple harmonic motion','Exponential growth/decay','Linear growth','Quadratic growth'], ans:1, tags:['ODE'], exp:'dP/dt=kP → P=P₀e^(kt): exponential growth (k>0) or decay (k<0).' },
    ]},

    'S4': { title:'Stage 4 — Linear Algebra & Stats Exam', stage:'S4', duration:2700, passPct:75, questions:[
      { q:'Dot product of (2,3) and (4,−1):', opts:['5','11','−5','8'], ans:0, tags:['dot-product'], exp:'2(4)+3(−1)=8−3=5.' },
      { q:'Product AB for 2×3 and 3×4 matrices has dimensions:', opts:['3×3','2×4','3×4','2×3'], ans:1, tags:['matrices'], exp:'Outer dimensions: 2×4.' },
      { q:'A is invertible iff:', opts:['det(A)=1','det(A)≠0','A is square','A is diagonal'], ans:1, tags:['matrices'], exp:'Invertible ↔ det(A)≠0.' },
      { q:'Eigenvalue equation:', opts:['Av=v','Av=λv','A+λv=0','λA=v'], ans:1, tags:['eigenvalues'], exp:'Av=λv: v is eigenvector, λ is eigenvalue.' },
      { q:'Bayes: P(A|B)=?', opts:['P(A)·P(B)','P(B|A)P(A)/P(B)','P(A)/P(B)','P(A∪B)'], ans:1, tags:['bayes'], exp:'Bayes\' theorem: P(A|B)=P(B|A)P(A)/P(B).' },
      { q:'% data within 1σ in normal distribution:', opts:['50%','68%','95%','99.7%'], ans:1, tags:['normal-distribution'], exp:'Empirical rule: 68% within 1σ, 95% within 2σ, 99.7% within 3σ.' },
      { q:'det([[2,3],[1,4]])=?', opts:['11','5','8','−5'], ans:1, tags:['matrices'], exp:'det=ad−bc=8−3=5.' },
      { q:'p=0.03, α=0.05 → ?', opts:['Accept H₀','Reject H₀','Inconclusive','Test failed'], ans:1, tags:['hypothesis-testing'], exp:'p<α → reject H₀.' },
      { q:'R²=0.92 means:', opts:['92% error','8% explained','92% of variance explained','Model 92% accurate'], ans:2, tags:['regression'], exp:'R²=proportion of variance explained by the model.' },
      { q:'Cross product of two parallel vectors:', opts:['1','Dot product','Zero vector','A scalar'], ans:2, tags:['cross-product'], exp:'Parallel → angle=0 → sin(0)=0 → |a×b|=0 → zero vector.' },
      { q:'Gaussian elimination produces:', opts:['Diagonal form','Identity matrix','Row echelon form','Lower triangular'], ans:2, tags:['gaussian-elimination'], exp:'Gaussian elimination produces row echelon form.' },
      { q:'z=−1.5 means:', opts:['1.5 std devs below mean','1.5 above mean','Negative value','Outlier'], ans:0, tags:['z-scores'], exp:'Negative z-score = below the mean.' },
      { q:'Number of events in fixed time → which distribution?', opts:['Normal','Binomial','Poisson','Uniform'], ans:2, tags:['distributions'], exp:'Poisson models count of events in fixed interval.' },
      { q:'A,B independent → P(A∩B)=?', opts:['P(A)+P(B)','P(A)·P(B)','P(A|B)','P(A)−P(B)'], ans:1, tags:['probability'], exp:'Independence: P(A∩B)=P(A)·P(B).' },
      { q:'Least-squares minimises:', opts:['Sum of residuals','Sum of squared residuals','Max residual','Absolute residuals'], ans:1, tags:['regression'], exp:'Least-squares minimises Σ(yᵢ−ŷᵢ)².' },
      { q:'For Av=λv, find λ for A=[[4,0],[0,3]]:', opts:['λ=4 and λ=3','λ=7','λ=12','λ=1'], ans:0, tags:['eigenvalues'], exp:'Diagonal matrix → eigenvalues are diagonal entries: λ₁=4, λ₂=3.' },
      { q:'A correlation coefficient r=−0.95 indicates:', opts:['Weak negative','Strong positive','Strong negative','No correlation'], ans:2, tags:['regression'], exp:'r close to −1 → strong negative linear relationship.' },
      { q:'Rank of matrix [[1,2],[2,4]]:', opts:['0','1','2','3'], ans:1, tags:['gaussian-elimination'], exp:'Row 2 = 2×Row 1 → linearly dependent → rank=1.' },
      { q:'95% confidence interval uses z=?', opts:['1.645','1.96','2.326','2.576'], ans:1, tags:['normal-distribution'], exp:'95% CI: z=1.96 (area of 0.025 in each tail of standard normal).' },
      { q:'P(A∪B)=P(A)+P(B)−P(A∩B) is the:', opts:['Bayes theorem','Multiplication rule','Addition rule','Complement rule'], ans:2, tags:['probability'], exp:'This is the addition rule for probabilities, accounting for double-counting the intersection.' },
    ]},

    'S5': { title:'Stage 5 — Advanced Mastery Exam', stage:'S5', duration:3600, passPct:75, questions:[
      { q:'∇f for f(x,y)=x²y+y³:', opts:['(2x,3y²)','(2xy,x²+3y²)','(2xy,3y²)','(x²+y,3y²)'], ans:1, tags:['gradient'], exp:'∂f/∂x=2xy; ∂f/∂y=x²+3y². ∇f=(2xy,x²+3y²).' },
      { q:"Euler's formula:", opts:['eⁱᶿ=cosθ−isinθ','eⁱᶿ=icosθ+sinθ','eⁱᶿ=cosθ+isinθ','eⁱᶿ=coshθ+sinhθ'], ans:2, tags:['complex-analysis'], exp:"Euler's formula: eⁱᶿ=cosθ+isinθ." },
      { q:'Heat equation ∂u/∂t=k∂²u/∂x² is classified:', opts:['Hyperbolic','Elliptic','Parabolic','ODE'], ans:2, tags:['PDE'], exp:'One time derivative, second spatial derivative → parabolic PDE.' },
      { q:'Fourier coefficient aₙ represents:', opts:['Frequency','Amplitude of nth cosine term','Phase shift','Total energy'], ans:1, tags:['fourier-series'], exp:'aₙ gives the amplitude/weight of the nth cosine harmonic.' },
      { q:'∂/∂x [x²y³]=?', opts:['2xy³','x²·3y²','2xy³+3x²y²','6x²y²'], ans:0, tags:['partial-derivatives'], exp:'∂/∂x with y constant: 2xy³.' },
      { q:'ℒ{e^(at)}=?', opts:['1/(s−a)','1/(s+a)','a/s','s/(s−a)'], ans:0, tags:['laplace'], exp:'ℒ{eᵃᵗ}=1/(s−a) for s>a.' },
      { q:"Stokes' theorem relates:", opts:['Line integral to surface integral','Surface to volume','Volume to line','Gradient to divergence'], ans:0, tags:['vector-calculus'], exp:"Stokes': ∮F·dr=∬(∇×F)·dS." },
      { q:'Wave equation ∂²u/∂t²=c²∂²u/∂x² is:', opts:['Parabolic','Elliptic','Hyperbolic','Linear ODE'], ans:2, tags:['PDE'], exp:'Two second derivatives with same sign → hyperbolic PDE.' },
      { q:'Volume element in cylindrical coordinates:', opts:['r dr dθ dz','dr dθ dz','r² dr dθ dz','r sinφ dr dθ dφ'], ans:0, tags:['triple-integral'], exp:'Cylindrical: dV=r dr dθ dz (Jacobian factor r).' },
      { q:'Cauchy-Riemann equations require:', opts:['∂u/∂x=∂v/∂y and ∂u/∂y=∂v/∂x','∂u/∂x=∂v/∂y and ∂u/∂y=−∂v/∂x','∂u/∂x=−∂v/∂y','u=v'], ans:1, tags:['complex-analysis'], exp:'C-R: ∂u/∂x=∂v/∂y AND ∂u/∂y=−∂v/∂x.' },
      { q:'Fourier transform of Gaussian is:', opts:['Another Gaussian','Square wave','Delta function','Exponential'], ans:0, tags:['fourier-transform'], exp:'Gaussian is self-dual under Fourier transform.' },
      { q:"Green's theorem converts ∮_C to:", opts:['Triple integral','Surface integral','Double integral over enclosed region','Laplace transform'], ans:2, tags:['vector-calculus'], exp:"Green's theorem (2D Stokes'): ∮=∬_D(∂Q/∂x−∂P/∂y)dA." },
      { q:'Separation of variables assumes:', opts:['u=X+T','u=X·T','u=X/T','u=X²T²'], ans:1, tags:['PDE'], exp:'Separation: u(x,t)=X(x)T(t) → two ODEs.' },
      { q:"Fubini's theorem allows:", opts:['Swap limits in double integrals','Differentiate under integral','Change variables','Surface→line'], ans:0, tags:['double-integral'], exp:"Fubini: ∫∫f(x,y)dA can be evaluated as iterated integral in either order." },
      { q:'ℒ{f\'}=?', opts:['sF(s)','sF(s)−f(0)','F(s)/s','F\'(s)'], ans:1, tags:['laplace'], exp:'ℒ{f\'}=sF(s)−f(0). Initial condition f(0) encoded here.' },
      { q:'The gradient ∇f at a point is:', opts:['Perpendicular to the level curve','Tangent to the level curve','Equal to the Laplacian','The divergence of f'], ans:0, tags:['gradient'], exp:'∇f is always perpendicular (normal) to the level curves of f.' },
      { q:'∂/∂y [x²y + sin(y)]=?', opts:['2xy','x²+cos y','2x+cos y','x²y·cos y'], ans:1, tags:['partial-derivatives'], exp:'∂/∂y with x constant: x²+cos(y).' },
      { q:'eⁱᵖ + 1 = ?', opts:['2','0','2i','e'], ans:1, tags:['complex-analysis'], exp:"Euler's identity: e^(iπ)=−1, so e^(iπ)+1=0. One of the most beautiful equations in maths." },
      { q:'ℒ{sin(ωt)}=?', opts:['ω/(s²+ω²)','s/(s²+ω²)','1/(s−ω)','ω/s²'], ans:0, tags:['laplace'], exp:'ℒ{sin(ωt)}=ω/(s²+ω²).' },
      { q:'Divergence ∇·F measures:', opts:['Rotation of field','Source strength per unit volume','Perpendicular component','Gradient magnitude'], ans:1, tags:['vector-calculus'], exp:'Divergence = net flux per unit volume — source/sink strength at each point.' },
    ]},
  } // end exams
}; // end CURRICULUM
