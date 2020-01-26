const path = require('path')
const express = require('express');
const app = express();
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');//required for partials, not for views. 
const port = process.env.PORT||3000;
//defining path for express config
const pubicPathDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars view and engine location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(pubicPathDirectory));
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Abhishek Sharma'
    })
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Abhishek Sharma'
    });
});
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide an adress to fetch weather data for!!'
        })
    }
    geoCode(req.query.address,(error,data)=>{
        if(error)
        {
            return res.send({
                error:error
            });
        }
        else
        {
            //console.log(data.cityName);
            forecast(data.long,data.lat,data.cityName,(error,data)=>{
                if(error)
                {
                    return res.send(error);
                }
                else{
                    return res.send(data);
                }
            });
        }
    });
    // res.render('weather',{
    //     title:'Weather',
    //     name: 'Abhishek Sharma'
    // });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Abhishek Sharma'
    });
});
app.get('/help/*',(req,res)=>{
    res.render('404',{
        text:`Help page not found`
    });
});
// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:`It's clear and sunny outside`,
//         location:`Ghaziabad, Uttar Pradesh, India`
//     });
// });
app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Abhishek Sharma',
        text:`Page not found`
    })
})
app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`)
});
