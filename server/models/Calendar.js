const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CalSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User" },
    year: { type: Number, min: 2019, max: 2019, required: true },
    week: { type: Number, min: 0, max: 52, required: true },
    works: [
      {
        project: { type: ObjectId, ref: "Project" },
        times: [{ type: Number, min: 0, max: 8 }]
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
