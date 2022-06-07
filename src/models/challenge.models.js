module.exports = (mongoose) => {
  const Challenge = mongoose.model(
    "challenge",
    mongoose.Schema({
  goal: { type: String, required: true },
  vid_link: { type: String, required: true },
  period: { type: String,},
  players:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player"
    },
  ]
  })
);
  return Challenge;
};












