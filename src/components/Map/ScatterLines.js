import {Component} from 'react'

class ScatterLines extends Component {
    renderLilnes() {
        const {paths, map, maps, colorMap, pathFilter} = this.props;
        const fcolor = (distance) => colorMap ? colorMap(distance) : '#00a1e1';
        const ffilter = (path) => pathFilter ? pathFilter(path) : true;
        (paths || []).forEach( (path, index, array) => {
            if (ffilter(path)) {
                let geodesicPolyline = new maps.Polyline({
                    path: [{lat: path.srcLat, lng: path.srcLng}, {lat: path.destLat, lng: path.destLng}],
                    geodesic: true,
                    strokeColor: fcolor(path.distance),
                    strokeOpacity: 0.7,
                    strokeWeight: 1
                });
                geodesicPolyline.setMap(map);
            }
        });
    }

    render() {
        this.renderLilnes();
        return null
    }
}

export default ScatterLines;