# Application Documentation
This App was created using Expo Cli. You will need an Expo Cli and Expo Go to run the app.

## Why Expo Cli?
I use a windows OS currently and I needed to be able to test on both iOS and Android OS.

## About App
1. The Pipedrive app has 2 screens
2. Screen 1 (PersonListScreen) lists all persons associated to a pipedrive account
3. Screen 2 (PersonDetailScreen) displays details of a particular user clicked on PersonListScreen.
4. The application uses the flux architecture for the data flow. Redux library was used to achieve this.
5. The Factory design pattern was used in modeling objects once for uses accross the application.

## How to Run
1. Install Node, Expo Cli and Expo Go (on your Mobile)
2. Clone repo at https://github.com/Abass14/PipeDrive.git
2. Open Pipedrive-app on VSCode
3. Run Yarn or npm install to install all dependencies
4. Run Yarn Start to Open Via Expo Go

## Run tests
1. Run Yarn test.