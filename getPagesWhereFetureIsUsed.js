const { promises: fs } = require("fs");

async function getContent(filePath, encoding = "utf-8") {
  if (!filePath) {
    throw new Error("filePath required");
  }
  return fs.readFile(filePath, { encoding });
}

(async () => {
  const featuresList = await getContent("./data/sandbox/featuresList.json");
  console.log(featuresList);
})();
