# 🎓 Sistema de Gestão - Versão para Iniciantes

## 📚 **O que é este projeto?**

Este é um sistema completo de gestão desenvolvido em **React** com **JSON Server**. É perfeito para aprender os conceitos básicos de desenvolvimento web!

## 🎯 **O que você vai aprender:**

- ✅ **React básico** - Componentes, estados, props
- ✅ **Roteamento** - Navegação entre páginas
- ✅ **Formulários** - Criar, editar, excluir dados
- ✅ **APIs** - Como conectar com backend
- ✅ **CSS** - Estilização responsiva
- ✅ **CRUD completo** - Create, Read, Update, Delete

## 🚀 **Como executar (Passo a Passo):**

### **1. Instalar o Node.js**
- Vá para: https://nodejs.org/
- Baixe a versão LTS (mais estável)
- Instale normalmente

### **2. Abrir o Git Bash**
- Clique com botão direito na pasta do projeto
- Escolha "Git Bash Here"

### **3. Navegar até a pasta**
```bash
cd projeto-front-end
```

### **4. Instalar dependências**
```bash
npm install
```

### **5. Executar o projeto**
```bash
npm run dev:full
```

### **6. Acessar no navegador**
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001

## 🔐 **Credenciais de teste:**

- **Admin**: admin@exemplo.com / admin123
- **Usuário**: joao@exemplo.com / 123456

## 📖 **Estrutura do Projeto (Simplificada):**

```
projeto-front-end/
├── components/           # Componentes React
│   ├── login.jsx        # Tela de login
│   ├── Navbar.jsx       # Menu de navegação
│   ├── Footer.jsx       # Rodapé
│   ├── Dashboard.jsx    # Página inicial
│   ├── Users.jsx        # Gerenciar usuários
│   └── Services.jsx     # Gerenciar serviços
├── src/
│   ├── App.jsx          # Aplicação principal
│   ├── index.css        # Estilos
│   └── services/
│       └── api.js       # Configuração da API
├── db.json              # Banco de dados
└── package.json         # Configurações
```

## 🎨 **Funcionalidades Implementadas:**

### **1. 🔐 Sistema de Login**
- Formulário de login
- Validação de credenciais
- Redirecionamento automático

### **2. 📊 Dashboard**
- Estatísticas do sistema
- Cards informativos
- Navegação rápida

### **3. 👥 CRUD de Usuários (10 campos)**
- **Nome** - Nome completo
- **E-mail** - Endereço de e-mail
- **Senha** - Senha de acesso
- **Função** - Admin ou Usuário
- **Telefone** - Número de contato
- **Endereço** - Endereço completo
- **Cidade** - Cidade
- **Estado** - Estado
- **CEP** - Código postal
- **Data de Cadastro** - Data automática

### **4. 🛠️ CRUD de Serviços (10 campos)**
- **Título** - Nome do serviço
- **Descrição** - Detalhes do serviço
- **Preço** - Valor em reais
- **Duração** - Tempo estimado
- **Categoria** - Tipo de serviço
- **Status** - Ativo ou Inativo
- **Profissional** - Responsável
- **Localização** - Onde é realizado
- **Imagem** - URL da foto
- **Data de Criação** - Data automática

### **5. 🎨 Interface**
- **Navbar** - Menu de navegação
- **Footer** - Rodapé padrão
- **Responsiva** - Funciona no celular
- **Modais** - Formulários em janelas

## 💡 **Conceitos Aprendidos:**

### **React Hooks:**
- `useState` - Gerenciar estados
- `useEffect` - Executar código quando componente monta
- `useNavigate` - Navegação entre páginas

### **JavaScript:**
- `async/await` - Requisições assíncronas
- `map()` - Listar dados
- `filter()` - Filtrar dados
- `JSON.parse/stringify` - Trabalhar com JSON

### **CSS:**
- Flexbox - Layout flexível
- Grid - Layout em grade
- Media queries - Responsividade
- Variáveis CSS - Cores e estilos

### **APIs:**
- GET - Buscar dados
- POST - Criar dados
- PUT - Atualizar dados
- DELETE - Excluir dados

## 🔧 **Comandos Úteis:**

```bash
# Instalar dependências
npm install

# Executar tudo
npm run dev:full

# Apenas frontend
npm run dev

# Apenas servidor
npm run server

# Build de produção
npm run build
```

## 🐛 **Solução de Problemas:**

### **Erro: "npm não é reconhecido"**
- Instale o Node.js: https://nodejs.org/
- Reinicie o terminal

### **Erro: "Porta já em uso"**
- Feche outros programas
- Use portas diferentes:
  ```bash
  npx json-server --watch db.json --port 3002
  npm run dev -- --port 5174
  ```

### **Erro: "Não foi possível conectar"**
- Verifique se o JSON Server está rodando
- Acesse: http://localhost:3001

## 📱 **Testando no Celular:**

1. **Descubra seu IP:**
   ```bash
   ipconfig
   ```

2. **Acesse no celular:**
   - http://SEU_IP:5173

## 🎓 **Próximos Passos:**

1. **Entenda o código** - Leia os comentários
2. **Modifique algo** - Mude cores, textos
3. **Adicione campos** - Crie novos campos
4. **Crie novas páginas** - Adicione funcionalidades
5. **Estude os conceitos** - React, JavaScript, CSS

## 🏆 **Parabéns!**

Você agora tem um sistema completo funcionando! Use este projeto como base para aprender e criar seus próprios sistemas.

---

**🎯 Desenvolvido para iniciantes com ❤️** 