const EmployeeSite = require('../../models/employee/employeeSiteModel');
const Employee = require('../../models/employee/employeeModel');
const Site = require('../../models/site/siteModel');
const PreferredStaff = require('../../models/site/preferredStaffModel');

class EmployeeSiteController {

//get sites
static async getSites(req, res) {
  try {
    const sites = await Site.find()

    res.status(200).json({
     
      message: "Sites fetched successfully",
      data: sites
    });

  } catch (error) {
    res.status(500).json({
     
      message: error.message
    });
  }
}
 static async getPreferredSitesByEmployee(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "employeeId is required" });
    }

    const preferredEntries = await PreferredStaff.find({
      employeeId: id,
      isPreferred: true,
      isBlocked: false
    })
      .populate('siteId', 'siteName location')
      .populate('employeeId', 'firstName lastName email');

    // Update site models to include this employee in preferredEmployees array
    for (const entry of preferredEntries) {
      if (entry.siteId) {
        await Site.findByIdAndUpdate(
          entry.siteId._id,
          { 
            $addToSet: { preferredEmployees: id },
            $pull: { blacklistedEmployees: id }
          },
          { new: true }
        );
      }
    }

    res.status(200).json({
      success: true,
      message: "Preferred sites fetched successfully",
      data: preferredEntries.map(entry => entry.siteId)
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
}

//blacklist the staff once from all site
static async blacklistEmployee(req, res) {
    try{
        const {id} = req.params;
        const employee = await Employee.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new: true },
        );
        if(!employee){
            return res.status(400).json({message:"Employee not Found"});
        }

        // Update all sites to add this employee to blacklistedEmployees array
        // and remove from preferredEmployees array
        await Site.updateMany(
            {},
            { 
                $addToSet: { blacklistedEmployees: id },
                $pull: { preferredEmployees: id }
            },
            { new: true }
        );

        // Also update PreferredStaff entries to mark as blocked
        await PreferredStaff.updateMany(
            { employeeId: id },
            { 
                isBlocked: true,
                isPreferred: false
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message:"Employee is blacklisted from all sites successfully",
            data: employee
        })

    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// Add employee to preferred list for specific site
static async addPreferredEmployee(req, res) {
    try {
        const { employeeId, siteId } = req.body;

        if (!employeeId || !siteId) {
            return res.status(400).json({ 
                success: false,
                message: "employeeId and siteId are required" 
            });
        }

        // Update PreferredStaff model
        await PreferredStaff.findOneAndUpdate(
            { employeeId, siteId },
            { 
                isPreferred: true,
                isBlocked: false
            },
            { upsert: true, new: true }
        );

        // Update Site model
        await Site.findByIdAndUpdate(
            siteId,
            { 
                $addToSet: { preferredEmployees: employeeId },
                $pull: { blacklistedEmployees: employeeId }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Employee added to preferred list successfully"
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Remove employee from preferred list for specific site
static async removePreferredEmployee(req, res) {
    try {
        const { employeeId, siteId } = req.body;

        if (!employeeId || !siteId) {
            return res.status(400).json({ 
                success: false,
                message: "employeeId and siteId are required" 
            });
        }

        // Update PreferredStaff model
        await PreferredStaff.findOneAndUpdate(
            { employeeId, siteId },
            { isPreferred: false },
            { new: true }
        );

        // Update Site model
        await Site.findByIdAndUpdate(
            siteId,
            { $pull: { preferredEmployees: employeeId } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Employee removed from preferred list successfully"
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

// Blacklist employee from specific site
static async blacklistEmployeeFromSite(req, res) {
    try {
        const { employeeId, siteId } = req.body;

        if (!employeeId || !siteId) {
            return res.status(400).json({ 
                success: false,
                message: "employeeId and siteId are required" 
            });
        }

        // Update PreferredStaff model
        await PreferredStaff.findOneAndUpdate(
            { employeeId, siteId },
            { 
                isPreferred: false,
                isBlocked: true
            },
            { upsert: true, new: true }
        );

        // Update Site model
        await Site.findByIdAndUpdate(
            siteId,
            { 
                $addToSet: { blacklistedEmployees: employeeId },
                $pull: { preferredEmployees: employeeId }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Employee blacklisted from site successfully"
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

}
module.exports = EmployeeSiteController;