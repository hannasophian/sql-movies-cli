import { question } from "readline-sync";
import { Client } from "pg";


const client = new Client({ database: 'omdb' }); //on local machine with default port

async function stringQuery() {
    console.log("Welcome to search-movies-cli!");

    await client.connect();
    console.log("Connected to database omdb");

    let continueSearch = true;
    
    while (continueSearch === true) {
    let searchString = question("Enter a search string:");
    if (searchString === 'q') {
        continueSearch = false;
    } else {
        // const queryText = "SELECT name FROM movies WHERE LOWER(name) LIKE $1 AND kind = 'movie' LIMIT 10;";
        const queryText = "SELECT id, name, date, runtime, budget, revenue, vote_average, votes_count FROM movies WHERE LOWER(name) LIKE $1 AND kind = 'movie' AND date IS NOT NULL ORDER BY date DESC LIMIT 15;"
        const result = await client.query(queryText, [`%${searchString.toLowerCase()}%`]);
        console.table(result.rows);
    }
    }
    await client.end();
    console.log("Disconnected")
}

stringQuery();