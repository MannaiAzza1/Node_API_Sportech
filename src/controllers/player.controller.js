const db = require("../models");



const Player = db.players;
// Retrieve
exports.findAll = (req, res) => {
  const username= req.query.title;
  var condition = username
    ? { title: { $regex: new RegExp(username), $options: "i" } }
    : {};
  Player.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stats.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Player.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found player with id " + id });
      else res.send(data.populate("stat"));
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving player with id=" + id });
    });
};
exports.update = async (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Player.findByIdAndUpdate(id, req.body,{ useFindAndModify: false , new:true })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update player with id=${id}. Maybe  not found!`
          });
        } else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating player with id=" + id
        });
      });

};



exports.delete = (req, res) => {
  const id = req.params.id;
  Player.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Player with id=${id}. Maybe Player was not found!`,
        });
      } else {
        res.send({
          message: "Player was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Player with id=" + id,
      });
    });
};
// Delete all
exports.deleteAll = (req, res) => {
  Player.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Players were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Players",
      });
    });
};
exports.findCoachInvitedBy = (req,res) => {
  Player.find({ coach:req.params.id  }).populate("player")
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Stats."
    });
  });

}


