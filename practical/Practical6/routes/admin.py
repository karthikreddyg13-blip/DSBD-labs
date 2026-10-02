from typing import Any, Dict
from fastapi import APIRouter, HTTPException, status
from routes.catalog import Book, BookCreate, BookUpdate, books

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post(
    "/books",
    response_model=Book,
    status_code=status.HTTP_201_CREATED,
    summary="Add a new book",
)
def create_book(book_in: BookCreate):
    """Add a new book to the library catalog."""
    next_id = max((b["id"] for b in books), default=0) + 1
    new_book = {
        "id": next_id,
        "title": book_in.title,
        "author": book_in.author,
        "year": book_in.year,
        "genre": book_in.genre or "General",
        "is_available": book_in.is_available,
    }
    books.append(new_book)
    return new_book


@router.put(
    "/books/{book_id}",
    response_model=Book,
    summary="Update an existing book",
)
def update_book(book_id: int, book_in: BookUpdate):
    """Update details of an existing book by its ID."""
    for book in books:
        if book["id"] == book_id:
            update_data = book_in.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                book[key] = value
            return book

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Book with id {book_id} not found",
    )


@router.delete(
    "/books/{book_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete a book",
)
def delete_book(book_id: int) -> Dict[str, Any]:
    """Remove a book from the library catalog by its ID."""
    for index, book in enumerate(books):
        if book["id"] == book_id:
            deleted_book = books.pop(index)
            return {
                "message": f"Book with id {book_id} deleted successfully",
                "book": deleted_book,
            }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Book with id {book_id} not found",
    )
