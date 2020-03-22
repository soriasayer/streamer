import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.id)
    }

    onSubmit = formValues => {
        const { editStream, id } = this.props
        
        editStream(id, formValues)
    }

    render() {
        const { stream } = this.props
        if(!stream) {
            return <div>Loding</div>
        }

        return(
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    initialValues={_.pick(stream, 'title', 'description') }
                    onSubmit={this.onSubmit}
                />
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
    { fetchStream, editStream }
)( StreamEdit )