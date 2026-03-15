RIGHTS_DATA = [
    # ─────────────── INDIA ───────────────
    {
        "country": "India", "category": "Fundamental Rights",
        "title": "Right to Equality",
        "explanation": "Every citizen is equal before the law. The state cannot discriminate on grounds of religion, race, caste, sex, or place of birth.",
        "source": "Constitution of India, Articles 14–18",
        "example": "A government job cannot be denied to you solely because of your caste or religion.",
        "min_age": 0, "max_age": 120, "tags": "equality,discrimination", "is_emergency": False
    },
    {
        "country": "India", "category": "Fundamental Rights",
        "title": "Right to Freedom of Speech & Expression",
        "explanation": "Citizens can express opinions freely through speech, writing, or any other medium, subject to reasonable restrictions.",
        "source": "Constitution of India, Article 19(1)(a)",
        "example": "You can write a blog criticising government policy without fear of arbitrary arrest.",
        "min_age": 0, "max_age": 120, "tags": "speech,expression,freedom", "is_emergency": False
    },
    {
        "country": "India", "category": "Fundamental Rights",
        "title": "Right Against Exploitation",
        "explanation": "Prohibits human trafficking, forced labour, and employment of children under 14 in hazardous work.",
        "source": "Constitution of India, Articles 23–24",
        "example": "A factory cannot legally employ a 12-year-old child.",
        "min_age": 0, "max_age": 120, "tags": "child,labour,exploitation", "is_emergency": False
    },
    {
        "country": "India", "category": "Fundamental Rights",
        "title": "Right to Constitutional Remedies",
        "explanation": "You can approach the Supreme Court or High Court directly if your fundamental rights are violated.",
        "source": "Constitution of India, Article 32",
        "example": "If police detain you illegally, you can file a Habeas Corpus petition in the High Court.",
        "min_age": 0, "max_age": 120, "tags": "remedy,court,habeas corpus", "is_emergency": True
    },
    {
        "country": "India", "category": "Voting Rights",
        "title": "Right to Vote",
        "explanation": "Every Indian citizen aged 18 or above has the right to vote in elections without discrimination.",
        "source": "Constitution of India, Article 326; Representation of the People Act 1950",
        "example": "You can register as a voter and cast your ballot in Lok Sabha and state assembly elections.",
        "min_age": 18, "max_age": 120, "tags": "vote,election,democracy", "is_emergency": False
    },
    {
        "country": "India", "category": "Education Rights",
        "title": "Right to Free & Compulsory Education",
        "explanation": "Children aged 6–14 have the right to free and compulsory education in a neighbourhood school.",
        "source": "Right to Education Act 2009; Constitution Article 21A",
        "example": "A government school cannot charge tuition fees from a child aged 6–14.",
        "min_age": 6, "max_age": 14, "tags": "education,school,children", "is_emergency": False
    },
    {
        "country": "India", "category": "Worker Rights",
        "title": "Right to Minimum Wage",
        "explanation": "Every worker is entitled to a minimum wage as notified by the central or state government.",
        "source": "Minimum Wages Act 1948; Code on Wages 2019",
        "example": "Your employer cannot pay you below the state-notified minimum wage for your category of work.",
        "min_age": 14, "max_age": 120, "tags": "wage,worker,labour", "is_emergency": False
    },
    {
        "country": "India", "category": "Worker Rights",
        "title": "Protection Against Wrongful Termination",
        "explanation": "Workers in establishments with 100+ employees cannot be retrenched without government permission and must receive retrenchment compensation.",
        "source": "Industrial Disputes Act 1947, Section 25N",
        "example": "A factory with 200 workers cannot lay off employees without prior government approval.",
        "min_age": 18, "max_age": 120, "tags": "termination,retrenchment,worker", "is_emergency": False
    },
    {
        "country": "India", "category": "Digital Rights",
        "title": "Right to Privacy (Digital)",
        "explanation": "Privacy is a fundamental right. Your personal data cannot be collected or shared without consent.",
        "source": "Justice K.S. Puttaswamy v. Union of India (2017); Digital Personal Data Protection Act 2023",
        "example": "An app cannot share your location data with third parties without your explicit consent.",
        "min_age": 0, "max_age": 120, "tags": "privacy,data,digital", "is_emergency": False
    },
    {
        "country": "India", "category": "Civil Rights",
        "title": "Right to Information",
        "explanation": "Any citizen can request information from any public authority. The authority must respond within 30 days.",
        "source": "Right to Information Act 2005",
        "example": "You can ask a government department for details of how public funds were spent.",
        "min_age": 18, "max_age": 120, "tags": "RTI,information,transparency", "is_emergency": False
    },
    {
        "country": "India", "category": "Human Rights",
        "title": "Right to Life & Personal Liberty",
        "explanation": "No person shall be deprived of life or personal liberty except according to procedure established by law.",
        "source": "Constitution of India, Article 21",
        "example": "Police cannot detain you indefinitely without producing you before a magistrate within 24 hours.",
        "min_age": 0, "max_age": 120, "tags": "life,liberty,arrest", "is_emergency": True
    },
    {
        "country": "India", "category": "Freedom Rights",
        "title": "Freedom of Religion",
        "explanation": "Every person has the right to freely profess, practise, and propagate religion.",
        "source": "Constitution of India, Articles 25–28",
        "example": "You cannot be forced to attend religious instruction in a state-funded school.",
        "min_age": 0, "max_age": 120, "tags": "religion,freedom,belief", "is_emergency": False
    },

    # ─────────────── USA ───────────────
    {
        "country": "USA", "category": "Civil Rights",
        "title": "Freedom of Speech",
        "explanation": "The government cannot restrict your speech based on its content. This covers political speech, protests, and most forms of expression.",
        "source": "U.S. Constitution, First Amendment",
        "example": "You can peacefully protest outside a government building without a permit in most cases.",
        "min_age": 0, "max_age": 120, "tags": "speech,expression,first amendment", "is_emergency": False
    },
    {
        "country": "USA", "category": "Civil Rights",
        "title": "Freedom of Religion",
        "explanation": "The government cannot establish an official religion or prohibit the free exercise of religion.",
        "source": "U.S. Constitution, First Amendment",
        "example": "A public school cannot require students to pray or participate in religious activities.",
        "min_age": 0, "max_age": 120, "tags": "religion,freedom,first amendment", "is_emergency": False
    },
    {
        "country": "USA", "category": "Human Rights",
        "title": "Right Against Unreasonable Search & Seizure",
        "explanation": "Police generally need a warrant supported by probable cause to search your home, car, or belongings.",
        "source": "U.S. Constitution, Fourth Amendment",
        "example": "Police cannot search your home without a warrant unless there are specific emergency circumstances.",
        "min_age": 0, "max_age": 120, "tags": "search,seizure,police,fourth amendment", "is_emergency": True
    },
    {
        "country": "USA", "category": "Human Rights",
        "title": "Miranda Rights",
        "explanation": "When arrested, you must be informed of your right to remain silent and your right to an attorney.",
        "source": "Miranda v. Arizona (1966); Fifth & Sixth Amendments",
        "example": "If police arrest you, they must say: 'You have the right to remain silent. Anything you say can be used against you.'",
        "min_age": 0, "max_age": 120, "tags": "arrest,miranda,silence,attorney", "is_emergency": True
    },
    {
        "country": "USA", "category": "Voting Rights",
        "title": "Right to Vote",
        "explanation": "U.S. citizens aged 18+ have the right to vote. States cannot deny this right based on race, sex, or failure to pay a poll tax.",
        "source": "15th, 19th, 24th, 26th Amendments; Voting Rights Act 1965",
        "example": "You can register to vote and cast a ballot in federal, state, and local elections.",
        "min_age": 18, "max_age": 120, "tags": "vote,election,democracy", "is_emergency": False
    },
    {
        "country": "USA", "category": "Worker Rights",
        "title": "Right to Minimum Wage",
        "explanation": "The federal minimum wage is $7.25/hour. Many states have higher minimums. Employers must pay at least the applicable minimum.",
        "source": "Fair Labor Standards Act (FLSA) 1938",
        "example": "Your employer must pay you at least the federal or state minimum wage, whichever is higher.",
        "min_age": 14, "max_age": 120, "tags": "wage,worker,FLSA", "is_emergency": False
    },
    {
        "country": "USA", "category": "Worker Rights",
        "title": "Right to a Safe Workplace",
        "explanation": "Employers must provide a workplace free from recognised hazards. OSHA enforces safety standards.",
        "source": "Occupational Safety and Health Act 1970 (OSHA)",
        "example": "Your employer must provide safety equipment and training for hazardous tasks.",
        "min_age": 14, "max_age": 120, "tags": "safety,workplace,OSHA", "is_emergency": False
    },
    {
        "country": "USA", "category": "Education Rights",
        "title": "Right to Free Public Education",
        "explanation": "All children, including undocumented immigrants, have the right to a free public K-12 education.",
        "source": "Plyler v. Doe (1982); Every Student Succeeds Act 2015",
        "example": "A public school cannot deny enrollment to a child based on immigration status.",
        "min_age": 5, "max_age": 18, "tags": "education,school,children", "is_emergency": False
    },
    {
        "country": "USA", "category": "Civil Rights",
        "title": "Equal Protection Under the Law",
        "explanation": "No state shall deny any person equal protection of the laws. Discrimination by government based on race, sex, or national origin is prohibited.",
        "source": "U.S. Constitution, 14th Amendment",
        "example": "A state university cannot have different admission standards based solely on race.",
        "min_age": 0, "max_age": 120, "tags": "equality,discrimination,14th amendment", "is_emergency": False
    },
    {
        "country": "USA", "category": "Digital Rights",
        "title": "Electronic Privacy Rights",
        "explanation": "The government generally needs a warrant to access your emails, texts, and digital communications.",
        "source": "Electronic Communications Privacy Act 1986; Carpenter v. United States (2018)",
        "example": "Law enforcement needs a warrant to access your stored emails or cell phone location history.",
        "min_age": 0, "max_age": 120, "tags": "privacy,digital,email,warrant", "is_emergency": False
    },
    {
        "country": "USA", "category": "Freedom Rights",
        "title": "Right to Bear Arms",
        "explanation": "The Second Amendment protects the right to keep and bear arms, subject to reasonable regulations.",
        "source": "U.S. Constitution, Second Amendment; District of Columbia v. Heller (2008)",
        "example": "A law-abiding adult can legally own a firearm for self-defence in their home.",
        "min_age": 18, "max_age": 120, "tags": "arms,gun,second amendment", "is_emergency": False
    },

    # ─────────────── KUWAIT ───────────────
    {
        "country": "Kuwait", "category": "Civil Rights",
        "title": "Freedom of Opinion & Expression",
        "explanation": "Kuwaiti citizens have the right to express opinions verbally, in writing, or through other means, within the limits of the law.",
        "source": "Constitution of Kuwait, Article 36",
        "example": "You can write an opinion piece in a newspaper criticising a government policy.",
        "min_age": 0, "max_age": 120, "tags": "speech,expression,opinion", "is_emergency": False
    },
    {
        "country": "Kuwait", "category": "Human Rights",
        "title": "Personal Liberty & Dignity",
        "explanation": "Personal liberty is guaranteed. No person may be arrested, detained, or searched except under the provisions of the law.",
        "source": "Constitution of Kuwait, Articles 30–31",
        "example": "Police must have a legal basis to detain you and must inform you of the reason.",
        "min_age": 0, "max_age": 120, "tags": "liberty,arrest,dignity", "is_emergency": True
    },
    {
        "country": "Kuwait", "category": "Voting Rights",
        "title": "Right to Vote",
        "explanation": "Kuwaiti citizens aged 21 and above who have been citizens for at least 20 years have the right to vote in National Assembly elections.",
        "source": "Constitution of Kuwait, Article 80; Electoral Law",
        "example": "A Kuwaiti citizen aged 21+ can register and vote in parliamentary elections.",
        "min_age": 21, "max_age": 120, "tags": "vote,election,parliament", "is_emergency": False
    },
    {
        "country": "Kuwait", "category": "Worker Rights",
        "title": "Right to Work & Fair Wages",
        "explanation": "The state guarantees the right to work and ensures fair wages. Forced labour is prohibited.",
        "source": "Constitution of Kuwait, Article 41; Labour Law No. 6 of 2010",
        "example": "An employer cannot withhold your salary or force you to work without compensation.",
        "min_age": 15, "max_age": 120, "tags": "work,wage,labour", "is_emergency": False
    },
    {
        "country": "Kuwait", "category": "Education Rights",
        "title": "Right to Free Education",
        "explanation": "Education is free and compulsory at the primary level. The state provides free education at all levels for Kuwaiti nationals.",
        "source": "Constitution of Kuwait, Article 40",
        "example": "Kuwaiti children are entitled to free schooling from primary through university level.",
        "min_age": 6, "max_age": 120, "tags": "education,school,free", "is_emergency": False
    },
    {
        "country": "Kuwait", "category": "Freedom Rights",
        "title": "Freedom of Religion",
        "explanation": "Freedom of belief is absolute. The state protects freedom to practise religious rites in accordance with established customs, provided public order is not disturbed.",
        "source": "Constitution of Kuwait, Article 35",
        "example": "Non-Muslim residents can practise their religion privately without state interference.",
        "min_age": 0, "max_age": 120, "tags": "religion,belief,freedom", "is_emergency": False
    },
    {
        "country": "Kuwait", "category": "Human Rights",
        "title": "Right to Fair Trial",
        "explanation": "Every accused person is presumed innocent until proven guilty. The right to legal defence is guaranteed.",
        "source": "Constitution of Kuwait, Article 34",
        "example": "You have the right to hire a lawyer and present your defence before a court.",
        "min_age": 0, "max_age": 120, "tags": "trial,fair,lawyer,innocent", "is_emergency": True
    },
    {
        "country": "Kuwait", "category": "Civil Rights",
        "title": "Right to Privacy of Correspondence",
        "explanation": "Freedom of postal, telegraphic, and telephonic communications is guaranteed and may not be censored except by judicial order.",
        "source": "Constitution of Kuwait, Article 39",
        "example": "Your private messages and phone calls cannot be monitored without a court order.",
        "min_age": 0, "max_age": 120, "tags": "privacy,communication,correspondence", "is_emergency": False
    },

    # ─────────────── RUSSIA ───────────────
    {
        "country": "Russia", "category": "Civil Rights",
        "title": "Freedom of Speech & Press",
        "explanation": "The Constitution guarantees freedom of thought, speech, and mass media. Censorship is prohibited.",
        "source": "Constitution of the Russian Federation, Article 29",
        "example": "Citizens have the constitutional right to express opinions and access information freely.",
        "min_age": 0, "max_age": 120, "tags": "speech,press,freedom", "is_emergency": False
    },
    {
        "country": "Russia", "category": "Human Rights",
        "title": "Right to Life",
        "explanation": "Everyone has the right to life. The death penalty may only be applied for especially grave crimes against life.",
        "source": "Constitution of the Russian Federation, Article 20",
        "example": "The state must protect your life and cannot arbitrarily deprive you of it.",
        "min_age": 0, "max_age": 120, "tags": "life,death penalty,human rights", "is_emergency": True
    },
    {
        "country": "Russia", "category": "Human Rights",
        "title": "Right to Personal Dignity",
        "explanation": "Human dignity is protected by the state. Nothing may serve as grounds for its derogation. No one shall be subjected to torture or degrading treatment.",
        "source": "Constitution of the Russian Federation, Article 21",
        "example": "Law enforcement cannot use torture or degrading treatment during interrogation.",
        "min_age": 0, "max_age": 120, "tags": "dignity,torture,human rights", "is_emergency": True
    },
    {
        "country": "Russia", "category": "Voting Rights",
        "title": "Right to Vote",
        "explanation": "Russian citizens aged 18 and above have the right to elect and be elected to state and local government bodies.",
        "source": "Constitution of the Russian Federation, Article 32",
        "example": "A Russian citizen aged 18+ can vote in presidential and parliamentary elections.",
        "min_age": 18, "max_age": 120, "tags": "vote,election,democracy", "is_emergency": False
    },
    {
        "country": "Russia", "category": "Worker Rights",
        "title": "Right to Labour & Fair Remuneration",
        "explanation": "Everyone has the right to work in conditions meeting safety requirements, and to receive remuneration without discrimination and not below the minimum wage.",
        "source": "Constitution of the Russian Federation, Article 37; Labour Code of Russia",
        "example": "Your employer must pay you at least the federal minimum wage and cannot discriminate in pay.",
        "min_age": 16, "max_age": 120, "tags": "work,wage,labour,minimum wage", "is_emergency": False
    },
    {
        "country": "Russia", "category": "Education Rights",
        "title": "Right to Free Education",
        "explanation": "Everyone has the right to education. General education in state schools is free and compulsory.",
        "source": "Constitution of the Russian Federation, Article 43",
        "example": "Children must attend school and the state provides free general education.",
        "min_age": 6, "max_age": 18, "tags": "education,school,free,compulsory", "is_emergency": False
    },
    {
        "country": "Russia", "category": "Freedom Rights",
        "title": "Freedom of Conscience & Religion",
        "explanation": "Everyone is guaranteed freedom of conscience and religion, including the right to profess any religion or none.",
        "source": "Constitution of the Russian Federation, Article 28",
        "example": "You can practise any religion or be an atheist without state interference.",
        "min_age": 0, "max_age": 120, "tags": "religion,conscience,freedom", "is_emergency": False
    },
    {
        "country": "Russia", "category": "Civil Rights",
        "title": "Right to Privacy of Home",
        "explanation": "The home is inviolable. No one has the right to enter a home against the will of the persons residing in it except in cases established by federal law or on the basis of a court decision.",
        "source": "Constitution of the Russian Federation, Article 25",
        "example": "Police cannot enter your home without a court warrant except in urgent circumstances defined by law.",
        "min_age": 0, "max_age": 120, "tags": "privacy,home,search,warrant", "is_emergency": True
    },
    {
        "country": "Russia", "category": "Digital Rights",
        "title": "Right to Privacy of Communications",
        "explanation": "Privacy of correspondence, telephone conversations, and other communications is guaranteed. Restriction is only allowed by court decision.",
        "source": "Constitution of the Russian Federation, Article 23",
        "example": "Your phone calls and messages cannot be intercepted without a court order.",
        "min_age": 0, "max_age": 120, "tags": "privacy,communication,digital", "is_emergency": False
    },
    {
        "country": "Russia", "category": "Human Rights",
        "title": "Right to Qualified Legal Assistance",
        "explanation": "Everyone has the right to receive qualified legal assistance. In cases provided by law, legal assistance is provided free of charge.",
        "source": "Constitution of the Russian Federation, Article 48",
        "example": "If you are arrested, you have the right to a lawyer from the moment of detention.",
        "min_age": 0, "max_age": 120, "tags": "lawyer,legal aid,arrest,defence", "is_emergency": True
    },
]
