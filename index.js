const express = require('express')
const fetch = require('node-fetch')
const notifier = require('node-notifier')

const app = express()
app.use(express.json())
var value = []


fetch('https://api.covid19india.org/states_daily.json').then((res)=>{
    res.json().then(async(d)=>{
    
        try{
    const n = await Object.keys(d['states_daily']).length
    const date = await d['states_daily'][n-1]['date']
    console.log(date)
    for(var i = 1 ;i<=3;i++){
        if(d['states_daily'][n-i]['date'] == date){
            value[d['states_daily'][n-i]['status']] = d['states_daily'][n-i]['kl'] }
    }

    console.log(value)
        } catch(e){
            console.log(e)
            }
    })
    }).catch((e)=>{
        console.log(e)
        notifier.notify({
            title : 'Covid notifier',
            message : 'connection failed'
        })
    })


    if(value.length){
        notifier.notify({
            title : 'Covid notifier',
            message : 'msgga',
            sound : true,
         //r   icon : path.join(__dirname, 'icon.jpg'),
        }) 
    }
    
/*
app.get('/',(req,res)=>{
    res.send(data['states_daily'])
    const n = Object.keys(data['states_daily']).length
    console.log(n)
})
*/

app.listen(3001,()=>{
    console.log('listening on 3000')
})