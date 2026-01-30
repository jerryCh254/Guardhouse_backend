const path = require('path');
const fs = require('fs');
const DataImportJob = require('../../models/company/dataImportJobModel');
const { createDataImportSchema } = require('../../dto/company/dataImport.dto');

const getCompanyId = (req) => req.user?.id || req.params.companyId;

const IMPORT_TYPES = [
  { id: 'employees', name: 'Employees' },
  { id: 'skills', name: 'Skills' },
  { id: 'sites', name: 'Sites' },
  { id: 'site-positions', name: 'Site Positions' },
  { id: 'holidays', name: 'Holidays' },
];

async function processImportJob(jobId) {
  try {
    const job = await DataImportJob.findById(jobId);
    if (!job || job.status !== 'PENDING') return;
    job.status = 'PROCESSING';
    await job.save();
    job.totalRows = 0;
    job.processedRows = 0;
    job.errorRows = 0;
    job.errors = [];
    if (job.filePath && fs.existsSync(job.filePath)) {
      const content = fs.readFileSync(job.filePath, 'utf8');
      const lines = content.split(/\r?\n/).filter(Boolean);
      job.totalRows = Math.max(0, lines.length - 1);
    }
    job.status = 'COMPLETED';
    job.completedAt = new Date();
    await job.save();
  } catch (err) {
    const job = await DataImportJob.findById(jobId);
    if (job) {
      job.status = 'FAILED';
      job.errors = job.errors || [];
      job.errors.push({ row: 0, message: err.message });
      await job.save();
    }
  }
}

class DataImportController {
  static getImportTypes(req, res) {
    return res.status(200).json({ message: 'Success', data: IMPORT_TYPES });
  }

  static async getDataImports(req, res) {
    try {
      const companyId = getCompanyId(req);
      const jobs = await DataImportJob.find({ companyId }).sort({ createdAt: -1 });
      return res.status(200).json({ message: 'Success', count: jobs.length, data: jobs });
    } catch (err) {
      console.error('getDataImports error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async getDataImportStatus(req, res) {
    try {
      const companyId = getCompanyId(req);
      const job = await DataImportJob.findOne({ _id: req.params.jobId, companyId });
      if (!job) return res.status(404).json({ message: 'Import job not found' });
      return res.status(200).json({ message: 'Success', data: job });
    } catch (err) {
      console.error('getDataImportStatus error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  static async createDataImport(req, res) {
    try {
      const companyId = getCompanyId(req);
      const body = { importType: req.body?.importType || req.body?.import_type };
      const { error, value } = createDataImportSchema.validate(body);
      if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
      let filePath = null;
      if (req.file) {
        filePath = path.join(req.file.destination || '', req.file.filename || '');
      }
      const job = await DataImportJob.create({
        companyId,
        importType: value.importType,
        filePath,
        status: 'PENDING',
      });
      processImportJob(job._id).catch(() => {});
      return res.status(201).json({ message: 'Import started', data: job });
    } catch (err) {
      console.error('createDataImport error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = DataImportController;
