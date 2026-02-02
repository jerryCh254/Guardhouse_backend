const Notes = require('../../models/site/noteModel');
const Site = require('../../models/site/siteModel');
class NoteController {
    //add note
    static async addNote(req,res){
        try{
            const{siteId} = req.params;
            const{shortNote,note}= req.body;
            let attachFile = [];
            
    if (req.file) {
      attachFile = [{
        fileName: req.file.originalname,
        fileUrl: `/uploads/site-notes/${req.file.filename}`,
        site: siteId, 
      }];
    }
    const newNote = await Notes.create({
        shortNote,
        note,
        attachFile,
        site: siteId
    })
    
    await Site.findByIdAndUpdate(siteId, {
        $push: { notes: newNote._id }
    })
    return res.status(201).json({
        message:"Note is created successfully",
        data:newNote,
    })
        }
        catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //get notes 
  static async getNotes(req, res){
    try {
      const notes = await Notes.find().populate("site");
  
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
  static async updateNotes(req, res) {
      try {
        const updateNotes = await Notes.findByIdAndUpdate(
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

module.exports = NoteController;