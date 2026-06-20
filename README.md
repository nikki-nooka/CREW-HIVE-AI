# CrewHive | Student Collaboration Platform

> **Where Students with Ideas Meet Students with Skills.**
> 
> CrewHive is a premium, high-aesthetic student collaboration ecosystem that enables university creators to pitch project opportunities, developers to build real-world portfolios, and teammates to form accountable, NDA-protected groups with verified proof of work.

---

## 🌟 Core Features & Innovation

### 1. Honey Hive Particle Intro
- A custom 2D canvas physics engine runs on page load, generating 70 interactive particles that dynamically gravitate toward coordinate attractors to sketch a digital honeycomb grid.

### 2. Interactive Collaboration Simulator
Designed to address common issues in student projects:
- **Visibility & NDA Controls**: Toggle project visibility settings. Private projects blur out core Secrets, problem statements, and tech stacks until developers sign a Non-Disclosure Agreement (NDA).
- **Free-Rider Calculator**: Drag range sliders (for Tasks Completed, meeting attendance, and Pull Requests) to calculate a member's Reputation Score in real-time.
- **Inactivity Warning Timelines**: Simulates triggers that dispatch personal warnings (at 10 days) and team leader notifications (at 14 days) to maintain project momentum.
- **Contributor Badges**: Earn verified badges (e.g. Spring Boot, Java, Docker) based on positive peer endorsements and automated git logs.

### 3. Dynamic Project Discovery Directory
- Live project cards display required developer roles, domain tags, tech stack (Spring Boot, Kafka, AWS, Docker), and NDA locks.
- Real-time filtering by domain (AI/ML, Web Dev, Web3, Mobile) and search query indexing.

### 4. Interactive Creation Wizard & Authentication
- **3-Step Post Wizard**: Clean step-by-step layout to describe project concepts, input technology stacks, define required roles, and toggle privacy configurations.
- **Mock Authentication**: Log in with custom credentials (featuring floating forms) or test Google / GitHub OAuth integrations.

---

## 🛠️ Technology Stack

- **Core Framework**: React 18
- **Bundler & Dev Server**: Vite
- **Styling**: Vanilla CSS (Cyber Gold `#FFB000` & Electric Indigo `#6366F1` accents) with Space Dark/Light Glassmorphism.
- **Iconography**: Embedded inline SVGs for zero external dependency weight.

---

## 📂 Project Structure

```text
crewhive-react/
├── public/                 # Static assets (Favicons, base icons)
├── src/
│   ├── assets/             # Images and background visuals
│   ├── App.jsx             # Main Application Logic (Router, States, Physics)
│   ├── index.css           # Styling Sheets (Tokens, Glassmorphism, Sliders)
│   └── main.jsx            # React client mount point
├── index.html              # Shell HTML (SEO titles & headers configured)
├── package.json            # Script triggers and dependencies
└── vite.config.js          # Vite config
```

---

## 🚀 Getting Started (How to Extract & Run)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Download & Extract
If downloaded as a ZIP folder:
1. Extract the `.zip` archive to a folder on your computer.
2. Open your terminal (PowerShell, Command Prompt, or Bash).
3. Navigate to the extracted folder:
   ```bash
   cd path/to/crewhive-react
   ```

If cloning from GitHub:
```bash
git clone https://github.com/nikki-nooka/CREW-HIVE-AI.git
cd CREW-HIVE-AI
```

### 2. Install Dependencies
Run the following command to download the node modules:
```bash
npm install
```

### 3. Launch Development Server
Start the local server with hot module replacement (HMR):
```bash
npm run dev
```
Once started, open your web browser and navigate to:
👉 **`http://localhost:5174/`** (or the local port printed in your console).

### 4. Compile Production Build
To build static assets for deployment:
```bash
npm run build
```
This compiles the code into optimized chunks inside the `/dist` directory.

---

## 📄 License
This project is open-source and available under the MIT License.
