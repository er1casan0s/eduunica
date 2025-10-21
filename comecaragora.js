    // Máscara para telefone
    document.getElementById('phone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '').slice(0, 11);  //Limita a 11 números
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/^(\d{0,2})/, '($1');
            } else if (value.length <= 6) {
                value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
            } else if (value.length <= 10) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
            e.target.value = value;
        }
    });

            /*// Validação de senha sequencial
            document.getElementById('password').addEventListener('input', function(e) {
                const password = e.target.value;
                if (password.length === 8) {
                    // Verifica se é sequencial (12345678, 87654321, etc.)
                    const isSequential = /^(01234567|12345678|23456789|34567890|45678901|56789012|67890123|78901234|89012345|90123456|98765432|87654321|76543210|65432109|54321098|43210987|32109876|21098765|10987654)$/.test(password);
                    
                    if (isSequential) {
                        e.target.setCustomValidity('A senha não pode ser uma sequência numérica');
                    } else {
                        e.target.setCustomValidity('');
                    }
                }
            });*/

            // Redirecionamento para home.html
            document.getElementById('registrationForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validações adicionais
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                
                if (password !== confirmPassword) {
                    alert('As senhas não coincidem!');
                    return;
                }
                
                // Se todas as validações passarem, redireciona
                alert('Conta criada com sucesso! Redirecionando...');
                window.location.href = 'home.html';
            });

            // Validação de nome completo
            document.getElementById('name').addEventListener('input', function(e) {
                const name = e.target.value.trim();
                const words = name.split(/\s+/).filter(word => word.length > 0);
                
                if (words.length < 2) {
                    e.target.setCustomValidity('Digite pelo menos nome e sobrenome');
                } else {
                    e.target.setCustomValidity('');
                }
            });