interface AuthConfig {
    jwt: {
        secret: string;
        expiresIn: string;
    };
}

export default {
    jwt: {
        secret: process.env.JWT_SECRET_APP,
        expiresIn: '10d',
    },
} as AuthConfig;
