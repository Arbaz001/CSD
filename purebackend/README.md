# PureBackend - College Social Media Platform

A full-featured backend for a college-based social media platform (like Facebook), built with Node.js, Express, MongoDB, and Mongoose.

## Features
- User authentication (JWT, bcrypt)
- College-based separation: users interact only within their college
- Friend requests, mutual friends
- Real-time chat (REST API, MongoDB storage)
- Posts (text, image), likes, comments
- Profile management

## Project Structure
```
purebackend/
  config/
  controllers/
  middleware/
  models/
  routes/
  utils/
```

## Setup Instructions
1. Clone the repo and `cd purebackend`
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```
   npm run dev
   ```

## Main API Endpoints
- `POST   /api/auth/signup`      - Register
- `POST   /api/auth/login`       - Login
- `GET    /api/users/me`         - View own profile
- `PUT    /api/users/me`         - Update profile
- `GET    /api/users/`           - List users (same college)
- `POST   /api/friends/request`  - Send friend request
- `POST   /api/friends/accept`   - Accept friend request
- `POST   /api/friends/decline`  - Decline friend request
- `POST   /api/friends/unfriend` - Unfriend
- `GET    /api/friends/list`     - List friends
- `GET    /api/friends/requests` - List friend requests
- `POST   /api/chats/send`       - Send message
- `GET    /api/chats/:userId`    - Get chat messages
- `POST   /api/posts/`           - Create post
- `GET    /api/posts/`           - List posts
- `POST   /api/posts/like`       - Like/unlike post
- `POST   /api/posts/comment`    - Comment on post
- `DELETE /api/posts/:postId`    - Delete post

## Notes
- All data and interactions are strictly limited to users from the same college.
- Proper error handling and authentication middleware included.

---

### हिंदी में सारांश
यह प्रोजेक्ट कॉलेज-आधारित सोशल मीडिया प्लेटफॉर्म के लिए बैकएंड है। इसमें यूज़र, फ्रेंड्स, चैट, पोस्ट, और कॉलेज के अनुसार डेटा सीमित करने की सुविधा है।

--- 