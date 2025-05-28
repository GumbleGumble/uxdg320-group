# 😊 UXDG320 Final Project – *MoodShop*

This is the final project for UXDG320 – an interactive mood-tracking and journaling web app called **MoodShop**. Users can explore their emotions, get supportive prompts, and reflect through journaling. The experience is divided into three main modules: Home Page, Mood Booth, and Mood Journal.

---

## 📁 Project Structure

```
UXDG320-FinalProject/
├── assets/
│   ├── emotions/             # All emotion icons (e.g., Happy.png, Sad.png)
│   └── other/                # Logo, eye icon, presenter, backgrounds, etc.
├── css/
│   ├── Journal.css           # Styles for the journaling experience
│   ├── single-emotion.css    # Styles for individual emotion pages
│   └── Style.css             # Shared or landing page styling
├── html/
│   ├── journal.html          # Main journaling interface
│   ├── single-emotion.html   # Template for viewing selected emotions
│   └── sub-categories/
│       ├── Angry.html
│       ├── Happy.html
│       ├── Sad.html
│       ├── Calm.html
│       └── Anxious.html
├── js/
│   ├── hover-script.js       # Script for hover definition prompts
│   └── storage-logic.js      # Local storage save/load logic for journal
├── index.html                # Entry point for the MoodShop app
└── README.md
```

---

## 🎯 Features

- 🌈 Emotion Selection: Choose from moods like Angry, Sad, Happy, Calm, and Anxious
- 💬 Contextual Prompts: Speech bubble provides supportive reflection questions
- 🧠 Definitions: Hover-based definitions to help understand emotions
- 👁️ Presenter: Optional character offering guidance (toggleable via eye icon)
- 📓 Mood Journal: Users can write and archive daily reflections
- 📱 Responsive Design: Optimized layout across devices

---

## ⚙️ Technologies Used

- HTML5 & CSS3 (Flexbox & Media Queries)
- JavaScript (vanilla)
- LocalStorage API (for journal saving)
- Google Fonts: Inter
- Figma → Code Design Mapping

---

## 🚀 Getting Started

To run locally:

1. Clone or download the repository
2. Open `index.html` in your browser
3. Explore Mood Booth and log your journal via:
   - `html/sub-categories/` → Select a mood
   - `journal.html` → Record your thoughts

---

## 🧪 Accessibility & UX

- All emotion images include descriptive `alt` text
- Keyboard-accessible buttons and links
- Proper semantic HTML
- Toggle presenter for sensory control

---

## 📌 Notes

- The journal saves entries in `localStorage` per emotion category
- Eye toggle feature allows users to hide/show the presenter for a calmer experience
- Mobile layout stacks presenter + definition above the emotion card and journal button

---

## 🙌 Team & Credit

Developed by Jamie Chou and contributors  
Course: UXDG320 @ SCAD | Spring 2025
