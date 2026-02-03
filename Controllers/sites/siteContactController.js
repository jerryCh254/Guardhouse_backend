const Contact = require('../../models/site/siteContactModel.js');
const contactSchema = require('../../dto/site/contact.dto.js');
const Site = require('../../models/site/siteModel.js');

class ContactController {
static async createContact(req, res) {
    try {
        const {siteId} = req.params
      const { error, value } = contactSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message
        });
      }

      const {...contactData } = value;

      const site = await Site.findById(siteId);
      if (!site) {
        return res.status(404).json({
          message: "Site not found"
        });
      }

      const contact = await Contact.create({
        site: [siteId],
        contact: [contactData]
      });

      site.contacts.push(contact._id);
      await site.save();

      return res.status(201).json({
        message: "Contact added successfully",
        data: contact
      });

    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  }
  //get contact data
  static async getContact(req, res){
    try {
      const contact = await Contact.find().populate("site");
  
      res.status(200).json({
        success: true,
        message: "Contact fetched successfully",
        data: contact
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  //update contact data
  static async updateContact(req, res) {
      try {
        // const {customerId} = req.params;
        const updateContact = await Contact.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )
        res.json(updateContact);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
    //delete contact
      static async deleteContact(req, res) {
          try {
            const deleteContact = await Site.findByIdAndDelete(req.params.id).populate("site");
            res.json({
              message: 'contact  is deleted sucessfully',
              deleteContact,
            });
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
        }
}
module.exports = ContactController