const Contact = require('../../Models/site/contactModel');
const contactSchema = require('../../dto/site/contact.dto');
const Site = require('../../Models/site/siteModel');

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
        ...contactData,
        site: siteId
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
}
module.exports = ContactController