const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const tableSchema = new mongoose.Schema({
    table_no:{
        type:Number,
        unique:true, //auto increment or just go with __id 
        index:true,

    },
    qrcode:{
        type:String,
        required:true,
    },
    isOccupied:{
        type:Boolean,
        default:false,
        index:true,

    },
    currentOrder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        default:null
    }
});


//using autoincrement 
tableSchema.plugin(AutoIncrement,{inc_field:'table_no'});

//Creating a model for tableSchema 
const Table = mongoose.model('Table',tableSchema);
module.exports = Table;