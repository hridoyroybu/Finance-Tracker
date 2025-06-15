# Finance Tracker

A cross-platform finance management system built using **Ionic**, **Angular**, **Node.js**, and **MongoDB**, supporting Personal, Mutual (shared), and Business (admin-restricted) account types.

## 🔧 Features

- 💼 **Account Types**  
  - Personal: For individual finance tracking  
  - Mutual: Shared access between multiple users  
  - Business: Admin-restricted, role-based controls

- 🔐 **Authentication**  
  - Secure JWT-based login and session handling

- 📊 **Data Visualization**  
  - Interactive charts powered by Highcharts  
  - Customizable date-range filters for flexible insights

- 📱 **Responsive Design**  
  - Fully mobile-responsive UI using Ionic framework  
  - Seamless experience across web and mobile devices

## 🛠 Tech Stack

- **Frontend:** Ionic + Angular  
- **Backend:** Node.js + Express  
- **Database:** SQL + MySQL  
- **Authentication:** JWT  
- **Charts:** Highcharts

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 14.x  
- MongoDB  
- Ionic CLI  
- Angular CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/finance-management-system.git
cd finance-management-system

# Install backend dependencies
cd backend
npm install

# Start backend server
npm run dev

# In a new terminal, install frontend dependencies
cd ../frontend
npm install

# Start Ionic app
ionic serve
