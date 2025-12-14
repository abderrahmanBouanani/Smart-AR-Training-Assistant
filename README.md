# Smart AR Training Assistant 🏋️‍♂️📱

A complete solution for monitoring athlete training, consisting of a Django Backend, a React Web Admin Dashboard, and a React Native (Expo) Mobile App for athletes.

## 🏗️ Project Structure

-   `hackatoonBackend/`: **Backend API** (Django REST Framework).
-   `web-front-end/`: **Admin Dashboard** (React + Vite).
-   `mobile-front-end-rn/`: **Athlete App** (React Native + Expo).

---

## 🚀 Getting Started

### 1. Backend API (`hackatoonBackend`)
*Manages database, users, and API endpoints.*

**Setup:**
```bash
cd hackatoonBackend
# Activate Virtual Environment (Windows)
.\venv\Scripts\activate
# Install dependencies (if not done)
pip install -r requirements.txt
# Run Migrations
python manage.py migrate
```

**Run (Exposed to Network for Mobile):**
```bash
python manage.py runserver 0.0.0.0:8000
```
> **Note:** Running on `0.0.0.0` is required for the Mobile App to connect from a physical device.

---

### 2. Web Admin Dashboard (`web-front-end`)
*For coaches/admins to manage sports, exercises, and athletes.*

**Setup:**
```bash
cd web-front-end
npm install
```

**Run:**
```bash
npm run dev
```
> Access at: [http://localhost:5173/](http://localhost:5173/)

**Key Features:**
-   **Sports & Exercises**: Create, Edit, Delete.
-   **Athletes**: Manage profiles linked to Users.
-   **Sessions**: Monitor training sessions (Read-Only).

---

### 3. Mobile Athlete App (`mobile-front-end-rn`)
*For athletes to perform training sessions.*

**Setup:**
```bash
cd mobile-front-end-rn
npm install
npx expo install --fix  # Fix version mismatches if any
```

**Run:**
```bash
npx expo start
```
> **Scan the QR Code** with the **Expo Go** app on your phone (Android/iOS). Phone and PC must be on the same Wi-Fi.

**Key Features:**
-   **Login**: Lists only users with an **Athlete Profile**.
-   **Catalog**: Hierarchical view (Sports -> Exercises -> Details).
-   **Training**: Active timer and score recording.
-   **History**: View past sessions.

---

## 🛠️ Configuration
-   **Mobile API URL**: The mobile app uses `constants/config.ts` to automatically detect your PC's IP address.
-   **Permissions**: Ensure your firewall allows connections to port `8000`.

## 🤖 Future Steps
-   **AI Integration**: The endpoint `/api/diagnostics/` is ready to receive analysis data from the AI module.
