import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, MessageSquare, CheckCircle, Zap } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="w-full bg-gradient-ai text-surface py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none" aria-hidden="true">
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 10 }}
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -60, 0] }}
            transition={{ repeat: Infinity, duration: 15 }}
            className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-ai blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            id="hero-heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            Vote Smart with <br /><span className="text-white drop-shadow-lg">Election Buddy!</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed"
          >
            The future of voting education is here. Clear, interactive, and AI-powered guidance for every citizen.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link
              to="/guide"
              aria-label="Start learning about the election process"
              className="bg-white text-primary hover:bg-slate-100 text-lg font-bold py-5 px-10 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Start Learning <ArrowRight className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link
              to="/quiz"
              aria-label="Test your voter readiness with our quiz"
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 text-lg font-bold py-5 px-10 rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Test Your Readiness <Zap className="h-6 w-6" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section aria-labelledby="features-heading" className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 id="features-heading" className="text-4xl md:text-5xl font-black mb-6 text-primary dark:text-white tracking-tight">
            Elevate Your <span className="text-gradient">Voter IQ</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            We've combined modern design with essential knowledge to make voting feel like a superpower.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8" role="list">
          {[
            { icon: BookOpen, title: "Interactive Guide", desc: "A cinematic walkthrough of the entire election lifecycle.", color: "primary", link: "/guide", ariaLabel: "Explore the Interactive Guide" },
            { icon: MessageSquare, title: "AI Assistant", desc: "Real-time answers to your toughest voting questions.", color: "ai", link: "#", ariaLabel: "Open the AI Assistant" },
            { icon: CheckCircle, title: "Readiness Quiz", desc: "Level up and earn XP as you prepare for the polls.", color: "secondary", link: "/quiz", ariaLabel: "Take the Readiness Quiz" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              role="listitem"
              whileHover={{ y: -10 }}
              className="glass dark:glass-dark p-10 rounded-[2.5rem] text-center group transition-all"
            >
              <div className={`bg-${feature.color}/10 dark:bg-${feature.color}/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-gradient-ai transition-all duration-500`} aria-hidden="true">
                <feature.icon className={`h-10 w-10 text-${feature.color} group-hover:text-white transition-colors`} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                {feature.desc}
              </p>
              <Link to={feature.link} aria-label={feature.ariaLabel} className="text-sm font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center justify-center gap-1">
                Explore More <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mini CTA Section */}
      <section aria-labelledby="cta-heading" className="w-full py-20 px-4">
        <div className="max-w-5xl mx-auto glass dark:glass-dark p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32" aria-hidden="true"></div>
          <div className="relative z-10">
            <h2 id="cta-heading" className="text-3xl md:text-5xl font-black text-primary dark:text-white mb-8 tracking-tight">
              Ready to make your <span className="text-gradient">voice heard?</span>
            </h2>
            <Link
              to="/guide"
              aria-label="Launch the Election Process Guide"
              className="inline-block bg-gradient-ai text-white font-black py-5 px-12 rounded-2xl shadow-xl hover:shadow-secondary/30 transition-all hover:scale-105 active:scale-95 text-lg"
            >
              Launch Process Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;