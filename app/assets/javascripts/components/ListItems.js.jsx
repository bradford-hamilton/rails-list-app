class ListItems extends React.Component {
  constructor(props) {
    super(props);
  }

  get ListName() {
    return <h3>{this.props.list.name}</h3>;
  }

  get ListItems() {
    console.log(this.props)
    return this.props.listItems.map((item, i) => {
      return <li key={i}>{item.name}</li>;
    });
  }

  render() {
    return (
      <div>
        {this.ListName}
        <ol>
          {this.ListItems}
        </ol>
      </div>
    )
  }
}