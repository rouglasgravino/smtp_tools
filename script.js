document.addEventListener('DOMContentLoaded', () => {

    // --- Dicionário de Traduções ---
    const translations = {
        pt: {
            // ... (traduções completas)
            successMessage: "Sucesso! A conexão com {server}:{port} foi estabelecida.",
            successWithEmail: "Sucesso! E-mail de teste enviado para {destination}.",
            errorMessage: "Falha na conexão: {error}",
            testingConnection: "Testando conexão real...",
        },
        en: {
             // ... (traduções completas)
            successMessage: "Success! Connection to {server}:{port} was established.",
            successWithEmail: "Success! Test email sent to {destination}.",
            errorMessage: "Connection failed: {error}",
            testingConnection: "Testing real connection...",
        },
        // ... (outras linguagens)
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
    
    let currentLang = 'pt';

    // --- Funções ---
    const setLanguage = (lang) => { /* ... (código da função setLanguage sem alterações) ... */ };
    const toggleDestinationEmail = () => { /* ... (código da função toggleDestinationEmail sem alterações) ... */ };
    const updatePortBasedOnSecurity = () => { /* ... (código da função updatePortBasedOnSecurity sem alterações) ... */ };
    function showResult(message, type) { /* ... (código da função showResult sem alterações) ... */ }

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
    
    // --- LÓGICA DE SUBMISSÃO REAL (SEM SIMULAÇÃO) ---
    form.addEventListener('submit', async (event) => {
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

        try {
            // Chamada REAL para o backend na Vercel
            const response = await fetch('/test-smtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                showResult(result.message, 'success');
            } else {
                // Mostra o erro real retornado pelo backend
                const errorMessage = translations[currentLang].errorMessage.replace('{error}', result.message);
                showResult(errorMessage, 'error');
            }

        } catch (error) {
            // Erro de rede (ex: backend fora do ar)
            const networkError = translations[currentLang].errorMessage.replace('{error}', 'Não foi possível conectar ao servidor de teste.');
            showResult(networkError, 'error');
        }

        testBtn.disabled = false;
        testBtn.textContent = translations[currentLang].testButton;
    });

    // (Cole aqui as funções completas que foram abreviadas acima, como setLanguage, etc., da resposta anterior)
});