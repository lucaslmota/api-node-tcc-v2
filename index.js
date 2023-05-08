const express = require('express');
const { uuid } = require('uuidv4');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

// informar que nossa api vai recber informações no formato JSON
app.use(express.json(), bodyParser.json());

const log = fs.createWriteStream(
    path.join(__dirname, './logs', 'express.log'),
    { flags: 'a' },
);

morganBody(app, {
    noColors: true,
    stream: log,
});

const projects = [];

app.get('/projects', (request, response) => {
    // const { title, owner } = request.query;
    response.json(projects);
});

app.get('/projects/:id', (request, response) => {
    const { id } = request.params;
    const projectIndex = projects.findIndex(project => project.id === id);

    return response.json(projects[projectIndex]);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);
    return response.json([project]);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Projeto não encontrado.' });
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;
    return response.json([project]);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Projeto não encontrados.' });
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});
// app.listen(3333);

app.listen(port, () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    console.info(`HelloNode app listening on port teste ${port}!`),
);

module.exports = app;
