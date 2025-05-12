To share your React (Vite) project with someone else or run it on another machine, follow these steps:

---

### 1. **Copy the Project Folder**
- Copy the entire project directory (e.g., `callfairy/`) to the other machine.
- You can use a USB drive, file sharing, or a service like GitHub.

---

### 2. **Install Node.js**
- Make sure Node.js (and npm) is installed on the other machine.
- Download from: https://nodejs.org/

---

### 3. **Install Dependencies**
- Open a terminal/command prompt in the project directory.
- Run:
  ```bash
  npm install
  ```
  This will install all required packages listed in `package.json`.

---

### 4. **Start the Development Server**
- In the same terminal, run:
  ```bash
  npm run dev
  ```
- The terminal will show a local address (e.g., http://localhost:3000).
- Open this address in a browser on that machine.

---

### 5. **(Optional) Access from Other Devices on the Same Network**
- To access the site from another device on the same WiFi/network:
  1. Start the dev server with:
     ```bash
     npm run dev -- --host
     ```
  2. Note the local IP address shown (e.g., http://192.168.1.5:3000).
  3. Open that address in a browser on another device on the same network.

---

### 6. **(Optional) Production Build**
- For a production-ready build (to deploy on a server), run:
  ```bash
  npm run build
  ```
- Then serve the `dist/` folder using a static server (e.g., `npm install -g serve` and then `serve dist`).

---

**Summary:**  
Copy the folder → run `npm install` → run `npm run dev` → open in browser.

Let me know if you want instructions for deploying online (e.g., Vercel, Netlify) or have any other questions!
