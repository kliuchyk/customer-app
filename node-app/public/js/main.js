document.addEventListener('DOMContentLoaded', function(e) {
    console.log("DOM fully loaded and parsed");
    const deleteBtn = document.querySelectorAll('a.delete-user');

    deleteBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            var confirmation = confirm('Are you sure?');

            if (confirmation) {
                $.ajax({
                    type: 'DELETE',
                    url: '/users/delete/' + $(this).data('id')
                }).done(function(response) {
                    window.location.replace('/');
                });
                window.location.replace('/');
            } else {
                return false;
            }
        })
    })

});

