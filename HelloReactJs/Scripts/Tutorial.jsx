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
        xhr.open('get', this.props.myUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
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
            <CommentForm />
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
    render: function() {
        return (
          <div className="commentForm">
            Hello, world! I am a CommentForm.
          </div>
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
    <CommentBox myUrl="/comments" pollInterval={2000} />,
    document.getElementById('content')
);

/*equivalent*/
//ReactDOM.render(
//  React.createElement(CommentBox, null),
//  document.getElementById('content')
//);