from fastapi import FastAPI
from app.api.tool import router as toolkit_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cybersecurity Toolkit API")

# 1. CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(toolkit_router, prefix="/toolkit", tags=["Toolkit"])
