const featuresList = [
  "ads-perured/default",
  "ads/default",
  "basic-html/default",
  "breaking-news/default",
  "custom-image/default",
  "lifeweek/default",
  "custom-title/default",
  "ordered-stories-list/default",
  "photogallery/default",
  "tv-highlight/default",
  "minute-by-minute/default",
];

///////////////////////////////////////////////////////////////////////////////////

const { promises: fs, writeFile } = require("fs");

async function getContent(filePath, encoding = "utf-8") {
  if (!filePath) {
    throw new Error("filePath required");
  }
  return fs.readFile(filePath, { encoding });
}

const generateFile = async (infoFilePath, outputFileName) => {
  const pagesInfoFile = await getContent(infoFilePath);

  const pagesInfo = JSON.parse(pagesInfoFile);

  const pagesWhereFeatureIsUsed = featuresList.map((feature) => {
    const result = { feature, pagesList: [] };

    pagesInfo.forEach(({ name, featuresList }) => {
      if (featuresList !== "No publicado" && featuresList.includes(feature)) {
        result.pagesList.push(name);
      }
    });

    return result;
  });
  writeFile(
    outputFileName,
    JSON.stringify(pagesWhereFeatureIsUsed),
    "utf8",
    (err) => {
      if (err) throw err;
      console.log(`Archivo "${outputFileName}" generado`);
    }
  );
};

generateFile(
  "./data/sandbox/pagesInfo.json",
  "./pages-templates-by-features/output/pagesByFeatures.json"
);
generateFile(
  "./data/sandbox/templatesInfo.json",
  "./pages-templates-by-features/output/templatesByFeatures.json"
);
