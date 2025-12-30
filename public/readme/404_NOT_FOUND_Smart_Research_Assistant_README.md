# 404 Smart Research Assistant

<p align="center">
  <img src="frontend/public/logo.svg" alt="404 Smart Research Assistant Logo" width="200" height="200">
</p>

## Overview

The 404 Smart Research Assistant is an AI-powered research tool designed to help users quickly find, analyze, and synthesize information from various sources. It combines local document search, web scraping, and AI-generated insights to provide comprehensive answers to research questions.

<p align="center">
  <img src="frontend/public/ss.jpg" alt="404 Smart Research Assistant Screenshot" width="800">
</p>

## Features

### Core Functionality

- **AI-Powered Research**: Ask questions and receive comprehensive, AI-generated answers
- **Multi-Source Research**: Combines information from uploaded documents, web sources, and Wikipedia
- **Key Takeaways**: Automatically extracts the most important points from research results
- **Source Citations**: Provides references to all sources used in generating answers
- **Report Management**: Save, view, and export research reports

### User Experience

- **Intuitive Interface**: Clean, modern UI for easy interaction
- **Real-time Updates**: Live status updates during research processing
- **Export Options**: Download research results for offline use
- **Credit System**: Managed usage through a credit-based system

### Technical Features

- **Document Processing**: Upload and analyze PDF and Word documents
- **Web Scraping**: Extract relevant information from websites
- **Wikipedia Integration**: Fetch and incorporate Wikipedia content
- **Local AI Processing**: Uses Ollama for local AI model inference
- **User Authentication**: Secure login and registration system

## Technology Stack

### Backend

- **Node.js & Express**: Server framework
- **MongoDB**: Database for storing user data, reports, and sources
- **Ollama**: Local AI model integration
- **PDF.js & Mammoth**: Document parsing
- **Axios & Cheerio**: Web scraping
- **JWT**: Authentication

### Frontend

- **React**: UI library
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Zustand**: State management
- **Lucide React**: Icons
- **React Hot Toast**: Notifications

## Getting Started

### Prerequisites

- Node.js (v20.x recommended)
- MongoDB
- Ollama (for local AI processing)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/404-smart-research-assistant.git
   cd 404-smart-research-assistant
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the backend directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     OLLAMA_API_URL=http://localhost:11434/api
     ```

4. Start the development servers
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server (in a new terminal)
   cd frontend
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## Usage

### Research Process

1. **Login/Register**: Create an account or log in
2. **Upload Documents** (optional): Add PDFs or Word documents to enhance research
3. **Ask a Question**: Enter your research question in the search bar
4. **Review Results**: Examine the AI-generated answer, key takeaways, and sources
5. **Export or Save**: Download the report or access it later from your dashboard

### Credit System

- Each research question costs 1 credit
- Refreshing a report costs 1 credit
- Credits can be managed in the Billing section

## Project Structure

```
├── backend/                # Backend server code
│   ├── db/                 # Database connection
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── server.js           # Entry point
│   └── utils/              # Utility functions
├── frontend/              # React frontend
│   ├── public/             # Static files
│   └── src/                # Source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       └── store/          # State management
└── uploads/               # Uploaded documents
```

## API Endpoints

- **Auth**: `/api/auth` - User authentication
- **Research**: `/api/research` - Research processing
- **Reports**: `/api/reports` - Report management
- **Upload**: `/api/upload` - Document uploads
- **Billing**: `/api/billing` - Credit management
- **Sources**: `/api/sources` - Web source management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React, Node.js, and MongoDB
- Powered by Ollama for local AI processing
- Uses various open-source libraries and tools
