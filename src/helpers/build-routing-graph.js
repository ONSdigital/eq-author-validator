const graphlib = require("graphlib");
const { isNil, get } = require("lodash");

const setEdgeFromRoutingRule = (survey, nextPageId, destination, pageId) => {
  switch (get(destination, "__typename")) {
    case "LogicalDestination": {
      const logicalDestination = get(destination, "logicalDestination");
      if (logicalDestination === "NextPage") {
        survey.setEdge(pageId, nextPageId);
      }
      break;
    }
    case "AbsoluteDestination": {
      const absoluteDestinationId = get(destination, "absoluteDestination.id");
      survey.setEdge(pageId, absoluteDestinationId);
      break;
    }
    default:
      throw new Error(
        `Routing destination ${get(destination, "__typename")} not recognised`
      );
  }
};

const buildSection = (survey, section) => {
  const pages = section.pages;
  pages.forEach((page, i) => {
    survey.setNode(page.id, page.title.replace(/(<([^>]+)>)/gi, ""));

    if (isNil(pages[i + 1])) {
      return;
    }

    const nextPageId = pages[i + 1].id;
    if (isNil(page.routingRuleSet)) {
      return survey.setEdge(page.id, nextPageId);
    } else {
      get(page, "routingRuleSet.routingRules").forEach(rule => {
        setEdgeFromRoutingRule(survey, nextPageId, rule.goto, page.id);
      });
      setEdgeFromRoutingRule(
        survey,
        nextPageId,
        page.routingRuleSet.else,
        page.id
      );
    }
  });
};

module.exports = questionnaireData => {
  const survey = new graphlib.Graph({ directed: true });
  survey.setGraph(get(questionnaireData, "data.questionnaire.title"));
  const sections = get(questionnaireData, "data.questionnaire.sections");
  sections.forEach(section => {
    buildSection(survey, section);
  });

  return survey;
};
