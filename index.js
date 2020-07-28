const express = require('express')
const fetch = require('node-fetch')
const notifier = require('node-notifier')
const path = require('path')


const app = express()
app.use(express.json())
var value = []
var str


fetch('https://api.covid19india.org/states_daily.json').then((res)=>{
    res.json().then(async(d)=>{
    
        try{
            const n = await Object.keys(d['states_daily']).length
            const date = await d['states_daily'][n-1]['date']
            console.log(date)
            str = date + `
            `
            for(var i = 3 ;i>=1;i--){
                if(d['states_daily'][n-i]['date'] == date){
                    value[d['states_daily'][n-i]['status']] = d['states_daily'][n-i]['kl'] 
                    str = str + `
` + d['states_daily'][n-i]['status'] + ' : ' + d['states_daily'][n-i]['kl']
                    if(i>1) { str =str +' | '}
                }
            }
            console.log(value)
            notifier.notify({
                title : 'Covid notifier',
                subtitle: 'ji',
                message : str,
                sound : true,
                timeout :20,
                icon: path.join(__dirname, 'images.png')
            }) 
        } 
// catch of try
        catch(e){
                console.log(e)
                }
   })
// catch promise
    }).catch((e)=>{
        console.log(e)
        notifier.notify({
            title : 'Covid notifier',
            message : 'connection failed'
        })
    })

 
    


app.listen(3001,()=>{
    console.log('listening on 3000')
})