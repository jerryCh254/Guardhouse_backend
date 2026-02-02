const checkPoint = require('../../models/site/checkPointModel');
const generateQR = require('../../utils/qrGenaerator');

class CheckPointController {
static async createCheckpoint (req, res){
  const { name } = req.body;

  const code = "CHK-" + Date.now(); 

  const checkpoint = await checkPoint.create({
    name,
    code
  });

  const qrImage = await generateQR(code);

  res.json({
    success: true,
    checkpoint,
    qrImage
  });
};

}
module.exports = CheckPointController;