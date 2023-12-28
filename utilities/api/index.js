// Server side APIs
export const getAllTemplates = fetch('http:localhost:3000/api/templates').then(
  (res) => res.json()
)

export const getPortfolio = (userId) => {
  return fetch(`http:localhost:3000/api/portfolio?user_id=${userId}`)
    .then((res) => res.json())
    .then((res) => {
      if (res?.portfolio) {
        return res?.portfolio
      } else {
        return {
          name: '',
          profession: '',
          listItems: [{ title: '', desc: '' }]
        }
      }
    })
}

// Client Side APIs

export const setPortfolio = (payload) => {
  fetch('/api/portfolio', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res.status)
    })
}
