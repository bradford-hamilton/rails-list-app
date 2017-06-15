class ListItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      list_id: props.list.id,
      listItems: []
    };

    this.baseUrl = 'http://localhost:3000' // TODO: change this
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItemToList = this.addItemToList.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.baseUrl}/all_list_items?id=${this.state.list_id}`)
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
      let itemName = item.name;

      return (
        <li key={i}>
          {itemName}
          <a onClick={(e) => this.deleteListItem(e, itemName)}> delete?</a>
        </li>
      )
    });
  }

  deleteListItem(e, itemName) {
    e.preventDefault();

    axios.delete(`${this.baseUrl}/lists/${itemName}`)
      .then(() => {
        let updatedListItems = this.state.listItems.filter((item) => item.name !== itemName);

        this.setState({ listItems: updatedListItems });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  addItemToList(e) {
    e.preventDefault();

    // Deep copy
    let stateClone = jQuery.extend(true, {}, this.state);
    stateClone.value = stateClone.value.trim();

    axios.post(`${this.baseUrl}/lists`, stateClone)
      .then(() => {
        this.setState({
          listItems: this.state.listItems.concat([{ name: this.state.value }]),
          value: ''
        });
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