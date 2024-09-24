const express = require('express');
const app = express();
const path = require('path');

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/:lang', (req, res) => {
    const lang = req.params.lang;
    if (lang === 'pl') {
        res.sendFile(path.join(__dirname, 'views', 'index_pl.html'));
    } else {
        res.sendFile(path.join(__dirname, 'views', 'index_en.html'));
    }
});

app.get('/', (req, res) => {
    res.redirect('/en');
});

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const cards = document.querySelectorAll('.flip-card-inner');

cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
