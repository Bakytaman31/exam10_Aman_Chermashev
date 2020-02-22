const path = require('path');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const nanoid = require('nanoid');

const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.uploadPath),
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/news',(req,res) => {
    const path = './news';
    const files = fs.readdirSync(path).reverse();
    const array = [];
    for (let i = 0; i < files.length; i++) {
        const file = fs.readFileSync(`./${path}/${files[i]}`);
        array.push(JSON.parse(file.toString()));
    }
    res.send(array);
});

router.get('/comments', (req, res) => {
    const id = req.query.newsId;
    const path = './comments';
    const files = fs.readdirSync(path).reverse();
    const array = [];
    for (let i = 0; i < files.length; i++) {
        const file = JSON.parse(fs.readFileSync(path + "/" + files[i]).toString());
        if (file.newsId === id){
            array.push(file);
        }
    }
    res.send(array);
});

router.get('/news/:id', (req, res) => {
    const path = './news';
    const id = req.params.id;
    const files = fs.readdirSync(path).reverse();
    for (let i = 0; i < files.length; i++) {
        const file = JSON.parse(fs.readFileSync(path + "/" + files[i]).toString());
        if (id === file.id) {
            res.send(file);
        }
    }
});

router.post('/news', upload.single('image'), async (req) => {
    const path = './news';
    const id = nanoid();
    const fileName = `${id}.json`;
    const news = req.body;
    if (req.file) {
        news.image = req.file.filename;
    }
    const obj = {
        id: id,
        title: news.title,
        content: news.content,
        datetime: news.datetime,
        image: news.image
    };
    fs.writeFileSync(`${path}/${fileName}`, JSON.stringify(obj, null, 2));
});

router.post('/comments', req => {
    const path = './comments';
    const id = nanoid();
    const fileName = `${id}.json`;
    const comment = req.body;
    const obj = {id: id, name: comment.name, comment: comment.comment, newsId: comment.newsId};
    fs.writeFileSync(`${path}/${fileName}`, JSON.stringify(obj, null, 2));

});

router.delete('/news/:id', req => {
    const path = './news';
    const id = req.params.id;
    const files = fs.readdirSync(path).reverse();
    for (let i = 0; i < files.length; i++) {
        const file = JSON.parse(fs.readFileSync(path + "/" + files[i]).toString());
        if (id === file.id) {
            fs.unlinkSync(`${path}/${file.id}.json`);
        }
    }
});

router.delete('/comments/:id', req => {
    const path = './comments';
    const id = req.params.id;
    const files = fs.readdirSync(path).reverse();
    for (let i = 0; i < files.length; i++) {
        const file = JSON.parse(fs.readFileSync(path + "/" + files[i]).toString());
        console.log(id, file.id);
        if (id === file.id) {
            fs.unlinkSync(`${path}/${file.id}.json`);
        }
    }
});

module.exports = router;
