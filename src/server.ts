import express from 'express';
import { checkAvailability } from './scrapper';

export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running'
    });
});

app.post('/execute', async (req, res) => {
    const dates: string[] = req.body.dates as string[];
    const result = await checkAvailability(dates, req.body.city, req.body.guests);
    res.json(result);
});


