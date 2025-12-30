# Text Code Converter

A modern, responsive web application for converting text into various code formats like Morse Code, Binary, Base64, and Hexadecimal. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Text to Code Conversion**: Instantly convert plain text into:
  - **Morse Code**: Classic dot-dash encoding.
  - **Binary**: 8-bit binary representation.
  - **Base64**: Standard Base64 encoding.
  - **Hexadecimal**: Hex encoding of ASCII values.
- **Code to Text Conversion**: Decode these formats back into readable text.
- **Real-time Conversion**: See results instantly as you type.
- **Bi-directional Editing**: Edit either the input text or the code output; the other updates automatically.
- **Clipboard Integration**: Easily copy results with a single click.
- **Responsive Design**: precise layout on all devices, powered by Tailwind CSS.
- **Modern UI**: Dark-themed, aesthetically pleasing interface with smooth animations.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/) (v6/v7)
- **Linting**: ESLint

## 📂 Project Structure

```
text-code-converter/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ConverterSelector.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── InputArea.jsx
│   │   ├── OutputArea.jsx
│   │   └── TextConverter.jsx
│   ├── constants/       # Constant data (e.g., Morse code maps)
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── LearnPage.jsx
│   │   └── CreatePage.jsx
│   ├── utils/           # Utility functions
│   │   └── converters.js # Core conversion logic
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd text-code-converter
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the URL shown in your terminal) to view the app.

## 📜 Usage

1.  **Select a Converter**: Use the dropdown or tabs (depending on UI) to choose between Morse, Binary, Base64, or Hex.
2.  **Input Text**: Type in the "Input" box to see the coded version appear.
3.  **Input Code**: Alternatively, type code in the "Output" box to decypher it back to text.
4.  **Copy**: Use the copy button to save the result to your clipboard.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
