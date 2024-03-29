import mongoose from "mongoose";

const { Schema } = mongoose;

const emergencyReportSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    details: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["reported", "in progress", "resolved"],
      default: "reported",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  },
  { timestamps: true }
);

emergencyReportSchema.index({ location: "2dsphere" });

const EmergencyReport = mongoose.model(
  "EmergencyReport",
  emergencyReportSchema
);

export default EmergencyReport;
