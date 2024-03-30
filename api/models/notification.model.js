import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["NewReport", "ReportUpdate", "NewMessage"],
      required: true,
    },
    reportInfo: {
      type: Schema.Types.ObjectId,
      ref: "EmergencyReport",
    },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

export default Notification;
