const Site = require('../../Models/site/siteModel');
const siteSchema = require('../../dto/site/site.dto');
const getLatLongFromAddress = require('../../utils/geocode');
const { nanoid } = require('nanoid'); 

exports.createSite = async(req,res)=>{
      try{
        const {error,value} = siteSchema.validate(req.body);
        if(error){
            return res.status(400).json({messaage:"Feilds does't match",error})
        }
        const autoId = "123" + nanoid(5).toUpperCase();
        const { siteName, address, state, zipCode, country } = req.body;
        const existingSite = await Site.findOne({siteName});
        if(existingSite){
            return res.status(401).json({message:"Site already Created"});
        }
        const fullAddress = `${address}, ${state}, ${zipCode}, ${country}`;
        const location = await getLatLongFromAddress(fullAddress);

        const newSite = await Site.create({
            ...value,
            id: autoId,
            latitude: location ? location.latitude : "",
            longitude: location ? location.longitude : ""
        });
        
        return res.status(201).json({
            message:"Site is created sucessfully",
            data:newSite,
        })
    }
    catch(err){
        console.error("Server error:", err);
    res.status(500).json({ message: "Server error ", error: err.message });
    }
}