const Customer = require('../../models/customer/customerModel');
const customerSchema = require('../../dto/customer/customer.dto');

class CustomerController {
  static async createCustomer(req, res) {
    try {
      const { error, value } = customerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ messaage: "Feilds does't match", error });
      }

      const { customerName } = req.body;
      const existingCustomer = await Customer.findOne({ customerName });
      if (existingCustomer) {
        return res.status(401).json({ message: 'Customer already registered' });
      }
      const newCustomer = await Customer.create(value);

      return res.status(201).json({
        message: 'Customer is created sucessfully',
        data: newCustomer,
        status: newCustomer.req,
      });
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({ message: 'Server error ', error: err.message });
    }
  }

  static async getAllCustomers(req, res) {
    try {
      const status = req.params.status || req.query.status;

      let filter = {};
      if (status) {
        filter.status = status;
      }

      const customers = await Customer.find(filter);

      return res.status(200).json({
        message: 'Successfully fetched companies',
        count: customers.length,
        customers,
      });
    } catch (error) {
      console.error('Get companies error:', error);
      return res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }

  static async updateCustomer(req, res) {
    try {
      const updateCustomers = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updateCustomers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteCustomers(req, res) {
    try {
      const deleteCustomers = await Customer.findByIdAndDelete(req.params.id);
      res.json({
        message: 'Customer  is deleted sucessfully',
        deleteCustomers,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateCustomerStatus(req, res) {
    try {
      const { status } = req.body;
      const Id = req.params.id;

      if (!status) {
        return res.status(400).json({ message: 'Status should be given' });
      }

      const customer = await Customer.findById(Id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      customer.status = status;

      await customer.save();

      return res.status(200).json({
        message: `Customer status updated to ${status}`,
        customer,
      });
    } catch (err) {
      console.error('UpdateStatus error:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
}

module.exports = CustomerController;
