/**
 * @desc Student wrote this full page authorMode.js
 */
const express = require("express");
const router = express.Router();
/**
 * @desc Displays the author home page
 */
router.get("/", (req, res, next) => {
    //get all items from draft article table
    draftQuery = "SELECT * FROM draft_article_table"
    let draftTableRows;
    let publishedTableRows;
    global.db.all(draftQuery, 
        function (err, rows) {
            if (err) {
                next(err); //send the error on to the error handler
            } else {
                draftTableRows = rows;
            }
        }
    );
    //get all items from published article table
    publishedQuery = "SELECT * FROM article_table"
    // Execute the query and render the page with the results
    global.db.all(publishedQuery, 
        function (err, rows) {
            if (err) {
                next(err); //send the error on to the error handler
            } else {
                publishedTableRows = rows;
                res.render("authorHomePage.ejs", {draftTable:draftTableRows, articleTable: publishedTableRows});
            }
        }
    );
});

/**@desc When publish button is clicked, publish time updated, and  row from draft table moved into published table*/
router.post("/publish", (req, res, next) => {
    let articleId = req.body.publish;
    let timeSt = Date();
    //publish time is updated
    global.db.all("UPDATE draft_article_table SET time_published = ? WHERE blog_id = ?;",
    [timeSt, articleId],
        function (err) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                
            }
        }
    );
    //new row created in published article table
    const insertQuery = "INSERT INTO article_table ('blog_title', 'author_name', 'blog_text', 'time_created', 'time_published', 'time_modified','number_of_reads', 'number_of_likes') SELECT blog_title, author_name, blog_text, time_created, time_published, time_modified,number_of_reads, number_of_likes FROM draft_article_table WHERE blog_id = ?;";
    global.db.run(insertQuery, [articleId],
        function (err) {
            if (err) {
                next(err); //send the error on to the error handler
            } else {

            }
        }
    );
    //row deleted from draft table
    global.db.all("DELETE FROM draft_article_table WHERE blog_id = ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                res.redirect("/author/");
            }
        }
    );
});

/**@desc if delete button clicked, removes row from draft article table*/
router.post("/delete/draft", (req, res, next) => {
    let articleId = req.body.delete;
    
    global.db.all("DELETE FROM draft_article_table WHERE blog_id = ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                res.redirect("/author/");
            }
        }
    );
});
/**@desc if delete button clicked, removes row from published article table*/
router.post("/delete/published", (req, res, next) => {
    let articleId = req.body.delete;
    
    global.db.all("DELETE FROM article_table WHERE blog_id = ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                res.redirect("/author/");
            }
        }
    );
});
/**
 * @desc Displays a page for the author to create an article
 */
router.get("/edit", (req, res, next) => {
    res.render("authorEditArticle.ejs", {isNew: true});
});

/**
 * @desc Displays a page for the author to edit an article if article is a draft
 */
router.post("/edit/draft", (req, res, next) => {
    let articleId = req.body.edit;
    global.db.all("SELECT * FROM draft_article_table WHERE blog_id LIKE ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                res.render("authorEditArticle.ejs",{articleTable:rows, isNew: false, isPublished:false});
            }
        }
    );
});
/**
 * @desc Displays a page for the author to edit an article if article is published
 */
router.post("/edit/published", (req, res, next) => {
    let articleId = req.body.edit;
    global.db.all("SELECT * FROM article_table WHERE blog_id LIKE ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                res.render("authorEditArticle.ejs",{articleTable:rows, isNew: false, isPublished:true});
            }
        }
    );
});
/**
 * @desc Routes back to author home page with new article add to draft table following form submission
 */
