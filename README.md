# EQ Author Validator

This repository contains a library of validation tools for Author, but are designed to be reusable across other projects as well.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/)

## Features

* Detects cycles in routing rules
* Detects orphaned pages and questions

## Running the tests

Run `yarn test` in the console, from the root directory.

## Built With

* [Graphlib](https://github.com/dagrejs/graphlib) - Used in detecting cycles in routing rules, and orphaned questions or sections.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
