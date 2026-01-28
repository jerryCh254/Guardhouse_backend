const Customer = require('../Models/customerModel');
const customerSchema = require('../dto/customer.dto')

exports.createCustomer = async(req,res)=>{
      try{
        const {error,value} = customerSchema.validate(req.body);
        if(error){
            return res.status(400).json({messaage:"Feilds does't match",error})
        }

        const {customerName,status} = req.body;
        const existingCustomer = await Customer.findOne({customerName});
        if(existingCustomer){
            return res.status(401).json({message:"Customer already registered"});
        }
        const newCustomer = await Customer.create(value)
        
        return res.status(201).json({
            message:"Customer is created sucessfully",
            data:newCustomer,
            status:newCustomer.req
        })
    }
    catch(err){
        console.error("Server error:", err);
    res.status(500).json({ message: "Server error ", error: err.message });
    }
}
//Get all Customer 
exports.getAllCustomers = async (req, res) => {
    try {
        const status = req.params.status;         

        let filter = {};
        if (status) {
            filter.status = status; 
        }

        const customers = await Customer.find(filter);        

        return res.status(200).json({
            message: "Successfully fetched companies",
            count: customers.length,
            customers
        });
    } catch (error) {
        console.error("Get companies error:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
exports.updateCustomer = async(req,res)=>{
   try{
        const updateCustomers = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,{new:true}
        )
        res.json(updateCustomers);
    }catch(err){
   res.status(500).json({message:err.message});
    }
};
