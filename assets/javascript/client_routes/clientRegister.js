document.addEventListener("DOMContentLoaded", () => {
    // Botão de criação de cliente
    const createClientButton = document.querySelector("#createClientButton");
    if (createClientButton) {
        createClientButton.addEventListener("click", (event) => {
            event.preventDefault();
            
            // Captura os valores do formulário
            const name = document.getElementById("nameField").value.trim();
            const email = document.getElementById("emailField").value.trim();
            const password = document.getElementById("passwordField").value.trim();
            const confirmPassword = document.getElementById("confirmPasswordField").value.trim();
            const phone = document.getElementById("phoneField").value.trim();
            const cpf = document.getElementById("cpfField").value.trim();
            const birthday = document.getElementById("birthdayField").value.trim();
            const cep = document.getElementById("cepField").value.trim();
            const houseNumber = document.getElementById("houseNumberField").value.trim();
            const ceremonialistEmail = document.getElementById("ceremonialistEmailField").value.trim();

            // Função para exibir mensagens de erro
            const showError = (message) => {
                alert(message);
                throw new Error(message);
            };

            // Validações
            if (!name) showError("O nome é obrigatório.");
            if (!email || !/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email)) showError("Email inválido.");
            if (!password || password.length < 8) showError("A senha deve ter pelo menos 8 caracteres.");
            if (password !== confirmPassword) showError("As senhas não coincidem.");
            if (!cpf || cpf.length !== 11) showError("CPF inválido. Deve conter 11 dígitos.");
            if (!phone || !/^\+?[1-9][0-9]{1,14}$/.test(phone)) showError("Número de telefone inválido.");
            if (!cep || !/^\d{8}$/.test(cep)) showError("CEP inválido. Deve conter exatamente 8 dígitos.");
            if (!houseNumber || isNaN(houseNumber)) showError("O número da residência deve ser válido.");
            if (!ceremonialistEmail) showError("O email do cerimonialista é obrigatório.");

            // Objeto com os dados validados
            const requestData = {
                name: name,
                email: email,
                password: password,
                phone: phone,
                cpf: cpf,
                birthday: birthday,
                cep: cep,
                houseNumber: houseNumber,
                ceremonialistEmail: ceremonialistEmail
            };

            // Envio ao backend
            fetch("http://localhost:8080/client", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        showError(err.message || "Erro ao processar a solicitação.");
                    });
                }
                alert("Cliente cadastrado com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao enviar os dados:", error);
                alert("Erro ao cadastrar o cliente. Por favor, tente novamente.");
            });
        });
    }

});
