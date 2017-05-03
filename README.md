# Uptake Star Wars Project

--- Install Packages ---
1) Open up terminal and CD into Uptake folder
2) Type "npm install" and hit enter
3) Wait for packages to install and move on to Development Mode or Production Mode

--- Development Mode ---
1) Type "npm start -s" and hit enter for dev mode
2) Hit ctrl+c to stop server

--- Production Mode ---
1) Type "npm run build -s" and hit enter for production mode
2) Hit ctrl+c to stop server

--- App Options (Must be modified and saved before starting production mode) ---
1) Open Uptake/src/appOptions/options.js
2) Modify options
3) Character options will affect the favorite/least favorite characters:
    ~ Enter an ID in the form of a string between 1 and 87
4) Chart options will affect the chart:
    ~ Width can be a percentage in the form of a string or a pixel width in the form of an integer
    ~ The legend requires an object with the postion in the form of a string: none, top, right, bottom, or left
    ~ A title can be added to the top of the graph by adding a string
    ~ The chart axes labels can be modified by adding the desired label as a string for xAxesLabel and yAxesLabel
    ~ The column bars width can be modified by adding a percentage in the form of a string