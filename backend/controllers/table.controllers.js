const Table = require('../models/table.model')
const Order = require('../models/order.model'); 
const Counter = require('../models/counter'); // Model for counters collection

const getNextTableNo = async () => {
  const counter = await Counter.findOneAndUpdate(
    { _id: 'table_count' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true } // Upsert creates it if it doesn't exist
  );
  return counter.sequence_value;
};

const addTable = async (req, res) => {
    try {
        const nextTableNo = await getNextTableNo();
        console.log(req.body); // Check what data is being received
        const table = new Table({qrcode:req.body.qrcode,table_no:nextTableNo});
        await table.save();
        res.status(201).json(table);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
  };
  

const updateTable = async(req,res)=>{
    try {
        const {id} = req.params;
        const table =await Table.findByIdAndUpdate(id,req.body,{ new: true });
        if(!table){
            res.status(404).json('404 File not found')
        }
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json(message=error.message)
    }
}

const viewTable = async(req,res)=>{
    try {
        const {id} = req.params;
        const table = await Table.findById(id)
        if(!table){
            res.status(404).json('404 File not found')
        }
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json(message=error.message)
    }
}

const viewTables = async(req,res)=>{
    try {
        const table = await Table.find({}).populate({
            path: 'currentOrder',  // This references the Order model
            populate: { path: 'products.productId', select: 'name price' } // Optional: Populate product details too
        });
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json(message=error.message)
    }
}

const deleteTable = async(req,res)=>{
    try{
        const{id} = req.params;
        const table = await Table.findByIdAndDelete(id)
        if(!table){
            res.status(404).json('404 File not found')
        }
        res.status(200).json('Table Deleted')
    }catch(error){
        res.status(500).json(message=error.message)
    }
}

module.exports ={
    addTable,
    updateTable,
    viewTable,
    viewTables,
    deleteTable
}