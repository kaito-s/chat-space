$(function() {
    function buildMessage(message) {
      var html =  `<div class="main__chat__box">
      <div class="main__chat__box--name">
      ${message.user_name}
      </div>
      <div class="main__chat__box--date">
      ${message.created_at}
      </div>
      <div class="main__chat__box--message">
      ${message.content}
      </div>
      </div>`
      return html;
    }



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(message, image) {
    var html = buildMessage(message, image);
      $('.main__chat').append(html);
      $('#message_content').val('')
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
      
  })
  .fail(function() {
    alert('エラー');
  })
  .always(function(message, image) {
    $('.main__form__box__btn').prop('disabled', false);
  })
  })
});