// Server side APIs
export const getAllTemplates = fetch(
  `${process.env.NEXT_PUBLIC_HOST}/api/templates`
).then((res) => {
  return res.json()
})

export const getPortfolio = (userId) => {
  return fetch(`${process.env.NEXT_PUBLIC_HOST}/api/portfolio?user_id=${userId}`)
    .then((res) => res.json())
    .then((res) => {
      if (res?.portfolio) {
        return res?.portfolio || {}
      }
    })
}

// Client Side APIs

export const setPortfolio = (user_id, payload, method = 'POST') => {
  return fetch(`/api/portfolio?user_id=${user_id}`, {
    method: method,
    body: JSON.stringify(payload)
  }).then((res) => res.json())
}

export const checkSubDomainAvailability = (name) => {
  return fetch(`/api/subdomain?name=${name}`).then((res) => res.json())
}
