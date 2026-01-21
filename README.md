# Embedded Integration Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![SignalR](https://img.shields.io/badge/SignalR-10.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)

**Bridging industrial automation and web technology through seamless integration**

[Technologies](#🛠️-technologies) • [Getting Started](#🚀-getting-started)
</div>

---
## Overview

The **Embedded Integration Frontend** is a real-time industrial monitoring and control interface built with **React + TypeScript + Vite**. It provides a visual and interactive representation of an industrial simulation (Factory IO), allowing operators and engineers to **observe equipment states**, **trigger commands**, and **receive live updates** from the backend through **SignalR**.

This application is part of a **three-layer ecosystem**:

- **Front-end (this project)** – User interface and visualization
- **Back-end (.NET)** – Business logic, orchestration, real-time hub
- **Bridge (OPC UA)** – Industrial protocol integration with PLCs

Together, these components enable seamless communication between industrial automation systems and modern web applications.

---

### 🏭 System Architecture - Industrial Integration

```
┌──────────────┐     OPC UA     ┌──────────────┐         HTTP         ┌──────────────┐
│  Factory IO  │ ◄────────────► │  TIA Portal  │ ◄──────────────────► │    Bridge    │
│  (3D Sim)    │                │     (PLC)    │                      │  (OPC UA +   │
└──────────────┘                └──────────────┘                      │   HTTP)      │
                                                                      └──────┬───────┘
                                                                             │
                                                                        HTTP │
                                                                             ▼
┌──────────────┐    SignalR     ┌──────────────────────────────────────────────────┐
│    React     │ ◄────────────► │              Backend Server                      │
│   Frontend   │     HTTP       │  ┌─────────┐ ┌─────────┐ ┌──────────────────┐    │
└──────────────┘                │  │   API   │ │ SignalR │ │  Memory Cache    │    │
                                │  │ (REST)  │ │  Hub    │ │  (Repository)    │    │
                                │  └─────────┘ └─────────┘ └──────────────────┘    │
                                └──────────────────────────────────────────────────┘
```

---

## Responsibilities

- Real-time visualization of industrial equipment states
- User-triggered commands (actuators, conveyors, robots)
- Live synchronization via SignalR

---

## 🛠️ Technologies

| Technology | Version | Purpose |
|------------|---------|-------------|
| React | 19.1.1 | UI framework  |
| TypeScript | 5.8 | Type-safe  |
| Vite | 7.1 | Fast build tool and dev server |
| styled-components | 6.1 | CSS-in-JS styling |
| ESLint | 9.3 | Code Quality |
| SignalR | 10.0 | Real-time communication |

---

## 📁 Project Structure

```
Embedded-Integration-Frontend/
├── Figma/                          # Design assets (Pixil art files)
│
└── React-Integrated/               # Main React application
    ├── src/
    │   ├── assets/                 # Static assets
    │   │
    │   ├── components/             # Application Components
    │   │
    │   ├── hooks/                  # Custom React hooks
    │   │
    │   ├── interfaces/             # TypeScript interfaces
    │   │
    │   ├── lib/                    # Utilities and libraries
    │   │
    │   ├── pages/                  # Page components
    │   │
    │   ├── styles/                 # Styled-components styles
    │   │
    │   └── utils/                  # Utility functions
    │
    └── tests/
        ├── e2e/                    # Playwright E2E tests
        └── unit/                   # Vitest unit tests
```

---

## Real-time Communication

The frontend connects to the backend using **SignalR**, subscribing to live updates for all OPC UA nodes.

### Connection Example

```ts
const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5000/hub/opcua-nodes")
  .withAutomaticReconnect()
  .build();
```

### Events Received

- `SimulationFrontInitialState`
- `SimulationFrontNode`
- `NodeUpdated`
- `NodeCreated`
- `NodeDeleted`

---

## Environment Configuration

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SIGNALR_URL=http://localhost:5000/hub/opcua-nodes
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Backend running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/igor-fuchs/Embedded-Integration-Frontend.git
   cd Embedded-Integration-Frontend/React-Integrated
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `React-Integrated` directory:
   ```env
   VITE_OPCUA_HUB_URL=http://localhost:5000/hub/opcua-nodes
   VITE_API_BASE_URL=http://localhost:5000/api/
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

---

## Role in the Ecosystem

The frontend is **purely reactive**:

- It does not communicate directly with OPC UA
- It relies entirely on the backend for state consistency
- It reflects the real industrial state in near real-time

This ensures a clean separation between **UI**, **business logic**, and **industrial protocols**.

---

## 📄 License

This project is for educational and demonstration purposes.

## 👤 Author

**Igor Fuchs**

- GitHub: [@igor-fuchs](https://github.com/igor-fuchs)
- LinkedIn: [Igor Fuchs Pereira](www.linkedin.com/in/igor-fuchs-pereira)

---

<div align="center">

**Part of the Embedded Integration project ecosystem**

[Backend Repository](https://github.com/igor-fuchs/Embedded-Integration-Backend) • [Bridge Repository](https://github.com/igor-fuchs/Embedded-Integration-Bridge)

</div>


