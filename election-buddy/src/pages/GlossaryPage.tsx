import { useState } from 'react';
import { Search, Book } from 'lucide-react';

const glossaryTerms = [
  { term: "Absentee Ballot", definition: "A ballot completed and typically mailed in advance of an election by a voter who is unable to be present at the polls." },
  { term: "Electoral College", definition: "A body of people representing the states of the US, who formally cast votes for the election of the president and vice president." },
  { term: "General Election", definition: "A regular election of candidates for office, as opposed to a primary election." },
  { term: "Incumbent", definition: "The current holder of an office or post." },
  { term: "Primary Election", definition: "An election that narrows the field of candidates before a general election for office." },
  { term: "Voter Registration", definition: "The requirement that a person otherwise eligible to vote register on an electoral roll before they will be entitled or permitted to vote." },
  { term: "Polling Place", definition: "A building where voting takes place during an election." },
  { term: "Canvassing", definition: "The systematic initiation of direct contact with individuals, commonly used during political campaigns." },
  { term: "Constituency", definition: "A body of voters in a specified area who elect a representative to a legislative body." },
  { term: "Referendum", definition: "A general vote by the electorate on a single political question that has been referred to them for a direct decision." }
].sort((a, b) => a.term.localeCompare(b.term));

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = glossaryTerms.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4" aria-hidden="true">
          <Book className="h-8 w-8 text-primary dark:text-secondary" aria-hidden="true" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Election Glossary</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Understanding the language of democracy. Search for common terms below.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-10">
        <label htmlFor="glossary-search" className="sr-only">Search glossary terms</label>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
          <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
        </div>
        <input
          id="glossary-search"
          type="search"
          className="block w-full pl-10 pr-3 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary transition-all shadow-sm"
          placeholder="Search for a term (e.g. 'ballot', 'registration')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search glossary terms"
          aria-controls="glossary-results"
        />
      </div>

      {/* Results */}
      <div
        id="glossary-results"
        className="grid gap-6"
        role="region"
        aria-live="polite"
        aria-label={`${filteredTerms.length} glossary terms found`}
      >
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item, index) => (
            <article
              key={index}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold text-primary dark:text-secondary mb-2">{item.term}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.definition}</p>
            </article>
          ))
        ) : (
          <div className="text-center py-12" role="status">
            <p className="text-lg text-slate-500">No terms found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlossaryPage;