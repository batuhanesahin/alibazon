const fetch = require('node-fetch')

module.exports.women = async function(req, res) {
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
        womensAccessories = [];
        womensClothing = [];
        womensJewelry = [];
        womensCategories = [];
        
        categoriesJson.forEach((element) => {
          if (element.parent_category_id.startsWith("womens-accessories")) {
             womensAccessories.push(element)
            womensAccessories.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
         } else if (element.parent_category_id.startsWith("womens-clothing")) {
          womensClothing.push(element);
          womensClothing.sort(function (a, b) {
          return a.name.localeCompare(b.name);
      });
    } else if (element.parent_category_id.startsWith("womens-jewelry")) {
        womensJewelry.push(element);
        //sort by name
        womensJewelry.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      }
      
      if (element.parent_category_id == "womens") {
        womensCategories.push(element);
        womensCategories.sort(function (b, a) {
          return a.name.localeCompare(b.name);
        });
      }
    });
    res.render("womenCategory", {
      womensAccessories,
      womensClothing,
      womensCategories,
    });
  } else {
    res.render("errorPage");
  }

 };