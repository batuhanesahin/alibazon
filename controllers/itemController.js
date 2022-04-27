const fetch = require("node-fetch");

module.exports.item = async function (req, res) {
  const mainURL = process.env.OSF_URL;
  const catURL = mainURL + "/products/product_search";

  const queryParams = new URLSearchParams({
    id: req.params.id,
    secretKey: process.env.SECRET_KEY
  }).toString();

  const catagoryRequestUri = catURL + "?" + queryParams;

  let categoriesJson;
  try {
    const categoriesResponse = await fetch(catagoryRequestUri, {
      method: "GET",
    });

    //convert response to json format
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
    res.render("productDetail", { categoriesJson });
  } else {
    res.render("errorPage");
  }
};
