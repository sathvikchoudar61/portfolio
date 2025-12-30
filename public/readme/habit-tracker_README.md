# Habit Tracker

A simple, locally-hosted web application for tracking daily habits, monitoring progress with charts, and visualizing consistency with a yearly heatmap.

## 🚀 Features

-   **Daily Tracking**: Easy-to-use grid interface to mark habits as done.
-   **Progress Analytics**: 
    -   Automatic streak and consistency calculation.
    -   Visual progress chart showing daily completion rates.
    -   GitHub-style yearly contribution heatmap.
-   **Goal Setting**: Set specific day goals for each habit (e.g., 20 days/month).
-   **Notes & Targets**: Dedicated sections for weekly and monthly text-based targets.
-   **Data Persistence**: All data is saved locally to a JSON file, ensuring privacy and offline access.
-   **Export**: functionality to export your monthly data to CSV.
-   **Dark Mode UI**: Sleek, modern interface designed for comfortable daily usage.

## 🛠️ Tech Stack

### Frontend
-   **HTML5 & CSS3**: Custom styles with a responsive grid layout.
-   **JavaScript (Vanilla)**: Core logic for DOM manipulation, data handling, and local updates.
-   **[Chart.js](https://www.chartjs.org/)**: Used for rendering the monthly progress line chart.

### Backend
-   **Python 3**: Uses the built-in `http.server` module to serve files and handle API requests.
-   **JSON Storage**: Application data is stored in `data/habits.json`.

## 📋 Prerequisites

-   **Python 3.x** must be installed on your system. You can download it from [python.org](https://www.python.org/downloads/).

## 🏃‍♂️ How to Run

1.  **Start the Application**
    Double-click the `run_habit_tracker.bat` file in the project directory. 
    
    *Alternatively, you can run it from the command line:*
    ```bash
    python server.py
    ```

2.  **Access the Dashboard**
    The batch file should automatically open your default browser to:
    [http://localhost:8000](http://localhost:8000)

## 📁 Project Structure

```
habit-tracker/
├── data/               # Stores the JSON database
├── app.js             # Main frontend logic
├── index.html         # Application structure
├── server.py          # Python backend server
├── style.css          # Styling and layout
└── run_habit_tracker.bat # Startup script for Windows
```

## 💾 Data Management

-   **Saving**: Data is automatically saved to `data/habits.json` whenever you toggle a habit, add a new one, or update targets.
-   **Reset**: The "Reset All" button allows you to clear all data and start fresh (requires confirmation).
-   **Backup**: You can back up your data simply by copying the `data/habits.json` file.
