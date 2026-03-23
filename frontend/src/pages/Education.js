// ============================================================
// Project  : Know Your Democratic Rights
// Author   : Garvit Pant
// GitHub   : https://github.com/GarvitTech
// © 2026 Garvit Pant. All rights reserved.
// ============================================================

import React, { useState } from "react";
import Disclaimer from "../components/Disclaimer";

const LESSONS = [
  {
    id: 1, flag: "🇮🇳", country: "India", title: "Your Fundamental Rights in India",
    duration: "5 min read", level: "Beginner",
    content: `India's Constitution guarantees 6 Fundamental Rights to every citizen:

1. Right to Equality (Articles 14–18)
   Everyone is equal before the law. No discrimination based on religion, race, caste, sex, or birthplace.

2. Right to Freedom (Article 19)
   Includes freedom of speech, assembly, movement, and profession.

3. Right Against Exploitation (Articles 23–24)
   Bans human trafficking, forced labour, and child labour in hazardous industries.

4. Right to Freedom of Religion (Articles 25–28)
   You can follow any religion or none at all.

5. Cultural & Educational Rights (Articles 29–30)
   Minorities can preserve their culture and run educational institutions.

6. Right to Constitutional Remedies (Article 32)
   You can go directly to the Supreme Court if your rights are violated.`,
    scenario: {
      title: "Scenario: Police Detention",
      situation: "Police detain you without telling you why.",
      rights: "Under Article 22, you must be informed of the reason for arrest, produced before a magistrate within 24 hours, and have the right to consult a lawyer.",
      action: "You can file a Habeas Corpus petition in the High Court demanding your release."
    }
  },
  {
    id: 2, flag: "🇺🇸", country: "USA", title: "The Bill of Rights — Your First 10 Amendments",
    duration: "6 min read", level: "Beginner",
    content: `The first 10 amendments to the U.S. Constitution are called the Bill of Rights:

1st Amendment — Freedom of speech, religion, press, assembly, and petition.

2nd Amendment — Right to keep and bear arms.

4th Amendment — Protection against unreasonable searches and seizures. Police need a warrant.

5th Amendment — Right to remain silent. You cannot be forced to testify against yourself.

6th Amendment — Right to a speedy trial and a lawyer.

8th Amendment — No cruel or unusual punishment.

14th Amendment — Equal protection under the law for all persons.`,
    scenario: {
      title: "Scenario: Police Stop",
      situation: "A police officer stops you on the street.",
      rights: "You have the right to remain silent (5th Amendment). You can ask 'Am I free to go?' If not under arrest, you may leave. If arrested, Miranda rights must be read to you.",
      action: "Calmly say: 'I am exercising my right to remain silent. I want a lawyer.' Do not resist physically."
    }
  },
  {
    id: 3, flag: "🇰🇼", country: "Kuwait", title: "Constitutional Rights in Kuwait",
    duration: "4 min read", level: "Beginner",
    content: `Kuwait's 1962 Constitution guarantees several rights:

Article 29 — All people are equal in human dignity. No discrimination based on sex, origin, language, or religion.

Article 30 — Personal liberty is guaranteed and protected.

Article 34 — An accused person is presumed innocent until proven guilty.

Article 35 — Freedom of belief is absolute.

Article 36 — Freedom of opinion and expression is guaranteed.

Article 39 — Privacy of communications is protected.

Article 40 — Education is a right and is free at all levels for Kuwaiti nationals.

Article 41 — Every Kuwaiti has the right to work.`,
    scenario: {
      title: "Scenario: Workplace Dispute",
      situation: "Your employer refuses to pay your salary for 2 months.",
      rights: "Under Kuwait Labour Law No. 6 of 2010, employers must pay wages on time. Withholding wages is illegal.",
      action: "File a complaint with the Ministry of Social Affairs and Labour. You can also seek legal aid."
    }
  },
  {
    id: 4, flag: "🇷🇺", country: "Russia", title: "Rights Under the Russian Constitution",
    duration: "5 min read", level: "Beginner",
    content: `The Russian Constitution (1993) guarantees:

Article 20 — Right to life.
Article 21 — Human dignity is protected. Torture is prohibited.
Article 23 — Right to privacy of correspondence and communications.
Article 25 — Home is inviolable. No entry without court order.
Article 28 — Freedom of conscience and religion.
Article 29 — Freedom of thought and speech.
Article 32 — Right to vote and participate in government.
Article 37 — Right to work, fair wages, and safe conditions.
Article 43 — Right to free general education.
Article 48 — Right to qualified legal assistance.`,
    scenario: {
      title: "Scenario: Home Search",
      situation: "Police arrive at your door wanting to search your home.",
      rights: "Under Article 25, your home is inviolable. Police need a court-issued search warrant to enter.",
      action: "Ask to see the warrant. If they have no warrant and it's not an emergency, you can refuse entry and contact a lawyer immediately."
    }
  },
  {
    id: 5, flag: "🌍", country: "Universal", title: "Know Your Rights When Arrested",
    duration: "3 min read", level: "Essential",
    content: `Regardless of country, these are universal principles when arrested:

1. Stay Calm — Do not resist physically even if you believe the arrest is unlawful.

2. Right to Know — You have the right to know why you are being arrested.

3. Right to Silence — You generally have the right not to answer questions beyond identifying yourself.

4. Right to a Lawyer — In most countries, you have the right to legal representation.

5. Right to Contact Someone — You should be allowed to inform a family member or lawyer.

6. Right Against Torture — International law (UN Convention Against Torture) prohibits torture in all circumstances.

7. Document Everything — Remember badge numbers, names, and what was said.`,
    scenario: {
      title: "Scenario: What to Say When Arrested",
      situation: "You are being arrested and don't know what to do.",
      rights: "You have the right to remain silent and the right to a lawyer in most democratic countries.",
      action: "Say clearly: 'I am exercising my right to remain silent. I want to speak to a lawyer.' Then stay quiet until your lawyer arrives."
    }
  },
  {
    id: 6, flag: "💻", country: "Universal", title: "Your Digital Rights in the Modern Age",
    duration: "4 min read", level: "Intermediate",
    content: `Digital rights are increasingly important. Here's what you should know:

Privacy of Communications
- India: Digital Personal Data Protection Act 2023
- USA: Electronic Communications Privacy Act; 4th Amendment
- Kuwait: Article 39 of the Constitution
- Russia: Article 23 of the Constitution

In all four countries, your private messages and calls generally cannot be intercepted without a court order.

Data Protection
- You have the right to know what data is collected about you.
- You can request deletion of your data in many jurisdictions.
- Apps must get your consent before sharing your data.

Online Speech
- Freedom of speech generally extends online.
- However, defamation, incitement, and hate speech laws still apply.

Cybercrime Protections
- Hacking your accounts or devices is illegal in all four countries.`,
    scenario: {
      title: "Scenario: App Sharing Your Data",
      situation: "You discover an app shared your location data without permission.",
      rights: "Under India's DPDP Act 2023, USA's various state privacy laws, and general constitutional privacy protections, your data cannot be shared without consent.",
      action: "Delete the app, report to the data protection authority in your country, and consider legal action for damages."
    }
  },
];

