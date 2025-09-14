// Função para calcular operações matemáticas
async function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    
    if (isNaN(num1) || isNaN(num2)) {
        showNotification('Por favor, insira números válidos', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                a: num1,
                b: num2,
                operation: operation
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('resultValue').textContent = data.result;
            document.getElementById('result').classList.remove('hidden');
        } else {
            showNotification(data.error || 'Erro no cálculo', 'error');
        }
    } catch (error) {
        showNotification('Erro de conexão', 'error');
        console.error('Error:', error);
    }
}

// Função para adicionar nova tarefa
async function addTask() {
    const title = document.getElementById('newTask').value.trim();
    
    if (!title) {
        showNotification('Por favor, insira um título para a tarefa', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: title })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            addTaskToDOM(data);
            document.getElementById('newTask').value = '';
            showNotification('Tarefa adicionada com sucesso!', 'success');
        } else {
            showNotification('Erro ao adicionar tarefa', 'error');
        }
    } catch (error) {
        showNotification('Erro de conexão', 'error');
        console.error('Error:', error);
    }
}

// Função para alternar status da tarefa
async function toggleTask(taskId) {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    const titleSpan = taskElement.querySelector('span');
    const isCompleted = checkbox.checked;
    
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: isCompleted })
        });
        
        if (response.ok) {
            if (isCompleted) {
                titleSpan.classList.add('line-through', 'text-gray-500');
            } else {
                titleSpan.classList.remove('line-through', 'text-gray-500');
            }
            showNotification('Tarefa atualizada!', 'success');
        } else {
            // Reverter checkbox se houver erro
            checkbox.checked = !isCompleted;
            showNotification('Erro ao atualizar tarefa', 'error');
        }
    } catch (error) {
        // Reverter checkbox se houver erro
        checkbox.checked = !isCompleted;
        showNotification('Erro de conexão', 'error');
        console.error('Error:', error);
    }
}

// Função para deletar tarefa
async function deleteTask(taskId) {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            taskElement.remove();
            showNotification('Tarefa excluída com sucesso!', 'success');
        } else {
            showNotification('Erro ao excluir tarefa', 'error');
        }
    } catch (error) {
        showNotification('Erro de conexão', 'error');
        console.error('Error:', error);
    }
}

// Função para adicionar tarefa ao DOM
function addTaskToDOM(task) {
    const tasksList = document.getElementById('tasksList');
    const taskElement = document.createElement('div');
    taskElement.className = 'flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200';
    taskElement.setAttribute('data-task-id', task.id);
    
    taskElement.innerHTML = `
        <div class="flex items-center">
            <input type="checkbox" class="mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" 
                   onchange="toggleTask(${task.id})">
            <span class="text-gray-800">${task.title}</span>
        </div>
        <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">${task.created_at}</span>
            <button onclick="deleteTask(${task.id})" class="text-red-600 hover:text-red-800 transition duration-200">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    tasksList.appendChild(taskElement);
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Remove notificações existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform translate-x-full`;
    
    // Cores baseadas no tipo
    if (type === 'success') {
        notification.classList.add('bg-green-500');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500');
    } else {
        notification.classList.add('bg-blue-500');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Função para permitir Enter na calculadora
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar evento de Enter nos campos de entrada
    document.getElementById('num1').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });
    
    document.getElementById('num2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });
    
    document.getElementById('newTask').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Adicionar animação de loading nos botões
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
});

// Função para animar elementos quando entram na tela
function animateOnScroll() {
    const elements = document.querySelectorAll('.bg-white');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Função para mostrar data atual
function showCurrentDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    };
    const dateString = now.toLocaleDateString('pt-BR', options);
    document.getElementById('currentDate').textContent = dateString;
}

// Inicializar animações quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    showCurrentDate();
    animateOnScroll();
});
