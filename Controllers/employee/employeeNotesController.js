const EmployeeNote = require('../../models/employee/employeeNotesModel');
const Employee = require('../../models/employee/employeeModel');

class EmployeeNoteController {
    //add note
    static async addNote(req,res){
        try{
            const{employeeId} = req.params;
            const{note, attachFile}= req.body;
            
    const newNote = await EmployeeNote.create({
        note,
        attachFile,
        employee:employeeId
    })
    
    await Employee.findByIdAndUpdate(employeeId, {
        $push: { notes: newNote._id }
    })
    return res.status(201).json({
        message:"Employee Note is created successfully",
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
      const notes = await EmployeeNote.find().populate("employeeId");
  
      res.status(200).json({
        message: "Employee Notes fetched successfully",
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
        const updateNotes = await EmployeeNote.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )
        res.json({
          message: "Note updated successfully",
          data: updateNotes
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
}
module.exports = EmployeeNoteController;