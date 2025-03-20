const express = require("express");
const axios = require("axios");
const pool = require("./config/db");
const router = express.Router();
const TEST_SERVER = "http://20.244.56.144/test";

let AUTH_TOKEN = null;

async function getAuthToken() {
    try {
        console.log("Fetching new authorization token...");
        const response = await axios.post(`${TEST_SERVER}/auth`, {
            companyName: process.env.COMPANY_NAME,
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            ownerName: process.env.OWNER_NAME,
            ownerEmail: process.env.OWNER_EMAIL,
            rollNo: process.env.ROLL_NO,
        });

        AUTH_TOKEN = response.data.access_token;
        console.log("🔑 New Token Acquired:", AUTH_TOKEN);
    } catch (error) {
        console.error("❌ Error fetching auth token:", error.response?.data || error.message);
        throw new Error("Failed to obtain auth token");
    }
}
async function ensureAuthToken(req, res, next) {
    if (!AUTH_TOKEN) {
        await getAuthToken();
    }
    next();
}

router.get("/fetch-data", ensureAuthToken, async (req, res) => {
    try {
        console.log("Fetching data from the test server...");

        const usersRes = await axios.get(`${TEST_SERVER}/users`, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        const users = usersRes.data.users;

        for (const [id, name] of Object.entries(users)) {
            await pool.query(
                `INSERT INTO users (id, name) VALUES ($1, $2)
           ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;`,
                [id, name]
            );
        }

        for (const userId of Object.keys(users)) {
            const postsRes = await axios.get(`${TEST_SERVER}/users/${userId}/posts`, {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
            });
            const posts = postsRes.data.posts;

            for (const post of posts) {
                await pool.query(
                    `INSERT INTO posts (id, user_id, content, created_at, last_updated)
             VALUES ($1, $2, $3, NOW(), NOW())
             ON CONFLICT (id) DO UPDATE 
             SET content = EXCLUDED.content, last_updated = NOW();`,
                    [post.id, post.userid, post.content]
                );

                const commentsRes = await axios.get(`${TEST_SERVER}/posts/${post.id}/comments`, {
                    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
                });
                const comments = commentsRes.data.comments;

                for (const comment of comments) {
                    await pool.query(
                        `INSERT INTO comments (id, post_id, content, created_at, last_updated)
               VALUES ($1, $2, $3, NOW(), NOW())
               ON CONFLICT (id) DO UPDATE 
               SET content = EXCLUDED.content, last_updated = NOW();`,
                        [comment.id, comment.postid, comment.content]
                    );
                }
            }
        }

        res.json({ message: "Data fetched and stored successfully!" });
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn("Token Expired! Fetching a new token...");
            await getAuthToken();
            return res.redirect("/fetch-data");
        }

        console.error(" Error fetching data from test server:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch and store data." });
    }
});


router.get("/users", async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT users.id, users.name, COUNT(posts.id) AS post_count
      FROM users
      LEFT JOIN posts ON users.id = posts.user_id
      GROUP BY users.id
      ORDER BY post_count DESC
      LIMIT 5;
    `);

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching top users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/posts", async (req, res) => {
    try {
        const { type } = req.query;

        if (type === "popular") {
            const result = await pool.query(`
        SELECT posts.id, posts.content, COUNT(comments.id) AS comment_count
        FROM posts
        LEFT JOIN comments ON posts.id = comments.post_id
        GROUP BY posts.id
        ORDER BY comment_count DESC;
      `);
            res.json(result.rows);
        } else if (type === "latest") {
            const result = await pool.query(`
        SELECT id, content, created_at
        FROM posts
        ORDER BY created_at DESC
        LIMIT 5;
      `);
            res.json(result.rows);
        } else {
            res.status(400).json({ error: "Invalid type parameter. Use 'latest' or 'popular'." });
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
