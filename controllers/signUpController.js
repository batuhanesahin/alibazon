const fetch = require("node-fetch");

module.exports.signupGet = function (req, res) {
  res.render("signup");
};

module.exports.signup = async function (req, res) {
  const mainURL = process.env.OSF_URL;
  const catURL = mainURL + "/auth/signup";

  var bodyParams = JSON.stringify({
    secretKey: process.env.SECRET_KEY,
    name: req.body.name,
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
   res.render("signup")
  } else {
    res.render("errorPage");
    return;
  }
};
