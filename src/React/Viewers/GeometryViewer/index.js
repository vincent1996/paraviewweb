import React                from 'react';
import AbstractViewerMenu   from '../AbstractViewerMenu';
import GeometryRenderer     from '../../Renderers/GeometryRenderer';


export default React.createClass({

  displayName: 'GeometryViewer',

  propTypes: {
    config: React.PropTypes.object,
    geometryBuilder: React.PropTypes.object.isRequired,
    menuAddOn: React.PropTypes.array,
    queryDataModel: React.PropTypes.object.isRequired,
    userData: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      config: {},
    };
  },

  render() {
    var queryDataModel = this.props.queryDataModel,
      geometryBuilder = this.props.geometryBuilder,
      controlWidgets = [];

    // Add menuAddOn if any at the top
    if (this.props.menuAddOn) {
      controlWidgets = this.props.menuAddOn.concat(controlWidgets);
    }

    return (
      <AbstractViewerMenu
        queryDataModel={queryDataModel}
        geometryBuilder={geometryBuilder}
        renderer="GeometryRenderer"
        rendererClass={GeometryRenderer}
        config={this.props.config || {}}
      >
        {controlWidgets}
      </AbstractViewerMenu>
    );
  },
});
