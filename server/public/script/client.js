$(document).ready(handlerReady);

function handlerReady() {
  console.log('jquery is up and running');
  $('#inputBtn').on('click', getItems);
}

function getItems() {
  console.log('getting items');
  
  $.ajax({
    method: 'GET',
    url: '/items'
  }).then((response)=>{
    console.log('got items', response);
  })
}