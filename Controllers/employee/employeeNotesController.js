const employeeNotes = require('../../models/employee/employeeNotesModel');

class EmployeeNoteController {
    //add note
    static async addNote(req,res){
        try{
            const{employeeId} = req.params;
            const{note}= req.body;
            
    const newNote = await employeeNotes.create({
        note,
        attachFile,
        employee:employeeId
    })
    
    await Employee.findByIdAndUpdate(siteId, {
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
      const notes = await employeeNotes.find().populate("Employee");
  
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
        const updateNotes = await employeeNotes.findByIdAndUpdate(
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
module.exports = EmployeeNoteController;