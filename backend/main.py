#import nest_asyncio
from dotenv import load_dotenv
load_dotenv()
import sys
import os
import asyncio
import asyncpg
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from ORMModels import *
from Utils import *
from pydanticModels import *
from Routers.nurse_router import router as nurse_router
from Routers.user_router import router as user_router
from Routers.auth_router import router as auth_router
from Routers.appointment_router import router as appointment_router
from Routers.patient_router import router as patient_router

# Allow FastAPI to run in notebook
#nest_asyncio.apply()

# Initialize FastAPI app
app = FastAPI()
connected_clients = []
# Class Pydantic cho User

async def listen_to_db():
    conn = await asyncpg.connect(dsn=os.getenv("DATABASE_URL"))
    await conn.add_listener("appointments_channel", handle_notification)
    while True:
        await asyncio.sleep(1)
async def handle_notification(conn, pid, channel, payload):
    """Gửi thông báo tới tất cả các WebSocket khi có thay đổi"""
    await broadcast_message("update")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        connected_clients.remove(websocket)

# Hàm phát thông báo tới tất cả WebSocket client
async def broadcast_message(message: str):
    for client in connected_clients:
        await client.send_text(message)
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, but can be restricted
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to initialize ORM
@app.on_event("startup")
async def startup_event():
    await init_orm()

# Include routers
app.include_router(nurse_router, prefix="/nurses", tags=["Nurses"])
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(appointment_router, prefix="/appointments", tags=["Appointments"])
app.include_router(patient_router, prefix="/patients", tags=["Patients"])

# Run the server if file is run directly 
if __name__ == "__main__":
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="127.0.0.1", port=port)

