document.addEventListener('DOMContentLoaded', () => {

    // --- Dicionário de Traduções ---
    const translations = {
        pt: {
            successMessage: "Sucesso! A conexão com {server}:{port} foi estabelecida.",
            successWithEmail: "Sucesso! E-mail de teste enviado para {destination}.",
            errorMessage: "Falha na conexão: {error}",
            testingConnection: "Testando conexão real...",
            checkingButton: "Testando...",
            subtitle: "Verifique suas configurações de servidor SMTP. Teste conexões para garantir que seu serviço de e-mail está configurado corretamente.",
            labelServer: "Servidor SMTP", labelSecurity: "Segurança", optionStarttls: "STARTTLS", optionSslTls: "SSL/TLS", optionNone: "Nenhuma",
            labelPort: "Porta", placeholderPort: "Ex: 587", labelUser: "Usuário / E-mail", labelPassword: "Senha", placeholderPassword: "••••••••••••",
            sendTestEmail: "Enviar e-mail de teste", labelDestination: "E-mail de Destino", placeholderDestination: "para.onde@enviar.com",
            testButton: "Testar Conexão", privacyTooltip: "Suas informações não são salvas.", fillAllFields: "Por favor, preencha todos os campos.",
        },
        en: {
            successMessage: "Success! Connection to {server}:{port} was established.",
            successWithEmail: "Success! Test email sent to {destination}.",
            errorMessage: "Connection failed: {error}",
            testingConnection: "Testing real connection...",
            checkingButton: "Testing...",
            subtitle: "Check your SMTP server settings. Test connections to ensure your email service is configured correctly.",
            labelServer: "SMTP Server", labelSecurity: "Security", optionStarttls: "STARTTLS", optionSslTls: "SSL/TLS", optionNone: "None",
            labelPort: "Port", placeholderPort: "Ex: 587", labelUser: "User / Email", labelPassword: "Password", placeholderPassword: "••••••••••••",
            sendTestEmail: "Send test email", labelDestination: "Destination Email", placeholderDestination: "to.where@send.com",
            testButton: "Test Connection", privacyTooltip: "Your information is not saved.", fillAllFields: "Please fill in all fields.",
        }
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
    const btnGoogle = document.getElementById('btn-google');
    const btnMicrosoft = document.getElementById('btn-microsoft');
    let currentLang = 'pt';

    // --- Funções ---
    function setLanguage(lang) {
        if (!translations[lang] || Object.keys(translations[lang]).length === 0) lang = 'pt';
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
        const langData = translations[lang];
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (langData[key]) {
                if (el.placeholder !== undefined) el.placeholder = langData[key];
                else el.textContent = langData[key];
            }
        });
        langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    }

    function toggleDestinationEmail() {
        if (sendEmailCheckbox.checked) {
            destinationEmailGroup.classList.add('visible');
            destinationEmailInput.required = true;
        } else {
            destinationEmailGroup.classList.remove('visible');
            destinationEmailInput.required = false;
        }
    }

    function updatePortBasedOnSecurity() {
        const security = securitySelect.value;
        if (security === 'ssl') portInput.value = 465;
        else if (security === 'starttls') portInput.value = 587;
        else if (security === 'none') portInput.value = 25;
    }

    function showResult(message, type) {
        resultMessage.textContent = message;
        resultMessage.className = 'status-message';
        resultMessage.classList.add(`status-${type}`);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            showResult(translations[currentLang].fillAllFields, 'error');
            return;
        }
        const originalButtonText = translations[currentLang].testButton;
        showResult(translations[currentLang].testingConnection, 'testing');
        testBtn.disabled = true;
        testBtn.textContent = translations[currentLang].checkingButton;

        const formData = {
            server: serverInput.value.trim(), security: securitySelect.value, port: portInput.value.trim(),
            email: document.getElementById('email').value.trim(), password: document.getElementById('password').value.trim(),
            sendTestEmail: sendEmailCheckbox.checked, destinationEmail: destinationEmailInput.value.trim()
        };

        try {
            const response = await fetch('/test-smtp', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.success) {
                showResult(result.message, 'success');
            } else {
                showResult(translations[currentLang].errorMessage.replace('{error}', result.message), 'error');
            }
        } catch (error) {
            showResult(translations[currentLang].errorMessage.replace('{error}', 'Não foi possível conectar ao servidor de teste.'), 'error');
        }

        testBtn.disabled = false;
        testBtn.textContent = originalButtonText;
    }

    // --- Inicialização e Event Listeners ---
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    const savedLang = localStorage.getItem('preferredLanguage') || navigator.language.split('-')[0];
    setLanguage(savedLang);
    updatePortBasedOnSecurity();
    toggleDestinationEmail();

    langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
    sendEmailCheckbox.addEventListener('change', toggleDestinationEmail);
    securitySelect.addEventListener('change', updatePortBasedOnSecurity);
    btnGoogle.addEventListener('click', () => {
        serverInput.value = 'smtp.gmail.com'; securitySelect.value = 'starttls'; updatePortBasedOnSecurity();
    });
    btnMicrosoft.addEventListener('click', () => {
        serverInput.value = 'smtp.office365.com'; securitySelect.value = 'starttls'; updatePortBasedOnSecurity();
    });
    form.addEventListener('submit', handleFormSubmit);
});