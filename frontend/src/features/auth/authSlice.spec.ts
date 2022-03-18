import authReducer, { UserState, reset } from './authSlice'

describe('auth reducer', () => {
  const initalState: UserState = {
    user: {
      name: 'Martin',
      email: 'm@gmail.com',
      password: 1,
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: '',
    })
  })

  it('should handle login', () => {
    const actual = authReducer(initalState, { type: 'auth/login' })
    expect(actual.user.name).toEqual('Martin')
  })

  it('should handle logout', () => {
    const actual = authReducer(undefined, { type: 'auth/logout' })
    expect(actual.user).toEqual(null)
  })

  it('should handle register', () => {
    const actual = authReducer(
      { ...initalState, user: { name: 'John', email: 'j@gmail.com', password: 2 } },
      { type: 'auth/register' }
    )
    expect(actual.user.name).toEqual('John')
  })
})
