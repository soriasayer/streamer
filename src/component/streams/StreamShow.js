import React, { Component } from 'react'
import flv from 'flv.js'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamShow extends Component {
  constructor(props) {
    super()

    this.videoRef = React.createRef()
  }
  componentDidMount() {
    const { id } = this.props
    this.props.fetchStream(id)
    this.buildPlayer()
  }

  componentDidUpdate() {
    this.buildPlayer()
  }
    
    componentWillUnmount() {
        this.player.destroy()
    }

  buildPlayer = () => {
    if (this.player || !this.props.stream) {
      return null
    }
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${this.props.id}.flv`,
    })
    this.player.attachMediaElement(this.videoRef.current)
    this.player.load()
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>
    }

    const { title, description } = this.props.stream

    return (
      <div>
        <video
          ref={this.videoRef}
          style={{ width: '100%' }}
          controls
        />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )
  }
}

const mapStateToProps = ({ streams }, ownProps) => {
  const { id } = ownProps.match.params
  return {
    stream: streams[id],
    id,
  }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)
