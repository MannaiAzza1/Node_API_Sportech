const mongoose = require("mongoose");
const UserSchema = require("./user.model");
const extendSchema = require("mongoose-extend-schema");
const Coach = mongoose.model(
  "Coach",
  new extendSchema(UserSchema, {
    role: String,
    discipline: String,
    abonnement: String,
    nb_auth: {
      type: Number,
      default: 0,
    },

    invited_users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    invites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invite",
      },
    ],
    equipe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
  })
);
module.exports = Coach;
