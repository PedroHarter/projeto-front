# 🚀 Instruções de Instalação e Execução

## Pré-requisitos

Antes de executar o projeto, você precisa ter instalado:

1. **Node.js** (versão 16 ou superior)
   - Baixe em: https://nodejs.org/
   - Isso inclui o npm (Node Package Manager)

2. **Verificar instalação**
   ```bash
   node --version
   npm --version
   ```

## 📦 Instalação do Projeto

1. **Abra o terminal/prompt de comando**

2. **Navegue até a pasta do projeto**
   ```bash
   cd caminho/para/projeto-front-end
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

## 🏃‍♂️ Executando o Projeto

### Opção 1: Executar tudo de uma vez (Recomendado)
```bash
npm run dev:full
```

### Opção 2: Executar separadamente

**Terminal 1 - JSON Server:**
```bash
npm run server
```

**Terminal 2 - Frontend React:**
```bash
npm run dev
```

## 🌐 Acessando o Sistema

Após executar os comandos acima:

- **Frontend**: http://localhost:5173
- **JSON Server**: http://localhost:3001

## 🔐 Credenciais de Login

### Administrador
- **E-mail**: admin@exemplo.com
- **Senha**: admin123

### Usuário Comum
- **E-mail**: joao@exemplo.com
- **Senha**: 123456

## 🛠️ Solução de Problemas

### Erro: "npm não é reconhecido"
- Instale o Node.js: https://nodejs.org/
- Reinicie o terminal após a instalação

### Erro: "Porta já em uso"
- Feche outros processos que possam estar usando as portas 3001 ou 5173
- Ou use comandos alternativos:
  ```bash
  # Para JSON Server em porta diferente
  npx json-server --watch db.json --port 3002
  
  # Para Vite em porta diferente
  npm run dev -- --port 5174
  ```

### Erro: "Módulo não encontrado"
- Delete a pasta `node_modules`
- Delete o arquivo `package-lock.json`
- Execute `npm install` novamente

## 📁 Estrutura do Projeto

```
projeto-front-end/
├── components/           # Componentes React
│   ├── Dashboard.jsx     # Dashboard principal
│   ├── Footer.jsx        # Rodapé
│   ├── Layout.jsx        # Layout com navbar/footer
│   ├── login.jsx         # Tela de login
│   ├── Navbar.jsx        # Navegação
│   ├── Services.jsx      # CRUD de serviços
│   └── Users.jsx         # CRUD de usuários
├── src/
│   ├── services/
│   │   └── api.js        # Configuração Axios
│   ├── App.jsx           # App principal
│   ├── index.css         # Estilos globais
│   └── main.jsx          # Ponto de entrada
├── db.json               # Banco de dados JSON
├── package.json          # Dependências
└── README.md             # Documentação completa
```

## 🎯 Funcionalidades Implementadas

✅ **Sistema de Login**
- Autenticação com validação
- Redirecionamento automático
- Proteção de rotas

✅ **Dashboard**
- Estatísticas do sistema
- Navegação rápida
- Interface moderna

✅ **CRUD de Usuários (10 campos)**
- ID, Nome, E-mail, Senha
- Função, Telefone, Endereço
- Cidade, Estado, CEP, Data de Cadastro

✅ **CRUD de Serviços (10 campos)**
- ID, Título, Descrição, Preço
- Duração, Categoria, Status
- Profissional, Localização, Imagem, Data de Criação

✅ **Interface Responsiva**
- Design moderno
- Adaptável a mobile/tablet/desktop
- Navbar e Footer padrão

✅ **SPA (Single Page Application)**
- Roteamento com React Router
- Navegação sem recarregar página
- Estado persistente

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia apenas o frontend
- `npm run server` - Inicia apenas o JSON Server
- `npm run dev:full` - Inicia ambos simultaneamente
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção

## 📱 Testando no Mobile

Para testar no seu celular:

1. **Descubra o IP da sua máquina**
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. **Acesse no celular**
   - http://SEU_IP:5173 (frontend)
   - http://SEU_IP:3001 (API)

## 🚀 Próximos Passos

Após executar com sucesso:

1. **Teste o login** com as credenciais fornecidas
2. **Explore o Dashboard** e suas funcionalidades
3. **Teste o CRUD** de usuários e serviços
4. **Verifique a responsividade** em diferentes dispositivos
5. **Personalize** conforme suas necessidades

---

**🎉 Sistema pronto para uso!** 