import { NextApiRequest, NextApiResponse } from 'next';
import UserData from '../modal/userData.model';
import { connectToDatabase } from '@/app/api/dbtest/route';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch the form data based on email
    const { email } = req.query;
    try {
      await connectToDatabase();
      const userData = await UserData.findOne({ email });
      
      if (!userData) {
        return res.status(404).json({ error: 'Data not found' });
      }

      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

