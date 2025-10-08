
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)
-- Create draft article table
CREATE TABLE IF NOT EXISTS draft_article_table (
    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
    blog_title TEXT NOT NULL,
    author_name TEXT NOT NULL,
    blog_text TEXT NOT NULL,
    time_created TEXT NOT NULL,
    time_published TEXT NOT NULL,
    time_modified TEXT NOT NULL,
    number_of_reads TEXT NOT NULL,
    number_of_likes TEXT NOT NULL
);
-- Create published article table
CREATE TABLE IF NOT EXISTS article_table (
    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
    blog_title TEXT NOT NULL,
    author_name TEXT NOT NULL,
    blog_text TEXT NOT NULL,
    time_created TEXT NOT NULL,
    time_published TEXT NOT NULL,
    time_modified TEXT NOT NULL,
    number_of_reads TEXT NOT NULL,
    number_of_likes TEXT NOT NULL
);
-- Create published comments table
CREATE TABLE IF NOT EXISTS comments_table (
    comments_id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id TEXT NOT NULL,
    comment_text TEXT NOT NULL,
    time_published TEXT NOT NULL,
    author_name TEXT NOT NULL
);

-- Insert default data (if necessary here)

-- Create initial articles
INSERT INTO article_table ('blog_title', 'author_name', 'blog_text', 'time_created', 'time_published', 'time_modified', 'number_of_reads', 'number_of_likes') VALUES ('A trip to Cornwall', 'Harold Landforth', 'What a great trip to Newquay in Cornwall we had. We went to Fistral Beach to surf and the waves were massive. I would highly recommend going.', 'Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)', 'Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)', 'Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)', 0, 0);
INSERT INTO article_table ('blog_title', 'author_name', 'blog_text', 'time_created', 'time_published', 'time_modified', 'number_of_reads', 'number_of_likes') VALUES ('Rome in 48 hours', 'Selena Kyle', 'Rome is a fascinating city full of ancient architecture like the collosseum and the otherworldly Vatican City. The coffee there is one of the best in the world, and the pizza was delicious.', 'Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)', 'Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)', 'Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)', 0, 0);

-- Create initial draft article
INSERT INTO draft_article_table ('blog_title', 'author_name', 'blog_text', 'time_created', 'time_published', 'time_modified', 'number_of_reads', 'number_of_likes') VALUES ('Croissants in Paris', 'Freddie Stoneflint', 'Eating croissants by the Seine on a bright September morning was a great way to start the day. Afterwards we journeyed to see the Eiffel Tower and then the Notre Dam cathedral which were very grand.','Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)', 'Not Yet Published','Not Yet Modified', 0, 0);
INSERT INTO draft_article_table ('blog_title', 'author_name', 'blog_text', 'time_created', 'time_published', 'time_modified', 'number_of_reads', 'number_of_likes') VALUES ('Croissants in Paris', 'Freddie Stoneflint', 'Eating croissants by the Seine on a bright September morning was a great way to start the day. Afterwards we journeyed to see the Eiffel Tower and then the Notre Dam cathedral which were very grand.','Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)', 'Not Yet Published','Not Yet Modified', 0, 0); 

-- Create initial comments
INSERT INTO comments_table ('parent_id', 'comment_text', 'time_published', 'author_name') VALUES (1, 'Hope you caught some big waves man!','Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)','Harry Dinhoonie');
INSERT INTO comments_table ('parent_id', 'comment_text', 'time_published', 'author_name') VALUES (2, 'I have heard its lovely and warm over in Italy!','Sun Jan 14 2024 18:22:28 GMT+0000 (Greenwich Mean Time)', 'Margaret Woods');

COMMIT;

