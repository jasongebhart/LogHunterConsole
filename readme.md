# Log Hunter - Console

Log Hunter is a simple web application for retrieving and managing log files. This application provides an easy-to-use interface to retrieve logs based on various parameters, list all available logs, and display a summary of the total logs.

## Pre-Requisites
To run Log Hunter, make sure you have the following installed:

1. [Node.js](https://nodejs.org/)
2. [Express](https://expressjs.com/)
3. [EJS](https://ejs.co/)

## Usage

1. Clone the repository to your local machine.
2. Install dependencies:
    1. `npm install express`
    2. `npm install ejs`
3. Launch the Node.js application: `node .\app.mjs`
4. Open your web browser and navigate to http://localhost:3000.


## Features

### Retrieve Logs

1. Enter the desired filename, filter term (supports regex), and the number of lines you want to retrieve.
2. Click the "Retrieve Logs" button to fetch logs based on the provided parameters.
3. The retrieved logs will be displayed in the result section.

### List All Logs

1. Click the "List All Logs" button to view a list of all available log files.
2. The list will be displayed in the result section.

## Web Application Structure

- **Header:** Provides context for the application.
- **Main Section:**
  - **Log Retrieval Form:**
    - Filename Input: Enter the desired filename (e.g., chocolatey.log).
    - Filter Input: Specify a filter term (e.g., python); the filter handles regex. For all matches, use ".".
    - Last Input: Enter the number of lines you want to retrieve.
    - "Retrieve Logs" Button: Fetch logs based on the provided parameters.
    - "List All Logs" Button: View a list of all available logs.
    - Total Logs Count: Displays the total number of logs.

  - **Result Section:** Displays the retrieved logs or the list of all logs.

## Scripts

- **loghunter.mjs:** Contains JavaScript modules for initializing the app and handling log requests.

## Styles

- **style.css:** Contains the styles for the Log Hunter web application.
