const express = require('express');
const mysql = require('mysql2');
const app = express();

// إعداد محرك عرض EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// تحليل جسم الطلب
app.use(express.urlencoded({ extended: false }));


// تكوين قاعدة البيانات
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_list'
});

// عرض قائمة المهام
app.get('/', (req, res) => {
  connection.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    res.render('index', { tasks: results });
  });
});

// إضافة مهمة جديدة
app.post('/add', (req, res) => {
  const taskName = req.body.taskName;
  connection.query('INSERT INTO tasks (name) VALUES (?)', [taskName], (error) => {
    if (error) {
      console.error(error);
      return;
    }
    res.redirect('/');
  });
});

// حذف مهمة
app.get('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  connection.query('DELETE FROM tasks WHERE id = ?', [taskId], (error) => {
    if (error) {
      console.error(error);
      return;
    }
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
