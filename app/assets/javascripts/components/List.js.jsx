class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      lists: []
    };

    this.baseUrl = 'http://localhost:3000' // TODO: change this
    this.directToList = this.directToList.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addList = this.addList.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.baseUrl}/all_lists`)
      .then((res) => {
        this.setState({ lists: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  directToList(list) {
    window.location = `/list_items/${list.id}`;
  }

  get Lists() {
    return this.state.lists.map((list, i) => {
      let listName = list.name;
      let listId = list.id

      return (
        <div key={i}>
          <li onClick={() => {this.directToList(list)}}>
            {listName}
          </li>
          <a onClick={(e) => this.deleteList(e, listId)}>delete?</a>
        </div>
      )
    });
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  addList(e) {
    e.preventDefault();

    // Deep copy
    let stateClone = jQuery.extend(true, {}, this.state);
    stateClone.value = stateClone.value.trim();

    axios({
      method: 'POST',
      url: `${this.baseUrl}/lists`,
      data: stateClone
    })
    .then((res) => {
      this.setState({
        lists: this.state.lists.concat(
          [{ name: this.state.value, id: res.data.id }]
        ),
        value: ''
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deleteList(e, listId) {
    e.preventDefault();

    axios.delete(`${this.baseUrl}/lists/${listId}`)
      .then(() => {
        let updatedLists = this.state.lists.filter((list) => list.id !== listId);

        this.setState({ lists: updatedLists });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <div>
        <ol>{this.Lists}</ol>
        <form onSubmit={this.addItemToList}>
          <div className="form-group">
            <label htmlFor="list">Add List</label>
            <input
              type="text"
              className="form-control"
              id="list"
              placeholder="Add a list."
              onChange={this.handleInputChange}
              value={this.state.value}
            />
          </div>
          <button
            type="submit"
            className="btn btn-default"
            onClick={this.addList}
          >Submit
          </button>
        </form>
      </div>
    )
  }
}