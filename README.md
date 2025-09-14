# 🚀 Projeto Python + HTML Moderno

Um projeto web moderno construído com **Python Flask** e **HTML5**, apresentando uma interface elegante e responsiva com **Tailwind CSS**.

## ✨ Características

- 🐍 **Backend**: Python Flask com API REST
- 🎨 **Frontend**: HTML5 moderno com Tailwind CSS
- 📱 **Responsivo**: Interface adaptável para todos os dispositivos
- ⚡ **Interativo**: JavaScript vanilla para funcionalidades dinâmicas
- 🧮 **Calculadora**: Operações matemáticas em tempo real
- ✅ **Lista de Tarefas**: CRUD completo com persistência
- 🔔 **Notificações**: Sistema de feedback visual
- 🎭 **Animações**: Transições suaves e efeitos visuais

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.8+**
- **Flask 3.0.0** - Framework web minimalista
- **Werkzeug** - WSGI toolkit
- **Jinja2** - Template engine

### Frontend
- **HTML5** - Estrutura semântica
- **Tailwind CSS** - Framework CSS utilitário
- **JavaScript ES6+** - Funcionalidades interativas
- **Font Awesome** - Ícones modernos

## 📁 Estrutura do Projeto

```
Python-e-HTML/
├── app.py                 # Aplicação Flask principal
├── requirements.txt       # Dependências Python
├── README.md             # Documentação do projeto
├── templates/
│   └── index.html        # Template principal
└── static/
    ├── css/
    │   └── style.css     # Estilos customizados
    └── js/
        └── app.js        # JavaScript interativo
```

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd Python-e-HTML
```

### 2. Crie um ambiente virtual
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências
```bash
pip install -r requirements.txt
```

### 4. Execute a aplicação
```bash
python app.py
```

### 5. Acesse no navegador
```
http://localhost:5000
```

## 🎯 Funcionalidades

### 🧮 Calculadora Interativa
- Operações básicas: adição, subtração, multiplicação, divisão
- Validação de entrada
- Cálculos em tempo real via API
- Interface intuitiva e responsiva

### ✅ Lista de Tarefas
- Adicionar novas tarefas
- Marcar como concluída
- Excluir tarefas
- Persistência de dados
- Interface drag-and-drop friendly

### 🎨 Interface Moderna
- Design responsivo com Tailwind CSS
- Animações suaves
- Notificações visuais
- Gradientes e sombras modernas
- Ícones Font Awesome

## 🔧 API Endpoints

### Calculadora
- `POST /api/calculate` - Realizar cálculos matemáticos

### Tarefas
- `GET /api/tasks` - Listar todas as tarefas
- `POST /api/tasks` - Criar nova tarefa
- `PUT /api/tasks/<id>` - Atualizar tarefa
- `DELETE /api/tasks/<id>` - Excluir tarefa

## 🎨 Personalização

### Cores e Temas
O projeto usa Tailwind CSS, permitindo fácil personalização através das classes utilitárias. Você pode modificar:

- Cores principais no arquivo `templates/index.html`
- Estilos customizados em `static/css/style.css`
- Animações e transições

### Funcionalidades
- Adicione novas operações na calculadora
- Implemente filtros na lista de tarefas
- Adicione autenticação de usuários
- Integre com banco de dados

## 📱 Responsividade

O projeto é totalmente responsivo e funciona perfeitamente em:
- 📱 Dispositivos móveis
- 📱 Tablets
- 💻 Desktops
- 🖥️ Telas grandes

## 🚀 Deploy

### Heroku
1. Crie um arquivo `Procfile`:
```
web: python app.py
```

2. Configure as variáveis de ambiente no Heroku

### Docker
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando Python Flask e Tailwind CSS.

---

**Desfrute do projeto! 🎉**

test