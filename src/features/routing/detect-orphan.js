const { isEmpty, get } = require("lodash");
const { levels, newError } = require("../../helpers/error");

module.exports = (id, ctx, graph) => {
  if (
    isEmpty(graph.inEdges(id)) &&
    id !== get(ctx, "data.questionnaire.sections[0].pages[0].id")
  ) {
    return newError(levels.WARN, "Orphaned destination detected", {
      page: id
    });
  }
};
