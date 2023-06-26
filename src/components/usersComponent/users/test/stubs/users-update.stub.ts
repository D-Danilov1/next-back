import { UpdateUsersDto } from '../../dto/update-users.dto'

export const usersUpdateStub = (): UpdateUsersDto => {
  return <UpdateUsersDto>{
    id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    banned_at: '2023-01-01 00:00:00',
    banned_by: '2023-01-01 00:00:00',
  }
}
