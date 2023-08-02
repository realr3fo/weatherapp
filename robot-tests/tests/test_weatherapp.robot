*** Settings ***
Library     SeleniumLibrary


*** Variables ***
${HOST}     localhost
${PORT}     8080


*** Test Cases ***
Visit Home Page
    [Tags]    visit_home
    Open Browser    http://${HOST}:${PORT}    browser=chrome    options=add_argument("--headless")
    Execute Javascript    window.navigator.geolocation.getCurrentPosition = function(success){var position = {"coords" : {"latitude": 52.3702, "longitude": 4.8952}}; success(position);}
    Title Should Be    What's the weather forecast?

Verify Loading Spinner
    [Tags]    loading_spinner
    Page Should Contain Element    css:.spinner-container
    Page Should Contain Element    css:.spinner

Verify Weather Data Display
    [Tags]    weather_data
    Wait Until Page Contains    Weather Forecast in    5s
    Page Should Contain    Weather Forecast in
    ${location}=    Get Text    css:.location-header
    Should Be Equal    ${location}    Weather Forecast in City Name
    Element Should Be Visible    css:.date-section
    Element Should Be Visible    css:.weather-slot-container
    ${weatherSlotCount}=    Get Element Count    css:.weather-slot
    Should Be True    ${weatherSlotCount} > 0
    Page Should Contain    Weather: Drizzle
    Page Should Contain    Temperature: 17°C
    Page Should Contain    Feels like: 16°C
    Page Should Contain    Wind (gusts):
    Page Should Contain    3.09 m/s
    Page Should Contain    (4.47 m/s)
    Page Should Contain    Rainfall:
    Page Should Contain    64%
    Page Should Contain    0.64

    Close Browser
