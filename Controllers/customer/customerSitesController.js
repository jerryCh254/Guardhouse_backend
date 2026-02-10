const CustomerPortal = require('../../models/customer/customerPortalModel');

class CustomerWebsiteController {
  static async getCustomerWebsiteData(req, res) {
    try {
      const { customerName } = req.params;
      
      const customerPortal = await CustomerPortal.findOne({ customerName })
        .populate('staticSites', 'siteName id siteReferenceNumber address status')
        .populate('patrolSites', 'siteName id siteReferenceNumber address status');
        
      if (!customerPortal) {
        return res.status(404).json({ message: 'Customer portal not found' });
      }
      
      const portalId = `PORTAL-${customerName.replace(/\s+/g, '').toUpperCase()}`;
      
      return res.status(200).json({
        message: 'Customer website data fetched successfully',
        data: {
          customer: {
            customerName: customerPortal.customerName,
            firstName: customerPortal.firstName,
            lastName: customerPortal.lastName,
            email: customerPortal.email,
            portalId: portalId
          },
          staticSites: {
            title: 'Static sites assigned',
            sites: customerPortal.staticSites.map(site => ({
              siteId: site.id,
              siteName: site.siteName,
              siteReferenceNumber: site.siteReferenceNumber,
              address: site.address,
              status: site.status
            })),
            totalCount: customerPortal.staticSites.length,
            activeCount: customerPortal.staticSites.filter(site => site.status === 'Active').length
          },
          patrolSites: {
            title: 'Patrol sites assigned',
            sites: customerPortal.patrolSites.map(site => ({
              siteId: site.id,
              siteName: site.siteName,
              siteReferenceNumber: site.siteReferenceNumber,
              address: site.address,
              status: site.status
            })),
            totalCount: customerPortal.patrolSites.length,
            activeCount: customerPortal.patrolSites.filter(site => site.status === 'Active').length
          },
          reports: {
            defaultReports: customerPortal.defaultReports || [],
            specificIncidentReports: customerPortal.specificIncidentReports || [],
            frequency: customerPortal.frequency || 'Daily'
          }
        }
      });

    } catch (error) {
      console.error('Get customer website data error:', error);
      return res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }

  static async getCustomerStaticSites(req, res) {
    try {
      const { customerName } = req.params;
      
      console.log('Searching for customerName:', customerName); // Debug log
      
      const customerPortal = await CustomerPortal.findOne({ customerName })
        .populate('staticSites', 'siteName id siteReferenceNumber address status');
        
      console.log('Found customerPortal:', customerPortal); // Debug log
        
      if (!customerPortal) {
        return res.status(404).json({ 
          message: 'Customer portal not found',
          debug: {
            searchedCustomerName: customerName,
            availableCustomers: await CustomerPortal.find({}, 'customerName firstName lastName email'),
            note: 'Existing records may not have customerName field. Need to migrate data.'
          }
        });
      }
      
      return res.status(200).json({
        message: 'Customer static sites fetched successfully',
        data: {
          customerName: customerPortal.customerName,
          title: 'Static sites assigned',
          sites: customerPortal.staticSites.map(site => ({
            siteId: site.id,
            siteName: site.siteName,
            siteReferenceNumber: site.siteReferenceNumber,
            address: site.address,
            status: site.status
          })),
          totalCount: customerPortal.staticSites.length,
          activeCount: customerPortal.staticSites.filter(site => site.status === 'Active').length
        }
      });

    } catch (error) {
      console.error('Get customer static sites error:', error);
      return res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }

  static async getCustomerPatrolSites(req, res) {
    try {
      const { customerName } = req.params;
      
      console.log('Searching for customerName:', customerName); // Debug log
      
      const customerPortal = await CustomerPortal.findOne({ customerName })
        .populate('patrolSites', 'siteName id siteReferenceNumber address status');
        
      console.log('Found customerPortal:', customerPortal); // Debug log
        
      if (!customerPortal) {
        return res.status(404).json({ 
          message: 'Customer portal not found',
          debug: {
            searchedCustomerName: customerName,
            availableCustomers: await CustomerPortal.find({}, 'customerName firstName lastName email'),
            note: 'Existing records may not have customerName field. Need to migrate data.'
          }
        });
      }
      
      return res.status(200).json({
        message: 'Customer patrol sites fetched successfully',
        data: {
          customerName: customerPortal.customerName,
          title: 'Patrol sites assigned',
          sites: customerPortal.patrolSites.map(site => ({
            siteId: site.id,
            siteName: site.siteName,
            siteReferenceNumber: site.siteReferenceNumber,
            address: site.address,
            status: site.status
          })),
          totalCount: customerPortal.patrolSites.length,
          activeCount: customerPortal.patrolSites.filter(site => site.status === 'Active').length
        }
      });

    } catch (error) {
      console.error('Get customer patrol sites error:', error);
      return res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }

  static async getAllCustomerPortals(req, res) {
    try {
      const status = req.query.status;
      let filter = {};
      
      if (status) {
        filter.status = status;
      }

      const customerPortals = await CustomerPortal.find(filter)
        .populate('staticSites', 'siteName id status')
        .populate('patrolSites', 'siteName id status')
        .sort({ createdAt: -1 });
        
      const websiteData = customerPortals.map(portal => ({
        customerName: portal.customerName,
        firstName: portal.firstName,
        lastName: portal.lastName,
        email: portal.email,
        portalId: `PORTAL-${portal.customerName.replace(/\s+/g, '').toUpperCase()}`,
        staticSitesCount: portal.staticSites.length,
        patrolSitesCount: portal.patrolSites.length,
        totalSites: portal.staticSites.length + portal.patrolSites.length,
        frequency: portal.frequency || 'Daily'
      }));
        
      return res.status(200).json({
        message: 'All customer portals fetched successfully',
        count: websiteData.length,
        data: websiteData
      });

    } catch (error) {
      console.error('Get all customer portals error:', error);
      return res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }

  static async getCustomerPortalInfo(req, res) {
    try {
      const { customerName } = req.params;
      
      const customerPortal = await CustomerPortal.findOne({ customerName });
        
      if (!customerPortal) {
        return res.status(404).json({ message: 'Customer portal not found' });
      }
      
      const portalId = `PORTAL-${customerName.replace(/\s+/g, '').toUpperCase()}`;
      
      return res.status(200).json({
        message: 'Customer portal info fetched successfully',
        data: {
          customerName: customerPortal.customerName,
          firstName: customerPortal.firstName,
          lastName: customerPortal.lastName,
          email: customerPortal.email,
          portalId: portalId,
          staticSitesCount: customerPortal.staticSites.length,
          patrolSitesCount: customerPortal.patrolSites.length,
          totalSites: customerPortal.staticSites.length + customerPortal.patrolSites.length,
          frequency: customerPortal.frequency || 'Daily',
          defaultReports: customerPortal.defaultReports || [],
          specificIncidentReports: customerPortal.specificIncidentReports || []
        }
      });

    } catch (error) {
      console.error('Get customer portal info error:', error);
      return res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
}

module.exports = CustomerWebsiteController;
