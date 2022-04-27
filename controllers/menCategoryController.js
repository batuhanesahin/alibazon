const fetch = require('node-fetch')

module.exports.men = async function(req, res) {
    const mainURL = process.env.OSF_URL;
    const catURL = mainURL + "/categories"

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
    } catch(e) {
        condole.error(e)
        res.render("errorPage");
        return;
    };

    if (categoriesJson.error) {
        res.render("errorPage");
      }
    
      if(categoriesJson){
        mensAccessories = [];
        mensClothing = [];
        mensCategories = [];

        categoriesJson.forEach((element) => {
          if (element.parent_category_id.startsWith("mens-accessories")) {
             mensAccessories.push(element)
            mensAccessories.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
         } else if (element.parent_category_id.startsWith("mens-clothing")) {
          mensClothing.push(element);
          mensClothing.sort(function (a, b) {
          return a.name.localeCompare(b.name);
      });
      }
  
      if (element.parent_category_id == "mens") {
        mensCategories.push(element);
        mensCategories.sort(function (b, a) {
          return a.name.localeCompare(b.name);
        });
      }
    });
    res.render("menCategory", {
      mensAccessories,
      mensClothing,
      mensCategories,
    });
  } else {
    res.render("errorPage");
  }

 };