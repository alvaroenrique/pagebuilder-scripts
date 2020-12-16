// Obtener paginas
fetch("https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/page")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Obtener el numero de features
fetch(
  "https://sandbox.elcomercio.arcpublishing.com/pf/api/v3/configs/features/?d=2778"
)
  .then((response) => response.json())
  .then((data) => console.log(data));

// Obtener info de una página
fetch(
  "https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/page/p0HPf47Bz4wZGr"
)
  .then((response) => response.json())
  .then((data) => console.log(data));

// Obtener info sobre el rendering de una pagina
fetch(
  "https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/rendering/r0bzJF1pxlkPJr"
)
  .then((response) => response.json())
  .then((data) => console.log(data));

// Obtener info de un template
fetch("https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/template")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Obtener listado de features
fetch(
  "https://sandbox.elcomercio.arcpublishing.com/pf/api/v3/configs/features/?d=2780"
)
  .then((response) => response.json())
  .then((data) => console.log(data));

function copyPagesToClipboard() {
  fetch("https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/page")
    .then((response) => response.json())
    .then((data) => {
      const formatedData = data.map(({ id, name, uri, sites }) => ({
        id,
        name,
        uri,
        sites: sites.join(","),
      }));
      console.log(formatedData);
      copy(formatedData);
    });
}

// p0HPf47Bz4wZGr ----- Depor - Homepage
function copyFeaturesByPageToCB(pageId) {
  fetch(
    `https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/page/${pageId}`
  )
    .then((response) => response.json())
    .then((data) => {
      const layoutLatestVersion =
        data.versions[data.published] && data.versions[data.published].stage;
      fetch(
        `https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/rendering/${layoutLatestVersion}`
      )
        .then((response) => response.json())
        .then(({ layoutItems }) => {
          const featuresList = [];
          if (layoutItems) {
            layoutItems.forEach(({ renderableItems }) => {
              if (renderableItems) {
                renderableItems.forEach(
                  ({ featureConfig, chainConfig, features = [] }) => {
                    if (featureConfig) {
                      featuresList.push(featureConfig);
                    }
                    if (chainConfig) {
                      featuresList.push(`chains/${chainConfig}`);
                      features.forEach(({ featureConfig }) => {
                        featuresList.push(featureConfig);
                      });
                    }
                  }
                );
              }
            });
          }
          console.log(featuresList, layoutItems);
        });
    });
}

// Obtener info de los paginas

window.pagesInfo = [];
fetch("https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/page")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(({ id, name, uri, sites, versions, published }, i) => {
      setTimeout(() => {
        const layoutLatestVersion =
          versions[published] && versions[published].stage;
        if (layoutLatestVersion) {
          fetch(
            `https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/rendering/${layoutLatestVersion}`
          )
            .then((response) => response.json())
            .then(({ layoutItems }) => {
              const featuresList = [];
              if (layoutItems) {
                layoutItems.forEach(({ renderableItems }) => {
                  if (renderableItems) {
                    renderableItems.forEach(
                      ({ featureConfig, chainConfig, features = [] }) => {
                        if (featureConfig) {
                          featuresList.push(featureConfig);
                        }
                        if (chainConfig) {
                          featuresList.push(`chains/${chainConfig}`);
                          features.forEach(({ featureConfig }) => {
                            featuresList.push(featureConfig);
                          });
                        }
                      }
                    );
                  }
                });
              }
              console.log({ id, name, uri, sites, featuresList });
              window.pagesInfo.push({ id, name, uri, sites, featuresList });
            });
        } else {
          console.log({ id, name, uri, sites, featuresList: [] });
          window.pagesInfo.push({ id, name, uri, sites, featuresList: [] });
        }
      }, 3000 * (i + 1));
    });
  });

// Obtener info de los templates

window.templatesInfo = [];
fetch("https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/template")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(({ id, name, versions, published }, i) => {
      setTimeout(() => {
        const layoutLatestVersion =
          versions[published] && versions[published].stage;
        if (layoutLatestVersion) {
          fetch(
            `https://sandbox.elcomercio.arcpublishing.com/pf/admin/api/rendering/${layoutLatestVersion}`
          )
            .then((response) => response.json())
            .then(({ layoutItems }) => {
              const featuresList = [];
              if (layoutItems) {
                layoutItems.forEach(({ renderableItems }) => {
                  if (renderableItems) {
                    renderableItems.forEach(
                      ({ featureConfig, chainConfig, features = [] }) => {
                        if (featureConfig) {
                          featuresList.push(featureConfig);
                        }
                        if (chainConfig) {
                          featuresList.push(`chains/${chainConfig}`);
                          features.forEach(({ featureConfig }) => {
                            featuresList.push(featureConfig);
                          });
                        }
                      }
                    );
                  }
                });
              }
              console.log({ id, name, featuresList });
              window.templatesInfo.push({ id, name, featuresList });
            });
        } else {
          console.log({ id, name, featuresList: "No publicado" });
          window.templatesInfo.push({ id, name, featuresList: "No publicado" });
        }
      }, 3000 * (i + 1));
    });
  });

// Obtener features que no se usan

const unusedFeatures = [];
pagesInfo.forEach(({ featuresList }) => {
  featuresList.forEach((f) => {
    unusedFeatures.push;
  });
});
