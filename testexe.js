exports.__$init__$ =function(argc, argv){
  //-- setup in/out streams --//
  var __$stream__$ =function(){
    this.stdoutData =""
  };
  __$stream__$.prototype.stdout =function(){ return this.stdoutData; };

  //-- setup stdout functions --//
  var __$stdout__$ =function(){
    //...
  };
  __$stdout__$.prototype.write =function(string){ System.stream.stdoutData +=string; };

  var __$system__$ =function(){
    //...
  };
  __$system__$.prototype.stream =new __$stream__$();
  __$system__$.prototype.stdout =new __$stdout__$();

  var System =new __$system__$();
  //-- load user functions into runtime --//
  var __$runtime__$ =function(){
    //...
  };
  __$runtime__$.prototype.main =function(argc, argv){
    System.stdout.write("Test execution successful with System call and argc ="+argc+"; argv =["+argv[0]+","+argv[1]+"]");
    return;
  };

  //-- assign runtime to self --//
  this.runtime =new __$runtime__$();

  //-- execute self (will be done in new thread) --//
  this.runtime.main(argc, argv);

  //-- make return values available --//
  this.stream =System.stream;
}

