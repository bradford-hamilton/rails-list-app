class List extends React.Component {
  constructor(props) {
    super(props);

    this.directToList = this.directToList.bind(this);
  }

  directToList(list) {
    window.location = `/lists/${list.id}`;
  }

  get Lists() {
    return this.props.lists.map((list, i) => {
      return (
        <li key={i} onClick={() => {this.directToList(list)}}>{list.name}</li>
      )
    });
  }

  render() {
    return <ol>{this.Lists}</ol>;
  }
}