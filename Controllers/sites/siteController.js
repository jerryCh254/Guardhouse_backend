const Site = require('../../models/site/siteModel');
const Customer = require('../../models/customer/customerModel');
const siteSchema = require('../../dto/site/site.dto');
const getLatLongFromAddress = require('../../utils/geocode');
const { nanoid } = require('nanoid');
const siteRoleTemplate = require('../../models/site/roleTemplateModel');

class SiteController {
  static async createSite(req, res) {
  try {
    const { customerId } = req.params;

    const { error, value } = siteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Fields don't match",
        error: error.details[0].message
      });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const { siteName, address, state, zipCode, country } = req.body;
    const existingSite = await Site.findOne({ siteName, customerId });
    if (existingSite) {
      return res.status(409).json({ message: "Site already created for this customer" });
    }

    const autoId = "123" + nanoid(5).toUpperCase();

    const fullAddress = `${address}, ${state}, ${zipCode}, ${country}`;
    const location = await getLatLongFromAddress(fullAddress);

    const newSite = await Site.create({
      ...value,
      id: autoId,
      customer: [customerId],
      latitude: location ? location.latitude : "",
      longitude: location ? location.longitude : ""
    });

    customer.sites.push(newSite._id);
    await customer.save();

    return res.status(201).json({
      message: "Site created and linked to customer successfully",
      data: newSite
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
}

//get sites
static async getSites(req, res) {
  try {
    const sites = await Site.find()
      .populate("customer")
      .populate("contacts")
      .populate("notes")
      .populate({
        path: "sitePosition",
        model: "siteSitePositions"
      })
      .populate("incidentReportTemplates")
      .populate({
        path: "roleTemplates",
        model: "siteRoleTemplate"
      })
      .populate("siteDocuments");

    res.status(200).json({
      success: true,
      message: "Sites fetched successfully",
      data: sites
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

//get site by id
static async getSiteById(req, res) {
  try {
    const site = await Site.findById(req.params.id)
      .populate("customer")
      .populate("contacts")
      .populate("notes")
      .populate({
        path: "sitePosition",
        model: "siteSitePositions"
      })
      .populate("incidentReportTemplates")
      .populate({
        path: "roleTemplates",
        model: "siteRoleTemplate"
      })
      .populate("siteDocuments");

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Site fetched successfully",
      data: site
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

//Update site data
  static async updateSites(req, res) {
    try {
      // const {customerId} = req.params;
      const updateSites = await Site.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      res.json(updateSites);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
    static async deleteSite(req, res) {
      try {
        const deleteSites = await Site.findByIdAndDelete(req.params.id).populate("customer");
        res.json({
          message: 'Site  is deleted sucessfully',
          deleteSites,
        });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
      static async updateSiteStatus(req, res) {
        try {
          const { status } = req.body;
          const Id = req.params.id;
    
          if (!status) {
            return res.status(400).json({ message: 'Status should be given' });
          }
    
          const site = await Site.findById(Id).populate("customer");
          if (!site) {
            return res.status(404).json({ message: 'Site not found' });
          }
    
          site.status = status;
    
          await site.save();

          return res.status(200).json({
            message: `Site status updated to ${status}`,
            site,
          });
        } catch (err) {
          console.error('UpdateStatus error:', err);
          res.status(500).json({ message: 'Server error', error: err.message });
        }
      }
}

module.exports = SiteController;
