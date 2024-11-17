::[Bat To Exe Converter]
::
::YAwzoRdxOk+EWAjk
::fBw5plQjdCyDJGyX8VAjFBVVXgGRAEi1ArwS76XX5uSCnm4SWfI+dpbn3LWNJeQW/kDnYZ8i2DdXmcICMAhKfS6iYwgIr29Uv2eKOYmVsACB
::YAwzuBVtJxjWCl3EqQJhSA==
::ZR4luwNxJguZRRmF9xJgeXs=
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSDk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+JeA==
::cxY6rQJ7JhzQF1fEqQJQ
::ZQ05rAF9IBncCkqN+0xwdVs0
::ZQ05rAF9IAHYFVzEqQJQ
::eg0/rx1wNQPfEVWB+kM9LVsJDGQ=
::fBEirQZwNQPfEVWB+kM9LVsJDGQ=
::cRolqwZ3JBvQF1fEqQJQ
::dhA7uBVwLU+EWDk=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATElA==
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCyDJGyX8VAjFBVVXgGRAEi1ArwS76XX5uSCnm4SWfI+dpbn3LWNJeQW/kDnYZ8i2DdXmcICMAhKfS65ewE6qGxOsyqHNtPSthfkKg==
::YB416Ek+ZW8=
::
::
::978f952a14a936cc963da21a135fa983
@echo off
REM Check if Python is installed
python --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo Python is not installed. Please install Python from https://www.python.org/downloads/
    exit /b 1
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