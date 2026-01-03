import hashlib

def hash_bytes(data: bytes) -> str:
    h = hashlib.sha256()
    h.update(data)
    return h.hexdigest()


def verify_integrity_bytes(data1: bytes, data2: bytes) -> dict:
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
