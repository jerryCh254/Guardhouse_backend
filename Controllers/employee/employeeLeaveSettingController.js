const EmployeeLeaveSetting = require('../../models/employee/employeeLeaveSettingModel');

class EmployeeLeaveSettingController {

  static async createLeaveSetting(req, res) {
    try {
      const {
        leaveDaysPerYear,
        leaveResetDays,
        halfDay,
        fullDay,
        employeeId,
      } = req.body;

      if (!employeeId) {
        return res.status(400).json({
          message: "Employee ID is required",
        });
      }

      const existing = await EmployeeLeaveSetting.findOne({ employeeId });

      if (existing) {
        return res.status(400).json({
          message: "Leave setting already exists for this employee",
        });
      }

      const newSetting = await EmployeeLeaveSetting.create({
        leaveDaysPerYear,
        leaveResetDays,
        halfDay,
        fullDay,
        employeeId,
        createdAt: new Date().toISOString(),
      });

      const populatedData = await EmployeeLeaveSetting
        .findById(newSetting._id)
        .populate("employeeId");

      return res.status(201).json({
        message: "Leave setting created successfully",
        data: populatedData,
      });

    } catch (err) {
      console.error("Create Leave Setting Error:", err);
      return res.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  }

  static async getAllLeaveSettings(req, res) {
    try {
      const settings = await EmployeeLeaveSetting
        .find()
        .populate("employeeId");

      return res.status(200).json({
        message: "Leave settings fetched successfully",
        count: settings.length,
        data: settings,
      });

    } catch (err) {
      console.error("Get All Leave Settings Error:", err);
      return res.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  }

  static async getLeaveSettingByEmployee(req, res) {
    try {
      const { employeeId } = req.params;

      const setting = await EmployeeLeaveSetting
        .findOne({ employeeId })
        .populate("employeeId");

      if (!setting) {
        return res.status(404).json({
          message: "Leave setting not found for this employee",
        });
      }

      return res.status(200).json({
        message: "Leave setting fetched successfully",
        data: setting,
      });

    } catch (err) {
      console.error("Get Leave Setting By Employee Error:", err);
      return res.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  }

  static async updateLeaveSetting(req, res) {
    try {
      const { id } = req.params;

      const updatedSetting = await EmployeeLeaveSetting
        .findByIdAndUpdate(id, req.body, { new: true })
        .populate("employeeId");

      if (!updatedSetting) {
        return res.status(404).json({
          message: "Leave setting not found",
        });
      }

      return res.status(200).json({
        message: "Leave setting updated successfully",
        data: updatedSetting,
      });

    } catch (err) {
      console.error("Update Leave Setting Error:", err);
      return res.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  }

  static async deleteLeaveSetting(req, res) {
    try {
      const { id } = req.params;

      const deletedSetting = await EmployeeLeaveSetting
        .findByIdAndDelete(id)
        .populate("employeeId");

      if (!deletedSetting) {
        return res.status(404).json({
          message: "Leave setting not found",
        });
      }

      return res.status(200).json({
        message: "Leave setting deleted successfully",
        data: deletedSetting,
      });
    } catch (err) {
      console.error("Delete Leave Setting Error:", err);
      return res.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  }

}

module.exports = EmployeeLeaveSettingController;

