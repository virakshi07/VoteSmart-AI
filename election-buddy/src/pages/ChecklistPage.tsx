import { useState, useEffect } from 'react';
import { CheckSquare, Trash2 } from 'lucide-react';

type ChecklistItem = {
  id: string;
  text: string;
  category: string;
  checked: boolean;
};

const initialChecklist: ChecklistItem[] = [
  { id: 'eligibility', text: 'Check your eligibility to vote', category: 'Registration', checked: false },
  { id: 'deadline', text: 'Find your registration deadline', category: 'Registration', checked: false },
  { id: 'form', text: 'Complete and submit registration form', category: 'Registration', checked: false },
  { id: 'verify', text: 'Verify your registration status', category: 'Registration', checked: false },
  { id: 'research', text: 'Research candidates and ballot issues', category: 'Preparation', checked: false },
  { id: 'poll', text: 'Find your assigned polling place', category: 'Preparation', checked: false },
  { id: 'plan', text: 'Make a plan: Decide when and how to vote', category: 'Preparation', checked: false },
  { id: 'id', text: 'Check local voter ID requirements', category: 'Preparation', checked: false },
  { id: 'bring-id', text: 'Bring your required ID to the polls', category: 'Voting', checked: false },
  { id: 'go', text: 'Go to the polls (or mail your ballot)', category: 'Voting', checked: false },
  { id: 'cast', text: 'Cast your vote!', category: 'Voting', checked: false },
];

const ChecklistPage = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
  try {
    const saved = localStorage.getItem('voter-checklist');
    return saved ? JSON.parse(saved) : initialChecklist;
  } catch {
    return initialChecklist;
  }
});

useEffect(() => {
  try {
    localStorage.setItem('voter-checklist', JSON.stringify(items));
  } catch {
    console.warn('Could not save checklist to localStorage');
  }
}, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const resetChecklist = () => {
    if (window.confirm("Are you sure you want to reset your checklist?")) {
      setItems(initialChecklist);
    }
  };

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const progress = Math.round((items.filter((i) => i.checked).length / items.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="flex-grow">
          <div className="inline-flex items-center justify-center p-3 bg-secondary bg-opacity-10 rounded-full mb-4" aria-hidden="true">
            <CheckSquare className="h-8 w-8 text-secondary" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Voter Readiness Checklist</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Track your progress and make sure you're ready for Election Day.
          </p>
        </div>

        {/* Progress Card */}
        <div
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 w-full md:w-64"
          role="status"
          aria-label={`Checklist progress: ${progress}% complete`}
        >
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Progress</span>
            <span className="text-2xl font-bold text-secondary" aria-hidden="true">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="bg-secondary h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Checklist */}
      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category} aria-labelledby={`category-${category}`}>
            <h2 id={`category-${category}`} className="text-xl font-bold mb-6 flex items-center gap-2 text-primary dark:text-secondary">
              <span className="w-8 h-8 rounded-lg bg-primary dark:bg-blue-900 text-white flex items-center justify-center text-sm" aria-hidden="true">
                {category[0]}
              </span>
              {category}
            </h2>

            <ul className="grid gap-4">
              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <li key={item.id}>
                    <label
                      htmlFor={`checkbox-${item.id}`}
                      className={`flex items-center p-5 rounded-2xl border cursor-pointer transition-all ${item.checked
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                        : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800'}`}
                    >
                      <div className="relative flex items-center justify-center h-6 w-6 mr-4">
                        <input
                          id={`checkbox-${item.id}`}
                          type="checkbox"
                          className="sr-only"
                          checked={item.checked}
                          onChange={() => toggleItem(item.id)}
                          aria-label={item.text}
                        />
                        <div
                          className={`h-6 w-6 rounded-md border-2 transition-colors ${item.checked ? 'bg-secondary border-secondary' : 'border-slate-300 dark:border-slate-500'}`}
                          aria-hidden="true"
                        />
                        {item.checked && (
                          <svg className="absolute w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-lg ${item.checked ? 'line-through opacity-60' : ''}`}>
                        {item.text}
                      </span>
                    </label>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Reset Button */}
      <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-center">
        <button
          onClick={resetChecklist}
          aria-label="Reset entire checklist to default state"
          className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors font-medium"
        >
          <Trash2 className="h-5 w-5" aria-hidden="true" />
          Reset Checklist
        </button>
      </div>
    </div>
  );
};

export default ChecklistPage;