const db = require("../models");
const Place = db.places;
// Create
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }

  const place = new Place({
    name: req.body.name,
    town: req.body.town,
    country: req.body.country,
    address: req.body.address,
  });
  /*   place
    .save(place)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the plaace"
      });
    });
  
}; */

  place.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.session) {
      session.find(
        {
          username: { $in: req.body.session },
        },
        (err, session) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          place.session = session.map((session) => session.goal);
          place.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          });
        }
      );
    }
    res.send({
      message: "added!",
      name: place.name,
      town: place.town,
      country: place.country,
      address: place.address,
      session: place.session,
    });
  });
};

// Retrieve
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  Place.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving olaces.",
      });
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  Place.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Place with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Place with id=" + id });
    });
};

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Place.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Place with id=${id}. Maybe  not found!`,
        });
      } else res.send({ message: "Place was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Place with id=" + id,
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  Place.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Place with id=${id}. Maybe Stat was not found!`,
        });
      } else {
        res.send({
          message: "Stat was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Stat with id=" + id,
      });
    });
};
// Delete all
exports.deleteAll = async (req, res) => {
  Place.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Places were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Places.",
      });
    });
};
