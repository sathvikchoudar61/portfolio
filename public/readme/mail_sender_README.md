# Mail Sender

A simple and efficient Node.js application designed to send bulk emails by reading recipient addresses from a CSV file. This project utilizes Express for the server and Nodemailer for handling email transmission via Gmail.

## 🚀 Features

-   **Bulk Email Sending**: Reads a list of email addresses from a CSV file and sends a predefined message to each.
-   **CSV Integration**: Uses `csv-parser` to easily process email lists.
-   **Secure Configuration**: Uses environment variables to securely store sensitive credentials.
-   **API Endpoint**: Triggers email processing via a simple HTTP GET request.

## 🛠️ Tech Stack

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Email Service**: [Nodemailer](https://nodemailer.com/)
-   **CSV Processing**: [csv-parser](https://www.npmjs.com/package/csv-parser)
-   **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v16 or higher recommended)
-   A Gmail account with an **App Password** generated (since standard passwords are not supported for third-party apps).

## ⚙️ Installation & Setup

1.  **Clone the repository** (or download the files):
    ```bash
    git clone <repository-url>
    cd mail-sender
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your Gmail credentials:
    ```env
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-google-app-password
    ```
    > **Note**: Do not use your regular Gmail password. You must generate an App Password from your Google Account settings.

4.  **Prepare the Recipient List**:
    Ensure you have a file named `emails.csv` in the root directory. The file must have a header row with the column name `email`.
    
    **Example `emails.csv`**:
    ```csv
    email
    recipient1@example.com
    recipient2@example.com
    ```

## ▶️ Usage

1.  **Start the Server**:
    ```bash
    node server.js
    ```
    The server will start running at `http://localhost:3000`.

2.  **Trigger Email Sending**:
    Open your browser or an API testing tool (like Postman) and make a GET request to:
    ```
    http://localhost:3000/send-emails
    ```

3.  **View Results**:
    -   The server will process the CSV file and send emails to each address.
    -   It will return a JSON response indicating the success or failure status for each recipient.

## 📁 Project Structure

```
├── emails.csv          # Input file containing recipient emails
├── package.json        # Project dependencies and metadata
├── server.js           # Main application logic (Express + Nodemailer)
└── .env                # (Create this) Environment variables for credentials
```

## 📝 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/send-emails` | Reads `emails.csv` and sends emails to all listed recipients. |