const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// --- Patna Women's College Info ---
const patnaWomensCollege = {
    name: "Patna Women's College",
    location: "Patna, Bihar, India",
    established: "1940",
    affiliation: "Patna University",
    courses: {
        undergraduate: ["BA", "BSc", "BCom"],
        postgraduate: ["MA", "MSc", "MCom"]
    },
    admission: {
        criteria: "Based on merit in qualifying exam",
        process: "Online/offline application through college website"
    },
    fees: {
        undergraduate: "Varies by course, approx ₹20,000–₹50,000/year",
        postgraduate: "Varies, approx ₹25,000–₹60,000/year"
    },
    facilities: ["Library", "Hostel", "Sports", "Laboratories", "Canteen"],
    hostel: {
        availability: true,
        separate_blocks: "Yes, for girls"
    },
    faculty: "Qualified and experienced in respective subjects",
    website: "https://www.patnawomenscollege.in"
};

// --- Keywords for fuzzy matching ---
const collegeKeywords = {
    courses: ["course", "program", "degree", "ug", "undergraduate", "pg", "postgraduate", "msc", "bsc", "ba", "mcom", "bcom", "ma"],
    admission: ["admission", "apply", "entrance", "eligibility", "criteria", "requirements"],
    fees: ["fee", "fees", "cost", "tuition", "price"],
    hostel: ["hostel", "accommodation", "stay", "rooms"],
    facilities: ["facility", "facilities", "library", "labs", "sports", "canteen"],
    location: ["location", "where", "address", "city"],
    established: ["established", "founded", "year", "history", "age"],
    affiliation: ["affiliation", "university", "college affiliated"],
    website: ["website", "link", "site"],
    faculty: ["faculty", "teachers", "staff", "professor", "lecturer"]
};

// --- Function to handle fuzzy college queries ---
function getCollegeAnswerFuzzy(query) {
    const q = query.toLowerCase();

    for (const key in collegeKeywords) {
        if (collegeKeywords[key].some(word => q.includes(word))) {
            switch (key) {
                case "courses":
                    return `Undergraduate: ${patnaWomensCollege.courses.undergraduate.join(", ")}\nPostgraduate: ${patnaWomensCollege.courses.postgraduate.join(", ")}`;
                case "admission":
                    return `Admission Criteria: ${patnaWomensCollege.admission.criteria}\nProcess: ${patnaWomensCollege.admission.process}`;
                case "fees":
                    return `Undergraduate: ${patnaWomensCollege.fees.undergraduate}\nPostgraduate: ${patnaWomensCollege.fees.postgraduate}`;
                case "hostel":
                    return patnaWomensCollege.hostel.availability 
                        ? `Hostel is available. Separate blocks: ${patnaWomensCollege.hostel.separate_blocks}` 
                        : "Hostel is not available.";
                case "facilities":
                    return `Facilities: ${patnaWomensCollege.facilities.join(", ")}`;
                case "location":
                    return `Location: ${patnaWomensCollege.location}`;
                case "established":
                    return `Established in: ${patnaWomensCollege.established}`;
                case "affiliation":
                    return `Affiliation: ${patnaWomensCollege.affiliation}`;
                case "website":
                    return `Website: ${patnaWomensCollege.website}`;
                case "faculty":
                    return `Faculty: ${patnaWomensCollege.faculty}`;
            }
        }
    }
    return null; // no match
}

// --- Simple rule-based chatbot ---
function getBotReply(message) {
    const msg = message.toLowerCase();

    // Check college info first
    const collegeAnswer = getCollegeAnswerFuzzy(msg);
    if (collegeAnswer) return collegeAnswer;

    // Greetings
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! 👋 How can I help you today?";
    if (msg.includes("good morning")) return "Good morning! 🌞";
    if (msg.includes("good night")) return "Good night! 🌙 Sleep well!";
    if (msg.includes("bye")) return "Goodbye! 👋 Have a nice day!";
    
    // About bot
    if (msg.includes("your name")) return "I’m your friendly chatbot 🤖";
    if (msg.includes("who made you") || msg.includes("owner")) return "I was created by Saurabh Kumar 🧑‍💻";
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
