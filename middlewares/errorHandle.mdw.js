module.exports = function(app){
    app.use((req,res,next)=>{
        res.render('error',{
            title: 'Error',
            style: 'style.css'
        });
        // res.send('You are lost');
    })
    app.use((err, req, res, next) => {
        // logic
        console.error(err.stack);
        // res.render('../views/login.hbs');
        res.status(500).send('View error in console');
    })
}