const LEVEL_COLORS = {
  Essential:    "bg-red-100 text-red-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Beginner:     "bg-green-100 text-green-700",
};

export default function Education() {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const lesson = LESSONS.find((l) => l.id === selected);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
          <button onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-5 font-medium text-sm">
            ← Back to Lessons
          </button>

          <div className="card mb-4">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl sm:text-4xl flex-shrink-0">{lesson.flag}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="badge bg-blue-100 text-blue-700">{lesson.country}</span>
                  <span className={`badge ${LEVEL_COLORS[lesson.level]}`}>{lesson.level}</span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="text-sm text-gray-500 mt-0.5">{lesson.duration}</p>
              </div>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-gray-700 text-sm leading-relaxed">
              {lesson.content}
            </pre>
          </div>

          {/* Scenario */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 sm:p-6 mb-4">
            <h3 className="font-bold text-blue-900 text-base sm:text-lg mb-3">🎭 {lesson.scenario.title}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Situation</p>
                <p className="text-gray-800 text-sm">{lesson.scenario.situation}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Your Rights</p>
                <p className="text-gray-800 text-sm">{lesson.scenario.rights}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-blue-200">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">✅ What to Do</p>
                <p className="text-blue-900 text-sm font-medium">{lesson.scenario.action}</p>
              </div>
            </div>
          </div>

          <Disclaimer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">📚 Learn Your Rights</h1>
          <p className="text-gray-500 text-sm mt-1">Simple lessons with real-life scenarios</p>
        </div>

        <Disclaimer />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-5">
          {LESSONS.map((lesson) => (
            <button key={lesson.id} onClick={() => setSelected(lesson.id)}
              className="card text-left hover:shadow-md transition-all hover:border-blue-200 border border-transparent group p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl mb-3">{lesson.flag}</div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="badge bg-blue-100 text-blue-700 text-xs">{lesson.country}</span>
                <span className={`badge text-xs ${LEVEL_COLORS[lesson.level]}`}>{lesson.level}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors leading-snug">
                {lesson.title}
              </h3>
              <p className="text-xs text-gray-400 mt-2">{lesson.duration}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
