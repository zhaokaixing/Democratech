interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const myConfig: AuthConfiguration = {
    clientID: '5Ai35bg5ZXeE2weSeXHUdf3KW5zwB4NF',
    domain: 'democratch.eu.auth0.com',
    callbackURL: 'http://localhost:3000/democratech'
};
