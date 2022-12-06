import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const vmSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    cpu: {type: Number, required: true},
    ram: {type: Number, required: true},
}, {
    timestamps: true,
});

const VM = mongoose.model('Virtual_Machine', vmSchema);  
export default VM;