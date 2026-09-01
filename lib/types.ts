
export interface IService {
  id: string
  title: string
  description: string
  price: number
  location: string
  status: "OPEN" | "CLOSED"
  createdAt: string
  updatedAt: string
  technicianId: string
  categoryId: string

  technician: {
    id: string
    name: string
    email: string
  }
}



export interface ITechnicianProfile {
  id: string
  userId: string
  bio: string
  experienceYears: number
  rating: number
  totalReviews: number
  skills: string[]
  isAvailable: boolean
  createdAt: string
  updateAt: string

}

export interface IReview {
  id: string
  reviewerId: string
  technicianId: string
  bookingId: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string

  reviewer: {
    id: string
    name: string
    email: string
  }
}

export interface ITechnician {
  id: string
  name: string
  email: string
  role: "TECHNICIAN"
  status: "ACTIVE" | "INACTIVE"

  technicianProfiles: ITechnicianProfile[]

  reviewsReceived: IReview[]
}

export interface ITechnicianResponse {
  success: boolean
  message: string
  data: {
    result: ITechnician
    TotalReviews: number
  }
}

