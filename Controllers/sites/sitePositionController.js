const sitePosition = require('../../models/site/sitePositionModel.js');
const Sites = require('../../models/site/siteModel.js');

class SitePositionController {
    //add site position
    static async addSitePosition(req,res){
        try{
            const{id} = req.params;
            const{position,name}= req.body;
            
            console.log("SiteId from params:", id);
            
            const siteExists = await Sites.findById(id);
            console.log("Site exists:", siteExists?._id);
            
            if (!siteExists) {
                return res.status(404).json({ message: "Site not found" });
            }
            
            const newSitePostion = await sitePosition.create({
                position,
                name,
                site: id
            })
            
            const updatedSite = await Sites.findByIdAndUpdate(id, {
                $push: { sitePosition: newSitePostion._id }
            }, { new: true })
            
            console.log("Updated Site:", updatedSite?.sitePosition);
            
            const populatedPosition = await sitePosition.findById(newSitePostion._id).populate("site");
            
            return res.status(201).json({
                message:"Site Position created successfully",
                data:populatedPosition,
            })
        }
        catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    }
  //get site positions 
  static async getSitePosition(req, res){
    try {
      const getsitePosition = await sitePosition.find().populate("site");
  
      res.status(200).json({
        message: "Site Positions fetched successfully",
        data: getsitePosition
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
  //update site position
  static async updateSitePosition(req, res) {
      try {
        const updateSitePosition = await sitePosition.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )
        res.json(updateSitePosition);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  
  //delete site position
  static async deleteSitePosition(req, res) {
      try {
        const deleteSitePosition = await sitePosition.findByIdAndDelete(req.params.id);
        if (!deleteSitePosition) {
          return res.status(404).json({ message: "Site Position not found" });
        }
        
        await Sites.findByIdAndUpdate(deleteSitePosition.site, {
          $pull: { sitePosition: req.params.id }
        });
        
        res.status(200).json({ message: "Site Position deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  
  //get site position by id
  static async getSitePositionById(req, res) {
      try {
        const sitePosition = await sitePosition.findById(req.params.id).populate("site");
        if (!sitePosition) {
          return res.status(404).json({ message: "Site Position not found" });
        }
        res.status(200).json({
          message: "Site Position fetched successfully",
          data: sitePosition
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
}
module.exports = SitePositionController;