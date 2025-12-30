# Mail Spam Checker

## Project Description
This project is an Email Spam Classifier application that uses machine learning to identify whether an email is "Spam" or "Not Spam". It provides a graphical user interface (GUI) built with Tkinter, allowing users to:
1.  **Fetch and Classify Emails**: Connect to your Gmail account, fetch recent emails, and classify them automatically.
2.  **Manual Classification**: Type or paste email text directly into the app to check if it's spam.

The application uses a Naive Bayes classifier trained on a dataset of emails to perform the classification.

## Tech Stack
-   **Language**: Python
-   **GUI Framework**: Tkinter
-   **Machine Learning**: Scikit-learn (MultinomialNB, TfidfVectorizer), Pandas
-   **Text Processing**: NLTK (Stopwords removal)
-   **API Integration**: Google Gmail API
-   **Authentication**: Google OAuth2

## Setup and Installation

### Prerequisites
-   Python 3.x installed.
-   A Google Cloud Project with the Gmail API enabled.
-   `client_secret.json` credentials file from your Google Cloud Project.

### Installation
1.  **Clone or Download the Project**:
    Ensure all files (`main.py`, `mail_dataset.csv`, `client_secret.json`) are in the same directory.

2.  **Install Dependencies**:
    Run the following command to install the required Python libraries:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Configure Credentials**:
    -   Place your `client_secret.json` file in the project directory.

## Usage

1.  **Run the Application**:
    ```bash
    python main.py
    ```

2.  **Using the App**:
    -   **Fetch and Classify Emails**: Click this button to authenticate with your Google account (a browser window will open). The app will fetch your recent emails (Inbox) and display whether they are Spam or Not Spam.
    -   **Classify Manually**: Enter any text into the text box and click "Classify Manually" to see the prediction immediately.

## Functionality Details

### 1. Model Training
On startup, the application:
-   Loads `mail_dataset.csv`.
-   Preprocesses the text (removes special characters, converts to lowercase, removes stopwords).
-   Trains a Multinomial Naive Bayes model using a TF-IDF pipeline.
-   Prints a classification report to the console.

### 2. Gmail Integration
-   Uses OAuth2 for secure authentication.
-   Fetches the last 10 messages from the user's Inbox.
-   Decodes the email body and subject.

### 3. Classification
-   Applies the same preprocessing and TF-IDF transformation to new emails (fetched or manual input).
-   Predicts the category using the trained model.

## Troubleshooting
-   **Token Issues**: If you have authentication errors, try deleting the `token.json` file (automatically generated) and authenticate again.
-   **Missing Dataset**: Ensure `mail_dataset.csv` is in the project folder.
