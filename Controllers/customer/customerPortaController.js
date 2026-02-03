const CustomerPortal = require('../../models/customer/customerPortalModel');
const  customerPortalSchema = require('../../dto/customer/customerPortal.dto');

class CustomerPortalController {
  static async createCustomerPortal(req, res) {

    try {
      const { error, value } = customerPortalSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: "Fields don't match", error });
      }
      const { email } = req.body;
      const existingCustomer = await CustomerPortal.findOne({ email });
      if (existingCustomer) {
        return res.status(401).json({ message: 'Customer portal already registered' });
      }
      const newCustomer = await CustomerPortal.create(value);
      const customerWithSites = await CustomerPortal.findById(newCustomer._id)
      .populate('staticSites', 'siteName siteReferenceNumber address')
      .populate('patrolSites', 'siteName siteReferenceNumber address');
      return res.status(201).json({
        message: 'Customer is created successfully',
        data: customerWithSites,
        status: customerWithSites.req,
      });
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({ message: 'Server error ', error: err.message });
    }
  }
   static async getAllCustomersPortal(req, res) {
      try {
        const status = req.params.status || req.query.status; 
        let filter = {};
        if (status) {
          filter.status = status; 
        }
        const customersPortal = await CustomerPortal.find(filter)
        .populate('staticSites', 'siteName siteReferenceNumber address')
        .populate('patrolSites', 'siteName siteReferenceNumber address');
        return res.status(200).json({
          message: 'Successfully fetched companies',
          count: customersPortal.length,
          customersPortal, 
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
        const updateCustomers = await CustomerPortal.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).populate("sites");
        res.json(updateCustomers);  
      } catch (err) {
        res.status(500).json({ message: err.message }); 
      }
    }  
    static async deleteCustomers(req, res) {
      try {
        const deleteCustomers = await CustomerPortal.findByIdAndDelete(req.params.id).populate("site");
        res.json({
          message: 'Customer Portal  is deleted sucessfully',
          deleteCustomers,
        });
      } catch (err) {
        res.status(400).json({ message: err.message });
  
      }
  
    }
}
module.exports = CustomerPortalController;