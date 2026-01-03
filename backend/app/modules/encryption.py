import secrets
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes, serialization
import base64

def aes_encrypt(message: str):
    key = secrets.token_bytes(32)      # 256-bit key
    nonce = secrets.token_bytes(12)    # 96-bit nonce (recommended)
    aes = AESGCM(key)

    ciphertext = aes.encrypt(nonce, message.encode(), None)

    return {
        "key": base64.b64encode(key).decode(),
        "nonce": base64.b64encode(nonce).decode(),
        "ciphertext": base64.b64encode(ciphertext).decode(),
    }

def aes_decrypt(key: str, nonce: str, ciphertext: str):
    key_bytes = base64.b64decode(key)
    nonce_bytes = base64.b64decode(nonce)
    ciphertext_bytes = base64.b64decode(ciphertext)

    aes = AESGCM(key_bytes)
    plaintext = aes.decrypt(nonce_bytes, ciphertext_bytes, None)

    return plaintext.decode()

def rsa_generate_keys_serialized():
    # 1. Generate the raw objects
    private_key_obj = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    public_key_obj = private_key_obj.public_key()

    # 2. Serialize Private Key to PEM string
    private_pem = private_key_obj.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ).decode('utf-8')

    # 3. Serialize Public Key to PEM string
    public_pem = public_key_obj.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ).decode('utf-8')

    return private_pem, public_pem, private_key_obj, public_key_obj

def rsa_encrypt(message: str, public_key):
    ciphertext = public_key.encrypt( message.encode(),padding.OAEP( mgf=padding.MGF1(algorithm=hashes.SHA256()),algorithm=hashes.SHA256(), label=None))
    return base64.b64encode(ciphertext).decode()
def rsa_decrypt(ciphertext: str, private_key): 
    # Ensure this is on its own line
    ciphertext_bytes = base64.b64decode(ciphertext) 
    
    plaintext = private_key.decrypt(
        ciphertext_bytes,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    return plaintext.decode('utf-8')