const fetch = require("node-fetch");

module.exports.search = async function (req, res) {
  const username = req.body.username.toLowerCase();
  const mainURL = process.env.OSF_URL;
  const catURL = mainURL + "/products/product_search";

  var productarray = [];

  let i = 1;
  do {
    i++;
    var queryParams = new URLSearchParams({
      page: i,
      secretKey: process.env.SECRET_KEY,
    }).toString();
    var catagoryRequestUri = catURL + "?" + queryParams;
    let categoriesJson;
    try {
      const categoriesResponse = await fetch(catagoryRequestUri, {
        method: "GET",
      });

      //convert response to json format
      categoriesJson = await categoriesResponse.json();

      Array.prototype.forEach.call(categoriesJson, (elements) => {
        var element = elements.name.toLowerCase();
        if (element.includes(username)) {
          productarray.push(elements);
        } else if (elements.primary_category_id.includes(username)) {
          productarray.push(elements);
        }
      });
    } catch (e) {
      console.error(e);
      return;
    }
  } while (i < 26);
  res.render("search", {
    productarray,
  });
};
