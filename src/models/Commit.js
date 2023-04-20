import { Schema, model, models } from "mongoose";

const commitSchema = new Schema({
    date: String,
    amount: {
        type: Number,
        required: true,
    },
})

const Commit = models.Commit || model('Commit', commitSchema)
export default Commit;