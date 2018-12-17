const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });


const tabUser = [
  { mail: "roger@gmail.com", password: "toto" },
  { mail: "nico@gmail.com", password: "titi" }
];


const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "monSecret"
};

passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    done(null, "test");
  })
);

app.get("/public", (req, res) => {
  res.send("I am public folks!");
});

app.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Hello" + req.user.email);
  }
);

app.post("/login/", urlEncodedParser, (req, res) => {
  const email = req.body.mail;
  const password = req.body.password;

  if (!email || !password) {
    res.status(401).json({ error: "Le mail ou le mdp est introuvable." });
    return;
  }

  const user = tabUser.find(user => user.mail === email);

  if (!user || user.password !== password) {
    res.status(401).json({ error: "Le mot de passe est incorrect}" });
    return;
  }

  const userjwt = jwt.sign({ user: email }, "monSecret");

  res.json({
    jwt: userjwt
  });
});

app.post("/register") {

}

app.get("/")
app.listen(3000, () => {
  console.log("app running on port 3000");
});
