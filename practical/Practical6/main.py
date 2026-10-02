from fastapi import FastAPI
from routes.admin import router as admin_router
from routes.catalog import router as catalog_router

# 1. Initialize FastAPI application named "BookFlow Library API"
app = FastAPI(
    title="BookFlow Library API",
    description="A complete library management REST API featuring catalog browsing and administrative operations.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# 4. Register both routers
app.include_router(catalog_router)
app.include_router(admin_router)


@app.get("/", tags=["General"], summary="Root / Health Check")
def root():
    return {
        "message": "Welcome to BookFlow Library API",
        "status": "healthy",
        "docs_url": "/docs",
        "redoc_url": "/redoc",
        "routes": {
            "catalog": [
                "GET /books",
                "GET /books/{book_id}",
            ],
            "admin": [
                "POST /admin/books",
                "PUT /admin/books/{book_id}",
                "DELETE /admin/books/{book_id}",
            ],
        },
    }
