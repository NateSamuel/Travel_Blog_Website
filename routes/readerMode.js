/**
 * @desc Student wrote this full page readerMode.js
 */
const express = require("express");
const router = express.Router();
/**
 * @desc Displays the reader home page, showing all articles
 */
router.get("/", (req, res, next) => {
    // Define the query
    query = "SELECT * FROM article_table"
    // Execute the query and render the page with the results
    global.db.all(query, 
        function (err, rows) {
            if (err) {
                next(err); //send the error on to the error handler
            } else {
                res.render("readerHomePage.ejs", {articleTable: rows});
            }
        }
    );
});

/**
 * @desc Displays the specifc article page for the article that has been clicked on
 */
router.post("/article", (req, res, next) => {
    let articleId = req.body.name;
    let selectedArticle;
    let selectedArticleComments;
    let viewTallyInt = JSON.parse(req.body.viewerCount);
    viewTallyInt++;
    let viewTallyStr = JSON.stringify(viewTallyInt);
    global.db.all("UPDATE article_table SET number_of_reads = ? WHERE blog_id = ?;",
    [viewTallyStr, articleId],
        function (err) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                
            }
        }
    );
    global.db.all("SELECT * FROM article_table WHERE blog_id LIKE ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                selectedArticle = rows;
            }
        }
    );
    global.db.all("SELECT * FROM comments_table WHERE parent_id LIKE ?;",
    [articleId],
        function (err, rows2) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                selectedArticleComments = rows2;
                res.render("readerArticlePage.ejs",{articleTable:selectedArticle, commentsTable:selectedArticleComments, id:articleId});
            }
        }
    );
});

/**
 * @desc Adds a comment on the specific article with a timestamp and author
 */
router.post("/article/commented", (req, res, next) => {
    let articleId = req.body.name;
    let commentText = req.body.commentText;
    let timeSt = Date();
    let commentAuthor = req.body.authorName;
    let selectedArticle;
    let selectedArticleComments;

    global.db.all("INSERT INTO comments_table ('parent_id', 'comment_text', 'time_published', 'author_name') VALUES (?, ?, ?, ?);",
    [articleId, commentText, timeSt, commentAuthor],
        function (err) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                
            }
        }
    );
    global.db.all("SELECT * FROM article_table WHERE blog_id LIKE ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                selectedArticle = rows;
            }
        }
    );
    global.db.all("SELECT * FROM comments_table WHERE parent_id LIKE ?;",
    [articleId],
        function (err, rows2) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                selectedArticleComments = rows2;
                res.render("readerArticlePage.ejs",{articleTable:selectedArticle, commentsTable:selectedArticleComments, id:articleId});
            }
        }
    );
});
/**
 * @desc Adds a like on the specific article with a timestamp and author
 */
router.post("/article/liked", (req, res, next) => {
    let articleId = req.body.name;
    let likeTallyInt = JSON.parse(req.body.addLike);
    likeTallyInt++;
    let likeTallyStr = JSON.stringify(likeTallyInt);
    let selectedArticle;
    let selectedArticleComments;
    global.db.all("UPDATE article_table SET number_of_likes = ? WHERE blog_id = ?;",
    [likeTallyStr, articleId],
        function (err) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                
            }
        }
    );
    global.db.all("SELECT * FROM article_table WHERE blog_id LIKE ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                selectedArticle = rows;
            }
        }
    );
    global.db.all("SELECT * FROM comments_table WHERE parent_id LIKE ?;",
    [articleId],
        function (err, rows2) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                selectedArticleComments = rows2;
                res.render("readerArticlePage.ejs",{articleTable:selectedArticle, commentsTable:selectedArticleComments, id:articleId});
            }
        }
    );
});

// Export the router object so index.js can access it
module.exports = router;