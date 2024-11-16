@echo off
REM Check if Python is installed
python --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo Python is not installed. Installing Python...
    REM Download and install Python
    powershell -Command "Start-Process msiexec.exe -ArgumentList '/i https://www.python.org/ftp/python/3.9.7/python-3.9.7-amd64.exe /quiet InstallAllUsers=1 PrependPath=1' -NoNewWindow -Wait"
    REM Verify installation
    python --version >nul 2>&1
    IF ERRORLEVEL 1 (
        echo Failed to install Python. Please install Python manually.
        exit /b 1
    )
)

REM Change directory to the folder containing the index.html
cd /d %~dp0
IF NOT EXIST index.html (
    echo index.html not found in the current directory: %cd%
    exit /b 1
)
echo Serving index.html from the current directory: %cd%
echo Open your browser and go to http://localhost:8000
echo Press CTRL+C to stop the server.

REM Start the Python HTTP server without showing the command prompt
start /min python -m http.server 8000
