import dbConnect from '../../database';
import Transaction from '../../models/Transaction';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } else if (req.method === 'GET') {
    const transactions = await Transaction.find({ userId: req.query.userId });
    res.status(200).json(transactions);
  } else if (req.method === 'PUT') {
    const transactions = await Transaction.findByIdAndUpdate(req.body._id, req.body, { new: true});
    res.status(200).json(transaction)
  } else if (req.method === 'DELETE') {
    const transactions = await Transaction.findByIdAndDelete(req.body._id);
    res.status(204).json({message:'Transaction deleted'})
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}