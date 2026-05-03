import { useState } from 'react';
import { ChevronDown, ChevronUp, UserPlus, Inbox, BarChart3, Check } from 'lucide-react';

interface StepData {
  id: number;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  details: React.ReactNode;
}

const steps: StepData[] = [
  {
    id: 1,
    title: "Voter Registration",
    icon: <UserPlus className="h-6 w-6 text-primary dark:text-secondary" aria-hidden="true" />,
    shortDesc: "The first step to voting is making sure you are registered.",
    details: (
      <div className="space-y-4 text-slate-600 dark:text-slate-300">
        <p>Before you can vote, you must register. This ensures you meet the basic eligibility requirements, usually relating to age and citizenship.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Check Eligibility:</strong> Make sure you are of voting age and a citizen of the region holding the election.</li>
          <li><strong>Gather Documents:</strong> You'll typically need an ID (like a driver's license or passport) and proof of address (like a utility bill).</li>
          <li><strong>How to Register:</strong> Many places allow online registration. You can also often register in person at a local election office, DMV, or post office.</li>
          <li><strong>Deadlines:</strong> Registration deadlines vary wildly! Some are weeks before an election, while others allow same-day registration. Always check your local deadlines.</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    title: "Voting Procedures",
    icon: <Inbox className="h-6 w-6 text-primary dark:text-secondary" aria-hidden="true" />,
    shortDesc: "Understanding how, when, and where to cast your ballot.",
    details: (
      <div className="space-y-4 text-slate-600 dark:text-slate-300">
        <p>Once registered, it's time to make your voice heard. There are often several ways to vote depending on your location.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>In-Person (Election Day):</strong> The traditional method. Go to your assigned polling place on the designated day. Bring any required ID.</li>
          <li><strong>Early Voting:</strong> Many areas allow you to vote in person on specific days before the official Election Day.</li>
          <li><strong>Mail-in / Absentee Voting:</strong> Request a ballot to be mailed to you, fill it out at home, and return it via mail or a secure drop box.</li>
        </ul>
      </div>
    )
  },
  {
    id: 3,
    title: "Vote Counting Process",
    icon: <BarChart3 className="h-6 w-6 text-primary dark:text-secondary" aria-hidden="true" />,
    shortDesc: "What happens after you cast your vote to ensure accuracy.",
    details: (
      <div className="space-y-4 text-slate-600 dark:text-slate-300">
        <p>The counting process is designed to be secure and transparent.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Collection:</strong> Ballots are securely transported to central counting facilities.</li>
          <li><strong>Verification:</strong> For mail-in ballots, signatures are verified against registration records.</li>
          <li><strong>Tallying:</strong> Ballots are fed through secure scanning machines that record the votes.</li>
          <li><strong>Certification:</strong> Election officials officially certify the results, making them final.</li>
        </ul>
      </div>
    )
  }
];

const GuidePage = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [expandedCard, setExpandedCard] = useState<number | null>(1);

  const toggleCard = (id: number) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
      setActiveStep(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-secondary mb-4">Election Process Guide</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Follow these simple steps to understand how elections work from start to finish.
        </p>
      </div>

      {/* Progress Indicator */}
      <nav aria-label="Election guide steps" className="mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0 rounded-full" aria-hidden="true" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-secondary -translate-y-1/2 z-0 rounded-full transition-all duration-500"
          style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
          aria-hidden="true"
        />
        <ol className="flex justify-between relative z-10">
          {steps.map((step) => (
            <li key={step.id}>
              <button
                onClick={() => toggleCard(step.id)}
                aria-current={activeStep === step.id ? 'step' : undefined}
                aria-label={`Step ${step.id}: ${step.title}${activeStep > step.id ? ' (completed)' : ''}`}
                className={`flex flex-col items-center cursor-pointer transition-colors ${activeStep >= step.id ? 'text-primary dark:text-secondary' : 'text-slate-400'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  activeStep > step.id
                    ? 'bg-secondary border-secondary text-surface'
                    : activeStep === step.id
                      ? 'bg-surface dark:bg-slate-800 border-secondary text-secondary ring-4 ring-blue-50 dark:ring-blue-900/30'
                      : 'bg-surface dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-300 dark:text-slate-600'
                }`}>
                  {activeStep > step.id ? <Check className="h-5 w-5" aria-hidden="true" /> : step.id}
                </div>
                <span className="text-xs md:text-sm font-medium mt-2 hidden sm:block">{step.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Step Cards */}
      <div className="space-y-6" role="list">
        {steps.map((step) => {
          const isExpanded = expandedCard === step.id;
          return (
            <div
              key={step.id}
              role="listitem"
              className={`bg-white dark:bg-slate-800 rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded ? 'border-secondary shadow-md' : 'border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-300'
              }`}
            >
              <button
                onClick={() => toggleCard(step.id)}
                aria-expanded={isExpanded}
                aria-controls={`step-content-${step.id}`}
                className="w-full text-left p-6 flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-inset"
              >
                <div className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-slate-50 dark:bg-slate-700'}`} aria-hidden="true">
                  {step.icon}
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-primary dark:text-secondary mb-1">
                    Step {step.id}: {step.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">{step.shortDesc}</p>
                </div>
                <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-blue-50 dark:bg-blue-900/30 text-secondary' : 'text-slate-400'}`} aria-hidden="true">
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>

              <div
                id={`step-content-${step.id}`}
                role="region"
                aria-label={`${step.title} details`}
                className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-700 mt-2 bg-slate-50/50 dark:bg-slate-900/20">
                  {step.details}
                  {isExpanded && step.id < steps.length && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCard(step.id + 1); }}
                        aria-label={`Continue to Step ${step.id + 1}`}
                        className="text-sm font-medium text-secondary hover:text-blue-700 flex items-center gap-1 bg-blue-50 dark:bg-blue-900/40 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        Continue to Step {step.id + 1}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuidePage;