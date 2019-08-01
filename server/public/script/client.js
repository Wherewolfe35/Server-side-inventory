$(document).ready(handlerReady);

function handlerReady() {
  console.log('jquery is up and running');
  $('#inputBtn').on('click', addItems);
  $('#searchBtn').on('click', searchItem);
  $('#clearSearchBtn').on('click', getItems);
  getItems();
}

function getItems() {
  $('#searchItem').val('');
  console.log('getting items');
  $.ajax({
    method: 'GET',
    url: '/items',
  }).then((response) => {
    console.log('got items', response);
    renderItems(response);
  })
}

function addItems() {
  console.log('Posting Items');
  let newItem = {
    name: $('#newItem').val(),
    description: $('#itemDescription').val()
  }
  $.ajax({
    method: 'POST',
    url: '/items',
    data: newItem,
  }).then((response)=>{
    console.log('response posted ', response);
    getItems();
  })
  $('#newItem').val('');
  $('#itemDescription').val('');
}

function searchItem() {
  let searchString = $('#searchItem').val(); 
  console.log('searching for', searchString);
  $.ajax({
    method: 'POST',
    url: '/searchitems',
    data: { text: searchString}//receiving a string (needs to be an object)
  }).then((response) => {
    console.log('searching data', response);
    searchList(response);
  })
}

function renderItems(items) {
  $('#invList').empty(); // gets rid of old stuff
  for (const item of items) {
    $('#invList').append(`<li><img src="http://fc07.deviantart.net/fs42/f/2009/164/2/f/Free_Wolf_Icon_Template_by_RatRabbit.png">${item.name}: ${item.description}</li>`);
  }
}

function searchList(inv) {
  $('#invList').empty(); 
  for (const item of inv) {
    $('#invList').append(`<li><img src="http://fc07.deviantart.net/fs42/f/2009/164/2/f/Free_Wolf_Icon_Template_by_RatRabbit.png">${item.name}: ${item.description}</li>`);
  }
  if (inv === ''){
    $('#invList').append(`<li>No Matches :(</li>`);
  }
}