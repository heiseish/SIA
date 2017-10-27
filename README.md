## [Orchid](https://github.com/heiseish/SIA) for iOS and Android that build with React Native.

## Authors
- [Dao Truong Giang](https://github.com/heiseish)
- [Le Minh Phuc](https://github.com/le-minhphuc)

## Build and Run

#### Installation
- Install [Expo Client App](https://docs.expo.io/versions/latest/introduction/installation.html) on your mobile phone.

#### Run the app
- Open Expo Client App.
- Use the built-in QR Code scanner to scan the QR code on [Orchid](https://expo.io/@leminhphuc/orchid-manage).
- Alternatively, press the `+` symbol on the top right-hand corner of the app and key in the following URL `https://expo.io/@leminhphuc/orchid-manage`.

## Development
- Install [Node](https://nodejs.org/en/download/).
- Install [Yarn](https://yarnpkg.com/en/docs/install#mac-tab).
- Follow the installation steps in the React Native ["Getting Started Guide"](https://facebook.github.io/react-native/docs/getting-started.html).
- In the project folder, run `yarn install` to install dependencies.
- Run `yarn start` to launch the application.
- Use built-in QR Code scanner in [Expo Client App](https://docs.expo.io/versions/latest/introduction/installation.html) to scan the QR code generated on the CLI.

## More Information
[Orchid](https://github.com/heiseish/SIA) is build as a mobile solution to SIA App Challenge 2017 - Cabin Defects Management.

## Project Description

### Team Name: S06P
- Team members: Dao Truong Giang, Le Minh Phuc, Hoang Thi Hai Yen.
- Category: Student Category

### Operational Challenge
SIA App Challenge 2017 - Cabin Defects Management

### Functionalities
The app currently support three roles: planner, supervisor and technician.
#### Planner
- Planner can record defects with the following information:
  - Defects Name. E.g. Forgotten jacket
  - Priority of the defect, on the scale from 1 (least important) to 3 (most important). E.g. 1
  - Arriving Flight Number. E.g. SQ127
  - Estimated arrival time with format `HHMM`. E.g. 1400
  - Departing Flight Number. E.g. SQ554
  - Estimated departure time with format `HHMM`. E.g 1500

#### Supervisor
- Allow supervisor to assign tasks to technicians and keep track of their status.

#### Technician
- Allow technician to keep track of the job queue.
