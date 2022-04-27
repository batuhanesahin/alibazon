const fetch = require("node-fetch");

module.exports.index = async function (req, res) {
  const mainURL = process.env.OSF_URL;
  const catURL = mainURL + "/categories";

  const queryParams = new URLSearchParams({
    secretKey: process.env.SECRET_KEY,
  }).toString();

  const categoryRequestUri = catURL + "?" + queryParams;

  let categoriesJson;
  try {
    const categoriesResponse = await fetch(categoryRequestUri, {
      method: "GET",
    });
    categoriesJson = await categoriesResponse.json();
  } catch (e) {
    console.error(e);
    res.render("errorPage");
    return;
  }

  if (categoriesJson.error) {
    res.render("errorPage");
  }

  if (categoriesJson) {
    mainArray = [];
    //loop for get category elements
    categoriesJson.forEach((element) => {
      if (element.parent_category_id.startsWith("root")) {
        mainArray.push(element);
        mainArray.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      }
    });
    res.render("mainPage");
  } else {
    res.render("errorPage");
  }
};
