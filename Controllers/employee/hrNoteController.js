const HrNote = require('../../models/employee/hrNoteModel');
const { createHrNoteSchema } = require('../../dto/employee/hrNote.dto');

const getCompanyId = (req) => req.user?.id || req.body?.companyId;

class HrNoteController {
  static async getNotesByEmployee(req, res) {
    try {
      const companyId = getCompanyId(req);
      const { id: employeeId } = req.params;
      const notes = await HrNote.find({ employeeId, companyId }).sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: notes.length, data: notes });
    } catch (err) {
      console.error('getNotesByEmployee error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createNote(req, res) {
    try {
      const { error, value } = createHrNoteSchema.validate(req.body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      const companyId = getCompanyId(req);
      if (!companyId) return res.status(400).json({ message: 'companyId required' });
      const employeeId = req.params.id;
      const note = await HrNote.create({ ...value, employeeId, companyId });
      return res.status(201).json({ message: 'HR note created', data: note });
    } catch (err) {
      console.error('createNote error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async deleteNote(req, res) {
    try {
      const companyId = getCompanyId(req);
      const noteId = req.params.noteId || req.params.id;
      const note = await HrNote.findOneAndDelete({ _id: noteId, companyId });
      if (!note) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json({ message: 'Note deleted' });
    } catch (err) {
      console.error('deleteNote error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = HrNoteController;
