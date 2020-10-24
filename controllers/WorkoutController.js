const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((foundWorkout) => {
      res.json(foundWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        message: "Can't find any workouts.",
      });
    });
});

router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        message: "Couldn't create a new workout.",
      });
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((newExercise) => {
      res.json(newExercise);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        message: "Workout didn't update.",
      });
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .limit(7)
    .then((foundWorkout) => {
      res.json(foundWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        message: "Workout didn't update.",
      });
    });
});

module.exports = router;
