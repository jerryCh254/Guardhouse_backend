const SiteDocument= require('../../models/site/siteDocumentModel');
const Site = require('../../models/site/siteModel');
class SiteDocumentController {
    //add note
    static async addSiteDoc(req,res){
        try{
            const{siteId} = req.params;
            const{documentName,requireAllStaff,requiresAcknowledgementBeforeShift,requireSignature,needRenenwal,renenwalPeriodMonth}= req.body;
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
       requireSignature,needRenenwal,
       renenwalPeriodMonth,
        attachFile,
        site: siteId
    })
    
    await Site.findByIdAndUpdate(siteId, {
        $push: { notes: newSiteDocument._id }
    })
    return res.status(201).json({
        message:"Site document is created successfully",
        data:newSiteDocument,
    })
        }
        catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //get notes 
  static async getSiteDoc(req, res){
    try {
      const notes = await SiteDocument.find().populate("site");
  
      res.status(200).json({
        message: "Notes fetched successfully",
        data: notes
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
        const updateNotes = await SiteDocument.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )
        res.json(updateNotes);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
}

module.exports = SiteDocumentController;