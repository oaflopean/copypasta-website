var Pool = require('pg-pool')
const url=require('url');
const request=require('request');
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');
const config={
		user:auth[0],
		password:auth[1],
		host:params.hostname,
		port: params.port,
		database: params.pathname.split('/')[1],
		ssl:true
};
var summary, keywords, text, book;

var pool = new Pool(config);
	
	
		exports.txt = function(req, res){
	 	res.render('molecule/txt.txt'};
		exports.reader = function(req, res){
	

			   var alpha=parseInt(req.params.bookid, 10);
			   var queryText="SELECT * FROM fiction WHERE book_id = "+alpha+" LIMIT 1";
			   console.log(queryText)
				pool.connect(function(err, client, done) {
			client.query(queryText, function(err, result) {
				if(err){
				var title='Book not found';
				var summary="Sorry, but this book is not in our library."
				var text="";
				var keywords=[];
				result.title="Not found. Sorry.";
				result.author="";
				res.render('reader', {keyword:["Ebook reader, HTML novels, reading assistance, language data, public domain, English literature, fiction novels, classic authors"], title: title , result:result, bookid:req.params.bookid, pageid:req.params.pageid, summary:summary, keywords:keywords, text:pararray});
				}
				
				done();
				

				var page_url="http://cloud.copypastapublishing.com/babelli/paginated/"+req.params.bookid+"/page_"+req.params.pageid+".json";
				request(page_url, (err, response, body) =>{

					
//					let json = JSON.parse(body);
//					  return JSON.stringify(json)	})};
			//	
					try{
					var regex = /\\"/g;
					var regex2 =/\\n/g;
					console.log(JSON.stringify(JSON.parse(body).summary)+" SUMMARY _______");
									
					summary=JSON.stringify(JSON.parse(body).summary).slice(1, -1);
					text=JSON.stringify(JSON.parse(body).text).slice(1, -1);
					var keywords=[];
					for (b=0;b<JSON.parse(body).keywords.length;b++){
					keywords.push(JSON.parse(body).keywords[b]);}
					summary=summary.replace(regex,'\"').replace(regex2, ' ');
					text=text.replace(regex,'\"');
					var pararray=text.split("\\n")
					var newline=/\\n/g;
					var doublep=/<p><\/p>/g;				
					newline=text.replace(newline, '</p><p>').replace(doublep, '');
					keyword=["Ebook reader, HTML novels, reading assistance, language data, public domain, English literature, fiction novels, classic authors, favorite books, huge collection, gutenberg alternative, hybrid app, bootstrap reading, reader"]
					keyword.push("gutenberg id "+req.params.bookid)
	    			res.render('reader', { keyword:keyword, title: 'Reader : page '+req.params.pageid  , result:result, bookid:req.params.bookid, pageid:req.params.pageid, summary:summary, keywords:keywords, text:pararray});
					
				}
				catch (err){
 res.render('reader', { keyword:["Ebook reader, HTML novels, reading assistance, language data, public domain, English literature, fiction novels, classic authors"], title: 'Reader', result:result, bookid:req.params.bookid, pageid:req.params.pageid, summary:"You have reached the end of the book.", keywords:[""], text:["The End"]});				}

				});
			});
			
			});
			};