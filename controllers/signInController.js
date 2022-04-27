const fetch = require("node-fetch");

module.exports.signinGet = function (req, res) {
  res.render("signin");
};


module.exports.signin = async function (req, res, next) {
  const mainURL = process.env.OSF_URL;
  const catURL = mainURL + "/auth/signin";

  var bodyParams = JSON.stringify({
    secretKey: process.env.SECRET_KEY,
    email: req.body.email,
    password: req.body.password,
  });

  let categoriesJson;
  try {
    const categoriesResponse = await fetch(catURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyParams,
    });

    //convert response to json format
    categoriesJson = await categoriesResponse.json();
    req.session.userId = categoriesJson.user._id
    req.session.name = categoriesJson.user.name

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
    res.redirect("/");
  }
};
