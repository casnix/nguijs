// requires
var http =require('http');

// dependent variables
var $Program ="ngui.server";
var $process ="ngui.server.reporter";
var $http3k ="3000:http:3000";
var $3kOut ="3000->out";

// dependent functions
function xprintnl(msg){
  process.stdout.write($Program+"@"+DateTime[0]()+"$> ["+msg[0]+" -- "+msg[1]+"]\n");
}

var DateTime =[
  function(){
    return (new Date()).toJSON().slice(0,19).replace(/[-T]/g, ':');
  },
];

function execTestJS(){
  var execHook =require('./testexe');
  var retVal =new execHook.__$init__$(2, ['./testexe','test\n']); // Will change to __$init__$(scalld_port, procId, argc, argv);
  //-- destroy the exechook/require --//
  execHook =0;
  return retVal.stream.stdout();
}

/*-- example
export.__$init__$(argc, argv){
  
  //-- setup in/out streams --//
  var __$stream__$ =function(){
    this.stdoutData =""
  };
  __$stream__$.prototype.stdout =function(){ return this.stdoutData; };
  
  //-- assign stream to self --//
  this.stream =new __$stream__$();

  //-- setup stdout functions --//
  var __$stdout__$ =function(){
    //...
  };
  __$stdout__$.prototype.write =function(string){ this.stream.stdoutData +=string; };

  //-- assign stdout to self --//
  this.stdout =new __$stdout__$();

  //-- load user functions into runtime --//
  var __$runtime__$ =function(){
    //...
  };
  __$runtime__$.prototype.main =function(argc, argv){
    this.stdout.write("Test execution successful with argc ="+argc+"; argv =["+argv[0]+","+argv[1]+"]");
    return;
  };

  //-- assign runtime to self --//
  this.runtime =new __$runtime__$();

  //-- execute self (will be done in new thread) --//
  this.runtime.main(argc, argv);
}
--*/

http.createServer(function (req, res) {
  xprintnl([$http3k, "taken listener (below)"]);
  xprintnl([$http3k, "LISTENER req.url: "+req.url]);

  if(req.url =="/favicon.ico"){
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('I know nothing\n');
    xprintnl([$3kOut, "responded with ignorance"]);
    return;
  }else if(req.url =="/$todo"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Todo:<br />Add time stamps to console output and logs<br />Add logs lol');
    xprintnl([$3kOut, "served todo list"]);
    return;
  }else if(req.url =="/exec/test.js"){
    var r =execTestJS();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(r);
    xprintnl([$3kOut, 'served executions']);
    return;
  }

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Apache!\n');
  xprintnl([$3kOut, "responded to query"]);
}).listen(3000, '127.0.0.1');
xprintnl([$process, "Running listener on port 3000"]);
