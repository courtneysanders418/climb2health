  'use strict'

$(document).ready(function(){
    $('.parallax').parallax();
  });




  $(document).ready(() => {
    $('select').material_select()
    editPostListener()
    deletePostListener()
  })

  const id = parseInt(window.location.pathname.split('/')[2])


  function editPostListener(){
    $('#edit-post-btn').click((e) => {
      console.log('clicked');
      e.preventDefault()
      const user_id = $('#user_id').val().trim()
      const title = $('#title').val().trim()
      const content = $('#content').val().trim()
      const image_url = $('#image_url').val().trim()
      $.ajax({
        contentType: 'application/json',
        url: `/posts/${id}`,
        method: 'PATCH',
        dataType: 'json',
        data: JSON.stringify({user_id, title, content, image_url})
      }).done(() => {
        console.log('here')
        window.location ='/posts'
      }).fail(err => {
        console.log(err)
      })
    })
  }

  function deletePostListener(){
    $('#delete-post-btn').click((e) => {
      e.preventDefault()
      $.ajax({
        contentType: 'application/json',
        url: `/posts/${id}`,
        method: 'DELETE'
      }).done(() => {
        window.location = '/posts'
      }).fail(err => {
        console.log(err)
      })
    })
  }
