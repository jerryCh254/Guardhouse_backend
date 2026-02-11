const mongoose = require('mongoose');

const checkPointSchema = new mongoose.Schema({
   checkPointModel:{
    type:String,
   },
   siteId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Sites"
   },
   code:{
    type:String,
   },
   type:{
    type:String,
    enum:["qrCode"],
   },
   qrImage:{
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
            type: Number,
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
        type: Number,
            default: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
    },
})

checkPointSchema.index({ 'location.coordinates': '2dsphere' });
checkPointSchema.index({ 'geofence.center': '2dsphere' });

module.exports = mongoose.model("checkPoint",checkPointSchema);