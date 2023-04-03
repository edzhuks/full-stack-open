import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const rawToken = await AsyncStorage.getItem(
            `${this.namespace}:accessToken`
        );

        return rawToken;
    }

    async setAccessToken(accessToken) {
        await AsyncStorage.setItem(
            `${this.namespace}:accessToken`,
            accessToken
        );
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    }
}

export default AuthStorage;
