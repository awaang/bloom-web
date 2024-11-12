# Bloom

## Inspiration
In recent decades, sports science research has transformed the landscape for both amateur and elite athletes. However, there are several issues concerning sports research, four of which we decided to address:
- **Anonymity**: Athletes often worry that their sensitive performance and health data might be exposed and linked to their identities.
- **Data Collection Limitations**: Many studies lack a sufficiently large and diverse dataset.
- **Short-Term Focus**: Long-term studies prove challenging, as maintaining repeated contact with the same athletes risks compromising anonymity. These long-term projects are particularly vital for studying injury recovery, where tracking progress over time is essential for meaningful insights.
- **Homogenous Data**: There is a significant underrepresentation of minority groups, especially in sports research, which limits the inclusivity and breadth of current findings. 
We aimed to solve these four issues by creating an application to streamline communication between athletes and researchers in a secure, anonymous, incentivized way.

## What it does
At its core, Bloom is a way for athletes to share their athletic and health data anonymously with sports science researchers, coaches, or anyone else interested in pushing the envelope in sports. Bloom has two components:
- **Web App**: Researchers create accounts and then post descriptions of research projects they're working on. Each time they create a project, they pay a certain amount of money in SOL (Solana's currency) which is used to compensate athletes for sharing their data.
- **iOS App**: Athletes create accounts and maintain profiles locally storing their health data. We pull health data from Apple Health, which has biological and biometric data, as well as data obtained from wearables such as Apple watches or FitBits. The athletes are able to see all the research projects funded by researchers and can select which ones to contribute their data to. They are compensated via secure and anonymous transactions using Solana and Anyone Protocol.

## How we built it
- **Web App**: authentication with Firebase, Firestore database, ReactJS, Anyone, Solana, Firebase SDK
- **iOS App**: SwiftUI, AnyoneKit

## Why it works
Bloom solves the four problems outlined above by streamlining access and making long-term research studies easier. In particular:
- **Anonymity**: Use of the Anyone Network for transmission of sensitive financial and health data ensures anonymity so that users feel comfortable contributing to sports research.
- **Data Collection Limitations**: The iOS app is extremely easy to use, enabling participation in research from a much wider audience. Monetary incentives, managed securely through the Solana blockchain, also encourage widespread participation.
- **Short-Term Focus**: Athletes on the Bloom app can easily send health data to the same researchers over long periods without worrying about risking their privacy.
- **Homogenous Data**: The issue of homogenous data, much like the data collection challenge, is addressed through the Bloom app's user-friendly interface and the monetary incentives it offers, which encourage broad participation across diverse groups.

## Challenges we ran into
We ran into two main challenges:
1. We've never developed iOS applications in Swift before. This meant we spent a long time understanding Swift and everything built into Xcode. Eventually, we were able to get the iOS app UI working.
2. We could not get the Anyone dependencies to load properly on the iOS side of things. We worked with several members of the Anyone Protocol team and eventually discovered a bug that integrates Anyone with iOS. This was the biggest pitfall for us because we ended up having to scrap that part of the project. In theory, it should work after fixing the integration bugs.

## Accomplishments that we're proud of
- databases for authenticating users
- ability to create new research projects and complete a transaction using the Solana blockchain
- storing anonymized health data

## What we learned
We learned a lot about Swift, decentralization in general, and the specifics of the Anyone client.

## What's next for Bloom
- Bloom's potential extends beyond sports science. It could revolutionize medical, social, and economic research methodologies, allowing for effortless, anonymous, and incentive-driven data collection.
- As Bloom grows, it will foster international collaboration. Researchers on opposite ends of the globe will be able to easily collaborate on a project and have access to the same data.

## Quick Start

- [Download the latest release](https://github.com/coreui/coreui-free-react-admin-template/archive/refs/heads/main.zip)
- Clone the repo: `git clone https://github.com/coreui/coreui-free-react-admin-template.git`

### Installation

``` bash
$ npm install
```

or

``` bash
$ yarn install
```

### Basic usage

``` bash
# dev server with hot reload at http://localhost:3000
$ npm start 
```

or 

``` bash
# dev server with hot reload at http://localhost:3000
$ yarn start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

#### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

or

```bash
# build for production with minification
$ yarn build
```

## What's included

```
coreui-free-react-admin-template
├── public/          # static files
│   ├── favicon.ico
│   └── manifest.json
│
├── src/             # project root
│   ├── assets/      # images, icons, etc.
│   ├── components/  # common components - header, footer, sidebar, etc.
│   ├── layouts/     # layout containers
│   ├── scss/        # scss styles
│   ├── views/       # application views
│   ├── _nav.js      # sidebar navigation config
│   ├── App.js
│   ├── index.js
│   ├── routes.js    # routes config
│   └── store.js     # template state example 
│
├── index.html       # html template
├── ...
├── package.json
├── ...
└── vite.config.mjs  # vite config
```

## Copyright and License

copyright 2024 creativeLabs Łukasz Holeczek.   

Code released under [the MIT license](https://github.com/coreui/coreui-free-react-admin-template/blob/main/LICENSE).
