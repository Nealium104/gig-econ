import dbConnect from '../../database';
import Transaction from '../../models/Transaction';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    // Let's create a new transaction, because who doesn't like making money?
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } else if (req.method === 'GET') {
    // Let's get all transactions for the user. It's like a treasure hunt!
    const transactions = await Transaction.find({ userId: req.query.userId });
    res.status(200).json(transactions);
  } else if (req.method === 'PUT') {
    const transactions = await Transaction.findByIdAndUpdate(req.body._id, req.body, { new: true});
    res.status(200).json(transaction)
  } else if (req.method === 'DELETE') {
    const transactions = await Transaction.findByIdAndDelete(req.body._id);
    res.status(204).json({message:'Transaction deleted'})
  } else {
    // Well, this is awkward. We only support GET and POST for now.
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}