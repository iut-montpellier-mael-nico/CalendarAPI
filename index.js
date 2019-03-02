const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
var user = require('./User');
var event = require('./Event');
const monUser = new user();


const tabUser = [];


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
  res.send("afficher Calendrier");
});

app.get("/private",passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Hello" + req.user.email +" partie pour les personnes connecter");
  }
);

app.get("/private/mesEvents",passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(monUser.getListEvent);
  }
);

app.get("/private/addEvent",passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idEvent = req.body.idEvent;
    const title = req.body.title; 
    const dateDebut = req.body.dateDebut;
    const dateFin = req.body.dateFin;
    const description = req.body.dateFin; 
    const idUser = req.body.idUser;
    event1 = new event(idEvent,title,dateDebut,dateFin,description,idUser);
    monUser.addEvent(event1);
  }
);

app.post("/login", urlEncodedParser, (req, res) => {
  const email = req.body.mail;
  const password = req.body.password;

  if (!email || !password) {
    res.status(401).json({ error: "Le mail ou le mdp est introuvable." });
    return;
  }

  const user = tabUser.find(user => user.mail === email);

  if (!user || user.password !== password) {
    res.status(401).json({ error: "Le mot de passe est incorrect" });
    return;
  }

  const userjwt = jwt.sign({ user: email }, "monSecret");

  res.json({
    jwt: userjwt
  });
});

app.post("/register",(req, res) => {
monUser = new user(req.body.mail, req.body.password)
tabUser.push(monUser);
});

app.get("/")
app.listen(3000, () => {
  console.log("app running on port 3000");
});
