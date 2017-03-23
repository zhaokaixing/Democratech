interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const baseUrl = {
  name: 'http://localhost:3000/'
};

export const myConfig: AuthConfiguration = {
    clientID: '5Ai35bg5ZXeE2weSeXHUdf3KW5zwB4NF',
    domain: 'democratch.eu.auth0.com',
    callbackURL: baseUrl.name
};
