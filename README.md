# 🚀 Ctrl-Alt-Del

## 📌 Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Faced](#challenges-we-faced)
- [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)
- [Team](#team)

---

## 🎯 Introduction
Our project addresses the inefficiency of generic financial advice by **leveraging Gen AI** to deliver tailored credit card and insurance recommendations. By analyzing user transactions, spending habits, and demographic profiles, we solve the problem of one-size-fits-all suggestions, empowering users with choices aligned with their unique financial needs.

---

## 🎥 Demo
🔗 [Live Demo](#) (if applicable)  
📹 [Video Demo](#) (if applicable)  
🖼️ Screenshots:

![Screenshot 1](link-to-image)

## 💡 Inspiration
Traditional financial recommendations often ignore individual circumstances, leading to:
- Irrelevant credit card perks (e.g., travel rewards for non-travelers)
- Mismatched insurance policies (e.g., excessive coverage for low-risk users)

We bridge this gap by decoding personal financial behaviors—**spending patterns**, **life stages**, and **financial goals**—to recommend products that _actually fit_.

---

## ⚙️ What It Does
- **Analyzes** transaction history (income/expense ratios, savings trends) to infer habits
- **Contextualizes** recommendations using demographics (age, location, occupation)
- **Generates hyper-personalized suggestions** via `deepseek-v3-0324` model:
  - Travel credit cards for users with frequent flight expenses
  - Term insurance prioritization for young parents
- **Updates in real-time** as user behavior evolves

---

## 🛠️ How We Built It
### Frontend
- **React** dynamic UI with interactive dashboards
- Custom marketing message and delivery channel, hyper-personalized based on user's interests. For example - the model chooses meme-based marketing for Gen-Z users which other users might find distasteful

### Backend
- **Flask REST API** for data processing
- Integration with AI model outputs

### AI/ML
- **Open Router API** to access `deepseek-v3-0324`
- Custom prompts mapping financial data to product features (e.g., _"Suggest cards with fuel rewards if fuel spend >20%"_) 
  
---

## 🚧 Challenges
1. **Prompt Engineering**  
   - Balancing transaction data, demographics, and financial logic in prompts  
   - Example: Crafting _"Recommend travel insurance for users with >4 international trips/year"_

2. **Model Integration**  
   - Parsing unstructured AI responses into structured JSON for the frontend

3. **Data Privacy**  
   - Encrypted storage and strict access controls for financial data

4. **Real-Time Processing**  
   - Optimized latency by precomputing transaction aggregates
     
5. **Data Collection & Synthesis**  
   - Generated synthetic transaction histories using **Faker** (no access to real-world financial data)  
   - Simulated realistic spending patterns (e.g., recurring bills, seasonal trends)  
   - Ensured demographic diversity (age, occupation, location) for balanced training  
   - Limitations: Synthetic data lacks nuanced real-world edge cases (e.g., irregular high-risk spending) 

---

## 🏃 How to Run

### Prerequisites
- Node.js (v18 or higher)
- Python 3.x
- pip (Python package manager)

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd code/src/back_end
   ```

2. Create and activate a virtual environment (recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` (if available)
   - Configure your environment variables in `.env`
   - Get an API key from [OpenRouter](https://openrouter.ai/deepseek/deepseek-chat-v3-0324:free) and add it to `.env`:
     ```
     OPENROUTER_API_KEY=your_api_key_here
     ```

5. Run the backend server:
   ```sh
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd code/src/front_end/project
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

The application should now be running with:
- Frontend: http://localhost:5173 (Vite's default port)
- Backend: http://localhost:5000 (Flask's default port)

## 🏗️ Tech Stack
- 🔹 Frontend: React
- 🔹 Backend: Flask
- 🔹 Other: OpenRouter API

## 👥 Team
- **Manpreet Singh Ahluwalia** - [GitHub](https://github.com/Manpreet-2002) | [LinkedIn](https://www.linkedin.com/in/manpreet-singh-ahluwalia-77bbbb202/)
- **Abhishek S** - [GitHub](https://github.com/AbhishekS8073) | [LinkedIn](https://www.linkedin.com/in/abhishek-s-a13265244 )
- **Maharth Thakar** - [GitHub](https://github.com/maharththakar) | [LinkedIn](https://www.linkedin.com/in/maharth-thakar-b463731bb/)
- **Fahad Nazmi** - [GitHub](#) | [LinkedIn](#)
- **Venkata Bulusu** - [GitHub](#) | [LinkedIn](#)
