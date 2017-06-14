class ListItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      list_id: props.list.id,
      listItems: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItemToList = this.addItemToList.bind(this);
  }

  componentDidMount() {
    return axios.get(`http://localhost:3000/all_list_items?id=${this.state.list_id}`)
      .then((res) => {
        this.setState({ listItems: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get ListName() {
    return <h3>{this.props.list.name}</h3>;
  }

  get ListItems() {
    return this.state.listItems.map((item, i) => {
      return <li key={i}>{item.name}</li>;
    });
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  addItemToList(e) {
    e.preventDefault();

    return axios.post('http://localhost:3000/lists', this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.ListName}
        <ol>
          {this.ListItems}
        </ol>
        <form onSubmit={this.addItemToList}>
          <div className="form-group">
            <label htmlFor="listItem">Add item to list</label>
            <input
              type="text"
              className="form-control"
              id="listItem"
              placeholder="Add a list item."
              onChange={this.handleInputChange}
              value={this.state.value}
            />
          </div>
          <button
            type="submit"
            className="btn btn-default"
            onClick={this.addItemToList}
          >Submit
          </button>
        </form>
      </div>
    )
  }
}