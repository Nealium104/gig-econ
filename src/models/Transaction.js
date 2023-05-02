import { mongoose } from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: "Someone was too lazy to add a description",
    },
    amount: {
      type: Number,
      required: true,
    },
  });
  

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)
export default Transaction;