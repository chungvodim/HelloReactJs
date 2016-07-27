var data = [
  { Author: "Daniel Lo Nigro", Text: "Hello ReactJS.NET World!" },
  { Author: "Pete Hunt", Text: "This is one comment" },
  { Author: "Jordan Walke", Text: "This is *another* comment" }
];

var CommentBox = React.createClass({
    displayName: 'CommentBox',
    render: function() {
        return (
          <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.props.data} />
            <CommentForm />
          </div>
        );
    },
    /*equivalent*/
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

ReactDOM.render(<CommentBox data={data} />,document.getElementById('content'));
/*equivalent*/
//ReactDOM.render(
//  React.createElement(CommentBox, null),
//  document.getElementById('content')
//);