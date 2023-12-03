import Crypto from 'crypto-js'

const decryptData = (text) => {
    const bytes = Crypto.AES.decrypt(text, process.env.REACT_APP_TOKEN_ENC);
    const data = bytes.toString(Crypto.enc.Utf8);
    return data;
};
const tokenEncryption = (token) => {
    return Crypto.AES.encrypt(token, process.env.REACT_APP_TOKEN_ENC).toString();

}
export {decryptData, tokenEncryption};