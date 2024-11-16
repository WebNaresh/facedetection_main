@echo off
REM Check if Python is installed
python --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo Python is not installed. Please install Python to use this script.
    exit /b 1
)

REM Change directory to the folder containing the index.html
echo Serving index.html from the current directory: %cd%
echo Open your browser and go to http://localhost:8000
echo Press CTRL+C to stop the server.

REM Start the Python HTTP server without showing the command prompt
start /min python -m http.server 8000
