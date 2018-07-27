const { validateEverything } = require("./validator");
const validTestData = require("../fixtures/valid-survey.json");
const orphanedPageTestData = require("../fixtures/routing/survey-with-orphan-page.json");

describe("Validation Script", () => {
  it("Wont throw an error if there aren't any", () => {
    const errors = {
      errors: []
    };
    expect(() => validateEverything(validTestData, errors)).not.toThrow();
  });
  it("Will throw an error if there is one", () => {
    expect(() => validateEverything(orphanedPageTestData)).toThrow();
  });
});
