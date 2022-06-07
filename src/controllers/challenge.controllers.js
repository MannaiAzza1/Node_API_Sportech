const db = require("../models");
const Challenge = db.challenges;
const Player = db.players;
// Create
exports.create = async (req, res) => {
  if (!req.body.goal) {
    res.status(400).send({ message: "Goal can not be empty!" });
    return;
  }

  //assignier defi à un joueur
  // exports.assigner = async (req, res) => {
  //   const id = req.body.id;
  //   const id_defi = req.params.id;
  //   Player.findById(id).then((data) => {
  //     if (!data)
  //       res.status(404).send({ message: "Not found player with id " + id });
  //     else res.send(data);
  //     data.challenge_to_achieve = data.push(id_defi);
  //     data.save();
  //   });
  //   challenge.findById(id_defi).then((data) => {
  //     if (!data)
  //       res.status(404).send({ message: "Not found defi with id " + id });
  //     else res.send(data);
  //     data.players = data.push(id);
  //     data.save();
  //   });
  //   res.status(400).send({ message: "Défi assignié!" });
  //   return;
  // };

  const challenge = new Challenge({
    goal: req.body.goal,
    vid_link: req.body.vid_link,
    period: req.body.period,
  });
  challenge
    .save(challenge)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Challenge",
      });
    });
};
// Retrieve
exports.findAll = async (req, res) => {
  const goal = req.query.title;
  var condition = goal
    ? { title: { $regex: new RegExp(goal), $options: "i" } }
    : {};
  Challenge.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving challenge.",
      });
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  Challenge.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found challenge with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Challenge with id=" + id });
    });
};

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Challenge.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update challenge with id=${id}. Maybe  not found!`,
        });
      } else res.send({ message: "challenge was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Challenge with id=" + id,
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  Challenge.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete challenge with id=${id}. Maybe Challenge was not found!`,
        });
      } else {
        res.send({
          message: "challenge was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Challenge with id=" + id,
      });
    });
};
// Delete all
exports.deleteAll = async (req, res) => {
  Challenge.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Challenge were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Challenges.",
      });
    });
};
// Find all Visible challenge
exports.findAllVisible = (req, res) => {
  Challenge.find({ isVisible: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Challenge.",
      });
    });
};
