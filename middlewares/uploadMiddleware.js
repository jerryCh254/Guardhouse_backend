const path = require('path');
const fs = require('fs');
const multer = require('multer');

const companyDocsDir = path.join(process.cwd(), 'uploads', 'company-documents');
const dataImportDir = path.join(process.cwd(), 'uploads', 'data-import');
const siteNoteDir = path.join(process.cwd(), 'uploads', 'note-site');
const siteDocDir = path.join(process.cwd(), 'uploads', 'site-doc');
const customerDocDir = path.join(process.cwd(), 'uploads', 'customer-doc');


[companyDocsDir, dataImportDir,siteNoteDir,siteDocDir,customerDocDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storageCompanyDoc = multer.diskStorage({
  destination: (req, file, cb) => cb(null, companyDocsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    cb(null, `${Date.now()}_${(file.originalname || 'file').slice(0, 50)}${ext}`);
  },
});

const storageDataImport = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dataImportDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.csv';
    cb(null, `${Date.now()}${ext}`);
  },
});
const siteNoteDoc = multer.diskStorage({
  destination: (req, file, cb) => cb(null, siteNoteDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    cb(null, `${Date.now()}_${(file.originalname || 'file').slice(0, 50)}${ext}`);
  },
});
const storageSiteDoc = multer.diskStorage({
  destination: (req, file, cb) => cb(null, siteDocDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    cb(null, `${Date.now()}_${(file.originalname || 'file').slice(0, 50)}${ext}`);
  },
});
const storageCustomerDoc = multer.diskStorage({
  destination: (req, file, cb) => cb(null, customerDocDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    cb(null, `${Date.now()}_${(file.originalname || 'file').slice(0, 50)}${ext}`);
  },
});

const uploadCompanyDocument = multer({
  storage: storageCompanyDoc,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('file');

const uploadDataImport = multer({
  storage: storageDataImport,
  limits: { fileSize: 15 * 1024 * 1024 },
}).single('file');
const uploadSiteDocument = multer({
  storage: siteNoteDoc,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('attchFile');
const uploadSiteDoc = multer({
  storage: storageSiteDoc,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('attchFile');
const uploadCustomerDoc = multer({
  storage: storageCustomerDoc,
  limits: { fileSize: 10 * 1024 * 1024 },
}).array('files', 5);
module.exports = { uploadCompanyDocument, uploadDataImport ,uploadSiteDocument,uploadSiteDoc,uploadCustomerDoc};
