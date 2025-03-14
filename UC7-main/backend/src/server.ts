import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import router from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.use('/data', express.static(path.join(__dirname, 'data')));

// app.get('/vinhos', (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, 'data', 'vinhos.json'));
//   });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        'status': 'Erro',
        'message': 'Erro interno do Sistema'
    })
})

app.listen(3333, () => console.log('Servidor On Line'));