# App Template
This is a template for a client application.

## Setup
- Clone the repository
- Create a `.env.local` file using the `.env.local.example` file as a template and update the variables. `GITLAB_TOKEN` is required for downloading private packages from the gitlab registry
- Run `npm install -g dotenv-cli` to install the dotenv-cli package if you don't have it installed
- Run `npm run auth-install` to install the dependencies

## Notes
- You have to use `npm run auth-install <dependency>` to install our private packages. This is because the gitlab token is required to download the packages
- Always follow the [ternary design system](https://nagibaba.medium.com/ultimate-ternary-folder-structure-for-large-react-applications-9bb6882d4372)
