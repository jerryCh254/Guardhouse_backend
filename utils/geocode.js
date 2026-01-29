const axios = require('axios');

const getLatlongFomAddress = async (address)=>{
    try{
        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params:{
                    q:address,
                    format:"json",
                    limit:1,
                },
                headers:{
                    "User-Agent":"GuardhouseBackend"
                }
            }
        );
        if(!response.data ||response.data.lenght == 0){
            return null;
        }
        return {
        latitude :response.data[0].lat,
        longitude:response.data[0].lon,};
    }
    catch(error){
        console.error("Geocoding Error:", error.message);
    return null;
    }
}
module.exports = getLatlongFomAddress;