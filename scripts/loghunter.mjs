export function initializeApp() {
    attachEventListeners();
    getLogsSummary();
}


// Function to attach event listeners
export function attachEventListeners() {
    document.getElementById('retrieveLogsButton').addEventListener('click', retrieveLogs);
    document.getElementById('listAllLogsButton').addEventListener('click', listAllLogsFunction);
}

export async function retrieveLogs() {
    const filename = encodeURIComponent(document.getElementById('filename').value.trim());
    const filter = encodeURIComponent(document.getElementById('filter').value.trim());
    const last = encodeURIComponent(document.getElementById('last').value.trim());

    // Construct the URL with parameters
    const url = `http://localhost:8080/logs?filename=${filename}&filter=${filter}&last=${last}`;

    try {
        // Make a Fetch API request
        const response = await fetch(url);

        if (response.ok) {
            // Parse the response as JSON
            const logs = await response.json();

            // Display the logs on the webpage
            displayLogs(logs);
        } else {
            // Handle error scenarios
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to sanitize input by removing spaces
function sanitizeInput(input) {
    return input.replace(/\s/g, ''); // Removes all spaces
}

function displayLogs(logs) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ''; // Clear previous content

    // Check if there's an error in the response
    if (logs.error) {
        resultContainer.textContent = `Error: ${logs.error}`;
        return;
    }

    // Display common properties once at the top
    resultContainer.innerHTML = `
        <p><strong>Filename:</strong> ${logs[0].Filename}, 
           <strong>Path:</strong> ${logs[0].Path}, 
           <strong>Pattern:</strong> ${logs[0].Pattern}</p>
        <hr/>`;

    // Iterate through the log entries and create HTML elements
    logs.forEach(logEntry => {
        const logElement = document.createElement('div');
        logElement.innerHTML = `
            <p><strong>Line Number:</strong> ${logEntry.LineNumber}</p>
            <p><strong>Line:</strong> ${logEntry.Line}</p>
            <hr/> <!-- Add a horizontal line for better separation between entries -->
        `;
        resultContainer.appendChild(logElement);
    });
}

export async function listAllLogsFunction() {
    const url = 'http://localhost:8080/list';

    try {
        const response = await fetch(url);

        if (response.ok) {
            const logsText = await response.text();
            console.log('Server Response:', logsText); // Log the server response

            // Call a function to display the list of logs
            displayListOfLogs(logsText);
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayListOfLogs(logsText) {
    // Assuming logsText is a newline-separated string
    const logsArray = logsText.split('\n');

    // Display the list of logs in a container (e.g., resultContainer)
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    // Create a list or any other HTML structure to display the logs
    const logsList = document.createElement('ul');

    logsArray.forEach((logFileName) => {
        const logItem = document.createElement('li');
        logItem.textContent = logFileName;
        logsList.appendChild(logItem);
    });

    resultContainer.appendChild(logsList);
}

export async function getLogsSummary() {
    const url = 'http://localhost:8080/summary';

    try {
        const response = await fetch(url);

        if (response.ok) {
            const summaryText = await response.text();
            console.log('Server Response (Summary):', summaryText); // Log the server response

            // Call a function to display the summary
            displayLogsSummary(summaryText);
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayLogsSummary(summaryText) {
    const totalLogsCountElement = document.getElementById('totalLogsCount');

    // Assuming summaryText is a string containing the count
    const logsCount = parseInt(summaryText);

    if (!isNaN(logsCount)) {
        totalLogsCountElement.textContent = `Total Logs: ${logsCount}`;
    } else {
        totalLogsCountElement.textContent = 'Unable to retrieve total logs count.';
    }
}
