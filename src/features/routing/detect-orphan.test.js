const detectOrphan = require("./detect-orphan");

describe("Detect orphaned pages or sections", () => {
  it("Throws an error if an orphaned page has been found", () => {
    const graph = {
      inEdges: jest.fn().mockReturnValue([])
    };
    const data = {
      data: {
        questionnaire: {
          sections: [{ pages: [{ id: 1 }] }]
        }
      }
    };
    expect(detectOrphan(2, data, graph)).toEqual({
      level: "WARN",
      message: "Orphaned destination detected",
      detail: { page: 2 }
    });
  });
  it("Does not throw an error if an orphaned page has not been found", () => {
    const graph = {
      inEdges: jest.fn().mockReturnValue({ v: 1, w: 2 })
    };
    const data = {
      data: {
        questionnaire: {
          sections: [{ pages: [{ id: 1 }] }]
        }
      }
    };
    expect(detectOrphan(2, data, graph)).toBeUndefined();
  });
});
