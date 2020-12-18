// const env = "sandbox";
const env = "production";

const { promises: fs, writeFile } = require("fs");

async function getContent(filePath, encoding = "utf-8") {
  if (!filePath) {
    throw new Error("filePath required");
  }
  return fs.readFile(filePath, { encoding });
}

const generateFile = async (outputFileName) => {
  const featuresListFile = await getContent(`./data/${env}/featuresList.json`);
  const featuresList = JSON.parse(featuresListFile);

  const pagesInfoFile = await getContent(`./data/${env}/pagesInfo.json`);
  const pageInfo = JSON.parse(pagesInfoFile);

  const templatesInfoFile = await getContent(
    `./data/${env}/templatesInfo.json`
  );
  const templatesInfo = JSON.parse(templatesInfoFile);

  let featuresInAllPages = [];
  pageInfo.forEach(({ featuresList }) => {
    if (featuresList !== "No publicado") {
      featuresInAllPages = featuresInAllPages.concat(featuresList);
    }
  });
  templatesInfo.forEach(({ featuresList }) => {
    if (featuresList !== "No publicado") {
      featuresInAllPages = featuresInAllPages.concat(featuresList);
    }
  });
  const counts = {};
  featuresInAllPages.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  const featuresWhitCounts = featuresList.map((feature) => ({
    count: counts[feature.id],
    ...feature,
  }));

  writeFile(
    outputFileName,
    JSON.stringify(featuresWhitCounts),
    "utf8",
    (err) => {
      if (err) throw err;
      console.log(`Archivo "${outputFileName}" generado`);
    }
  );
};

generateFile(`./features-usage/output/featuresUsage-${env}.json`);
