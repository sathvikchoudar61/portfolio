# Safe Quiz Java Application

## Introduction
The **Safe Quiz Java Application** is a desktop-based quiz management system built using Java Swing and MySQL. It provides a secure and interactive environment for both administrators and users. Administrators can manage questions (add, update, view), while users can register, log in, and take quizzes.

## Tech Stack
- **Programming Language**: Java (JDK 8+)
- **GUI Framework**: Java Swing / AWT
- **Database**: MySQL
- **Connectivity**: JDBC (Java Database Connectivity)
- **IDE**: Eclipse (Recommended)

## Features

### Admin Features
- **Authentication**: Secure login for administrators.
- **Question Management**:
  - **Add Quiz**: Add new questions with options and correct answers.
  - **Update Quiz**: Modify existing questions.
  - **View Quiz**: View all questions currently in the database.

### User Features
- **User Registration**: Sign up with username, email, and password.
- **User Login**: Secure login using registered credentials.
- **Take Quiz**: Participate in quizzes and view scores.
- **Profile**: Simple user profile dashboard.

## Setup Instructions

### Prerequisites
1. **Java Development Kit (JDK)**: Ensure JDK 8 or later is installed.
2. **MySQL Server**: Install and running MySQL.
3. **Connector/J**: MySQL JDBC driver.

### Database Setup
1. Create a database named `quiz`.
2. Create the necessary tables (`user`, `question`, etc.).
   *(Note: You may need to inspect the code or use the provided SQL scripts if available to create the exact schema.)*

### Application Configuration
> [!IMPORTANT]
> **Database Credentials**: Open `src/quiz/ConnectionProvider.java` and update the username and password to match your local MySQL configuration.
> ```java
> con = DriverManager.getConnection("jdbc:mysql://localhost:3306/quiz", "YOUR_USERNAME", "YOUR_PASSWORD");
> ```

### Running the Application
1. Import the project into Eclipse or your preferred Java IDE.
2. Build the project to resolve dependencies (ensure MySQL Connector JAR is in the build path).
3. Run `src/quiz/Main.java` to start the application.

## Usage
1. **Launch the App**: The welcome screen will appear.
2. **Sign Up**: Create a new user account.
3. **Login**:
   - **User**: Use your registered email and password.
   - **Admin**: Use the hardcoded admin credentials (see `Registration.java` or `Login` logic).
   *(Default Admin: `admin@gmail.com` / `Admin@123`)*

## Project Structure
- `src/quiz`: Contains all Java source files.
  - `ConnectionProvider.java`: Database connection logic.
  - `Main.java`: Entry point of the application.
  - `Registration.java`: User sign-up and login logic.
  - `QuizApplication.java`: Main dashboard for the quiz functionality.
  - `AddQuiz.java`, `EditQuiz.java`, `ViewQuiz.java`: Question management modules.
  - `Score.java`, `Test.java`: Quiz taking and scoring logic.
