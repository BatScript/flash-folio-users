// Server side APIs
export const getAllTemplates = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/templates`, {
      headers: {
        cache: 'no-store'
      }
    })
    if (!res.ok) {
      throw new Error('Failed to fetch all templates')
    }
    return res.json()
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const getPortfolio = async (userId) => {
  console.log(userId)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/portfolio?user_id=${userId}`,
      {
        headers: {
          cache: 'no-store'
        }
      }
    )
    if (!res.ok) {
      const ans = await res.json()
      console.log(ans)
      throw new Error('Failed to fetch portfolio')
    }
    const data = await res.json()
    return data?.portfolio || {}
  } catch (err) {
    console.error(err)
    return {}
  }
}

// Client Side APIs

export const setPortfolio = async (user_id, payload, method = 'POST') => {
  try {
    const res = await fetch(`/api/portfolio?user_id=${user_id}`, {
      method: method,
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      throw new Error('Failed to set portfolio')
    }
    return res.json()
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const checkSubDomainAvailability = async (name) => {
  try {
    const res = await fetch(`/api/subdomain?name=${name}`)
    if (!res.ok) {
      throw new Error('Failed to check subdomain availability')
    }
    return res.json()
  } catch (err) {
    console.error(err)
    return {}
  }
}