router.post("/edit/created", (req, res, next) => {
    let articleTitle = req.body.title;
    let articleAuthor = req.body.author;
    let articleText = req.body.articleText;
    let timeSt = Date();
    let modifiedInitialTime = 'Not Yet Modified';
    let publishedInitialTime = 'Not Yet Published';
    let likes = '0';
    let views = '0';
    global.db.all("INSERT INTO draft_article_table ('blog_title', 'author_name', 'blog_text', 'time_created', 'time_published', 'time_modified','number_of_reads', 'number_of_likes') VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
    [articleTitle,articleAuthor,articleText, timeSt, modifiedInitialTime, publishedInitialTime, likes, views],
        function (err) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                res.redirect("/author/");
            }
        }
    );
});
/**
 * @desc Routes back to author home page with updated edits following form submission
 */
router.post("/edit/updated", (req, res, next) => {
    let articleId = req.body.name;
    let articleTitle = req.body.title;
    let articleText = req.body.articleText;
    let booleanValue = JSON.parse(req.body.boolean);
    let timeSt = Date();
    if(booleanValue === true)
    {
        global.db.all("UPDATE article_table SET blog_title = ?, blog_text = ?, time_modified = ? WHERE blog_id = ?;",
        [articleTitle,articleText,timeSt,articleId],
            function (err, rows) {
                if (err) {
                    console.error("No row found with the keyword you have entered");
                    next(err); //send the error on to the error handler
                } else {
                    res.redirect("/author/");
                }
            }
        );
    }
    else{
        global.db.all("UPDATE draft_article_table SET blog_title = ?, blog_text = ?, time_modified = ? WHERE blog_id = ?;",
        [articleTitle,articleText,timeSt,articleId],
            function (err, rows) {
                if (err) {
                    console.error("No row found with the keyword you have entered");
                    next(err); //send the error on to the error handler
                } else {
                    res.redirect("/author/");
                }
            }
        );
    }
});
/**
 * @desc Displays a settings page for the author to change the title / name of the article if it is a draft article
 */
router.post("/settings/draft", (req, res, next) => {
    let articleId = req.body.settings;
    global.db.all("SELECT * FROM draft_article_table WHERE blog_id LIKE ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                res.render("authorSettingsPage.ejs",{articleTable:rows, isPublished:false});
            }
        }
    );
});
/**
 * @desc Displays a settings page for the author to change the title / name of the article if it is a published article
 */
router.post("/settings/published", (req, res, next) => {
    let articleId = req.body.settings;
    global.db.all("SELECT * FROM article_table WHERE blog_id LIKE ?;",
    [articleId],
        function (err, rows) {
            if (err) {
                console.error("No row found with the keyword you have entered");
                next(err); //send the error on to the error handler
            } else {
                res.render("authorSettingsPage.ejs",{articleTable:rows, isPublished:true});
            }
        }
    );
});
/**
 * @desc Updates the specific tables depending on if they are published or draft when form is submitted. User sent back to author home page
 */
router.post("/settings/updated", (req, res, next) => {
    let articleId = req.body.name;
    let articleTitle = req.body.title;
    let articleAuthor = req.body.author;
    let booleanValue = JSON.parse(req.body.boolean);
    let timeSt = Date();

    if(booleanValue === true)
    {
        global.db.all("UPDATE article_table SET author_name = ?, blog_title = ?, time_modified = ? WHERE blog_id = ?;",
        [articleAuthor, articleTitle, timeSt, articleId],
            function (err, rows) {
                if (err) {
                    console.error("No row found with the keyword you have entered");
                    next(err); //send the error on to the error handler
                } else {
                    res.redirect("/author/");
                }
            }
        );
    }
    else{
        global.db.all("UPDATE draft_article_table SET author_name = ?, blog_title = ?, time_modified = ? WHERE blog_id = ?;",
        [articleAuthor, articleTitle, timeSt, articleId],
            function (err, rows) {
                if (err) {
                    console.error("No row found with the keyword you have entered");
                    next(err); //send the error on to the error handler
                } else {
                    res.redirect("/author/");
                }
            }
        );
    }
});
// Export the router object so index.js can access it
module.exports = router;