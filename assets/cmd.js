function toHtmlBullet(str){
  str = color(str);
  str = size(str);
  str = bold(str);
  str = del(str);
  return str;
}

function toHtmlText(str){
  str = color(str);
  str = size(str);
  str = bold(str);
  str = del(str);
  return str;
}

function color(str){
  var cmd = str.split(' ')[0];
  switch(cmd){
  case '/red':
    str = str.substr('/red'.length + 1, str.length);
    str = '<font color="red">' + str + '</font>';
    break;
  case '/blue':
    str = str.substr('/blue'.length + 1, str.length);
    str = '<font color="blue">' + str + '</font>';
    break;
  case '/green':
    str = str.substr('/green'.length + 1, str.length);
    str = '<font color="green">' + str + '</font>';
    break;
  }
  return str;
}

function size(str){
  var match = str.match(/^#+/);
  if (match != null) {
    var pounds = match[0];
    var n = pounds.length;
    if (n<=6)
      str = '<h' + n + '>' + str.replace(/#+/,'') + '</h' + n + '>'; 
  } else {
    match = str.match(/">#+/);
    if (match != null) {
      var pounds = match[0].substr(2, match[0].length);
      var n = pounds.length;
      if (n<=6)
        str = '<h' + n + '>' + str.replace(/#+/,'') + '</h' + n + '>'; 
    }
  }
  return str;
}

function bold(str){
  var n = str.search(/\*\*.+\*\*/);
  while( n > -1 ){
    var s = str.substr(n, str.length).replace('**','<strong>').replace('**','</strong>');
    str = str.substr(0, n) + s;
    n = str.search(/\*\*.+\*\*/);
  }
  return str;
}

function del(str){
  var n = str.search(/--.+--/);
  while( n > -1 ){
    var s = str.substr(n, str.length).replace('--','<del>').replace('--','</del>');
    str = str.substr(0, n) + s;
    n = str.search(/--.+--/);
  }
  return str;
}
