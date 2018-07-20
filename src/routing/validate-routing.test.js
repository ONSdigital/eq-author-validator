const graphlib = require("graphlib");

describe("Routing Rules", () => {
  test("Add a routing rule", () => {
    let survey = new graphlib.Graph();

    survey.setNode("1", "What is your name?");
    survey.setNode("2", "When is your date of birth?");
    survey.setNode("3", "Do you have any pets?");
    survey.setNode("4", "Why do you not have any pets?");
    survey.setNode("5", "How many pets do you have?");
    survey.setNode("6", "End of survey");

    survey.setEdge("1", "2");
    survey.setEdge("2", "3");
    survey.setEdge("3", "4");
    survey.setEdge("3", "5");

    expect(survey.edges()).toMatchObject([
      { v: "1", w: "2" },
      { v: "2", w: "3" },
      { v: "3", w: "4" },
      { v: "3", w: "5" }
    ]);
  });

  test("Remove routing rule", () => {
    let survey = new graphlib.Graph();

    survey.setNode("1", "What is your name?");
    survey.setNode("2", "When is your date of birth?");
    survey.setNode("3", "Do you have any pets?");
    survey.setNode("4", "Why do you not have any pets?");
    survey.setNode("5", "How many pets do you have?");
    survey.setNode("6", "End of survey");

    survey.setEdge("1", "2");
    survey.setEdge("2", "3");
    survey.setEdge("3", "4");
    survey.setEdge("3", "5");

    survey.removeEdge("3", "4");

    expect(survey.edges()).toMatchObject([
      { v: "1", w: "2" },
      { v: "2", w: "3" },
      { v: "3", w: "5" }
    ]);
  });

  test("Detect a cycle in rooting rules", () => {
    let survey = new graphlib.Graph();

    survey.setNode("1", "What is your name?");
    survey.setNode("2", "When is your date of birth?");
    survey.setNode("3", "Do you have any pets?");
    survey.setNode("4", "Why do you not have any pets?");
    survey.setNode("5", "How many pets do you have?");
    survey.setNode("6", "End of survey");

    survey.setEdge("1", "2");
    survey.setEdge("2", "3");
    survey.setEdge("3", "4");
    survey.setEdge("3", "1");

    expect(graphlib.alg.isAcyclic(survey)).toBeFalsy();
  });
});
