const Holiday = require('../../Models/company/holidayModel');
const { createHolidaySchema, updateHolidaySchema } = require('../../dto/company/holiday.dto');

const getCompanyId = (req) => req.user?.id || req.params.companyId;

exports.getHolidays = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const { country, state, year } = req.query;
    const filter = { companyId };
    if (country) filter.country = country;
    if (state) filter.state = state;
    if (year) filter.year = parseInt(year, 10);
    const holidays = await Holiday.find(filter).sort({ date: 1 });
    return res.status(200).json({ message: 'Success', count: holidays.length, data: holidays });
  } catch (err) {
    console.error('getHolidays error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getHolidayById = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const holiday = await Holiday.findOne({ _id: req.params.id, companyId });
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    return res.status(200).json({ message: 'Success', data: holiday });
  } catch (err) {
    console.error('getHolidayById error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createHoliday = async (req, res) => {
  try {
    const { error, value } = createHolidaySchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const holiday = await Holiday.create({ ...value, companyId });
    return res.status(201).json({ message: 'Holiday created', data: holiday });
  } catch (err) {
    console.error('createHoliday error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateHoliday = async (req, res) => {
  try {
    const { error, value } = updateHolidaySchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation failed', error: error.details });
    const companyId = getCompanyId(req);
    const holiday = await Holiday.findOneAndUpdate(
      { _id: req.params.id, companyId },
      value,
      { new: true }
    );
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    return res.status(200).json({ message: 'Holiday updated', data: holiday });
  } catch (err) {
    console.error('updateHoliday error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteHoliday = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const holiday = await Holiday.findOneAndDelete({ _id: req.params.id, companyId });
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    return res.status(200).json({ message: 'Holiday deleted' });
  } catch (err) {
    console.error('deleteHoliday error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMetaCountries = (req, res) => {
  const countries = [
    { id: 'UK', name: 'United Kingdom' },
    { id: 'US', name: 'United States' },
    { id: 'IN', name: 'India' },
  ];
  return res.status(200).json({ message: 'Success', data: countries });
};

exports.getMetaStates = (req, res) => {
  const { country } = req.query;
  const statesByCountry = {
    UK: [
      { id: 'EW', name: 'England & Wales' },
      { id: 'S', name: 'Scotland' },
      { id: 'NI', name: 'Northern Ireland' },
    ],
    US: [{ id: 'CA', name: 'California' }, { id: 'NY', name: 'New York' }],
    IN: [{ id: 'MH', name: 'Maharashtra' }, { id: 'KA', name: 'Karnataka' }],
  };
  const states = statesByCountry[country] || [];
  return res.status(200).json({ message: 'Success', data: states });
};

exports.getMetaYears = (req, res) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  return res.status(200).json({ message: 'Success', data: years });
};
