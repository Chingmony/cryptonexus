from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from cryptography.hazmat.primitives import serialization
from app.modules.hash import hash_bytes,verify_integrity_bytes
from app.modules.password import check_strength, hash_pw, verify_pw
from app.modules.encryption import (
    aes_encrypt,
    aes_decrypt,
    rsa_generate_keys_serialized,
    rsa_encrypt,
    rsa_decrypt,
)

router = APIRouter()

# Hashing APIs
@router.post("/hash-file")
async def hash_file_api(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    data = await file.read()
    return {
        "filename": file.filename,
        "hash": hash_bytes(data),
    }


@router.post("/verify-integrity")
async def verify_integrity_api(
    file1: UploadFile = File(...),
    file2: UploadFile = File(...),
):
    data1 = await file1.read()
    data2 = await file2.read()

    hash1 = hash_bytes(data1)
    hash2 = hash_bytes(data2)

    intact = hash1 == hash2

    return {
        "intact": intact,
        "hash_file_1": hash1,
        "hash_file_2": hash2,
        "message": (
            "File is intact. No modifications detected."
            if intact
            else "File has been modified or corrupted."
        ),
    }

# AES Encryption APIs

class AESEncryptRequest(BaseModel):
    message: str

class AESDecryptRequest(BaseModel):
    key: str
    nonce: str
    ciphertext: str

@router.post("/aes/encrypt")
def aes_encrypt_api(data: AESEncryptRequest):
    encrypted = aes_encrypt(data.message)
    return encrypted

@router.post("/aes/decrypt")
def aes_decrypt_api(data: AESDecryptRequest):
    plaintext = aes_decrypt(data.key, data.nonce, data.ciphertext)
    return {"plaintext": plaintext}

# RSA Encryption APIs

class RSARequest(BaseModel):
    message: str
@router.post("/rsa/encrypt")
async def encrypt_rsa(data: dict):
    message = data.get("message")
    
    # Correctly using your serialized generator
    priv_pem, pub_pem, priv_obj, pub_obj = rsa_generate_keys_serialized()
    
    # Encrypting using the object
    ciphertext = rsa_encrypt(message, pub_obj)
    
    return {
        "ciphertext": ciphertext,
        "private_key": priv_pem, 
        "public_key": pub_pem
    }

@router.post("/rsa/decrypt")
async def decrypt_rsa(data: dict):
    private_key_pem = data.get("key")
    ciphertext = data.get("ciphertext")

    # Replace literal '\n' strings with real newline character anddd strip any accidental whitespace
    formatted_key = private_key_pem.replace("\\n", "\n").strip()

    try:
        private_key_obj = serialization.load_pem_private_key(
            formatted_key.encode(),
            password=None
        )

        plaintext = rsa_decrypt(ciphertext, private_key_obj)
        return {"plaintext": plaintext}
        
    except Exception as e:
     
        print(f"Decryption Error: {e}")
        return {"error": "Invalid Key Format. Please ensure the full PEM structure is used."}

# Password Utilities APIs
class PasswordStrengthRequest(BaseModel):
    password: str

class PasswordVerifyRequest(BaseModel):
    password: str
    hashed_password: str

@router.post("/password/strength")
def password_strength_api(data: PasswordStrengthRequest):
    strength = check_strength(data.password)
    return {"strength": strength}

@router.post("/password/hash")
def password_hash_api(data: PasswordStrengthRequest):
    hashed = hash_pw(data.password)
    return {"hashed_password": hashed}

@router.post("/password/verify")
def password_verify_api(data: PasswordVerifyRequest):
    valid = verify_pw(data.password, data.hashed_password)
    return {"valid": valid}
