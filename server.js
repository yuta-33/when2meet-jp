const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'contrast.json');

// APIルート
app.get('/api/data', (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) return res.status(500).json({ error: 'データ読み込みエラー' });
    res.json(JSON.parse(data));
  });
});

app.post('/api/data', (req, res) => {
  fs.writeFile(dataFilePath, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).json({ error: 'データ書き込みエラー' });
    res.json({ status: 'ok' });
  });
});

// 本番用：Reactビルドファイル配信
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
