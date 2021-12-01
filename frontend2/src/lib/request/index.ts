import axios from 'axios'

export const apiRequest =  axios.create({
	baseURL: (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL) + '/api',
	withCredentials: true,
})
export default apiRequest