from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel, Field


class Book(BaseModel):
    id: int
    title: str
    author: str
    year: int
    genre: Optional[str] = "General"
    is_available: bool = True


class BookCreate(BaseModel):
    title: str = Field(..., description="Title of the book")
    author: str = Field(..., description="Author of the book")
    year: int = Field(..., description="Year of publication")
    genre: Optional[str] = Field(default="General", description="Genre or category")
    is_available: bool = Field(default=True, description="Availability status")


class BookUpdate(BaseModel):
    title: Optional[str] = Field(default=None, description="Title of the book")
    author: Optional[str] = Field(default=None, description="Author of the book")
    year: Optional[int] = Field(default=None, description="Year of publication")
    genre: Optional[str] = Field(default=None, description="Genre or category")
    is_available: Optional[bool] = Field(default=None, description="Availability status")


# In-memory books repository
books: list[dict] = [
    {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "year": 1960,
        "genre": "Classic",
        "is_available": True,
    },
    {
        "id": 2,
        "title": "1984",
        "author": "George Orwell",
        "year": 1949,
        "genre": "Dystopian",
        "is_available": True,
    },
    {
        "id": 3,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "year": 1925,
        "genre": "Classic",
        "is_available": False,
    },
    {
        "id": 4,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "year": 2008,
        "genre": "Technology",
        "is_available": True,
    },
]

router = APIRouter(tags=["Catalog"])


@router.get("/books", response_model=List[Book], summary="Get all books")
def get_books(
    author: Optional[str] = Query(None, description="Filter by author name"),
    is_available: Optional[bool] = Query(None, description="Filter by availability status"),
    genre: Optional[str] = Query(None, description="Filter by genre"),
):
    """Retrieve all books from the catalog with optional query filters."""
    result = books

    if author is not None:
        result = [b for b in result if author.lower() in b["author"].lower()]
    if is_available is not None:
        result = [b for b in result if b["is_available"] == is_available]
    if genre is not None:
        result = [b for b in result if genre.lower() in b["genre"].lower()]

    return result


@router.get("/books/{book_id}", response_model=Book, summary="Get book by ID")
def get_book(book_id: int):
    """Retrieve details of a single book by its ID."""
    for book in books:
        if book["id"] == book_id:
            return book
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Book with id {book_id} not found",
    )
