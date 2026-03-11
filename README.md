# ⚡ DevPulse — GitHub Developer Analytics Dashboard

![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

## 🔴 Live Demo
**[devpulse-six.vercel.app](https://devpulse-six.vercel.app)**

## 📌 About
DevPulse turns any GitHub profile into a beautiful 
analytics dashboard. Search any developer, explore 
their repositories, view language breakdowns and 
star charts, discover trending projects, and bookmark 
your favourite developers.

## ✨ Features
- 🔍 Search any GitHub username instantly
- 📊 Interactive charts — language pie + stars bar chart
- 🗂️ Filter repos by language, stars, forks, name
- 🔥 Trending repos by language and time period
- 🔖 Bookmark developers — persists after refresh
- 🌙 Dark / Light mode with system preference detection
- 💀 Skeleton loaders on every data-fetching component
- ⚠️ Full error handling with user-friendly messages
- 🔑 GitHub token support for 5,000 req/hr rate limit

## 🛠️ Tech Stack
| Tech | Usage |
|------|-------|
| React 18 | Core framework |
| React Router v6 | Page routing |
| Axios | API calls + interceptors |
| Recharts | Data visualization |
| Framer Motion | Animations |
| Context API + useReducer | Global state |
| Tailwind CSS | Styling |
| react-hot-toast | Notifications |
| react-markdown | README rendering |

## 📁 Pages
- `/` — Landing page with hero search
- `/dashboard/:username` — Full analytics dashboard
- `/repo/:username/:reponame` — Repository detail
- `/trending` — Trending repos feed
- `/bookmarks` — Saved developer profiles
- `/settings` — Theme + GitHub token settings

## 🚀 Run Locally
git clone https://github.com/karthik309k/devpulse.git
cd devpulse
npm install
npm run dev

## ⚙️ Environment Variables
Create a `.env` file in the root:
VITE_GITHUB_BASE_URL=https://api.github.com

## 👨‍💻 Author
Built by Karthik — [github.com/karthik309k](https://github.com/karthik309k)
