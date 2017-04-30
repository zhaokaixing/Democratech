interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const BaseUrl = {
  API: 'http://localhost:3000/',
  client: 'http://localhost:4200'
};

export const Config: AuthConfiguration = {
    clientID: '5Ai35bg5ZXeE2weSeXHUdf3KW5zwB4NF',
    domain: 'democratch.eu.auth0.com',
    callbackURL: BaseUrl.client
};
