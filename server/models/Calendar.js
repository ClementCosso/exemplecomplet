const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CalSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User" },
    year: { type: Number, min: 2019, max: 2020, required: true },
    week: { type: Number, min: 1, max: 52, required: true },
    works: [
      {
        project: { type: ObjectId, ref: "Project", required: true },
        projectName: { type: String },
        lundi: { type: Number, min: 0, max: 12 },
        mardi: { type: Number, min: 0, max: 12 },
        mercredi: { type: Number, min: 0, max: 12 },
        jeudi: { type: Number, min: 0, max: 12 },
        vendredi: { type: Number, min: 0, max: 12 },
        samedi: { type: Number, min: 0, max: 12 },
        dimanche: { type: Number, min: 0, max: 12 },
        key: { type: Number }
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Calendar = mongoose.model("Calendar", CalSchema);
module.exports = Calendar;
