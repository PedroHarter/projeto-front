# Sistema de Gestão - React + JSON Server

Um sistema completo de gestão desenvolvido em React com backend JSON Server, incluindo autenticação, CRUD de usuários e serviços.

## 🚀 Funcionalidades

- **Autenticação**: Sistema de login com validação
- **Dashboard**: Visão geral com estatísticas do sistema
- **CRUD de Usuários**: Gerenciamento completo de usuários (10 campos)
- **CRUD de Serviços**: Gerenciamento completo de serviços (10 campos)
- **Interface Responsiva**: Design moderno e adaptável
- **SPA**: Single Page Application com roteamento

## 📋 Campos dos Modelos

### Usuários (10 campos)
- ID (automático)
- Nome
- E-mail
- Senha
- Função (admin/user)
- Telefone
- Endereço
- Cidade
- Estado
- CEP
- Data de Cadastro

### Serviços (10 campos)
- ID (automático)
- Título
- Descrição
- Preço
- Duração
- Categoria
- Status (ativo/inativo)
- Profissional
- Localização
- URL da Imagem
- Data de Criação

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework frontend
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **JSON Server** - Backend mock
- **Vite** - Build tool
- **CSS3** - Estilização

## 📦 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd projeto-front-end
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
# Opção 1: Iniciar apenas o frontend
npm run dev

# Opção 2: Iniciar frontend + JSON Server (recomendado)
npm run dev:full
```

4. **Acesse o sistema**
- Frontend: http://localhost:5173
- JSON Server: http://localhost:3001

## 🔐 Credenciais de Teste

### Administrador
- **E-mail**: admin@exemplo.com
- **Senha**: admin123

### Usuário Comum
- **E-mail**: joao@exemplo.com
- **Senha**: 123456

## 📁 Estrutura do Projeto

```
projeto-front-end/
├── components/
│   ├── Dashboard.jsx      # Dashboard principal
│   ├── Footer.jsx         # Rodapé do sistema
│   ├── Layout.jsx         # Layout com navbar e footer
│   ├── login.jsx          # Tela de login
│   ├── Navbar.jsx         # Navegação principal
│   ├── Services.jsx       # CRUD de serviços
│   └── Users.jsx          # CRUD de usuários
├── src/
│   ├── services/
│   │   └── api.js         # Configuração do Axios
│   ├── App.jsx            # Componente principal
│   ├── index.css          # Estilos globais
│   └── main.jsx           # Ponto de entrada
├── db.json                # Banco de dados JSON Server
├── package.json           # Dependências e scripts
└── README.md              # Documentação
```

## 🎯 Como Usar

### 1. Login
- Acesse http://localhost:5173
- Use as credenciais de teste fornecidas
- O sistema redirecionará para o Dashboard após login

### 2. Dashboard
- Visualize estatísticas do sistema
- Acesse rapidamente as funcionalidades principais
- Navegue entre as seções usando o menu

### 3. Gerenciar Usuários
- Visualize todos os usuários cadastrados
- Clique em "Novo Usuário" para criar
- Use "Editar" para modificar dados
- Use "Excluir" para remover usuários

### 4. Gerenciar Serviços
- Visualize todos os serviços cadastrados
- Clique em "Novo Serviço" para criar
- Use "Editar" para modificar dados
- Use "Excluir" para remover serviços

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia apenas o frontend
- `npm run server` - Inicia apenas o JSON Server
- `npm run dev:full` - Inicia frontend + JSON Server
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção

## 🌐 Endpoints da API

### Usuários
- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Buscar usuário por ID
- `POST /users` - Criar novo usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Excluir usuário

### Serviços
- `GET /services` - Listar todos os serviços
- `GET /services/:id` - Buscar serviço por ID
- `POST /services` - Criar novo serviço
- `PUT /services/:id` - Atualizar serviço
- `DELETE /services/:id` - Excluir serviço

## 🎨 Características da Interface

- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Tema Moderno**: Interface limpa e profissional
- **Feedback Visual**: Alertas e confirmações para ações
- **Modais**: Formulários em janelas modais
- **Tabelas Responsivas**: Dados organizados em tabelas
- **Navegação Intuitiva**: Menu claro e fácil de usar

## 🔒 Segurança

- **Autenticação**: Verificação de login em todas as rotas
- **Proteção de Rotas**: Redirecionamento automático para login
- **Validação**: Campos obrigatórios e validação de dados
- **Confirmações**: Confirmação antes de excluir dados

## 📱 Responsividade

O sistema é totalmente responsivo e funciona bem em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Deploy

Para fazer deploy em produção:

1. **Gere o build**
```bash
npm run build
```

2. **Configure o servidor de produção**
- Use um servidor web (nginx, Apache)
- Configure o JSON Server em produção ou migre para uma API real
- Ajuste as URLs da API conforme necessário

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ usando React e JSON Server**
