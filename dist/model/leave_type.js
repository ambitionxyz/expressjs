const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const leaveTypeSchema = new mongoose.Schema({
    type_name: {
        type: String,
        require: true
    },
    day_off_minus_day: {
        type: Number,
        require: true
    },
    type: {
        type: Boolean,
    }

}, {timestamps: true})

leaveTypeSchema.plugin(mongoose_delete, {overrideMethods: 'all'})

const Leave_Type = mongoose.model('leave_type', leaveTypeSchema);


module.exports = Leave_Type;
