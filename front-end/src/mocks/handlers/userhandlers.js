import { rest } from "msw";

const API_URL = "https://localhost:3001/";

export const handlers = [
  // Registration
  rest.post(`${API_URL}/users/register`, (req, res, ctx) =>
    res(
      ctx.status(201),
      ctx.json({
        status: "success",
        message: "User created successfully",
      })
    )
  ),

  // Login
  rest.post(`${API_URL}/users/login`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        status: "success",
        token: "token",
      })
    )
  ),

  // Get user profile
  rest.get(`${API_URL}/users`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(
        {
          "user": [
            {
              "_id": "64c871d1bbd9b2b2928d570d",
              "username": "Manjesh",
              "email": "Manjesh@gmail.com",
              "password": "$2a$10$4yOoP6XmnlodWon8yN7yo.TvlbwrFMGLHo.AYWuH6egmpNseieTb6",
              "confirmPassword": "$2a$10$2KVlVVwihxfUcrzSKC7PG.wuFGIQcyR86Wrqplj9j.WvdYxufxnPm",
              "image": "IMG-1690904313060.jpg",
              "watchlist": [
                "736769",
                "460032",
                "346698",
                "24827"
              ],
              "totalMoviesReviewed": 0,
              "__v": 4,
              "isUserLoggedIn": true
            }
          ]
        }
      )
    )
  ),

  // Update user profile
  rest.put(`${API_URL}/users/edit-profile`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: "user_id",
        username: "updated_username",
        email: "updated_email@example.com",
      })
    )
  ),

  // Update password
  rest.put(`${API_URL}/users/change-password`, (req, res, ctx) =>
    res(ctx.status(204))
  ),

  // Upload image
  rest.post(`${API_URL}/users/uploadImage`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true, data: "image_file_name.jpg" }))
  ),
];
