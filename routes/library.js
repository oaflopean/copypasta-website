var Pool = require('pg-pool')
const url=require('url');
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
var pool = new Pool(config);
	
//main search page
exports.library = function(req, res){
	if (req.params.page==undefined){page=0;}else{page=parseInt(req.params.page);}
	pool.connect(function(err, client, done) {
		var queryText="SELECT * FROM fiction ORDER BY book_id LIMIT 8 OFFSET "+(page*8).toString();
	client.query(queryText, function(err, result) {
	done();

    res.render('library', { keyword:["public domain, free ebooks, copypasta publishing, language data, html novels, cover art, classic novels, English literature, fiction collection"],title:'Copypasta Publishing: language data, html novels, fiction collection', title1: 'Copypasta Publishing: All', results:result, num:page, p_url:'/library/'});
    if(err) return console.error(err);
		   });});};
		
		   
//author search page
		   exports.browse_authors = function(req, res){
	if (req.params.page==undefined){page=0;}else{page=parseInt(req.params.page);}

			   var alpha= '\''+req.params.alpha.toUpperCase()+'%\'';
				   var queryText="SELECT DISTINCT(author) FROM fiction WHERE author LIKE "+alpha+" ORDER BY author LIMIT 8 OFFSET "+(page*8).toString();
					console.log(queryText);
				   pool.connect((err, client, done) => {
				  if (err) return done(err)

				  client.query(queryText, (err, result) => {
				    done()
				    if (err) {
				      return console.error('query error', err.message, err.stack)
				    }
//				    if (result==undefined){
//						res.render('index', { title: 'Search Results Not Found'+req.params.alpha, results:result });
//
//				    }
				    res.render('library_authors', {keyword:["prolific authors, public domain, writers, publishing, search books, ebook reader"],title:'Copypasta Publishing: language data, html novels, fiction collection', title1: 'author by alphabet letter '+req.params.alpha, results:result, num:page, p_url:'/library/authors/'+req.params.alpha+'/'});

				  })
				});}

//title search page
		   exports.browse_titles = function(req, res){
		   		if (req.params.page==undefined){page=0;}else{page=parseInt(req.params.page);}

			   var alpha= '\''+req.params.alpha.toUpperCase()+'%\'';
				var arr=[alpha];
				var queryText="SELECT * FROM fiction WHERE title LIKE "+alpha+" ORDER BY book_id LIMIT 8 OFFSET " +(page*8).toString();
				console.log(queryText);
				pool.connect((err, client, done) => {
				  if (err) return done(err)

				  client.query(queryText, (err, result) => {
				    done()
				    if (err) {
				      return console.error('query error', err.message, err.stack)
				    }
				    res.render('library', {  keyword:["public domain, free ebooks, copypasta publishing, language data, html novels, cover art, classic novels, English literature, fiction collection"],title:'Copypasta Publishing: language data, html novels, fiction collection', title1: 'title by alphabet letter '+req.params.alpha, results:result,  num:page, p_url:'/library/titles/'+req.params.alpha+'/'});
});

				  })
				};
//search query page
		   exports.search = function(req, res){
		   			   		if (req.params.page==undefined){page=0;}else{page=parseInt(req.params.page);}

			   var query= '\'%'+req.params.query.toLowerCase()+'%\'';
				var queryText="SELECT * FROM fiction WHERE lower(title) LIKE "+query+ " OR lower(author) LIKE "+query+ " OR lower(subjects) LIKE "+query+" ORDER BY book_id LIMIT 8 OFFSET "+(page*8).toString();
				console.log(queryText);
				pool.connect((err, client, done) => {
				  if (err) return done(err)

				  client.query(queryText, (err, result) => {
				    done()
				    if (err) {
				      return console.error('query error', err.message, err.stack)
				    }
				    res.render('library', {  keyword:["public domain, free ebooks, copypasta publishing, language data, html novels, cover art, classic novels, English literature, fiction collection"], title:'Copypasta Publishing: language data, html novels, fiction collection', title1: 'search results: '+req.params.query, results:result, num:page, p_url:'/library/search/'+req.params.query+'/' });

				  })
				});}