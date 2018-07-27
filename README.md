# EQ Author Validator

An API for validating surveys.

The validator contains several methods for validating a survey at different **levels**. It allows you to run a series of validation checks on a survey at **page level**, **section level** and **survey level** independently from one-another. In addition to this, you can validate an entire survey at **all levels**, thus validating everything within the survey.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)

## API Reference

To use the API, import `validator.js` into your module.

All methods require a **ctx** (context) and **errors** object. The **ctx** object is the object returned from querying the Author API to retrieve an entire survey, and the errors object will contain the output of the validation checks.

```
const errors = {
      errors: []
    };
```

Some validation checks may require you to pass in an **options** object when calling the validator to set certain configurations. Information on if this is needed will be provided, but currently there are **no settings** you need to pass in.

### validatePage()

_Args: page!, ctx!, errors!, options_

Conducts **page level** validation checks, and returns the errors object containing a list of errors if any are found.

```
const { get } = require("lodash");
const { validatePage } = require("path/to/validator.js");
const ctx = require("path/to/survey/JSON");

const page = get(ctx, "data.questionnaire.sections[0].pages[0]");

const errors = {
      errors: []
};

console.log(validatePage(page, ctx, errors));
```

### validateSection()

_Args: section!, ctx!, errors!, options_

Conducts **section level** validation checks, and returns the errors object containing a list of errors if any are found.

```
const { get } = require("lodash");
const { validateSection } = require("path/to/validator.js");
const ctx = require("path/to/survey/JSON");

const section = get(ctx, "data.questionnaire.sections[0]");

const errors = {
      errors: []
};

console.log(validatePage(section, ctx, errors));
```

### validateSurvey()

_Args: ctx!, errors!, options_

Conducts **survey level** validation checks, and returns the errors object containing a list of errors if any are found.

```
const { get } = require("lodash");
const { validateSurvey } = require("path/to/validator.js");
const ctx = require("path/to/survey/JSON");

const errors = {
      errors: []
};

console.log(validateSurvey(ctx, errors));
```

### validateEverything()

_Args: ctx!, errors!, options_

Calls `validateSurvey()`, `validateSection()` for every section in a survey and `validatePage()` for every page in a section, and throws an error displaying the errors object if any errors are found. This method fails fast after each function call.

```
const { get } = require("lodash");
const { validateEverything } = require("path/to/validator.js");
const ctx = require("path/to/survey/JSON");

const errors = {
      errors: []
};

console.log(validateEverything(ctx, errors));
```

## Contributing

### Folder structure

```
.
├── fixtures             # Mock survey data for use in tests
├── node_modules
├── src                  # Source files
├──── graphlib_demo
├──── helpers            # Helper files, e.g. script to build a survey as a directed graph
├──── features           # Validation scripts
├──── validator.js       # API methods
├── .eslintrc            # eslint config
├── .gitignore
├── .travis.yml          # travis config
├── LICENSE
├── package.json
├── README.md
├── yarn.lock
```

### Adding a Script

Your script should be housed beneath `ROOT/src/scripts/` and then either `page`, `section` or `survey`, depending on which level of the survey your script will run. For example, if your script detects whether a page is orphaned, this is a **page level** validation and therefore housed under `ROOT/src/scripts/page`. Your script should be placed in its own folder, named after the script.

The script must be exported as a node module and imported into `validation.js`, and so it can be reused in other projects where possible.

`validation.js` contains three methods: `validateSurvey(questionnaireData)`, `validateSection(survey, section, firstQuestion)`, `validatePage(survey, page, firstQuestion)`. Each method is built so that it can be ran independently, but all call its child method. For example, `validateSurvey()` calls `validateSection()`, which calls `validatePage()`, but `validatePage()` can be called without `validateSurvey()` and `validateSection()` if necessary.

Your script should be imported into `validation.js` and called inside the correct method. There is a specific place to call your script within each method: these are marked by comments.

### Adding a test

You must add a test for your script. All tests are housed in `validation.test.js`, as we are testing `validation.js` as well as your script.

You must provide invalid dummy data for your test. This should be housed in the same directory as your script and called `test-data.invalid.js`; context for this file is supplied by its file path. You can create dummy data by building a survey, with the error your script should pick up, in Author and querying the API afterwards. Remember to import your dummy data into `validation.test.js`. Where possible, you should attempt to modify `ROOT/src/test-data.valid.js` programatically instead.

Valid test data is provided within the project, this is: `ROOT/src/test-data.valid.js`. This should already be imported into `validation.test.js`.

## Running the tests

Run `yarn test` in the console, from the root directory. Currently, we have **Jest** and **Eslint** tests.

## Built With

- [Graphlib](https://github.com/dagrejs/graphlib) - used for creating a directed graph structure to represent routing paths through a survey.
- [Lodash](https://lodash.com/docs/4.17.10)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
