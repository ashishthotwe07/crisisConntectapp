import User from "../models/user.model.js";

class VolunteerController {
  async create(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found", user });
      }

      if (user.role === "volunteer") {
        return res.status(400).json({ error: "User is already a volunteer" });
      }

      user.role = "volunteer";
      await user.save();

      return res.status(200).json({ message: "You are Now a volunteer", user });
    } catch (error) {
      console.error("Error creating volunteer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const volunteers = await User.find({ role: "volunteer" });
      return res.status(200).json(volunteers);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getById(req, res) {
    try {
      const { volunteerId } = req.params;
      const volunteer = await User.findById(volunteerId);
      if (!volunteer) {
        return res.status(404).json({ error: "Volunteer not found" });
      }
      return res.status(200).json(volunteer);
    } catch (error) {
      console.error("Error fetching volunteer by ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new VolunteerController();
