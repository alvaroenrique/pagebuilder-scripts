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

// const filePath = "./data/sandbox/pagesInfo.json"
const filePath = "./data/sandbox/templatesInfo.json";

///////////////////////////////////////////////////////////////////////////////////

const { promises: fs } = require("fs");

async function getContent(filePath, encoding = "utf-8") {
  if (!filePath) {
    throw new Error("filePath required");
  }
  return fs.readFile(filePath, { encoding });
}

(async () => {
  const pagesInfoFile = await getContent(filePath);

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
  console.log(pagesWhereFeatureIsUsed);
})();
