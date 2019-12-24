module.exports = function(app){
    app.use((req,res,next)=>{
        res.render('error',{
            title: 'Error',
            style: 'style.css'
        });
    })
    app.use((err, req, res, next) => {
        // logic
        console.error(err.stack);
        res.status(500).send('Some thing went wrong, please return');
    })
}