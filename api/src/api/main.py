from fastapi import FastAPI
import uvicorn
app = FastAPI()


@app.get('/')
def get_info():
    return {
        'api_version': '1_1_1'
    }
    
    

    
    
# if __name__ == '__main__':
#     uvicorn.run('main:app',reload=True )