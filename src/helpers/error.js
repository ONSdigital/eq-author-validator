const levels = {
  ERR: "ERR",
  WARN: "WARN",
  INFO: "INFO"
};

const newError = (level, message, detail) => {
  return {
    level: level,
    message: message,
    detail: detail
  };
};

Object.assign(module.exports, {
  levels,
  newError
});
