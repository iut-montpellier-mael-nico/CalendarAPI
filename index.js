const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require('cors')
app.use(cors({credenttials:true, origin:true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
var user = require('./User');
var event = require('./Event');
const PORT = process.env.PORT || 5000

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

app.get('/public', (req, res) => {
  res.send("afficher Calendrier");
});

app.post('/private',passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Hello " + monUser.mail +" partie pour les personnes connecté !!!");
  }
);

app.post('/private/mesEvents',passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(monUser.getListEvent());
  }
);

app.post('/private/monEvent',urlEncodedParser, passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idEvent = req.body.idEvent;
    result = monUser.getUnEvent(idEvent);
    res.send(result);
  }
);

app.post('/private/addEvent', urlEncodedParser ,passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idEvent = req.body.idEvent;
    const title = req.body.title; 
    const dateDebut = req.body.dateDebut;
    const dateFin = req.body.dateFin;
    const description = req.body.dateFin; 
    const idUser = req.body.idUser;
    event1 = new event(idEvent,title,dateDebut,dateFin,description,idUser);
    monUser.addEvent(event1);
    res.send("evenement ajout�");
  }
);

app.post('/private/deleteEvent', urlEncodedParser ,passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idEvent = req.body.idEvent;
    monUser.deleteUnEvent(idEvent);
    res.send("evenement supprim�");
  }
);

app.post('/login', urlEncodedParser, (req, res) => {
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

app.post('/register',urlEncodedParser,(req, res) => {
    const id = req.body.idUser;
    const email = req.body.mail;
    const password = req.body.password;
    monUser = new user(id, email, password)
    tabUser.push(monUser);
    res.send("enregistrer");
});

app.get('/', function (req, res){
    res.send('Hello World je suis une appli qui fonctionne !')
})
app.listen(PORT, () => {
  console.log("app running on port " + PORT);
});
