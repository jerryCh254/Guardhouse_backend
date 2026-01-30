const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    // Basic
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: String,
    email: { type: String, required: true },
    knownAsFirstName: String,
    knownAsLastName: String,
    employeeId: String,
    employeePin: String,
    employeeRefNumber: String,
    mobileNumber: String,
    // Access
    accessPrivilege: {
      type: String,
      enum: ['Super Admin', 'Admin', 'Manager', 'Employee'],
      default: 'Employee',
    },
    subContractor: String,
    // Employment
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contractor', 'Intern'],
    },
    startDate: Date,
    endDate: Date,
    conditionalFrom: Date,
    confirmFrom: Date,
    // DOB / Personal
    dob: Date,
    title: String,
    fullNameAtBirth: String,
    motherName: String,
    placeOfBirth: String,
    countryOfBirth: String,
    // Notice
    noticeDate: Date,
    leavingDate: Date,
    status: { type: String, enum: ['Active', 'Deactive'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
