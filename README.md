# API Documentataion

## 🍛 Food Items API

### Base Route: `/api/food`

---

### POST `/api/food/item`

Fetch a single food item by its `item_id`.

#### 🔸 Request Body

```json
{
  "item_id": "64f1e77a12b3f6e1b2345678"
}
```

#### ✅ Response (Success)

```json
{
  "item_id": "64f1e77a12b3f6e1b2345678",
  "title": "Chicken Biryani",
  "description": "Aromatic basmati rice cooked with tender chicken and spices.",
  "image_url": "/images/chicken_biryani.jpg",
  "actual_price": 180,
  "discount": 20,
  "price": 160,
  "esteemed_time": 25
}
```

#### ❌ Response (Item Not Found)

```json
{
  "error": "Item not found"
}
```

#### ❌ Response (Server Error)

```json
{
  "error": "Server error",
  "details": "Error message here"
}
```

---

### POST `/api/food/add`

Adds a new food item to the database.

#### 🔸 Request Body

```json
{
  "title": "Grilled Sandwich",
  "description": "Crispy sandwich filled with veggies and cheese.",
  "image_url": "/images/grilled_sandwich.jpg",
  "actual_price": 120,
  "discount": 10,
  "price": 110,
  "label": "breakfast",
  "esteemed_time": 15
}
```

> 🔹 `label` is optional. All other fields are required.

#### ✅ Response (Success)

```json
{
  "success": true,
  "message": "Food item added successfully"
}
```

#### ❌ Response (Server Error)

```json
{
  "success": false,
  "error": "Failed to add item",
  "details": "Error message here"
}
```

---

## Food Menu API

### Base Route: `/api/menu`

### POST `/api/menu/add`

Adds a new food menu entry (breakfast, lunch, and dinner) for a specific date.

#### 🔸 Request Body

```json
{
  "breakfast": {
    "date": "2025-06-06",
    "items": [
      "68430005765f27cd3f47a3b7",
      "6843001f765f27cd3f47a3b8",
      "6842f6c45b56633a96449fa2"
    ]
  },
  "lunch": {
    "date": "2025-06-06",
    "items": [
      "68430536765f27cd3f47a3b9",
      "6843055c765f27cd3f47a3ba",
      "68430594765f27cd3f47a3bb"
    ]
  },
  "dinner": {
    "date": "2025-06-06",
    "items": [
      "68456b5c3ef6c5c739bd184f",
      "68456be03ef6c5c739bd1852",
      "68456c423ef6c5c739bd1854"
    ]
  }
}
```

> 🔹 All three meal types (`breakfast`, `lunch`, `dinner`) are required.

#### ✅ Response (Success)

```json
{
  "success": true,
  "message": "Menu added successfully",
  "data": {
    "_id": "menuId",
    "breakfast": {
      "date": "2025-06-06T00:00:00.000Z",
      "items": ["foodItem_id1", "foodItem_id2"]
    },
    "lunch": { ... },
    "dinner": { ... }
  }
}
```

#### ❌ Response (Missing Field)

```json
{
  "success": false,
  "error": "Missing required fields"
}
```

---

### GET `/api/menu`

Fetches all food menus with populated food item details for each meal.

#### ✅ Response

```json
[
  {
    "_id": "684571b3919e45e94fdc590f",
    "breakfast": {
      "date": "2025-06-06T00:00:00.000Z",
      "items": [
        {
          "_id": "68430005765f27cd3f47a3b7",
          "title": "Paratha",
          "description": "Aromatic paratha with chicken curry, onions.",
          "image_url": "https://images.unsplash.com/photo-1683533743190-89c9b19f9ea6",
          "actual_price": 100,
          "discount": 20,
          "price": 80,
          "label": "breakfast",
          "esteemed_time": 25
        },
        {
          "_id": "6843001f765f27cd3f47a3b8",
          "title": "Chicken Burger",
          "description": "Juicy grilled chicken patty in a soft bun with fresh toppings.",
          "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
          "actual_price": 130,
          "discount": 30,
          "price": 100,
          "label": "breakfast",
          "esteemed_time": 15
        },
        {
          "_id": "6842f6c45b56633a96449fa2",
          "title": "Khichuri",
          "description": "Aromatic rice with riped chicken curry!",
          "image_url": "https://images.unsplash.com/photo-1630409349416-24884761a307",
          "actual_price": 120,
          "discount": 20,
          "price": 100,
          "label": "breakfast",
          "esteemed_time": 25
        }
      ]
    },
    "lunch": {
      "date": "2025-06-06T00:00:00.000Z",
      "items": [
        {
          "_id": "68430536765f27cd3f47a3b9",
          "title": "Chicken Fried Rice",
          "description": "Stir-fried rice with chicken, eggs, and mixed vegetables.",
          "image_url": "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
          "actual_price": 180,
          "discount": 20,
          "price": 160,
          "label": "lunch",
          "esteemed_time": 15
        },
        {
          "_id": "6843055c765f27cd3f47a3ba",
          "title": "Fish Curry with Rice",
          "description": "Spicy fish curry served with steamed white rice.",
          "image_url": "https://images.unsplash.com/photo-1654863404432-cac67587e25d",
          "actual_price": 220,
          "discount": 25,
          "price": 195,
          "label": "lunch",
          "esteemed_time": 18
        },
        {
          "_id": "68430594765f27cd3f47a3bb",
          "title": "Butter Chicken",
          "description": "Creamy tomato-based curry with tender chicken pieces.",
          "image_url": "https://images.unsplash.com/photo-1728910107534-e04e261768ae",
          "actual_price": 240,
          "discount": 30,
          "price": 210,
          "label": "lunch",
          "esteemed_time": 20
        }
      ]
    },
    "dinner": {
      "date": "2025-06-06T00:00:00.000Z",
      "items": [
        {
          "_id": "68456b5c3ef6c5c739bd184f",
          "title": "Thai Green Curry",
          "description": "Spicy Thai curry with chicken, coconut milk, and fresh herbs.",
          "image_url": "https://images.unsplash.com/photo-1612108438004-257c47560118",
          "actual_price": 280,
          "discount": 30,
          "price": 250,
          "label": "dinner",
          "esteemed_time": 25,
          "createdAt": "2025-06-08T10:52:12.848Z",
          "updatedAt": "2025-06-08T10:52:12.848Z",
          "__v": 0
        },
        {
          "_id": "68456be03ef6c5c739bd1852",
          "title": "Paneer Butter Masala",
          "description": "Cottage cheese cubes in a creamy tomato-based curry.",
          "image_url": "https://images.unsplash.com/photo-1690401769082-5f475f87fb22",
          "actual_price": 220,
          "discount": 20,
          "price": 200,
          "label": "dinner",
          "esteemed_time": 20,
          "createdAt": "2025-06-08T10:54:24.533Z",
          "updatedAt": "2025-06-08T10:54:24.533Z",
          "__v": 0
        },
        {
          "_id": "68456c423ef6c5c739bd1854",
          "title": "Mutton Korma",
          "description": "Slow-cooked tender mutton in a rich and spicy gravy.",
          "image_url": "https://images.unsplash.com/photo-1559203244-78de52adba0e",
          "actual_price": 350,
          "discount": 40,
          "price": 310,
          "label": "dinner",
          "esteemed_time": 30,
          "createdAt": "2025-06-08T10:56:02.228Z",
          "updatedAt": "2025-06-08T10:56:02.228Z",
          "__v": 0
        }
      ]
    },
    "__v": 0
  }
]
```

#### ❌ Response (Error)

```json
{
  "success": false,
  "error": "Server error",
  "details": "Error message here"
}
```
