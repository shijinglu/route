import React, {Component} from 'react'
import GoogleMap from 'google-map-react'

import Marker from './Map/Marker'
import ScatterLines from "./Map/ScatterLines";

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapsLoaded: false,
            map: null,
            maps: null
        }
    }

    onMapLoaded(map, maps) {
        this.fitBounds(map, maps);

        this.setState({
            ...this.state,
            mapsLoaded: true,
            map: map,
            maps: maps
        })
    }

    fitBounds(map, maps) {
        var bounds = new maps.LatLngBounds();
        for (let marker of this.props.markers) {
            bounds.extend(
                new maps.LatLng(marker.lat, marker.lng)
            )
        }
        map.fitBounds(bounds)
    }

    afterMapLoadChanges() {
        return (
            <div style={{display: 'none'}}>
                <ScatterLines
                    map={this.state.map}
                    maps={this.state.maps}
                    paths={this.props.paths}
                    colorMap={this.props.colorMap}
                    pathFilter={this.props.pathFilter}
                />
            </div>
        )
    }

    renderMarker() {
        return (this.props.paths || []).map(path => <Marker lat={path.srcLat} lng={path.srcLng} text={path.rec}/>)
    }

    render() {
        return (
            <GoogleMap
                bootstrapURLKeys={{key: process.env.GOOGLE_MAP_API_TOKEN || ''}}
                style={{height: '100vh', width: '100%'}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}>
                {/*{this.renderMarker()}*/}
                {this.state.mapsLoaded ? this.afterMapLoadChanges() : ''}
            </GoogleMap>
        )
    }
}

Map.defaultProps = {
    markers: [
        {lat: 23.036187, lng: 113.673125},
        {lat: 23.122430, lng: 113.237975}
    ],
    paths: [
        {
            "code": "020DCE",
            "srcLat": 23.136,
            "srcLng": 113.535,
            "rec": "万江街道",
            "destLat": 23.0471,
            "destLng": 113.738,
            "distance": 23.0042397817
        },
        {
            "code": "020DCE",
            "srcLat": 23.136,
            "srcLng": 113.535,
            "rec": "东凤镇",
            "destLat": 22.7017,
            "destLng": 113.258,
            "distance": 56.0259248118
        },
    ],
    center: [23.131, 113.536],
    zoom: 10,
    colorMap: function (distance) {
        if (distance < 15) {
            return '#005ae1'
        } else if (distance < 50) {
            return '#00b6e1'
        } else if (distance < 100) {
            return '#00e181'
        } else if (distance < 150) {
            return '#afe100'
        } else if (distance < 200) {
            return '#e16f06'
        } else if (distance < 250) {
            return '#e15005'
        } else {
            return '#e100ab'
        }
    },
    pathFilter: function (path) {
        return path.distance < 150;
    }
};

export default Map