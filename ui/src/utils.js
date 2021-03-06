import ReactDOM from 'react-dom'

import { Alert } from '@instructure/ui-alerts'

export const showAlert = (message, variant = 'error') => {
  const alertContainer = document.getElementById('alerts')
  const alert = document.createElement('div')
  alertContainer.appendChild(alert)
  ReactDOM.render(
    <Alert
      variant={variant}
      margin="x-large"
      timeout={5000}
      onDismiss={() => alert.remove()}
      liveRegion={() => document.getElementById('alerts')}
    >
      {message}
    </Alert>,
    alert
  )
}

export const doFetch = (path, method, token, body = undefined) =>
  fetch(`http://localhost:3001${path}`, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        throw Error(response.error)
      }
      return response
    })
