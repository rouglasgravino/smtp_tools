# SMTP Test Tool

[![Status](https://img.shields.io/badge/status-ativo-success.svg)](https://smtp.rouglas.com/)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-black.svg)](https://vercel.com)
[![Tecnologia](https://img.shields.io/badge/tecnologia-Node.js-green.svg)](https://nodejs.org/)

Uma ferramenta online, simples e poderosa, para testar e validar configurações de servidor SMTP de forma rápida e segura. Permite verificar credenciais, portas, segurança e enviar e-mails de teste para garantir que tudo está funcionando corretamente.

**Visite a ferramenta online:** [**smtp.rouglas.com**](https://smtp.rouglas.com/) *(Nota: Este é um exemplo de URL; substitua pelo seu link final da Vercel, se desejar.)*

---

### Principais Funcionalidades

* **Teste de Conexão Real:** Valida as credenciais (usuário e senha), servidor, porta e protocolo de segurança (STARTTLS, SSL/TLS) com uma conexão SMTP real.
* **Envio de E-mail de Teste:** Opção para enviar um e-mail de teste formatado para um destinatário de sua escolha para confirmar o fluxo de envio.
* **Predefinições de Provedores:** Configurações automáticas para provedores populares como Google/Gmail e Microsoft/Outlook, além de um modo "Customizado" para limpar os campos.
* **Interface Multilíngue:** Suporte para Português, Inglês, Espanhol e Italiano, com detecção automática do idioma do navegador do usuário.
* **Proteção Anti-Bot:** Integrado com o Google reCAPTCHA v3 para proteger o backend contra abuso e requisições automatizadas de forma invisível para o usuário.
* **Análise de Uso:** Integrado com o Microsoft Clarity para análise de comportamento e otimização da experiência do usuário.

### Como o Projeto Funciona

A aplicação é dividida em duas partes principais que se comunicam através de uma API: o **Frontend** (o que o usuário vê e interage no navegador) e o **Backend** (o servidor que executa a lógica segura na nuvem).

#### 1. Frontend

O frontend é uma **Single-Page Application (SPA)** construída com HTML, CSS puro e JavaScript moderno (vanilla JS), sem a necessidade de frameworks. Ele é o responsável por toda a interface e experiência do usuário.

* **Fluxo de Interação:**
    1.  O usuário preenche os dados do formulário na página.
    2.  O JavaScript valida se todos os campos estão preenchidos.
    3.  Ao clicar em "Testar Conexão", o script do **Google reCAPTCHA v3** é acionado e gera um "token" invisível que prova que a interação é provavelmente humana.
    4.  O JavaScript então envia todos os dados do formulário (incluindo o token do reCAPTCHA e o idioma selecionado) para o backend através de uma requisição `fetch`.
    5.  Por fim, ele aguarda a resposta do backend (sucesso ou erro) e a exibe de forma amigável na tela.

#### 2. Backend

O backend é uma **Serverless Function** construída com **Node.js** e hospedada na Vercel. Ele é o "motor" da aplicação, responsável por executar as tarefas seguras que um navegador não pode fazer.

* **Fluxo de Execução:**
    1.  A API, localizada em `/api/server.js`, recebe a requisição do frontend.
    2.  Primeiramente, ela pega o token do reCAPTCHA e o envia para os servidores do Google para verificação. Se o Google responder que a requisição é suspeita (score baixo), o backend bloqueia a ação e retorna uma mensagem de erro.
    3.  Se a verificação anti-bot for bem-sucedida, o backend usa a biblioteca **Nodemailer** para criar uma conexão SMTP real com o servidor de e-mail do usuário, usando as credenciais fornecidas.
    4.  O Nodemailer tenta se autenticar. Se as credenciais estiverem incorretas, o servidor de e-mail retorna um erro, que o backend captura e envia de volta ao frontend.
    5.  Se a autenticação for bem-sucedida e o usuário tiver marcado a opção de envio, o Nodemailer envia o e-mail de teste.
    6.  Finalmente, o backend retorna uma mensagem de sucesso (traduzida para o idioma que o usuário enviou) para o frontend.

### Tecnologias Utilizadas

* **Frontend:**
    * HTML5
    * CSS3
    * JavaScript (ES6+)

* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/pt-br/): Para criar o servidor e as rotas da API.
    * [Nodemailer](https://nodemailer.com/): Para a conexão SMTP e envio de e-mails.
    * [Axios](https://axios-http.com/): Para se comunicar com a API do Google reCAPTCHA.
    * [CORS](https://expressjs.com/en/resources/middleware/cors.html): Para permitir a comunicação entre o frontend e o backend.

* **Deploy & Infraestrutura:**
    * [Vercel](https://vercel.com): Para o deploy contínuo (CI/CD) e hospedagem do frontend e da serverless function do backend.
    * [GitHub](https://github.com): Para o controle de versão do código.

* **Serviços de Terceiros:**
    * [Google reCAPTCHA v3](https://www.google.com/recaptcha/about/): Para proteção anti-bot.
    * [Microsoft Clarity](https://clarity.microsoft.com/): Para análise de comportamento do usuário.

### Estrutura do Projeto

O projeto está organizado da seguinte forma para facilitar o deploy na Vercel:

```
/
├── api/
│   └── server.js        # O código do backend (Serverless Function)
├── icon/
│   ├── br.svg           # Ícones das bandeiras, editar, etc.
│   └── ...
├── .gitignore           # Ignora a pasta node_modules do Git
├── index.html           # Arquivo principal com HTML, CSS e JS do frontend
├── package.json         # Lista de dependências e scripts do backend
├── vercel.json          # Configurações de roteamento para a Vercel
└── ...                  # Outros arquivos como logo.svg, sitemap.xml
```

### Autor

Um projeto de **Rouglas** - [rouglas.com](https://rouglas.com)