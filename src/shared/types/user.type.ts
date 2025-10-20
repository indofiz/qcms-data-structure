export type UserTypes = {
  id: number
  name: string
  email: string
  nik?: string
  phone?: string
  picture?: string
  role: string
  user_positions?: UserPosition[]
  created_at: string
  updated_at: string
}

export type UserBasicTypes = Pick<UserTypes, 'id' | 'name' | 'role' | 'email' | 'phone'>

export interface UserPosition {
  id: number
  position: {
    id: number
    name: string
  }
  department: {
    id: number
    name: string
  }
  foreman_group?: Record<string, unknown>
  start_date: string
  end_date: string
  is_current: boolean
}
