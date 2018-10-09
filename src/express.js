const http = require('http');

function express() {
    const funcs = [];

    const expr = function(req, res) {
        let i = 0;
        console.log(req.url);
        function next() {
            const task = funcs[i++];
            if (!task) return;
            task(req, res, next);
        }
        next();
    }

    expr.use = function(f) {
        funcs.push(f);
    };

    return expr;
}

const app = express();
app.use(function(req, res, next) {
    console.log('111111');
    next();
});

app.use(function(req, res, next) {
    console.log('222222');
    next();
});

app.use(function(req, res) {
    res.end('there is nothing happened!');
});

http.createServer(app).listen(3000, function() {
    console.log('listen: 127.0.0.1:3000');
});
