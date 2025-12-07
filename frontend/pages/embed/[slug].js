import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Embed() {
  const router = useRouter();
  const { slug, theme = 'light' } = router.query;
  const [agent, setAgent] = useState(null);
  const [licenseKey, setLicenseKey] = useState('');
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    if (slug) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/agents/${slug}`)
        .then(res => setAgent(res.data));
    }
  }, [slug]);

  const handleValidate = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/validate`, {
      license_key: licenseKey,
      agent_slug: slug
    });
    setValidation(res.data);
  };

  if (!agent) return <div>Loading...</div>;

  const isDark = theme === 'dark';

  return (
    <div style={{ 
      backgroundColor: isDark ? '#1a1a1a' : '#fff',
      color: isDark ? '#fff' : '#000',
      padding: '24px',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{agent.name}</h1>
      <p>{agent.description}</p>

      <input
        type="text"
        placeholder="XXXX-XXXX-XXXX-XXXX"
        value={licenseKey}
        onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
        style={{
          width: '100%',
          padding: '12px',
          margin: '16px 0',
          backgroundColor: isDark ? '#2a2a2a' : '#f9fafb',
          border: '2px solid #ccc',
          borderRadius: '8px'
        }}
      />

      <button
        onClick={handleValidate}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Activate
      </button>

      {validation && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: validation.valid ? '#d1fae5' : '#fee2e2',
          borderRadius: '8px'
        }}>
          {validation.valid ? '✓ License Valid' : '✗ ' + validation.error}
        </div>
      )}
    </div>
  );
}
