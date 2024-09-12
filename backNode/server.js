import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

const prisma = new PrismaClient()

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:4200'
}))


app.post('/usuarios', async (req, res) => {
    
    const { email, name, age } = req.body;

    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ message: 'O email não pode ser vazio ou nulo.' });
    }

    if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ message: 'O email deve terminar com @gmail.com.' });
    }

    try{
        await prisma.user.create({
            data: {
                email: email,
                name: name,
                age: age
                //email: req.body.email,
                //name: req.body.name,
                //age: req.body.age
            }
        });  
        res.status(201).json({ message: 'Usuário criado com sucesso!' })
    } catch (error){
        if (error.code === 'P2002') { 
            res.status(400).json({ message: 'O email já está em uso.' });
        } else {
            console.error('Erro desconhecido:', error);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
})


app.get('/usuarios', async (req, res) => {

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }
    

    res.status(200).json(users)
})

app.get('/usuarios/:id', async (req, res) => {
    const userId = req.params.id; 

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId 
            }
        });

        if (user) {
            res.status(200).json(user); 
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});



app.put('/usuarios/:id', async (req, res) => {
    const { email, name, age } = req.body;

    
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ message: 'O email não pode ser vazio ou nulo.' });
    }
    if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ message: 'O email deve terminar com @gmail.com.' });
    }
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
                NOT: {
                    id: req.params.id
                }
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'O email já está em uso por outro usuário.' });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                email,
                name,
                age
            }
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro desconhecido:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});


app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where : {
            id: req.params.id
        }
    })

    res.status(200).json({message: "Usuário deletado com Sucesso!"})
})

app.listen(3000)