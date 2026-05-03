import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, RotateCcw, Target, Zap } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "Is voter registration required in most states before you can cast a ballot?",
    options: ["Yes, absolutely", "No, it's optional"],
    correct: 0,
    explanation: "Registration is the first step in most regions to ensure you meet eligibility requirements!"
  },
  {
    id: 2,
    question: "What is the minimum age to vote in federal elections?",
    options: ["16 years old", "18 years old", "21 years old"],
    correct: 1,
    explanation: "The 26th Amendment set the voting age at 18 for all federal elections."
  },
  {
    id: 3,
    question: "True or False: Many regions allow you to vote in person BEFORE Election Day.",
    options: ["True (Early Voting)", "False (Only one day)"],
    correct: 0,
    explanation: "Early voting is a great way to avoid lines and ensure your schedule doesn't stop you from voting."
  },
  {
    id: 4,
    question: "When should you check your local Voter ID requirements?",
    options: ["At the polling booth", "Well before election day", "Only if I'm a new voter"],
    correct: 1,
    explanation: "ID laws vary wildly. Checking early ensures you have time to get the right documents."
  },
  {
    id: 5,
    question: "What is the best way to research candidates and issues?",
    options: ["Listen to only one news source", "Check non-partisan voter guides", "Ask my neighbor"],
    correct: 1,
    explanation: "Non-partisan guides provide unbiased info to help you make your own choice."
  }
];

const VoterReadinessQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [xp, setXp] = useState(0);

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    const correct = index === questions[currentStep].correct;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setXp((prev: number) => prev + 100);
    }

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setXp(0);
  };

  const readinessPercent = Math.round((score / questions.length) * 100);

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass dark:glass-dark p-10 rounded-3xl text-center"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="bg-yellow-400 p-5 rounded-full shadow-lg"
            >
              <Trophy className="h-12 w-12 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              LEVEL UP!
            </motion.div>
          </div>

          <h1 className="text-4xl font-extrabold mb-2 text-gradient">Quiz Complete!</h1>
          <p className="text-slate-500 mb-8">You've gained {xp} XP points ⚡</p>

          <div className="relative h-48 w-48 mx-auto mb-10 flex items-center justify-center">
            <svg className="h-full w-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-100 dark:text-slate-800"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray="502.6"
                initial={{ strokeDashoffset: 502.6 }}
                animate={{ strokeDashoffset: 502.6 - (502.6 * readinessPercent) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-secondary"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-primary dark:text-secondary">{readinessPercent}%</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Ready</span>
            </div>
          </div>

          <p className="text-xl font-medium mb-10 text-slate-700 dark:text-slate-200">
            {readinessPercent >= 80
              ? "🎯 You're a voting expert! Spread the word."
              : "📚 Good job! A little more study and you'll be unstoppable."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 py-4 px-8 rounded-2xl font-bold transition-all"
            >
              <RotateCcw className="h-5 w-5" /> Retake Quiz
            </button>
            <button
              className="flex items-center justify-center gap-2 bg-gradient-ai text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:shadow-secondary/50 transition-all"
            >
              Share Result <Zap className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Target className="h-6 w-6 text-secondary" />
          <span className="font-bold text-slate-400 uppercase tracking-widest text-sm">Voter Readiness Quiz</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-2">
          <motion.div
            className="bg-secondary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-bold text-slate-400">
          <span>QUESTION {currentStep + 1} OF {questions.length}</span>
          <span>SCORE: {score}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className={`glass dark:glass-dark p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden ${isCorrect === true ? 'ring-4 ring-green-500/30' : isCorrect === false ? 'animate-shake ring-4 ring-red-500/30' : ''
            }`}
        >
          {/* Subtle background glow */}
          <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 transition-colors ${isCorrect === true ? 'bg-green-500' : isCorrect === false ? 'bg-red-500' : 'bg-secondary'
            }`}></div>

          <h2 className="text-2xl md:text-3xl font-bold mb-10 leading-tight text-slate-800 dark:text-white">
            {q.question}
          </h2>

          <div className="space-y-4">
            {q.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === q.correct;

              let statusClass = "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-secondary dark:hover:border-secondary";
              if (isSelected) {
                statusClass = isCorrectOption
                  ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20"
                  : "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20";
              } else if (selectedOption !== null && isCorrectOption) {
                statusClass = "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400";
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={selectedOption === null ? { scale: 1.02 } : {}}
                  whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-5 rounded-2xl border-2 font-semibold text-lg transition-all flex justify-between items-center ${statusClass}`}
                >
                  {option}
                  {isSelected && (
                    isCorrectOption ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />
                  )}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedOption !== null && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700"
              >
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-secondary mr-2">Did you know?</span>
                  {q.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 text-center text-slate-400 font-medium flex items-center justify-center gap-2">
        "Knowledge is the best preparation for voting." 🤖
      </div>
    </div>
  );
};

export default VoterReadinessQuiz;
