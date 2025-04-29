from fastapi import FastAPI
import uvicorn

from storage.views import router as storage_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(storage_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # или ["*"] для всех источников (небезопасно)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def get_info():
    return {
        'api_version': '1_1_1'
    }
    
    

    
    
# if __name__ == '__main__':
#     uvicorn.run('main:app',reload=True )