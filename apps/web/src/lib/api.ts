import axios from 'axios'
import { env } from '../env'

const isServer = typeof window === 'undefined'

export const api = axios.create({
  baseURL: isServer ? env.INTERNAL_BACKEND_API_URL : env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: true,
})
