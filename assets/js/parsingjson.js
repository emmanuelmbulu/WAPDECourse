const FEEDBACK_FOR_INPUT_MISSING = "Please provide an userID";
const FEEDBACK_FOR_INVALID_INPUT = "Please provide a valid userID";
const FEEDBACK_FOR_USER_NOT_FOUND = "Unknown userID. Please provide a user name between 1 and 10";

const TEXT_SHOW_COMMENTS = "Show comments";
const TEXT_HIDE_COMMENTS = "Hide comments";

window.onload = function() {
    $(() => {
        $('#btn-submit').click(submitUserId);
    });

    function displayButtonLoading() {
        $('#btn-submit').addClass('d-none');
        $('#btn-loading').removeClass('d-none');
    }

    function hideButtonLoading() {
        $('#btn-submit').removeClass('d-none');
        $('#btn-loading').addClass('d-none');
    }

    function submitUserId() {
        displayButtonLoading();

        hideEssential();

        let userId = $('#input-id').val();

        if(typeof userId === 'undefined' || userId.length === 0) {
            $('#validation-input-feedback').html(FEEDBACK_FOR_INPUT_MISSING);
            $('#error-notification-container').removeClass("d-none");
            hideButtonLoading();
            return;
        }

        userId = parseInt(userId);
        if(isNaN(userId)) {
            $('#validation-input-feedback').html(FEEDBACK_FOR_INVALID_INPUT);
            $('#error-notification-container').removeClass("d-none");
            hideButtonLoading();
            return;
        }

        $('#error-notification-container').addClass("d-none");
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users/' + userId,
            dataType: "json",
            statusCode: {
                404: handleNotFound,
                200: handleUserInformation
            }
        });
    }

    function handleNotFound() {
        $('#validation-input-feedback').html(FEEDBACK_FOR_USER_NOT_FOUND);
        $('#error-notification-container').removeClass("d-none");
        hideEssential();
        hideButtonLoading();
    }

    function handleUserInformation(user) {
        hideButtonLoading();
        
        $('#user-name').html(user.name);
        $('#user-email').html(user.email);

        const address = user.address;
        $('#user-address').html(`${address.suite}, ${address.street}, ${address.city}<br>ZIP CODE: ${address.zipcode}`);

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users/' + user.id + '/posts',
            dataType: "json"
        }).done(handleUserPosts);
    }

    function handleUserPosts(data) {
        const postList = $('#list-of-posts');
        postList.html('');

        data.forEach(element => {
            postList.append(createPostItem(element));
        });
        $('#block-data').removeClass('d-none');
    }

    function createPostItem(post) {
        const container = $('<a>');
        container.addClass('list-group-item list-group-item-action');
        container.attr('href', '#');
        container.attr('id', 'post-' + post.id);

        const div = $('<div>');
        div.addClass('d-flex w-100 justify-content-between');

        const h5 = $('<h5>');
        h5.addClass('mb-1');
        h5.html(post.title);

        div.append(h5);
        container.append(div);

        const paragraph = $('<p>');
        paragraph.addClass('mt-2 mb-1');
        paragraph.html(post.body);
        container.append(paragraph);

        const button = $('<button>');
        button.addClass('btn btn-sm btn-primary mt-2');
        button.html(TEXT_SHOW_COMMENTS);
        container.append(button);

        container.click(showComment.bind(null, [post.id]));
        return container;
    }

    function showComment(postId) {
        showCommentLoader();

        $('#list-of-posts button').addClass('btn-primary');
        $('#list-of-posts button').removeClass('btn-light');
        $('#list-of-posts button').html(TEXT_SHOW_COMMENTS);

        $('#list-of-posts > a').removeClass('active');
        $('#post-' + postId).addClass('active');

        $('#post-' + postId + ' button').addClass('btn-light');
        $('#post-' + postId + ' button').html(TEXT_HIDE_COMMENTS);
        $('#post-' + postId).off('click');
        $('#post-' + postId).click(hideComment.bind(null, [postId]));

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/post/' + postId + '/comments',
            dataType: "json"
        }).done(handleComments);
    }

    function hideComment(postId) {
        $('#col-comments').addClass('d-none');
        
        $('#post-' + postId + ' button').removeClass('btn-light');
        $('#post-' + postId + ' button').addClass('btn-primary');
        $('#post-' + postId + ' button').html(TEXT_SHOW_COMMENTS);

        $('#post-' + postId).removeClass('active');
        $('#post-' + postId).off('click');
        $('#post-' + postId).click(showComment.bind(null, [postId]));
    }

    function handleComments(data) {
        const commentList = $('#list-of-comments');
        commentList.html('');

        data.forEach(element => {
            commentList.append(createCommentItem(element));
        });
        hideCommentsLoader();
        $('#col-comments').removeClass('d-none');
    }

    function createCommentItem(comment) {
        const container = $('<a>');
        container.addClass('list-group-item list-group-item-action');
        container.attr('href', '#');

        /*const div = $('<div>');
        div.addClass('d-flex w-100 justify-content-between');

        const h5 = $('<h5>');
        h5.addClass('mb-1');
        h5.html(comment.name);

        div.append(h5);
        container.append(div);*/

        const figure = $('<figure>');
        figure.addClass('mt-2 mb-1');

        const blockquote = $('<blockquote>');
        blockquote.addClass('blockquote fs-6');

        const paragraph = $('<p>');
        paragraph.html(comment.body);
        blockquote.append(paragraph);
        figure.append(blockquote);

        const figcaption = $('<figcaption>');
        figcaption.addClass('blockquote-footer mt-1');
        figcaption.html(`By ${comment.email}`);
        figure.append(figcaption);

        /*const small = $('<small>');
        small.addClass('mt-2');
        small.html(`By ${comment.email}`);*/

        container.append(figure);

        return container;
    }

    function hideEssential() {
        $('#col-comments').addClass('d-none');
        $('#block-data').addClass('d-none');
    }

    function hideCommentsLoader() {
        $('#comments-loader').removeClass('d-flex');
        $('#comments-loader').addClass('d-none');
    }

    function showCommentLoader() {
        $('#comments-loader').removeClass('d-none');
        $('#comments-loader').addClass('d-flex');
    }
};

