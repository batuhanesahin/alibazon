const fetch = require("node-fetch");

module.exports.product = async function (req, res) {
  const mainURL = process.env.OSF_URL;
  const catURL = mainURL + "/products/product_search";

  const queryParams = new URLSearchParams({
    primary_category_id: req.params.parent_category_id,
    secretKey: process.env.SECRET_KEY,
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
    return;
  }

  if (categoriesJson) {
    res.render("productList", { categoriesJson });
    return;
  } else {
    res.render("errorPage");
    return;
  }
};
