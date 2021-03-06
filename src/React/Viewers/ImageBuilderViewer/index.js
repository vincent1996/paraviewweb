import React                from 'react';

import AbstractViewerMenu   from '../AbstractViewerMenu';
import WidgetFactory        from '../../CollapsibleControls/CollapsibleControlFactory';
import ImageRenderer        from '../../Renderers/ImageRenderer';


export default class ImageBuilderViewer extends React.Component {
  componentWillMount() {
    this.attachListener(this.props.imageBuilder);
  }

  componentWillReceiveProps(nextProps) {
    var previousDataModel = this.props.imageBuilder,
      nextDataModel = nextProps.imageBuilder;

    if (previousDataModel !== nextDataModel) {
      this.detachListener();
      if (this.props.config.MagicLens) {
        this.attachListener(nextDataModel);
      }
    }
  }

  componentWillUnmount() {
    this.detachListener();
  }

  attachListener(dataModel) {
    this.detachListener();
    if (dataModel && dataModel.onModelChange) {
      this.changeSubscription = dataModel.onModelChange((data, envelope) => {
        this.forceUpdate();
      });
    }
  }

  detachListener() {
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
      this.changeSubscription = null;
    }
  }

  render() {
    var queryDataModel = this.props.queryDataModel,
      magicLensController = this.props.config.MagicLens ? this.props.imageBuilder : null,
      imageBuilder = this.props.config.MagicLens ? this.props.imageBuilder.getActiveImageBuilder() : this.props.imageBuilder,
      controlWidgets = WidgetFactory.getWidgets(imageBuilder);

    // Add menuAddOn if any at the top
    if (this.props.menuAddOn) {
      controlWidgets = this.props.menuAddOn.concat(controlWidgets);
    }

    return (
      <AbstractViewerMenu
        {...this.props}

        queryDataModel={queryDataModel}
        magicLensController={magicLensController}
        imageBuilder={imageBuilder}
        userData={this.props.userData}
        config={this.props.config || {}}
        rendererClass={ImageRenderer}
      >
        {controlWidgets}
      </AbstractViewerMenu>
    );
  }
}

ImageBuilderViewer.propTypes = {
  config: React.PropTypes.object,
  imageBuilder: React.PropTypes.object.isRequired,
  menuAddOn: React.PropTypes.array,
  queryDataModel: React.PropTypes.object.isRequired,
  userData: React.PropTypes.object,
};

ImageBuilderViewer.defaultProps = {
  config: {},
  userData: {},
};
