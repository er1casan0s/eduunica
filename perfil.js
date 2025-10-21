// Senha mockada para demonstração (em um sistema real, isso viria do backend)
    const userPassword = "12345678";

    // Função para alternar modo de edição
    function toggleEdit(section) {
        const form = document.getElementById(section + 'Form');
        const inputs = form.querySelectorAll('input, select');
        const passwordSection = document.getElementById(section + 'PasswordSection');
        
        // Habilita todos os campos para edição
        inputs.forEach(input => {
            if (input.type !== 'password') {
                input.readOnly = false;
                input.disabled = false;
            }
        });
        
        // Mostra a seção de confirmação de senha
        passwordSection.style.display = 'block';
        
        // Esconde o botão de editar
        form.closest('.info-card').querySelector('.edit-btn').style.display = 'none';
    }

    // Função para cancelar edição
    function cancelEdit(section) {
        const form = document.getElementById(section + 'Form');
        const inputs = form.querySelectorAll('input, select');
        const passwordSection = document.getElementById(section + 'PasswordSection');
        
        // Desabilita todos os campos
        inputs.forEach(input => {
            if (input.type !== 'password') {
                input.readOnly = true;
                input.disabled = true;
            } else {
                input.value = ''; // Limpa campos de senha
            }
        });
        
        // Esconde a seção de confirmação de senha
        passwordSection.style.display = 'none';
        
        // Mostra o botão de editar novamente
        form.closest('.info-card').querySelector('.edit-btn').style.display = 'block';
        
        // Limpa mensagens de erro
        const errorElement = document.getElementById(section + 'PasswordError');
        if (errorElement) errorElement.textContent = '';
    }

    // Função para validar senha
    function validatePassword(inputPassword, section) {
        if (inputPassword !== userPassword) {
            const errorElement = document.getElementById(section + 'PasswordError');
            errorElement.textContent = 'Senha incorreta. Tente novamente.';
            return false;
        }
        return true;
    }

    // Upload de foto de perfil
    document.getElementById('photoUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profileImage').src = e.target.result;
                // Aqui você enviaria a imagem para o servidor
                alert('Foto alterada com sucesso!');
            }
            reader.readAsDataURL(file);
        }
    });

    // Clique na foto também abre o seletor de arquivos
    document.getElementById('profilePhoto').addEventListener('click', function() {
        document.getElementById('photoUpload').click();
    });

    // Event Listeners para os formulários
    document.getElementById('personalInfoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('currentPassword').value;
        
        if (validatePassword(password, 'password')) {
            // Aqui você enviaria os dados para o servidor
            alert('Informações pessoais atualizadas com sucesso!');
            cancelEdit('personalInfo');
        }
    });

    document.getElementById('preferencesForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('preferencesPassword').value;
        
        if (validatePassword(password, 'preferencesPassword')) {
            // Aqui você enviaria as preferências para o servidor
            alert('Preferências atualizadas com sucesso!');
            cancelEdit('preferences');
        }
    });

    document.getElementById('securityForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('securityPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmNewPassword').value;
        
        // Valida senha atual
        if (!validatePassword(currentPassword, 'securityPassword')) {
            return;
        }
        
        // Valida se as novas senhas coincidem
        if (newPassword !== confirmPassword) {
            document.getElementById('securityPasswordError').textContent = 'As novas senhas não coincidem.';
            return;
        }
        
        // Valida se a nova senha é diferente da atual
        if (newPassword === userPassword) {
            document.getElementById('securityPasswordError').textContent = 'A nova senha deve ser diferente da atual.';
            return;
        }
        
        // Aqui você atualizaria a senha no servidor
        alert('Senha alterada com sucesso!');
        document.getElementById('securityForm').reset();
    });

    // CAMPO SENHA 
    // Função para mostrar/ocultar senha
function togglePasswordVisibility(inputId, button) {
    // Obtém o elemento do input de senha pelo ID
    const passwordInput = document.getElementById(inputId);
    // Obtém o ícone dentro do botão
    const icon = button.querySelector('i');
    
    // Verifica se a senha está atualmente visível ou oculta
    if (passwordInput.type === 'password') {
        // Se está oculta, muda para texto para mostrar a senha
        passwordInput.type = 'text';
        // Altera o ícone para "olho fechado" (indicando que pode ocultar)
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        // Adiciona classe active para estilização
        button.classList.add('active');
    } else {
        // Se está visível, muda para password para ocultar a senha
        passwordInput.type = 'password';
        // Altera o ícone para "olho aberto" (indicando que pode mostrar)
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        // Remove classe active
        button.classList.remove('active');
    }
    
    // Mantém o foco no campo de senha após clicar no botão
    passwordInput.focus();
}

// Também adicione esta funcionalidade para permitir mostrar/ocultar com a tecla Enter
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('keypress', function(e) {
        // Se pressionar Enter ou Space no botão, ativa a função
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const inputId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            togglePasswordVisibility(inputId, this);
        }
    });
});

// Função para logout
function logout() {
    // Mostrar confirmação
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        // Limpar dados de sessão/local storage
        localStorage.removeItem('userSession');
        localStorage.removeItem('highContrast');
        localStorage.removeItem('largeText');
        localStorage.removeItem('reduceMotion');
        localStorage.removeItem('colorblindMode');
        sessionStorage.clear();
        
        // Redirecionar para a página de login
        window.location.href = 'login.html';
    }
}