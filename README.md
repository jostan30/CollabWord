# Collaborative Document Editing App

## 📌 Overview
This web application allows multiple users to edit a document in real time. It is built using **Next.js**, **Firestore**, and **Liveblocks**, enabling seamless collaboration with automatic updates across all connected users.

## 🚀 Features
- 🔄 **Real-time Collaboration** – Multiple users can edit a document simultaneously.
- 🔥 **Firestore Integration** – Persistent data storage for document saving and retrieval.
- ⚡ **Liveblocks for Live Editing** – Ensures smooth synchronization across users.
- 🔑 **Authentication** – Secure user login system.
- 📝 **Rich Text Editing** – Enhanced user experience with a powerful text editor.
- 💾 **Auto-Save** – Changes are automatically saved to Firestore.

## 🛠️ Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Firestore (Firebase)
- **Real-time Collaboration**: Liveblocks API
- **Authentication**: Firebase Clerk

## 📖 How It Works
1. **User Authentication** – Users log in using Firebase authentication.
2. **Document Selection/Creation** – Users can create new documents or open existing ones.
3. **Live Editing** – Changes are synced in real-time using Liveblocks.
4. **Auto-Saving** – Edits are automatically stored in Firestore.

## 🏗️ How I Built It
- Set up a **Next.js** project and installed dependencies.
- Configured **Firebase** for Firestore and authentication.
- Integrated **Liveblocks** for real-time collaboration.
- Developed a **rich text editor** for an enhanced editing experience.
- Styled the UI using **Tailwind CSS**.
- Implemented **auto-save functionality** using Firestore.

## 🛠️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/jostan30/CollabWord.git
   cd CollabWord
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase:
   - Create a Firebase project.
   - Enable Firestore.
   - Enable Clerk.
   -Copy keys to `.env.local`.
     ```bash
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= ****
     CLERK_SECRET_KEY=******
     NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY =******
     LIVEBLOCK_SECRET_KEY = ******
     FIREBASE_ADMIN_PROJECT_ID=your_project_id
     FIREBASE_ADMIN_PRIVATE_KEY_ID=your_private_key_id
     FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_LONG_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
     FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
     FIREBASE_ADMIN_CLIENT_ID=your_client_id
     FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
     FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
     FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
     FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your_project.iam.gserviceaccount.com

   ```
 
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📌 Future Enhancements
- 🖼️ **Image & File Upload Support**
- 🗂️ **Document Versioning**
- 🗣️ **Live Chat for Collaboration**
- 📊 **User Presence Indicator**

## 🤝 Contributing
Pull requests are welcome! Feel free to fork the repo and make improvements.

## 📜 License
This project is licensed under the MIT License.

---

**Happy Coding! 🚀**

