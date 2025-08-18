document.addEventListener('DOMContentLoaded', () => {

    // --- Dicionário de Traduções ---
    const translations = {
        pt: {
            title: "SMTP Test - Ferramenta de Teste de Conexão Rápida",
            description: "Verifique suas configurações de servidor SMTP de forma rápida e fácil. Teste conexões, envie e-mails de teste e garanta que seu serviço está funcionando corretamente.",
            disclaimerTitle: "Atenção:",
            disclaimerText: "Esta é uma ferramenta de demonstração de interface (Frontend). Nenhum e-mail real será enviado.",
            subtitle: "Verifique suas configurações de servidor SMTP. Teste conexões para garantir que seu serviço de e-mail está configurado corretamente.",
            labelServer: "Servidor SMTP",
            labelSecurity: "Segurança",
            optionStarttls: "STARTTLS",
            optionSslTls: "SSL/TLS",
            optionNone: "Nenhuma",
            labelPort: "Porta",
            placeholderPort: "Ex: 587",
            labelUser: "Usuário / E-mail",
            labelPassword: "Senha",
            placeholderPassword: "••••••••••••",
            sendTestEmail: "Enviar e-mail de teste",
            labelDestination: "E-mail de Destino",
            placeholderDestination: "para.onde@enviar.com",
            testButton: "Testar Conexão",
            checkingButton: "Verificando...",
            privacyTooltip: "Suas informações são usadas apenas para este teste e não são salvas em nossos servidores.",
            fillAllFields: "Por favor, preencha todos os campos obrigatórios.",
            testingConnection: "Simulando conexão... Por favor, aguarde.",
            successMessage: "Simulação bem-sucedida! Os dados para conexão com {server}:{port} são válidos.",
            successWithEmail: "Simulação bem-sucedida! Em um ambiente real, um e-mail de teste para {destination} teria sido enviado.",
            errorMessage: "Falha na simulação! Verifique as credenciais, porta e se o host permite conexões.",
            emailSubject: "Teste SMTP - smtp.rouglas.com",
            emailBody: "Bom trabalho, Funcionando!\n\nsmtp.rouglas.com\ndivertido e informativo"
        },
        // Adicionar outras traduções aqui (en, es, it)
    };

    // --- Seleção de Elementos ---
    const form = document.getElementById('smtp-form');
    const serverInput = document.getElementById('server');
    const securitySelect = document.getElementById('security');
    const portInput = document.getElementById('port');
    const sendEmailCheckbox = document.getElementById('send-email-checkbox');
    const destinationEmailGroup = document.getElementById('destination-email-group');
    const destinationEmailInput = document.getElementById('destination-email');
    const testBtn = document.getElementById('test-btn');
    const resultMessage = document.getElementById('result-message');
    const currentYearSpan = document.getElementById('currentYear');
    const langButtons = document.querySelectorAll('.lang-btn');
    const disclaimerBox = document.getElementById('disclaimer-box');
    const closeDisclaimerBtn = document.getElementById('close-disclaimer-btn');
    
    let currentLang = 'pt';

    // --- Funções ---
    const setLanguage = (lang) => {
        if (!translations[lang]) lang = 'pt'; // Fallback para PT
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        document.documentElement.lang = lang;
        if(translations[lang].title) document.querySelector('title').textContent = translations[lang].title;
        if(translations[lang].description) document.querySelector('meta[name="description"]').setAttribute('content', translations[lang].description);

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'OPTION') {
                    el.textContent = translations[lang][key];
                } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        
        langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    };

    const toggleDestinationEmail = () => { /* ... (mesma função anterior) ... */ };
    const updatePortBasedOnSecurity = () => { /* ... (mesma função anterior) ... */ };
    function showResult(message, type) { /* ... (mesma função anterior) ... */ }

    // --- Lógica do Aviso Amarelo ---
    if (localStorage.getItem('disclaimerDismissed') === 'true') {
        disclaimerBox.style.display = 'none';
    }

    closeDisclaimerBtn.addEventListener('click', () => {
        disclaimerBox.style.display = 'none';
        localStorage.setItem('disclaimerDismissed', 'true');
    });


    // --- Inicialização ---
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0];
    setLanguage(savedLang || browserLang);
    toggleDestinationEmail();
    updatePortBasedOnSecurity();

    // --- Event Listeners ---
    langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
    sendEmailCheckbox.addEventListener('change', toggleDestinationEmail);
    securitySelect.addEventListener('change', updatePortBasedOnSecurity);
    document.getElementById('btn-google').addEventListener('click', () => { /* ... */ });
    document.getElementById('btn-microsoft').addEventListener('click', () => { /* ... */ });
    form.addEventListener('submit', (event) => { /* ... (mesma função anterior) ... */ });

    // Re-incluindo funções que foram abreviadas para clareza
    function toggleDestinationEmail() {
        if (sendEmailCheckbox.checked) {
            destinationEmailGroup.classList.add('visible');
            destinationEmailInput.required = true;
        } else {
            destinationEmailGroup.classList.remove('visible');
            destinationEmailInput.required = false;
            destinationEmailInput.value = '';
        }
    }
    function updatePortBasedOnSecurity() {
        const security = securitySelect.value;
        if (security === 'ssl') portInput.value = 465;
        else if (security === 'starttls') portInput.value = 587;
        else if (security === 'none') portInput.value = 25;
    }
    document.getElementById('btn-google').addEventListener('click', () => {
        serverInput.value = 'smtp.gmail.com';
        securitySelect.value = 'starttls';
        updatePortBasedOnSecurity();
    });
    document.getElementById('btn-microsoft').addEventListener('click', () => {
        serverInput.value = 'smtp.office365.com';
        securitySelect.value = 'starttls';
        updatePortBasedOnSecurity();
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {
            server: serverInput.value.trim(),
            security: securitySelect.value,
            port: portInput.value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value.trim(),
            sendTestEmail: sendEmailCheckbox.checked,
            destinationEmail: destinationEmailInput.value.trim()
        };
        if (!form.checkValidity()) {
            showResult(translations[currentLang].fillAllFields, 'error');
            return;
        }
        showResult(translations[currentLang].testingConnection, 'testing');
        testBtn.disabled = true;
        testBtn.textContent = translations[currentLang].checkingButton;
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2;
            if (isSuccess) {
                let message = formData.sendTestEmail ? translations[currentLang].successWithEmail.replace('{destination}', formData.destinationEmail) : translations[currentLang].successMessage.replace('{server}', formData.server).replace('{port}', formData.port);
                showResult(message, 'success');
            } else {
                showResult(translations[currentLang].errorMessage, 'error');
            }
            testBtn.disabled = false;
            testBtn.textContent = translations[currentLang].testButton;
        }, 2000);
    });
    function showResult(message, type) {
        resultMessage.textContent = message;
        resultMessage.className = 'status-message';
        resultMessage.classList.add(`status-${type}`);
    }
});