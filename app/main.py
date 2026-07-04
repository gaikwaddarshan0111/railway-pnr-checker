from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


from app.routers import pnr


app = FastAPI(
    title  = "Railway PNR Status Checker API",
    version = "1.0.0",
    description = "Backend API for Railway PNR Status Checker"
)

#Serve static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

#templates
templates = Jinja2Templates(directory="app/templates")

#Home Page
@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={"request": request},
    )
    

 #API Router   
app.include_router(pnr.router)
