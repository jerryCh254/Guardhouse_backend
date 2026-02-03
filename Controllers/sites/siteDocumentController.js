const SiteDocument = require('../../models/site/siteDocumentModel');
const Site = require('../../models/site/siteModel');

class SiteDocumentController {
  //add note
  static async addSiteDoc(req, res) {
    try {
      const { siteId } = req.params;
      const { documentName, requireAllStaff, requiresAcknowledgementBeforeShift, requireSignature, needRenenwal, renenwalPeriodMonth } = req.body;
      let attachFile = [];

      if (req.file) {
        attachFile = [{
          fileName: req.file.originalname,
          fileUrl: `/uploads/site-notes/${req.file.filename}`,
          site: siteId,
        }];
      }

      const newSiteDocument = await SiteDocument.create({
        documentName,
        requireAllStaff,
        requiresAcknowledgementBeforeShift,
        requireSignature,
        needRenenwal,
        renenwalPeriodMonth,
        attachFile,
        siteId: siteId
      })

      await Site.findByIdAndUpdate(siteId, {
        $push: { siteDocuments: newSiteDocument._id }
      })

      return res.status(201).json({
        message: "Site document is created successfully",
        data: newSiteDocument,
      })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // get notes 
  static async getSiteDoc(req, res) {
    try {
      const documents = await SiteDocument.find().populate("siteId");

      res.status(200).json({
        message: "Documents fetched successfully",
        data: documents
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
  //update notes
  static async updateSiteDoc(req, res) {
      try {
        const updateDocuments = await SiteDocument.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )
        res.json(updateDocuments);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
}

module.exports = SiteDocumentController;