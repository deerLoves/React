import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor (props) {
    super(props);
    this.el = document.createElement('div');
  }
  componentDidMount () {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount () {
    modalRoot.removeChild(this.el);
  }

  render () {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      clicks: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState(state => ({
      clicks: state.clicks + 1
    }))
  }
  render () {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
        <InputBox />
      </div>
    )
  }
}

function Child () {
  return (
    <div className='modal'>
      <button>Click</button>
    </div>
  )
}

function InputBox () {
  const inputRef = useRef()
  function getXPosition () {
    console.log(inputRef.current.offsetLeft, inputRef.current.offsetTop)
  }
  return (
    <div ref={inputRef} onClick={getXPosition}>
      <input />
    </div>
  )
}

export default App;
