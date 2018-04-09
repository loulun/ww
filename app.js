var express=require('express')
var mysql=require('mysql')
var bodyparser = require('body-parser')
var app=express()
app.use(bodyparser.urlencoded({}))
var pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'item',
	port:3306
})
app.post('/',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql=`select * from moban where state=${req.body.state}`
		connection.query(sql,(err,data)=>{
			if(err){
				console.log(err)
				return
			}
			res.send(data)
			connection.end()
		})
	})
})
//删除
app.post('/del',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql=`delete from moban where id=${req.body.id}`
		connection.query(sql,(err,data)=>{
			if(err){
				console.log(err)
				return
			}
			res.send(data)
			connection.end()
		})
	})
})

//添加
app.post('/add',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.body
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql=`insert into moban (name,sex,state) value(?,?,?)`
		connection.query(sql,[json.name,json.sex,json.state],(err,data)=>{
			if(err){
				console.log(err)
				return
			}
			res.send(data)
			connection.end()
		})
	})
})
app.listen(3000,function(){
	console.log('ok')
})