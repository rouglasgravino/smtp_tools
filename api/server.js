// api/server.js - Nosso Backend para a Vercel

// 1. Importar as ferramentas
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// 2. Configurar o servidor Express
const app = express();
app.use(express.json()); // Permite que o servidor entenda dados JSON
app.use(cors()); // Permite que nosso site se comunique com este servidor

// 3. Criar a rota/endpoint para testar a conexão
// Este código será executado quando o frontend chamar o endereço '/test-smtp'
app.post('/test-smtp', async (req, res) => {
    // Pega os dados que o formulário enviou
    const { server, port, security, email, password, sendTestEmail, destinationEmail } = req.body;

    console.log('Recebida requisição para testar:', req.body);

    try {
        // Configura o Nodemailer com os dados do usuário
        const transporter = nodemailer.createTransport({
            host: server,
            port: port,
            secure: security === 'ssl', // `true` se a segurança for SSL (porta 465)
            auth: {
                user: email,
                pass: password,
            },
            tls: {
                rejectUnauthorized: false // Importante para alguns servidores com certificados autoassinados
            }
        });

        // Tenta se conectar e autenticar para verificar as credenciais
        await transporter.verify();

        // Se a verificação funcionou, a conexão é válida
        if (sendTestEmail) {
            // Se o usuário também pediu para enviar um e-mail de teste
            await transporter.sendMail({
                from: email,
                to: destinationEmail,
                subject: 'Teste SMTP - smtp.rouglas.com',
                text: 'Bom trabalho, Funcionando!\n\nsmtp.rouglas.com\ndivertido e informativo'
            });
            console.log('E-mail de teste enviado para:', destinationEmail);
            return res.json({ success: true, message: `Conexão bem-sucedida e e-mail de teste enviado para ${destinationEmail}!` });
        } else {
            return res.json({ success: true, message: `Conexão com ${server}:${port} bem-sucedida!` });
        }

    } catch (error) {
        console.error('Erro na conexão SMTP:', error);
        // Se deu erro, retorna a mensagem de erro para o frontend
        return res.status(500).json({ success: false, message: `Falha na conexão: ${error.message}` });
    }
});

// 4. Exportar o app para a Vercel (ESSENCIAL!)
// Em vez de app.listen(...), nós exportamos para que a Vercel possa gerenciá-lo.
module.exports = app;