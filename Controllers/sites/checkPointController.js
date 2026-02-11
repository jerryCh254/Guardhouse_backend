const checkPoint = require('../../models/site/checkPointModel');
const { generateQR } = require('../../utils/qrGenaerator');

class CheckPointController {
static async createCheckpoint (req, res){
  const { checkPointModel, siteId, type, location, geofence, distanceThreshold } = req.body;

  const code = "CHK-" + Date.now(); 

  const checkpointData = {
    checkPointModel,
    siteId,
    code,
    type,
    location: {
      address: location.address,
      coordinates: {
        lat: location.coordinates.lat,
        lng: location.coordinates.lng
      },
      placeId: location.placeId || null
    }
  };

  if (type === "qrCode") {
    const qrImagePath = await generateQR(code, location);
    checkpointData.qrImage = qrImagePath;
  }

  if (geofence) {
    checkpointData.geofence = {
      center: geofence.center || { lat: 0, lng: 0 },
      radius: geofence.radius || 50,
      enabled: geofence.enabled || false,
      siteName: geofence.siteName || ''
    };
  }

  if (distanceThreshold) {
    checkpointData.distanceThreshold = distanceThreshold;
  }

  const checkpoint = await checkPoint.create(checkpointData);

  res.json({
    success: true,
    message: "Checkpoint created successfully",
    checkpoint,
    qrImagePath: type === "qrCode" ? checkpoint.qrImage : null
  });
}

static async getCheckpointsBySite(req, res) {
  try {
    const { siteId } = req.params;
    const checkpoints = await checkPoint.find({ 
      siteId, 
      isActive: true 
    }).populate('siteId', 'siteName');
    
    res.json({
      success: true,
      checkpoints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static async getAllCheckpoints(req, res) {
  try {
    const checkpoints = await checkPoint.find({ isActive: true });
    res.json({
      success: true,
      checkpoints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static async verifyCheckpoint(req, res) {
  try {
    const { code } = req.params;
    const { userLocation } = req.body;
    
    const checkpoint = await checkPoint.findOne({ code, isActive: true });
    
    if (!checkpoint) {
      return res.status(404).json({
        success: false,
        message: "Checkpoint not found"
      });
    }

    let locationVerified = true;
    let distance = null;

    if (checkpoint.geofence.enabled && userLocation) {
      distance = this.calculateDistance(
        checkpoint.geofence.center.lat,
        checkpoint.geofence.center.lng,
        userLocation.lat,
        userLocation.lng
      );

      locationVerified = distance <= checkpoint.geofence.radius;
    }

    res.json({
      success: true,
      message: locationVerified ? 
        "Checkpoint verified successfully" : 
        "Checkpoint verified but location is outside geofence",
      checkpoint,
      locationVerified,
      distance,
      geofenceRadius: checkpoint.geofence.radius
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static async verifyQRCode(req, res) {
  try {
    const { qrData, userLocation } = req.body;
    
    let parsedQRData;
    try {
      parsedQRData = JSON.parse(qrData);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid QR code format"
      });
    }

    const checkpoint = await checkPoint.findOne({ 
      code: parsedQRData.code, 
      isActive: true 
    });
    
    if (!checkpoint) {
      return res.status(404).json({
        success: false,
        message: "Checkpoint not found"
      });
    }

    let locationVerified = true;
    let distance = null;

    if (parsedQRData.location && userLocation) {
      distance = this.calculateDistance(
        parsedQRData.location.lat,
        parsedQRData.location.lng,
        userLocation.lat,
        userLocation.lng
      );

      if (checkpoint.geofence.enabled) {
        locationVerified = distance <= checkpoint.geofence.radius;
      }
    }

    res.json({
      success: true,
      message: "QR code verified successfully",
      checkpoint,
      qrData: parsedQRData,
      locationVerified,
      distance,
      geofenceRadius: checkpoint.geofence.radius
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static async setGeofence(req, res) {
  try {
    const { checkpointId } = req.params;
    const { 
      center: { lat, lng }, 
      radius, 
      enabled, 
      siteName 
    } = req.body;

    const checkpoint = await checkPoint.findByIdAndUpdate(
      checkpointId,
      {
        geofence: {
          center: { lat, lng },
          radius: radius || 50,
          enabled: enabled || false,
          siteName: siteName || ''
        }
      },
      { new: true }
    );

    if (!checkpoint) {
      return res.status(404).json({
        success: false,
        message: "Checkpoint not found"
      });
    }

    res.json({
      success: true,
      message: "Geofence set successfully",
      checkpoint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static async checkGeofence(req, res) {
  try {
    const { checkpointId } = req.params;
    const { userLat, userLng } = req.query;

    const checkpoint = await checkPoint.findById(checkpointId);
    
    if (!checkpoint) {
      return res.status(404).json({
        success: false,
        message: "Checkpoint not found"
      });
    }

    if (!checkpoint.geofence.enabled) {
      return res.json({
        success: true,
        message: "Geofence not enabled",
        withinGeofence: true
      });
    }

    const distance = this.calculateDistance(
      checkpoint.geofence.center.lat,
      checkpoint.geofence.center.lng,
      parseFloat(userLat),
      parseFloat(userLng)
    );

    const withinGeofence = distance <= checkpoint.geofence.radius;

    res.json({
      success: true,
      withinGeofence,
      distance,
      geofenceRadius: checkpoint.geofence.radius,
      message: withinGeofence ? 
        "User is within geofence" : 
        "User is outside geofence"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static async getGeofenceCheckpoints(req, res) {
  try {
    const checkpoints = await checkPoint.find({ 
      'geofence.enabled': true,
      isActive: true 
    });

    res.json({
      success: true,
      checkpoints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static async updateCheckpointWithGeofence(req, res) {
  try {
    const { checkpointId } = req.params;
    const { 
      checkPointModel,
      location,
      geofence
    } = req.body;

    const updateData = {
      checkPointModel,
      location: {
        address: location.address,
        coordinates: {
          lat: location.coordinates.lat,
          lng: location.coordinates.lng
        },
        placeId: location.placeId || null
      }
    };

    if (geofence) {
      updateData.geofence = {
        center: {
          lat: geofence.center.lat,
          lng: geofence.center.lng
        },
        radius: geofence.radius || 50,
        enabled: geofence.enabled || false,
        siteName: geofence.siteName || ''
      };
    }

    const checkpoint = await checkPoint.findByIdAndUpdate(
      checkpointId,
      updateData,
      { new: true }
    );

    if (!checkpoint) {
      return res.status(404).json({
        success: false,
        message: "Checkpoint not found"
      });
    }

    res.json({
      success: true,
      message: "Checkpoint updated with geofence",
      checkpoint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static async findNearbyCheckpoints(req, res) {
  try {
    const { lat, lng, radius = 1000 } = req.query;
    
    const checkpoints = await checkPoint.find({
      isActive: true,
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    });

    res.json({
      success: true,
      checkpoints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

static calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; 
}

}

module.exports = CheckPointController;