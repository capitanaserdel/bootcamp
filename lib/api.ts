import axios from "axios"

// Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.simkash.com"

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface TicketPurchaseRequest {
  fullName: string
  email: string
  phone: string
  gender: string
  experience: string
  laptop: boolean
  imageUrl?: string
}

export interface TicketPurchaseResponse {
  responseSuccessful: boolean
  responseMessage: string
}

export const mapFormDataToPayload = (formData: any, imageUrl?: string): TicketPurchaseRequest => ({
  fullName: formData.name,
  email: formData.email,
  phone: formData.phone,
  gender: formData.gender,
  experience: formData.experience,
  laptop: formData.laptop === "Yes",
  ...(imageUrl ? { imageUrl } : {}),
})

export const purchaseTicket = async (
  data: TicketPurchaseRequest
): Promise<TicketPurchaseResponse> => {
  try {
    const response = await apiClient.post<TicketPurchaseResponse>(
      "/api/v1/user/register",
      data
    )
    return response.data
  } catch (error: any) {
    console.error("❌ API error:", error.response?.data || error.message)
    throw new Error(error.response?.data?.responseMessage || "API request failed")
  }
}