// api/server.js - Backend com verificação reCAPTCHA v3

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios'); // Ferramenta para falar com o Google

const app = express();
app.use(express.json());
app.use(cors());

// Sua Chave Secreta do reCAPTCHA
const RECAPTCHA_SECRET_KEY = '6Ld8T6srAAAAACvQfr0NrlWjeLwvOQ3-bi1-56Cq';

app.post('/test-smtp', async (req, res) => {
    // Pega todos os dados do formulário, incluindo o novo token do reCAPTCHA
    const { server, port, security, email, password, sendTestEmail, destinationEmail, recaptchaToken } = req.body;

    // --- ETAPA DE VERIFICAÇÃO ANTI-BOT ---
    try {
        const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
        
        const response = await axios.post(verificationURL);
        const { success, score } = response.data;

        if (!success || score < 0.5) {
            // Se não for sucesso ou a pontuação for muito baixa, bloqueia como robô
            console.warn('Requisição bloqueada por suspeita de bot. Score:', score);
            return res.status(403).json({ success: false, message: 'Falha na verificação anti-bot. Tente novamente.' });
        }
        
        console.log('Verificação anti-bot bem-sucedida. Score:', score);

    } catch (error) {
        console.error('Erro ao verificar reCAPTCHA:', error);
        return res.status(500).json({ success: false, message: 'Erro no serviço anti-bot.' });
    }
    
    // --- ETAPA DE TESTE SMTP (só executa se o anti-bot passar) ---
    console.log('Iniciando teste SMTP para:', { server, port, email });

    try {
        const transporter = nodemailer.createTransport({
            host: server,
            port: port,
            secure: security === 'ssl',
            auth: {
                user: email,
                pass: password,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.verify();

        if (sendTestEmail) {
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
        return res.status(500).json({ success: false, message: `Falha na conexão: ${error.message}` });
    }
});

module.exports = app;