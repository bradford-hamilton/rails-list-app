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
      let itemId = item.id;

      return (
        <li key={i}>
          {itemName}
          <a onClick={(e) => this.deleteListItem(e, itemId)}> delete?</a>
        </li>
      )
    });
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  addItemToList(e) {
    e.preventDefault();

    if (this.state.value.trim() === '') return;

    // Deep copy
    let stateClone = jQuery.extend(true, {}, this.state);

    stateClone.value = stateClone.value.trim();

    axios({
      method: 'POST',
      url: `${this.baseUrl}/list_items`,
      data: stateClone
    })
    .then((res) => {
      this.setState({
        listItems: this.state.listItems.concat(
          [{ name: this.state.value, id: res.data.id }]
        ),
        value: ''
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deleteListItem(e, itemId) {
    e.preventDefault();

    axios.delete(`${this.baseUrl}/list_items/${itemId}`)
      .then(() => {
        let updatedListItems = this.state.listItems.filter((item) => item.id !== itemId);

        this.setState({ listItems: updatedListItems });
      })
      .catch((err) => {
        console.log(err)
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