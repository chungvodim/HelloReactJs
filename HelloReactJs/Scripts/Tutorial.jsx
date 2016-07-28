//-CommentBox
//  - CommentList
//    - Comment
//    - Comment
//    - Comment
//  - CommentForm
var data = [
  { Author: "Daniel Lo Nigro", Text: "Hello ReactJS.NET World!" },
  { Author: "Pete Hunt", Text: "This is one comment" },
  { Author: "Jordan Walke", Text: "This is *another* comment" }
];
//<CommentList data={this.props.data} />
// this.props are immutable. They are passed from the parent and are "owned" by the parent.
// this.state is private to the component and can be changed by calling this.setState()
var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    handleCommentSubmit: function (comment) {
        // submit to the server and refresh the list
        var data = new FormData();
        data.append('Author', comment.Author);
        data.append('Text', comment.Text);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadCommentsFromServer();
        }.bind(this);
        xhr.send(data);
    },
    getInitialState: function () {
        return { data: [] };
    },
    displayName: 'CommentBox',
    // componentWillMount() loads the data from our XMLHttpRequest and assigns it to the data variable.Finally, it sets the data variable in state, using setState().
    //componentWillMount: function () {
    //    var xhr = new XMLHttpRequest();
    //    xhr.open('get', this.props.url, true);
    //    xhr.onload = function () {
    //        var data = JSON.parse(xhr.responseText);
    //        this.setState({ data: data });
    //    }.bind(this);
    //    xhr.send();
    //},
    componentDidMount: function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
          <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
          </div>
        );
    },
    //render: function () {
    //    return (
    //      React.createElement('div', { className: "commentBox" },"Hello, world! I am a CommentBox."
    //      )
    //    );
    //}
});
var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.Author}>{comment.Text}</Comment>
            );
        });
        return (
            <div className="commentList">
                { commentNodes }
            </div>
            //<div className="commentList">
            //  <Comment author="Daniel Lo Nigro">Hello ReactJS.NET World!</Comment>
            //  <Comment author="Pete Hunt">This is one comment</Comment>
            //  <Comment author="Jordan Walke">This is *another* comment</Comment>
            //</div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        // this.refs to reference the component
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        // Send request to the server
        this.props.onCommentSubmit({ Author: author, Text: text });
        // Reset
        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    },
    render: function () {
        // We use the ref attribute to assign a name to a child component
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var Comment = React.createClass({
    render: function () {
        var converter = new Showdown.converter();
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
          <div className="comment">
            <h2 className="commentAuthor">{this.props.author}</h2>
              {this.props.children}
              <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
          </div>
      );
    }
});

//ReactDOM.render(
//    <CommentBox data={data } />,
//    document.getElementById('content')
//);

ReactDOM.render(
    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
    document.getElementById('content')
);

/*equivalent*/
//ReactDOM.render(
//  React.createElement(CommentBox, null),
//  document.getElementById('content')
//);