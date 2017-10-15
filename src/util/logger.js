export default function(message, parameter, type) {
  switch(type){
    case 'reducer':
      console.log('\n---Logger----');
      console.log('reducer.' + message);
      if(parameter) console.log(parameter);
      console.log('---------------\n\n');
      break;
    default:
      console.log('\n---Logger');
      console.log(message);
      if(parameter) console.log(parameter);
      console.log('     ---------------\n');
  }
}