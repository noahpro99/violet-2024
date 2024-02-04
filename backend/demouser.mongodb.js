/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('maternal_health_db');

// Search for documents in the current collection.
db.getCollection('results').deleteMany({
    user_id: "YXnmONoerANQAOWtJe8tIg"
});