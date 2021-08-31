// ** Core JWT Import
import useJwt from '@src/@core/auth/jwt/useJwt'

const jwtConfig = {
    loginEndpoint: 'https://trial.infosight.io/webapi/login',
    registerEndpoint: '/jwt/register', //TODO Update uri
    refreshEndpoint: '/jwt/refresh-token',
    logoutEndpoint: '/jwt/logout',

    // ** This will be prefixed in authorization header with token
    // ? e.g. Authorization: Bearer <token>
    tokenType: 'Bearer',

    // ** Value of this property will be used as key to store JWT token in storage
    storageTokenKeyName: 'accessToken',
    storageRefreshTokenKeyName: 'refreshToken'
}
const { jwt } = useJwt({})

export default jwt
