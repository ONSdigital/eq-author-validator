const { get, isNil } = require("lodash");
const buildRoutingGraph = require("../src/helpers/build-routing-graph");
const detectOrphan = require("./features/routing/detect-orphan");

const failFast = errors => {
  if (errors.errors.length > 0) {
    throw new Error(JSON.stringify(errors, null, 2));
  }
};

const validatePage = (
  page,
  ctx,
  errors = {
    errors: []
  },
  graph = buildRoutingGraph(ctx)
) => {
  //Call your page-level validation scripts here
  const orphanError = detectOrphan(page.id, ctx, graph);
  if (!isNil(orphanError)) {
    errors.errors.push(orphanError);
  }

  return errors;
};

const validateSection = (
  section,
  ctx,
  errors = {
    errors: []
  }
) => {
  //Call your section-level validation scripts here
  return errors;
};

const validateSurvey = (
  ctx,
  errors = {
    errors: []
  }
) => {
  //Call your survey level validation scripts here
  return errors;
};

const validateEverything = (
  ctx,
  errors = {
    errors: []
  }
) => {
  errors = validateSurvey(ctx, errors);
  const graph = buildRoutingGraph(ctx);
  failFast(errors);
  get(ctx, "data.questionnaire.sections").forEach(section => {
    errors = validateSection(section, ctx, errors);
    failFast(errors);
    section.pages.forEach(page => {
      errors = validatePage(page, ctx, errors, graph);
      failFast(errors);
    });
  });
  return errors;
};

Object.assign(module.exports, {
  validatePage,
  validateSection,
  validateSurvey,
  validateEverything
});
