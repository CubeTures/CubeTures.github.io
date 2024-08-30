# Responsive Design

-   Start designing for mobile and grow from there
-   Breakpoints for book list grid
-   Book covers
    -   Every book will be 200w x 300h with respect to the current scale of the column
    -   Each uploaded book cover will fit until its largest dimension reaches the size of the book
    -   The background will be the average color of the image, coloring in the rest of the dead space

# Goals

-   Basic features
-   User supplied genres
    -   Propose a genre and get enough votes to get it passed as a website-wide feature
    -   Propose and vote to remove a genre or change its classification
    -   Vote to add or remove a genre or tag from an existing book
-   Authentication
-   Ranking system
    -   People can submit multiple different versions of cover images, summaries and the highest votes ones get displayed
-   Reputation system
    -   People with high enough reputation get access to particular roles
    -   See reports, accept tags and genres, etc.
-   Suggestion Algorithm??
    -   Readers record which books they've read and their rating of them, then get suggested more books like they like

# Useful Libraries

-   [fast-average-color](https://www.npmjs.com/package/fast-average-color?activeTab=readme)
