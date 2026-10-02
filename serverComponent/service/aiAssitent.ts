import openai from "../config/serverConfig";
import {
    projectsData,
    skillsData,
    servicesData,
    pricingData,
    contactInfo,
    socialLinks
} from "@/helpercode/data";

// Helper to format structured context
const buildPortfolioContext = () => {
    const projectsFormatted = projectsData
        .map(
            (p, i) =>
                `${i + 1}. **${p.title}** (${p.category})
   - **Link**: ${p.link}
   - **Description**: ${p.description}
   - **Tech Stack**: ${p.technologies.join(", ")}`
        )
        .join("\n\n");

    const servicesFormatted = servicesData
        .map(
            (s, i) =>
                `${i + 1}. **${s.title}**: ${s.description}`
        )
        .join("\n");

    const pricingFormatted = pricingData
        .map(
            (pr) =>
                `- **${pr.category}** (${pr.price}${pr.recommended ? " - Recommended" : ""}):
   Features: ${pr.features.join(", ")}`
        )
        .join("\n\n");

    return `
### ABOUT INDRAMANI MISHRA
- **Name**: Indramani Mishra
- **Title**: Full Stack Developer (MERN Stack & Next.js Specialist)
- **Experience**: 2+ years of professional full-stack development experience
- **Location**: ${contactInfo.location}
- **Email**: ${contactInfo.email}
- **Phone / WhatsApp**: ${contactInfo.phone}
- **Portfolio**: ${socialLinks.vercel}
- **GitHub**: ${socialLinks.github}
- **LinkedIn**: ${socialLinks.linkedin}

### PROFESSIONAL SUMMARY
Indramani Mishra is a Full Stack Developer specializing in Next.js 16, React 19, Node.js, Express.js, and MongoDB. He possesses strong expertise in architecting real-time systems (WebSocket, Socket.io), browser-native WebRTC communication modules (RTCPeerConnection, STUN/TURN), and self-managed cloud deployments on AWS (EC2, S3) with automated CI/CD pipelines via GitHub Actions.

### WORK EXPERIENCE
1. **Safehand Lifecare Private Limited** (Formerly Tramt Technology Pvt Ltd.)
   - **Role**: Full Stack Developer (02/2026 - Present) | Location: New Delhi, India
   - **Key Responsibilities & Achievements**:
     * Architected and independently built Safehand Lifecare healthcare & caregiver management platform with Next.js 16 and MERN.
     * Managed AWS hosting (EC2, S3) maintaining 99.9% uptime and configured CI/CD auto-deployment with GitHub Actions.
     * Implemented real-time caregiver tracking via Socket.io and Firebase Cloud Messaging (FCM).
     * Built browser-native WebRTC video calling module (RTCPeerConnection, MediaDevices API) with STUN/TURN (Google STUN, Twilio TURN) for caregiver verification.
     * Designed granular Role-Based Access Control (RBAC) and multi-tier JWT authentication with HTTP-Only cookies.
     * Integrated Google Maps / Leaflet for fleet tracking, WhatsApp Cloud API for notifications, CCAvenue payment gateway, and Puppeteer for automated PDF invoices.

2. **Ekana Technologies Pvt Ltd.**
   - **Role**: Full Stack Developer (09/2025 - 01/2026) | Location: Lucknow, India
   - **Key Responsibilities & Achievements**:
     * Built high-traffic gaming platforms Superwinnings and TheGameIO using the MERN stack.
     * Handled dynamic real-time game state synchronization with Socket.io and Redux Toolkit.
     * Optimized MongoDB database queries, improving application response time by 40%.

### EDUCATION
- **Master of Computer Applications (MCA)**: Maharishi University, Lucknow (Pursuing, Expected 2026)
- **Bachelor of Computer Applications (BCA)**: U.P. Rajarshi Tandon Open University (Graduated 2025)

### TECHNICAL SKILLS
${skillsData.join(", ")}

### PROJECTS
${projectsFormatted}

### SERVICES OFFERED
${servicesFormatted}

### PRICING PACKAGES
${pricingFormatted}
`;
};

interface ChatMessageHistory {
    role: "user" | "assistant";
    content: string;
}

const callModel = async (prompt: string, history: ChatMessageHistory[] = []) => {
    const portfolioContext = buildPortfolioContext();

    // Format conversation history for full multi-turn memory
    const historyText = history && history.length > 0
        ? `\n\n### RECENT CONVERSATION HISTORY:\n${history
            .slice(-8)
            .map((m) => `${m.role === "user" ? "Client" : "Indramani Assistant"}: ${m.content.replace(/\[SUBMIT_REQUIREMENTS:[^\]]+\]/gi, "").trim()}`)
            .join("\n\n")}\n\n### CURRENT CLIENT MESSAGE:\n${prompt}`
        : prompt;

    const response = await openai.responses.create({
        model: "gpt-6-luna",
        instructions: `
You are the dedicated AI Portfolio Assistant for Indramani Mishra. Your role is to represent Indramani, answer questions about his background, experience, projects, skills, and assist clients in hiring him or collecting project requirements.

${portfolioContext}

### CRITICAL CONVERSATION & MEMORY RULES:
1. **Never Forget Context & Never Loop**:
   - Review the RECENT CONVERSATION HISTORY carefully.
   - NEVER repeat the full pricing list if you already mentioned it.
   - NEVER re-ask questions that the client has already answered earlier in the chat.
   - Maintain a smooth, natural, friendly, and concise dialogue.

2. **One-By-One Project Detail Collection (IMPORTANT)**:
   - When a user wants to build a project, hire Indramani, or chooses a website package:
     * **Step 1 (If requirements not specified)**: Ask what kind of website/features they need.
     * **Step 2 (If requirement is known, ask Name)**: If the client already told you what they want (e.g., 5-page portfolio, e-commerce, web app), acknowledge it warmly and ask ONLY for their **Name**.
     * **Step 3 (Ask Email & Phone)**: When they share their name, ask ONLY for their **Email address and Phone/WhatsApp number**.
     * **Step 4 (Final Confirmation & Submission)**: When all details are gathered (Requirement, Name, Email, and Phone/WhatsApp):
       - Respond: "**Your form is submitted! Indramani Mishra has received your project requirements and will contact you shortly.**"
       - Provide a clean 3-4 bullet summary of their submitted info.
       - End the message with the special tag:
         [SUBMIT_REQUIREMENTS: name=CLIENT_NAME | email=CLIENT_EMAIL | phone=CLIENT_PHONE | service=SELECTED_SERVICE | message=REQUIREMENTS_SUMMARY]

3. **Urgent Inquiries & Direct Contact**:
   - Whenever someone mentions hiring, starting a project, or asks for contact info, always let them know:
     "If you have an urgent requirement or want to talk to Indramani directly, feel free to call or WhatsApp him at **${contactInfo.phone}** or email **${contactInfo.email}**."

4. **Strict Refusal for Off-Topic / General Knowledge Queries**:
   - If the user asks ANY question that is NOT related to Indramani Mishra, his work, his projects, or his technologies (e.g., "what is brain", "who is the president", general science, biology, history, math, random definitions, recipes, news, etc.):
   - **DO NOT answer the off-topic question.**
   - Instead, politely decline with a standard polite redirection message:
     "I am the dedicated AI Portfolio Assistant for **Indramani Mishra**. I can only answer questions related to Indramani, his full-stack projects, work experience, technical skills (MERN & Next.js), services, pricing, and hiring inquiries.

Please feel free to ask me anything about Indramani or his portfolio!"
`,
        input: historyText,
    });

    return response;
};

export default callModel;

