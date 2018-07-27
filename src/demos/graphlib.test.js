const graphlib = require("graphlib");
const { isEmpty } = require("lodash");

const isOrphaned = (id, firstQuestion, graph) => {
  if (isEmpty(graph.inEdges(id)) && id !== firstQuestion) {
    return true;
  }

  return false;
};

describe("graphLib Functionality", () => {
  let survey;
  beforeEach(() => {
    survey = new graphlib.Graph();

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
  });

  it("adds a new routing rule", () => {
    expect(survey.edges()).toMatchObject([
      { v: "1", w: "2" },
      { v: "2", w: "3" },
      { v: "3", w: "4" },
      { v: "3", w: "5" }
    ]);
  });

  it("removes an existing routing rule", () => {
    survey.removeEdge("3", "4");

    expect(survey.edges()).toMatchObject([
      { v: "1", w: "2" },
      { v: "2", w: "3" },
      { v: "3", w: "5" }
    ]);
  });

  it("should recognise a cycle in rooting rules", () => {
    survey.setEdge("3", "1");

    expect(graphlib.alg.isAcyclic(survey)).toBe(false);
  });

  it("should not flag an error when there are no cycles", () => {
    expect(graphlib.alg.isAcyclic(survey)).toBe(true);
  });

  it("should recognise an orphaned question", () => {
    expect(isOrphaned(6, 1, survey)).toBe(true);
  });

  it("should not flag up an error for orphaned questions when there are none", () => {
    expect(isOrphaned(2, 1, survey)).toBe(false);
  });
});
