# Playwright Test Project

This project uses Playwright for end-to-end testing. The tests are written in JavaScript and are located in the `tests` directory. The project follows the Page Object Model (POM) design pattern for App test to enhance code maintainability and reusability.
There is also some other tests showng playwright commands which are plain commands to show handling of elements.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running Tests

To run the tests, use the following command:
```sh
npx playwright test
```


### App Test
The app test is located in tests/AppTest.spec.js. It tests various functionalities of the application.

Description: This test covers the end-to-end flow of logging in, adding a product to the cart, checking out, and verifying the order details.


### Page Objects
LoginPage
The LoginPage class is located in pageObjects/LoginPage.js. It encapsulates the interactions with the login page.

AppPage
The AppPage class is located in pageObjects/AppPage.js. It encapsulates the interactions with the application page.

### Continuous Integration
The project is set up with GitHub Actions for continuous integration. The workflow file is located at .github/workflows/playwright.yml.