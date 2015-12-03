import React, { Component, PropTypes } from 'react'
import ImagePreloader from '../components/ImagePreloader.jsx'

// Material Components
import Card from 'material-ui/lib/card/card'
import Paper from 'material-ui/lib/paper'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'

// Assets
import Style from '../../css/card-video.css'
import noImage from '../../img/no-image.jpg'

export default class CardVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    video: PropTypes.object.isRequired
  }

  render() {
    const { video } = this.props
    const name = video.name.length > 18 ? `${video.name.substr(0, 15)}...` : video.name

    return (
      <Paper
        zDepth={3}
        className='paper'
        onClick={::this._handleDetail}>
        <Card>
          <CardMedia
            overlay={<CardTitle
                        style={{ padding: 5 }}
                        titleStyle={{
                          fontSize : 20,
                          textAlign: 'center'
                        }}
                        title={name} />}>
            <ImagePreloader src={video.cover_url} className='image' fallback={noImage}/>
          </CardMedia>
        </Card>
      </Paper>
    )
  }

  _handleDetail(e) {
    this.props.history.push('/details')
  }
}
