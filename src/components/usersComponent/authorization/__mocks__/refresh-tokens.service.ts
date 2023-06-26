export const mockRefreshTokensService = {
  saveRefreshToken: jest.fn(() => {
    return {
      user_id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }
  }),
}
