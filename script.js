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
        en: {
            title: "SMTP Test - Quick Connection Test Tool",
            description: "Check your SMTP server settings quickly and easily. Test connections, send test emails, and ensure your service is working correctly.",
            disclaimerTitle: "Attention:",
            disclaimerText: "This is a user interface (Frontend) demonstration tool. No real emails will be sent.",
            subtitle: "Check your SMTP server settings. Test connections to ensure your email service is configured correctly.",
            labelServer: "SMTP Server",
            labelSecurity: "Security",
            optionStarttls: "STARTTLS",
            optionSslTls: "SSL/TLS",
            optionNone: "None",
            labelPort: "Port",
            placeholderPort: "Ex: 587",
            labelUser: "User / Email",
            labelPassword: "Password",
            placeholderPassword: "••••••••••••",
            sendTestEmail: "Send test email",
            labelDestination: "Destination Email",
            placeholderDestination: "to.where@send.com",
            testButton: "Test Connection",
            checkingButton: "Checking...",
            privacyTooltip: "Your information is used only for this test and is not saved on our servers.",
            fillAllFields: "Please fill in all required fields.",
            testingConnection: "Simulating connection... Please wait.",
            successMessage: "Simulation successful! The connection data for {server}:{port} is valid.",
            successWithEmail: "Simulation successful! In a real environment, a test email to {destination} would have been sent.",
            errorMessage: "Simulation failed! Check credentials, port, and if the host allows connections.",
            emailSubject: "SMTP Test - smtp.rouglas.com",
            emailBody: "Good job, it's working!\n\nsmtp.rouglas.com\nfun and informative"
        },
        es: {
            title: "Prueba SMTP - Herramienta Rápida de Prueba de Conexión",
            description: "Verifique la configuración de su servidor SMTP de forma rápida y sencilla. Pruebe conexiones, envíe correos de prueba y asegúrese de que su servicio funcione correctamente.",
            disclaimerTitle: "Atención:",
            disclaimerText: "Esta es una herramienta de demostración de interfaz (Frontend). No se enviarán correos electrónicos reales.",
            subtitle: "Verifique la configuración de su servidor SMTP. Pruebe las conexiones para asegurarse de que su servicio de correo electrónico esté configurado correctamente.",
            labelServer: "Servidor SMTP",
            labelSecurity: "Seguridad",
            optionStarttls: "STARTTLS",
            optionSslTls: "SSL/TLS",
            optionNone: "Ninguna",
            labelPort: "Puerto",
            placeholderPort: "Ej: 587",
            labelUser: "Usuario / Correo electrónico",
            labelPassword: "Contraseña",
            placeholderPassword: "••••••••••••",
            sendTestEmail: "Enviar correo de prueba",
            labelDestination: "Correo de Destino",
            placeholderDestination: "a.donde@enviar.com",
            testButton: "Probar Conexión",
            checkingButton: "Verificando...",
            privacyTooltip: "Su información se utiliza solo para esta prueba y no se guarda en nuestros servidores.",
            fillAllFields: "Por favor, complete todos los campos obligatorios.",
            testingConnection: "Simulando conexión... Por favor, espere.",
            successMessage: "¡Simulación exitosa! Los datos de conexión para {server}:{port} son válidos.",
            successWithEmail: "¡Simulación exitosa! En un entorno real, se habría enviado un correo de prueba a {destination}.",
            errorMessage: "¡Falló la simulación! Verifique las credenciales, el puerto y si el host permite conexiones.",
            emailSubject: "Prueba SMTP - smtp.rouglas.com",
            emailBody: "¡Buen trabajo, está funcionando!\n\nsmtp.rouglas.com\ndivertido e informativo"
        },
        it: {
            title: "Test SMTP - Strumento Rapido per Test di Connessione",
            description: "Controlla le impostazioni del tuo server SMTP in modo rapido e semplice. Testa le connessioni, invia email di prova e assicurati che il tuo servizio funzioni correttamente.",
            disclaimerTitle: "Attenzione:",
            disclaimerText: "Questo è uno strumento dimostrativo dell'interfaccia utente (Frontend). Nessuna email reale verrà inviata.",
            subtitle: "Controlla le impostazioni del tuo server SMTP. Testa le connessioni per assicurarti che il tuo servizio di posta elettronica sia configurato correttamente.",
            labelServer: "Server SMTP",
            labelSecurity: "Sicurezza",
            optionStarttls: "STARTTLS",
            optionSslTls: "SSL/TLS",
            optionNone: "Nessuna",
            labelPort: "Porta",
            placeholderPort: "Es: 587",
            labelUser: "Utente / Email",
            labelPassword: "Password",
            placeholderPassword: "••••••••••••",
            sendTestEmail: "Invia email di prova",
            labelDestination: "Email di Destinazione",
            placeholderDestination: "a.dove@inviare.com",
            testButton: "Testa Connessione",
            checkingButton: "Verifica in corso...",
            privacyTooltip: "Le tue informazioni vengono utilizzate solo per questo test e non vengono salvate sui nostri server.",
            fillAllFields: "Per favore, compila tutti i campi obbligatori.",
            testingConnection: "Simulazione della connessione... Attendere prego.",
            successMessage: "Simulazione riuscita! I dati di connessione per {server}:{port} sono validi.",
            successWithEmail: "Simulazione riuscita! In un ambiente reale, sarebbe stata inviata un'e-mail di prova a {destination}.",
            errorMessage: "Simulazione fallita! Controlla le credenziali, la porta e se l'host consente connessioni.",
            emailSubject: "Test SMTP - smtp.rouglas.com",
            emailBody: "Ottimo lavoro, funziona!\n\nsmtp.rouglas.com\ndivertente e informativo"
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
    
    let currentLang = 'pt';

    // --- Funções ---
    const setLanguage = (lang) => {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        document.documentElement.lang = lang;
        document.querySelector('title').textContent = translations[lang].title;
        document.querySelector('meta[name="description"]').setAttribute('content', translations[lang].description);

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (translations[lang][key]) {
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

    const toggleDestinationEmail = () => {
        if (sendEmailCheckbox.checked) {
            destinationEmailGroup.classList.add('visible');
            destinationEmailInput.required = true;
        } else {
            destinationEmailGroup.classList.remove('visible');
            destinationEmailInput.required = false;
            destinationEmailInput.value = '';
        }
    };

    const updatePortBasedOnSecurity = () => {
        const security = securitySelect.value;
        if (security === 'ssl') {
            portInput.value = 465;
        } else if (security === 'starttls') {
            portInput.value = 587;
        } else if (security === 'none') {
            portInput.value = 25;
        }
    };
    
    function showResult(message, type) {
        resultMessage.textContent = message;
        resultMessage.className = 'status-message';
        resultMessage.classList.add(`status-${type}`);
    }

    // --- Inicialização ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0];
    setLanguage(savedLang || (translations[browserLang] ? browserLang : 'pt'));
    toggleDestinationEmail();
    updatePortBasedOnSecurity(); // Define a porta inicial com base no valor padrão (STARTTLS)

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
        
        const isFormValid = form.checkValidity();
        if (!isFormValid) {
            showResult(translations[currentLang].fillAllFields, 'error');
            return;
        }

        showResult(translations[currentLang].testingConnection, 'testing');
        testBtn.disabled = true;
        testBtn.textContent = translations[currentLang].checkingButton;

        console.log("======================================================");
        console.log("INÍCIO DA SIMULAÇÃO DE ENVIO PARA O BACKEND");
        console.log("Estes são os dados que seriam enviados para um servidor real:");
        console.log(formData);
        console.log("======================================================");
        
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; // 80% chance de sucesso

            if (isSuccess) {
                let message;
                if (formData.sendTestEmail) {
                    message = translations[currentLang].successWithEmail.replace('{destination}', formData.destinationEmail);
                } else {
                    message = translations[currentLang].successMessage.replace('{server}', formData.server).replace('{port}', formData.port);
                }
                showResult(message, 'success');
            } else {
                showResult(translations[currentLang].errorMessage, 'error');
            }
            
            testBtn.disabled = false;
            testBtn.textContent = translations[currentLang].testButton;
        }, 2000);
    });
});