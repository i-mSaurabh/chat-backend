const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// --- Patna Women's College FAQ with fuzzy matching ---
const patnaWomensCollegeFAQ = [
    {
        question: "What is Patna Women's College?",
        answer: "Patna Women’s College, established in 1940, is the first women’s college in Bihar. It is an autonomous institution affiliated with Patna University and accredited with ‘A’ Grade by NAAC.",
        keywords: ["about", "college", "what is", "patna women's college"]
    },
    {
        question: "Where is the college located?",
        answer: "Bailey Road, Patna, Bihar – 800001.",
        keywords: ["location", "address", "where"]
    },
    {
        question: "Who is the Principal of Patna Women’s College?",
        answer: "The current Principal is Dr. Sister M. Rashmi A.C.",
        keywords: ["principal", "head", "who"]
    },
    {
        question: "What is the NAAC grade of the college?",
        answer: "The college is accredited with NAAC ‘A’ Grade (3.58/4 CGPA in Cycle IV).",
        keywords: ["naac", "grade", "accreditation"]
    },
    {
        question: "What UG courses are available?",
        answer: "B.A., B.Sc., B.Com, BBA, BCA, Bachelor of Mass Communication, Bachelor of Advertising & Marketing Management, etc.",
        keywords: ["ug", "undergraduate", "courses", "program"]
    },
    {
        question: "What PG courses are available?",
        answer: "M.A., M.Sc., M.Com, MCA, MBA, etc.",
        keywords: ["pg", "postgraduate", "courses", "program"]
    },
    {
        question: "Are vocational/professional courses available?",
        answer: "Yes, professional courses like BMC, BCA, BBA, B.Voc, etc. are offered.",
        keywords: ["vocational", "professional", "courses", "bmc", "bba", "bca"]
    },
    {
        question: "How can I apply for admission?",
        answer: "Admissions are through an Entrance Test (PUCET) conducted by the college. Forms are available online on the official website.",
        keywords: ["admission", "apply", "entrance", "eligibility"]
    },
    {
        question: "What is the eligibility for UG courses?",
        answer: "Minimum 45%–50% in Class 12 (varies by course).",
        keywords: ["eligibility", "criteria", "requirements", "ug"]
    },
    {
        question: "What documents are required?",
        answer: "Marksheet, Transfer Certificate, Migration Certificate (if needed), Caste/Reservation Certificate (if applicable), Passport-size photos.",
        keywords: ["documents", "required", "papers", "certificate"]
    },
    {
        question: "What is the fee for B.Sc. (Hons.)?",
        answer: "Approx ₹20,000–₹30,000 per year (varies by subject).",
        keywords: ["fees", "cost", "bsc", "bachelor"]
    },
    {
        question: "What is the fee for Professional Courses (like BBA, BCA, BMC)?",
        answer: "Approx ₹40,000–₹60,000 per year.",
        keywords: ["fees", "professional", "bba", "bca", "bmc"]
    },
    {
        question: "How do I pay my college fees?",
        answer: "Fees can be paid through the college online portal (LMS/ERP) using Debit Card, Credit Card, Net Banking, or UPI. Receipts are generated online.",
        keywords: ["pay", "fees", "payment"]
    },
    {
        question: "Is offline fee payment available?",
        answer: "Yes, in some cases fees can be paid via Bank Challan at the designated bank.",
        keywords: ["offline", "fees", "payment"]
    },
    {
        question: "Does the college provide hostel facilities?",
        answer: "Yes, the college has hostels for students with limited seats. Admission is merit-based.",
        keywords: ["hostel", "accommodation", "stay"]
    },
    {
        question: "How can I apply for hostel accommodation?",
        answer: "Students need to fill out the hostel form during admission and submit it with required documents.",
        keywords: ["hostel", "apply", "form"]
    },
    {
        question: "How do I access the LMS (Learning Management System)?",
        answer: "1. Visit the official website of Patna Women’s College.\n2. Click on the LMS/Student Portal link.\n3. Log in using your Roll Number/Registration ID and password.\n4. Access your courses, study materials, and notices.",
        keywords: ["lms", "learning management", "system", "portal"]
    },
    {
        question: "How can I check my result?",
        answer: "1. Visit www.patnawomenscollege.in\n2. Click on Results tab.\n3. Select your course and semester.\n4. Enter your Roll Number/Registration Number.\n5. Download/print your marksheet.",
        keywords: ["result", "marksheet", "grades"]
    },
    {
        question: "What is PUCET?",
        answer: "Patna University Common Entrance Test (PUCET) is the entrance exam for admission to UG/PG courses at Patna Women’s College.",
        keywords: ["pucet", "entrance test", "exam"]
    },
    {
        question: "What facilities are available?",
        answer: "Library & Reading Hall, Computer Labs, Hostels for students, Sports & Gym facilities, Auditorium & Seminar halls, Canteen, Wi-Fi enabled campus, Digital library resources (e-books, journals, databases).",
        keywords: ["facilities", "library", "labs", "sports", "canteen", "wifi"]
    },
    {
        question: "What student activities are available?",
        answer: "Cultural Fest, Sports Day, Tech Fest, NSS/NCC activities, Clubs & Societies (Literary, Cultural, Drama, Science, etc.).",
        keywords: ["activities", "cultural", "clubs", "fest", "sports"]
    },
    {
        question: "How can I get my Transfer/Migration Certificate?",
        answer: "Apply through the College Office with an application form and required documents.",
        keywords: ["transfer", "migration", "certificate", "tc", "mc"]
    },
    {
        question: "Who should I contact for exam-related queries?",
        answer: "Students should contact the Examination Cell at the college.",
        keywords: ["exam", "queries", "contact"]
    },
    {
        question: "Is the college only for girls?",
        answer: "Yes, it is exclusively for women.",
        keywords: ["girls", "women", "only"]
    },
    {
        question: "Is hostel facility available?",
        answer: "Yes, limited hostel seats are available based on merit.",
        keywords: ["hostel", "facility", "available"]
    },
    {
        question: "Is the college government or private?",
        answer: "It is an autonomous college under Patna University.",
        keywords: ["government", "private", "type", "autonomous"]
    },
    {
        question: "Approximate fees for various courses?",
        answer: "UG courses: ₹15,600 – ₹60,000 total or per year depending on course.\nB.A (Hons.): ₹27,000 total.\nB.Sc (Hons.): ₹1,41,000 to ₹2,32,000 total.\nBCA / BBA: Approx ₹2,32,000 – ₹2,69,000 depending on the course.\nPG courses (MA/MSc/MCA etc.): ₹20,800 – ₹65,640 typical.\nPG Diploma/Certificate/Short-Term Courses: ≈ ₹41,000 – ₹48,000 per course.\nHostel Fees: ₹45,600 – ₹54,000 per annum.",
        keywords: ["fees", "cost", "price", "tuition"]
    }
];

