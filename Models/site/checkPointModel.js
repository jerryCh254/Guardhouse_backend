const mongoose = require('mongoose');

const checkPointSchema = new mongoose.Schema({
   checkPointModel:{
    type:String,
   },
   siteId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"site"
   },
   code:{
    type:String,
   },
   type:{
    type:String,
    enum:["qrCode","NFC"],
   },
   qrImage:{
    type:String,
   },
   nfcImage:{
    type:String,
   },
 location: {
        address: {
            type: String,
            required: true
        },
        coordinates: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        },
        placeId: {
            type: String
        }
    },
    geofence: {
        center: {
            lat: {
                type: Number,
                default: 0
            },
            lng: {
                type: Number,
                default: 0
            }
        },
        radius: {
            type: Number,  // in meters
            default: 50
        },
        enabled: {
            type: Boolean,
            default: false
        },
        siteName: {
            type: String
        }
    },
        distanceThreshold: {
        type: Number,  // in meters
        default: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type:String,
    },
})
module.exports = mongoose.model("checkPoint",checkPointSchema);