interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const BaseUrl = {
  name: 'http://localhost:3000/'
};

export const Config: AuthConfiguration = {
    clientID: '5Ai35bg5ZXeE2weSeXHUdf3KW5zwB4NF',
    domain: 'democratch.eu.auth0.com',
    callbackURL: BaseUrl.name
};
