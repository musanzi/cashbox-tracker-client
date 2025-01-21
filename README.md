# Finance Manager Frontend

## 🚀 Overview

Finance Manager Frontend is an Angular-based application designed to provide an intuitive interface for managing the financial operations of small businesses. It interacts with the **Finance Manager API** to allow **managers** to allocate funds to **cashboxes** and for **cashiers** to manage transactions efficiently.

## 🛠️ Features

- **User Authentication**: Login, Logout, Role-based Access Control (RBAC)
- **Dashboard**: Overview of total funds, cashboxes, and recent transactions
- **Cashbox Management**: View and manage available cashboxes
- **Transactions**:
  - Deposit funds
  - Withdraw funds
  - Transfer funds between cashboxes
- **Reports**:
  - Daily, Weekly, Monthly, and Yearly financial summaries
  - Transaction history with filters

## 🏗️ Tech Stack

- **Frontend**: Angular (v19)
- **State Management**: NgRx
- **UI Framework**: Angular Material
- **API Communication**: HTTP Client

## 📌 Installation

### Prerequisites

- Node.js (v18+ recommended)
- Angular CLI (v16+)
- Finance Manager API running

### Steps

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/cashbox-tracker-api.git
   cd cashbox-tracker-api
   ```
2. **Install dependencies**
   ```sh
   pnpm i
   ```
3. **Configure environment variables**
   Update `src/environments/environment.ts`:
   ```ts
   export const environment = {
     apiUrl: 'http://localhost:8000/'
   };
   ```
4. **Run the application**
   ```sh
   ng serve
   ```
5. **Access the application**
   Open [http://localhost:4200](http://localhost:4200) in your browser.

---

_Developed with ❤️ using Angular_ 🚀
