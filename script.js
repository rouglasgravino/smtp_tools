// script.js - Atualização

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
    
    const isFormValid = form.checkValidity();
    if (!isFormValid) {
        showResult(translations[currentLang].fillAllFields, 'error');
        return;
    }

    showResult(translations[currentLang].testingConnection.replace('Simulando', 'Testando'), 'testing');
    testBtn.disabled = true;
    testBtn.textContent = translations[currentLang].checkingButton;

    // A MÁGICA ACONTECE AQUI!
    // Trocamos o setTimeout pela chamada real ao nosso backend
    try {
        const response = await fetch('/test-smtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
            showResult(result.message, 'success');
        } else {
            showResult(result.message, 'error');
        }

    } catch (error) {
        showResult(`Erro ao conectar com o servidor local. O backend está rodando? (${error.message})`, 'error');
    }

    testBtn.disabled = false;
    testBtn.textContent = translations[currentLang].testButton;
});