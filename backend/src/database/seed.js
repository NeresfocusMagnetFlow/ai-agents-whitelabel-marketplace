const pool = require('./db');

async function seed() {
    try {
        console.log('🌱 Starting database seed...');

        // Create categories
        console.log('Creating categories...');
        const categories = await pool.query(`
            INSERT INTO categories (name, slug, description) VALUES
            ('Produtividade', 'produtividade', 'Agentes para aumentar produtividade'),
            ('Marketing', 'marketing', 'Agentes para automação de marketing'),
            ('Vendas', 'vendas', 'Agentes para aumentar vendas'),
            ('Suporte', 'suporte', 'Agentes de atendimento ao cliente'),
            ('Análise', 'analise', 'Agentes de análise de dados')
            RETURNING id, slug
        `);

        const catIds = {};
        categories.rows.forEach(cat => {
            catIds[cat.slug] = cat.id;
        });

        console.log('✅ Categories created');

        // Create agents
        console.log('Creating agents...');
        const agents = [
            // Produtividade
            {
                name: 'Email Assistant Pro',
                slug: 'email-assistant-pro',
                description: 'Agente IA que organiza e responde emails automaticamente',
                category: 'produtividade',
                level: 'intermediate',
                price: 149.00,
                monthly_price: 29.90,
                features: ['Respostas automáticas', 'Categorização inteligente', 'Agenda reuniões', 'Integração Gmail/Outlook']
            },
            {
                name: 'Task Manager AI',
                slug: 'task-manager-ai',
                description: 'Gerencie tarefas com inteligência artificial',
                category: 'produtividade',
                level: 'basic',
                price: 99.00,
                monthly_price: 19.90,
                features: ['Priorização automática', 'Lembretes inteligentes', 'Delegação de tarefas', 'Relatórios']
            },
            {
                name: 'Calendar Optimizer',
                slug: 'calendar-optimizer',
                description: 'Otimize sua agenda automaticamente',
                category: 'produtividade',
                level: 'advanced',
                price: 199.00,
                monthly_price: 39.90,
                features: ['Blocos de tempo automáticos', 'Detecção de conflitos', 'Sugestões de horários', 'Integração múltiplas agendas']
            },

            // Marketing
            {
                name: 'Social Media Manager',
                slug: 'social-media-manager',
                description: 'Gerencie todas redes sociais em um lugar',
                category: 'marketing',
                level: 'advanced',
                price: 249.00,
                monthly_price: 49.90,
                features: ['Agendamento posts', 'Análise de engajamento', 'Geração de conteúdo', 'Resposta automática']
            },
            {
                name: 'Content Generator AI',
                slug: 'content-generator-ai',
                description: 'Crie conteúdo de qualidade em segundos',
                category: 'marketing',
                level: 'intermediate',
                price: 179.00,
                monthly_price: 34.90,
                features: ['Blog posts', 'Social media captions', 'Email marketing', 'SEO otimizado']
            },
            {
                name: 'Ad Campaign Optimizer',
                slug: 'ad-campaign-optimizer',
                description: 'Otimize campanhas de anúncios automaticamente',
                category: 'marketing',
                level: 'supreme',
                price: 399.00,
                monthly_price: 79.90,
                features: ['Google Ads', 'Facebook Ads', 'A/B Testing', 'ROI Analytics', 'Budget optimization']
            },

            // Vendas
            {
                name: 'Lead Qualifier Pro',
                slug: 'lead-qualifier-pro',
                description: 'Qualifique leads automaticamente',
                category: 'vendas',
                level: 'intermediate',
                price: 189.00,
                monthly_price: 37.90,
                features: ['Score de leads', 'Enriquecimento de dados', 'Integração CRM', 'Alertas em tempo real']
            },
            {
                name: 'Sales Chatbot',
                slug: 'sales-chatbot',
                description: 'Chatbot inteligente para vendas',
                category: 'vendas',
                level: 'advanced',
                price: 229.00,
                monthly_price: 44.90,
                features: ['Conversas naturais', 'Qualificação automática', 'Agendamento de demos', 'Múltiplos canais']
            },
            {
                name: 'Pipeline Assistant',
                slug: 'pipeline-assistant',
                description: 'Gerencie seu pipeline de vendas com IA',
                category: 'vendas',
                level: 'basic',
                price: 129.00,
                monthly_price: 24.90,
                features: ['Previsão de fechamento', 'Próximos passos sugeridos', 'Alertas de follow-up', 'Dashboard visual']
            },

            // Suporte
            {
                name: 'Support Ticket AI',
                slug: 'support-ticket-ai',
                description: 'Gerencie tickets de suporte automaticamente',
                category: 'suporte',
                level: 'intermediate',
                price: 169.00,
                monthly_price: 32.90,
                features: ['Categorização automática', 'Respostas sugeridas', 'Priorização inteligente', 'Knowledge base']
            },
            {
                name: 'FAQ Bot',
                slug: 'faq-bot',
                description: 'Bot para responder perguntas frequentes',
                category: 'suporte',
                level: 'basic',
                price: 89.00,
                monthly_price: 17.90,
                features: ['Respostas instantâneas', 'Aprendizado contínuo', 'Múltiplos idiomas', 'Integração website']
            },

            // Análise
            {
                name: 'Data Analytics Pro',
                slug: 'data-analytics-pro',
                description: 'Análise avançada de dados com IA',
                category: 'analise',
                level: 'supreme',
                price: 449.00,
                monthly_price: 89.90,
                features: ['Dashboards customizados', 'Previsões ML', 'Relatórios automatizados', 'Alertas de anomalias']
            },
            {
                name: 'Report Generator',
                slug: 'report-generator',
                description: 'Gere relatórios profissionais automaticamente',
                category: 'analise',
                level: 'intermediate',
                price: 159.00,
                monthly_price: 29.90,
                features: ['Templates profissionais', 'Gráficos automáticos', 'Export múltiplos formatos', 'Agendamento']
            }
        ];

        for (const agent of agents) {
            await pool.query(`
                INSERT INTO agents (name, slug, description, category_id, level, price, monthly_price, features)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `, [
                agent.name,
                agent.slug,
                agent.description,
                catIds[agent.category],
                agent.level,
                agent.price,
                agent.monthly_price,
                JSON.stringify(agent.features)
            ]);
        }

        console.log('✅ Agents created');
        console.log('\n🎉 Database seed completed successfully!');
        console.log(`📊 Created ${categories.rows.length} categories and ${agents.length} agents`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
}

seed();
