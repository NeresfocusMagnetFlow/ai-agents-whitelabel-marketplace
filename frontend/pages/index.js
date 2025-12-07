import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/agents`);
      setAgents(response.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold mb-4">
            🤖 Agentes IA White Label
          </h1>
          <p className="text-xl mb-8">
            Potencialize seu negócio com agentes de IA prontos para uso
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Ver Catálogo
          </button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Agentes Disponíveis</h2>

        {loading ? (
          <div className="text-center py-12">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{agent.name}</h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                    {agent.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{agent.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    R$ {agent.price}
                  </span>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
