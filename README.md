# Swipe Guide Test App

This is a React Native application built with Expo, designed to provide guides and related functionalities. This README will guide you through setting up, running, and testing various aspects of the app.

## Prerequisites

- Node.js (version 20 or 22)
- npm (Node Package Manager)
- Expo CLI

## Setup

1. **Clone the repository:**

   ```sh
   git clone git@github.com:jonsherrard/swipe-guide-test.git
   cd swipe-guide-test
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the Expo server:**

   ```sh
   npm start
   ```

   This will start the Expo development server. You can then use the Expo Go app on your mobile device or an emulator to run the app.

## Running the App

### On Android

- Ensure your Android device or emulator is connected and configured.
- Use the Expo Go app to scan the QR code provided by the Expo server.

### On iOS

- Use an iOS device or simulator.
- Open the Expo Go app and scan the QR code.

## Application Structure

- **Home Screen (`index.tsx`)**: Displays a list of guides using the `GuideCard` component. Data is fetched using `react-query` and displayed in a responsive grid layout.
- **Guide Page (`[id].tsx`)**: Shows detailed information about a specific guide, including steps and tips. It uses `react-query` for data fetching and displays related guides.
- **API Integration (`[...endpoint]+api.ts`)**: Proxies API requests to the backend, ensuring expo-router web can fetch data without CORS issues.

## Testing

Testing is conducted using Maestro, a mobile UI testing framework. The test scenarios are defined in `test.yaml`, which automates the app's UI interactions and assertions.

### Running Tests

1. **Install Maestro CLI**: Follow the instructions on the Maestro website to install the CLI tool.
2. **Execute Tests**: Run the following command to execute the test suite:

   ```sh
   maestro test .maestro/test.yaml
   ```

   This will run the predefined test scenario, ensuring the app's functionality is as expected.
