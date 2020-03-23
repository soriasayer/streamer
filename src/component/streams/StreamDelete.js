import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends Component{

    componentDidMount() {
        this.props.fetchStream(this.props.id)
    }

    renderAction = () => {
        const {deleteStream, id} = this.props
        return (
          <Fragment>
                <button
                    onClick={() => deleteStream( id )}
                    className="ui button negative">Delete
                </button>
                <Link to="/" className="ui button">Cancel</Link>
          </Fragment>
        )
    }

    renderContent = () => {
        const { stream } = this.props
        if(!stream) {
            return 'Are you sure you want to the delete this stream?'
        }
        return `Are you sure you want the delete this to stream with title: ${stream.title}?`
    }
    
    render() {
       
        return (
            <Modal
              title="Delete Stream"
              content={this.renderContent()}
              actions={this.renderAction()}
              onDismiss={() => history.push('/')}
            />
        )
    }

}

const mapStateToprops = ( { streams }, ownProps ) => {
    const {id} = ownProps.match.params
    return {
        stream: streams[id],
        id
    }
}

export default connect(
    mapStateToprops,
    { fetchStream, deleteStream }
)( StreamDelete )
