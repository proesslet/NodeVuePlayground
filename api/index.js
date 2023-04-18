const express = require("express");

const app = express();
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");

const LocalStrategy = require("passport-local");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "mysession",
    keys: ["vueauthrandomkey"],
    resave: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

let users = [
  {
    id: 1,
    name: "admin",
    email: "test@test.com",
    password: "test",
  },
  {
    id: 2,
    name: "user",
    email: "user@test.com",
    password: "user",
  },
];

let loggedInUsers = [];

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    }

    req.login(user, (err) => {
      loggedInUsers.push(user);
      res.send("Logged in");
    });
  })(req, res, next);
});

app.post("/api/logout", (req, res) => {
  loggedInUsers.pop(req);
  req.logout();
  res.send("Logged out");
});

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send("Unauthenticated");
};

app.get("/api/user", authMiddleware, (req, res) => {
  let user = users.find((user) => {
    return user.id === req.session.passport.user;
  });

  console.log([user, req.session]);

  res.send({ user: user });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password;
      });

      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: "Incorrect email or password." });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id;
  });

  done(null, user);
});

// See all logged in users
app.get("/api/users/loggedin", (req, res) => {
  res.send(loggedInUsers);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
