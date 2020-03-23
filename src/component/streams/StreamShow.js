import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'
import streams from '../../actions/api/streams'

class StreamShow extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.id)
    }

    render() {
      
        if(!this.props.stream) {
            return <div>Loading</div>
        }

        const {title, description} = this.props.stream

        return (
            <div>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = ( { streams }, ownProps ) => {
    const {id} = ownProps.match.params
    return {
        stream: streams[id],
        id
    }
}

export default connect(
    mapStateToProps,
    { fetchStream }
)( StreamShow )
