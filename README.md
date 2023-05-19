# githubsearch
A simple React application that lists the repositories for a given GitHub user. 

In order to run:

1. Clone this repository into your local environment. 
2. Add a .env file at the top level of the project. 
3. Inside the .env file add a variable called **REACT_APP_GH='your-github-token'** and place in your personal github token into the quotes
4. Run **npm install** from your terminal window to install the necessary dependencies. 
5. Run **npm start** from your terminal window to start the application. 
6. Navigate to http://localhost:8080/<user name>
7. You should now see the user data for the user name entered in the path populated in the UI. 
  

 In order to run the cypress tests: 
  
 1. In the terminal run **npm start** if the application is not already running (this will be needed no matter where you want to run the tests) 
 2. Next run **npx cypress run** to see the command line breakdown of the tests (essentially run them headless)
 3. In order to see the browser version of the tests, run **npx cypress open**
 4. Wait for the cypress window to open and E2E Testing. 
 5. Select the Chrome Browser, then click Start E2E Testing in Chrome.
 5. Wait for the Chrome window to open, then select the name of the test file (spec.cy.js)
 6. Once there the tests should run automatically with a visual view of what they are doing.  
