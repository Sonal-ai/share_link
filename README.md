# 🎓 Link Share App – Secure Data Sharing via Link

A frontend web application that allows the Training & Placement cell to **share student data via secure, tokenized links** without requiring the receiver to log in.

Built with:
- ✅ React + Next.js (App Router)
- 🎨 Tailwind CSS
- 🧾 Zod + React Hook Form for validation
- 🔐 JWT Bearer Token Authentication
- 🔁 Refresh Token Handling

---

## 🚀 Features

- 🔐 **Admin login** (via JWT)
- 🔗 **Generate secure shareable links** for student data
- 🌐 **Public view page** (accessible by anyone with the link)
- 📬 **Email-based filtering** on the viewer page
- 🔄 **Token refresh support**
- 🧼 Clean, responsive UI (Tailwind CSS)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/share_link.git
cd share_link
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

## 🌐 Project Structure
```
/app
  /admin
    /login         → Admin login page
    /dashboard     → Admin dashboard (generate token, refresh)
  /share/[token]   → Public page to view student data

/components         → Reusable components (forms, tables)
lib/api.js          → Axios setup with JWT
lib/auth.js         → Refresh token logic
styles/globals.css  → Tailwind styles

```
