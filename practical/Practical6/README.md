# BookFlow Library API

A modern, high-performance library management REST API built with [FastAPI](https://fastapi.tiangolo.com/) and [Uvicorn](https://www.uvicorn.org/).

---

## 📁 Project Structure

```text
.
├── main.py              # Application entry point and router registration
├── routes/
│   ├── __init__.py      # Routes package marker
│   ├── catalog.py       # Catalog endpoints (browse and search books)
│   └── admin.py         # Administrative endpoints (CRUD operations)
├── requirements.txt     # Python dependencies
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.9+ (Python 3.10+ recommended)
- `pip` or virtual environment manager

### 2. Setup Virtual Environment

Activate your virtual environment:

```bash
# On macOS / Linux
source venv/bin/activate
```

*(If you haven't created one yet: `python3 -m venv venv && source venv/bin/activate`)*

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Development Server

Start the API with auto-reloading enabled:

```bash
uvicorn main:app --reload
```

The API will be available at: **`http://127.0.0.1:8000`**

---

## 📖 Interactive API Documentation

FastAPI automatically generates interactive Swagger and ReDoc documentation:

- **Interactive Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc Documentation:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 🛠️ API Endpoints Reference

### General
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status, welcome message, and endpoints overview |

### Catalog (`routes/catalog.py`)
Public endpoints for searching and viewing books in the library.

| Method | Endpoint | Query Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/books` | `author`, `is_available`, `genre` | Retrieve all books (with optional filters) |
| `GET` | `/books/{book_id}` | None | Retrieve specific book details by ID |

### Admin (`routes/admin.py`)
Administrative endpoints for managing the catalog inventory.

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/admin/books` | Add a new book to catalog | `201 Created` |
| `PUT` | `/admin/books/{book_id}` | Update existing book details | `200 OK` |
| `DELETE` | `/admin/books/{book_id}` | Remove book from catalog | `200 OK` |

---

## 💡 Example Requests

### 1. Get All Books
```bash
curl -X GET "http://127.0.0.1:8000/books" -H "Accept: application/json"
```

### 2. Get Book by ID
```bash
curl -X GET "http://127.0.0.1:8000/books/1" -H "Accept: application/json"
```

### 3. Filter Books by Author and Availability
```bash
curl -X GET "http://127.0.0.1:8000/books?author=Orwell&is_available=true" -H "Accept: application/json"
```

### 4. Add a New Book (Admin)
```bash
curl -X POST "http://127.0.0.1:8000/admin/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Brave New World",
    "author": "Aldous Huxley",
    "year": 1932,
    "genre": "Dystopian",
    "is_available": true
  }'
```

### 5. Update a Book (Admin)
```bash
curl -X PUT "http://127.0.0.1:8000/admin/books/3" \
  -H "Content-Type: application/json" \
  -d '{
    "is_available": true
  }'
```

### 6. Delete a Book (Admin)
```bash
curl -X DELETE "http://127.0.0.1:8000/admin/books/4"
```
