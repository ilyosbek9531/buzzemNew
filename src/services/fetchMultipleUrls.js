import httpClient from "./httpClient";

export const fetchMultipleUrls = async (urls) => {
  let data
  try {
    data = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await httpClient.get(url)
          return response.data
        } catch (e) {
          console.log(e)
        }
      })
    )
  } catch (error) {
    console.error(error)
  }

  return data
}

export const fetchMultipleObjects = async (requests) => {
    let data
    try {
        data = await Promise.all(
            requests.map(async (request) => {
                try {
                    const res = await httpClient.post(`/object/get-list/${request.objectsSlug}`, { data: request.data })
                    return res.data?.response ?? []
                } catch (e) {
                    console.log(e)
                }
            })
        )
    } catch (error) {
        console.error(error)
    }

    return data
}
