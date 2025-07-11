# 🌍 Where Am I? — React Geolocation Tracker

A React.js project that tracks and displays your **current location**, **network connection**, and **location history**, with **Google Maps integration**. This project auto-saves your location every 10 seconds and clears the history after 5 entries.

---

## 🚀 Features

- 📍 Displays **latitude** and **longitude** using Geolocation API
- 🌐 Shows **network type** (like 4g, wifi) using Network Information API
- 🕒 Auto-saves location every 10 seconds
- 🗃️ Maintains the **last 5 location entries** and clears afterwards
- 🗺️ Embeds **Google Maps** for each saved location
- 🔗 Includes direct links to open each location on Google Maps
- 🎨 Fully responsive and styled with modern CSS

---

## 📂 Project Structure

where-am-i/
├── src/
│ ├── components/
│ │ └── Geo.js # Main component
│ ├── Geo.css # Styling
│ └── App.js # Entry point rendering Geo
├── public/
├── package.json
└── README.md

yaml
Copy
Edit

---

## 💡 Technologies & Concepts

### 🧠 React.js
- `useState` — manage location, connection type, and history
- `useEffect` — handle side effects like geolocation, intervals
- `useRef` — keep reference to previous location history without re-rendering

### 🌐 JavaScript APIs
- **Geolocation API** — to get real-time latitude & longitude
- **Network Information API** — to detect internet type
- **localStorage** — to persist the last 5 entries

### 🎨 CSS Concepts
- Units: `px`, `rem`, `vw`
- Layout: margin, padding, border-radius, box-shadow
- Flexbox centering for clean UI

---

## 🛠️ How to Run Locally

1. **Clone this repo**
   ```bash
   git clone https://github.com/your-username/where-am-i.git
   cd where-am-i
Install dependencies


npm install-
Start the server-
npm start

<img width="944" height="554" alt="Image" src="https://github.com/user-attachments/assets/2585bd68-46c4-4a12-a951-2e89d99616e7" />
<br/>

<img width="1021" height="873" alt="Image" src="https://github.com/user-attachments/assets/a07aff61-2bd5-4ece-87b6-6535242f6479" />

