# 🤖 AI Agents White Label Marketplace

Plataforma completa para venda de agentes de IA White Label com sistema de licenciamento.

## 🚀 Features

- ✅ Catálogo interativo de agentes IA
- ✅ Sistema de autenticação JWT
- ✅ Pagamentos integrados (Stripe)
- ✅ Dashboard do cliente
- ✅ Gerenciamento de licenças
- ✅ Painel administrativo
- ✅ Sistema de afiliados

## 📦 Stack

**Frontend:** React.js + Next.js 14 + Tailwind CSS  
**Backend:** Node.js + Express + PostgreSQL  
**Autenticação:** JWT + bcrypt  
**Pagamentos:** Stripe  

## 🛠️ Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure DATABASE_URL e JWT_SECRET
npm run migrate
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Configure NEXT_PUBLIC_API_URL
npm run dev
```

## 📊 Banco de Dados

PostgreSQL com schemas para:
- Usuários e autenticação
- Agentes e categorias
- Licenças e assinaturas
- Transações e pagamentos
- Sistema de afiliados

## 🔐 Variáveis de Ambiente

Ver `.env.example` em cada diretório.

---

Desenvolvido para venda de agentes IA White Label
