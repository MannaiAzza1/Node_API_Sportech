const db = require("../models");
Invite=db.invite;
// Create
exports.create = (Player, Coach) => {
 

  const invite = new Invite({
    state:"pending",
    player:Player,
    coach:Coach,
    
  });

  invite.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
   
    res.send({
      message: "added Invite sucessfully!",
     
          });
    
    
  });
};
// Retrieve
exports.findOne = (req, res) => {
  const id = req.params.id;
  Invite.findById(id).populate("player")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found  with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving with id=" + id });
    });
};



exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Invite.findOneAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Invite with id=${id}. Maybe  not found!`,
        });
      } else {
        res.send({ message: "Invite was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Invite with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Invite.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Invite with id=${id}. Maybe Invite was not found!`,
        });
      } else {
        res.send({
          message: "Invite was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Invite with id=" + id,
      });
    });
};
// Delete all
exports.deleteAll = (req, res) => {
  Invite.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Invites were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Invites.",
      });
    });
};
exports.findAll = (req, res) => {
  const type = req.query.state;
  var condition = type
    ? { state: { $regex: new RegExp(type), $options: "i" } }
    : {};
  Invite.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Invites.",
      });
    });
};
exports.findCoachInvites = (req,res) => {
  Invite.find({ coach:req.params.id  }).populate("player")
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

