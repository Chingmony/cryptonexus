from zxcvbn import zxcvbn
import bcrypt

def check_strength(password: str) -> dict:
    result = zxcvbn(password)
    score = result["score"]
    feedback = result.get("feedback", {})

    strength_map = {
        0: "Very Weak",
        1: "Weak",
        2: "Medium",
        3: "Strong",
        4: "Very Strong",
    }

    return {
        "score": score,
        "strength": strength_map[score],
        "warnings": (
            [feedback["warning"]] 
            if feedback.get("warning") 
            else []
        ),
        "suggestions": feedback.get("suggestions", []),
    }

def hash_pw(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode(), salt)
    return hashed.decode()   # JSON-safe string
def verify_pw(password_attempt: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        password_attempt.encode(),
        hashed_password.encode()
    )