// --- Fuzzy matching function ---
function getPwCFAQAnswerFuzzy(message) {
    const msg = message.toLowerCase();
    for (let faq of patnaWomensCollegeFAQ) {
        for (let kw of faq.keywords) {
            if (msg.includes(kw.toLowerCase())) {
                return faq.answer;
            }
        }
    }
    return null;
}

// --- Simple rule-based chatbot ---
function getBotReply(message) {
    const msg = message.toLowerCase();

    // First, check PWC FAQ with fuzzy matching
    const faqAnswer = getPwCFAQAnswerFuzzy(msg);
    if (faqAnswer) return faqAnswer;

    // Greetings
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! 👋 How can I help you today?";
    if (msg.includes("good morning")) return "Good morning! 🌞";
    if (msg.includes("good night")) return "Good night! 🌙 Sleep well!";
    if (msg.includes("bye")) return "Goodbye! 👋 Have a nice day!";
    
    // About bot
    if (msg.includes("your name")) return "I’m your friendly chatbot 🤖";
    if (msg.includes("who made you") || msg.includes("owner")) return "I was created by an engineer whose name I can't disclose.🧑‍💻";
    if (msg.includes("how old are you")) return "I was born in 2025, so I’m quite new!";
    if (msg.includes("purpose") || msg.includes("what can you do")) return "I can chat with you, answer general questions, and provide info about Patna Women's College.";

    // General knowledge
    if (msg.includes("time")) return `The current time is ${new Date().toLocaleTimeString()}`;
    if (msg.includes("date")) return `Today's date is ${new Date().toLocaleDateString()}`;
    if (msg.includes("capital of india")) return "The capital of India is New Delhi.";
    if (msg.includes("capital of usa")) return "The capital of the USA is Washington, D.C.";
    if (msg.includes("capital of uk")) return "The capital of the UK is London.";
    if (msg.includes("largest country")) return "The largest country by area is Russia.";
    if (msg.includes("smallest country")) return "The smallest country is Vatican City.";
    if (msg.includes("tallest mountain")) return "The tallest mountain is Mount Everest (8848m).";
    if (msg.includes("longest river")) return "The longest river is the Nile River in Africa.";
    if (msg.includes("largest ocean")) return "The largest ocean is the Pacific Ocean.";
    if (msg.includes("fastest animal")) return "The cheetah is the fastest land animal.";
    if (msg.includes("deepest ocean")) return "The Mariana Trench in the Pacific Ocean is the deepest part of Earth's oceans.";

    // Fun facts & riddles
    if (msg.includes("joke")) return "😂 Why don’t skeletons fight each other? Because they don’t have the guts!";
    if (msg.includes("fun fact")) return "Did you know? Octopuses have three hearts!";
    if (msg.includes("riddle")) return "🤔 What has to be broken before you can use it? — An egg!";
    
    // Personal interaction
    if (msg.includes("how are you")) return "I’m doing great! Thanks for asking. How about you?";
    if (msg.includes("i am fine")) return "Glad to hear that! 😊";
    if (msg.includes("thank you") || msg.includes("thanks")) return "You’re welcome! 🙌";
    if (msg.includes("weather")) return "I can't check live weather yet, but I hope it's nice where you are! 🌤️";
    if (msg.includes("your favorite color")) return "I like blue 💙 — it reminds me of the sky and oceans.";

    // Generic acknowledgements
    if (msg.includes("ok") || msg.includes("alright") || msg.includes("thanks")) return "👍 Got it!";
    if (msg.includes("hmm") || msg.includes("okay")) return "😊 Okay!";

    // Default fallback
    return "Sorry, I didn’t understand that. You can also ask me about Patna Women's College!";
}

// --- API endpoint ---
app.post("/chat", (req, res) => {
    const userMessage = req.body.message || "";
    const reply = getBotReply(userMessage);
    res.json({ reply });
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
