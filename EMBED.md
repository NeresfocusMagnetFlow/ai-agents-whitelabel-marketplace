# Embeddable Agent Portal

## Usage

```html
<iframe 
  src="https://marketplace.com/embed/agent-slug?theme=dark"
  width="400" 
  height="600"
></iframe>
```

## API

```bash
curl -X POST https://api.marketplace.com/api/v1/validate \
  -H "Content-Type: application/json" \
  -d '{"license_key":"ABCD-1234-EFGH-5678"}'
```

Response:
```json
{"valid": true, "license": {"type": "one_time", "status": "active"}}
```

## Rate Limits
- 30 requests/minute per IP

## Parameters
- `theme`: light | dark
- `accent`: hex color (URL encoded)
