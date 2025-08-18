// Espera todo o conteúdo da página carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Dicionário de Traduções ---
    const translations = {
        pt: {
            title: "SMTP Test - Ferramenta de Teste de Conexão",
            description: "Verifique suas configurações de servidor SMTP de forma rápida e fácil.",
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
            checkingButton: "Testando...",
            privacyTooltip: "Suas informações são usadas apenas para este teste e não são salvas.",
            fillAllFields: "Por favor, preencha todos os campos obrigatórios.",
            testingConnection: "Simulando conexão... Por favor, aguarde.",
            successMessage: "Simulação bem-sucedida! Os dados para conexão com {server}:{port} são válidos.",
            successWithEmail: "Simulação bem-sucedida! Em um ambiente real, um e-mail para {destination} teria sido enviado.",
            errorMessage: "Falha na simulação! Verifique os dados e tente novamente.",
        },
        en: {
            // ... (traduções em inglês)
        },
        es: {
            // ... (traduções em espanhol)
        },
        it: {
            // ... (traduções em italiano)
        }
    };

    // --- Seleção de Elementos do DOM ---
    const form = document.getElementById('smtp-form');
    const serverInput = document.getElementById('server');
    const securitySelect = document.getElementById('security');
    const portInput = document.getElementById('port');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const sendEmailCheckbox = document.getElementById('send-email-checkbox');
    const destinationEmailGroup = document.getElementById('destination-email-group');
    const destinationEmailInput = document.getElementById('destination-email');
    const testBtn = document.getElementById('test-btn');
    const resultMessage = document.getElementById('result-message');
    const currentYearSpan = document.getElementById('currentYear');
    const langButtons = document.querySelectorAll('.lang-btn');
    const disclaimerBox = document.getElementById('disclaimer-box');
    const closeDisclaimerBtn = document.getElementById('close-disclaimer-btn');
    const btnGoogle = document.getElementById('btn-google');
    const btnMicrosoft = document.getElementById('btn-microsoft');

    let currentLang = 'pt';

    // --- Funções Principais ---

    function setLanguage(lang) {
        if (!translations[lang] || Object.keys(translations[lang]).length === 0) lang = 'pt';
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
        const langData = translations[lang];

        if(langData.title) document.title = langData.title;
        if(langData.description) document.querySelector('meta[name="description"]').setAttribute('content', langData.description);

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (langData[key]) {
                if (el.placeholder !== undefined) el.placeholder = langData[key];
                else el.textContent = langData[key];
            }
        });
        
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

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
    
    function showResult(message, type) {
        resultMessage.textContent = message;
        resultMessage.className = 'status-message';
        resultMessage.classList.add(`status-${type}`);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            showResult(translations[currentLang].fillAllFields, 'error');
            return;
        }

        const originalButtonText = testBtn.textContent;
        showResult(translations[currentLang].testingConnection, 'testing');
        testBtn.disabled = true;
        testBtn.textContent = translations[currentLang].checkingButton;

        // Simulação de teste
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; // 80% chance de sucesso
            if (isSuccess) {
                let message = sendEmailCheckbox.checked
                    ? translations[currentLang].successWithEmail.replace('{destination}', destinationEmailInput.value) 
                    : translations[currentLang].successMessage.replace('{server}', serverInput.value).replace('{port}', portInput.value);
                showResult(message, 'success');
            } else {
                showResult(translations[currentLang].errorMessage, 'error');
            }
            testBtn.disabled = false;
            testBtn.textContent = originalButtonText;
        }, 2000);
    }

    // --- Configuração Inicial e Event Listeners ---

    if (localStorage.getItem('disclaimerDismissed') === 'true') {
        disclaimerBox.classList.add('hidden');
    }

    closeDisclaimerBtn.addEventListener('click', () => {
        disclaimerBox.classList.add('hidden');
        localStorage.setItem('disclaimerDismissed', 'true');
    });

    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    
    const savedLang = localStorage.getItem('preferredLanguage') || navigator.language.split('-')[0];
    setLanguage(savedLang);

    updatePortBasedOnSecurity();
    toggleDestinationEmail();

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    
    sendEmailCheckbox.addEventListener('change', toggleDestinationEmail);
    securitySelect.addEventListener('change', updatePortBasedOnSecurity);
    
    btnGoogle.addEventListener('click', () => {
        serverInput.value = 'smtp.gmail.com';
        securitySelect.value = 'starttls';
        updatePortBasedOnSecurity();
    });
    
    btnMicrosoft.addEventListener('click', () => {
        serverInput.value = 'smtp.office365.com';
        securitySelect.value = 'starttls';
        updatePortBasedOnSecurity();
    });
    
    form.addEventListener('submit', handleFormSubmit);
});