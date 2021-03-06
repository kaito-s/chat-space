$(function() {
    function buildMessage(message) {
    var image = "";
    var image = message.image ? `<img src="${message.image}">` : "";
      var html =  `<div class="main__chat__box" data-id="${message.id}">
                      <div class="main__chat__box--name">
                        ${message.user_name}
                      </div>
                      <div class="main__chat__box--date">
                        ${message.created_at}
                      </div>
                      <div class="main__chat__box--message">
                        ${message.content}
                      </div>
                    </div>
                  <div class="main__chat__box--image">
                    ${image} 
                  
                  </div>`
                  
      return html;
    }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(chat) {
    var html = buildMessage(chat);
      $('.main__chat').append(html);
      $("form")[0].reset();
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
      })
  .fail(function() {
    alert('エラー');
  })
  .always(function(message, image) {
    $('.main__form__box__btn').prop('disabled', false);
  })
  })
  
  var reloadMessages = function() {
    if(window.location.href.match(/\/groups\/\d+\/messages/)) {
    
    var last_message_id = $('.main__chat__box').last().data('id')
    console.log(last_message_id);
      
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
      
        })
    .done(function(messages) {
      var insertHTML = '';
        messages.forEach(function(message){
        insertHTML = buildMessage(message);
        $('.main__chat').append(insertHTML);
        
        $("form")[0].reset();
        $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
        });
      })
      };
      
}
  setInterval(reloadMessages, 5000);
});