import React from "react";
import PropTypes from "prop-types";
import MediaService from "@Services/Media";

import Upload from "@Controls/Upload";
import RequireAuth from "@Hoc/Auth";

import CardMedia from "@Controls/Card/Media";

class PickerMedia extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpload = this.handleUpload.bind(this);

    this.state = {
      medias: []
    };
  }

  componentDidMount() {
    MediaService.getAll().then(medias => {
      this.setState({ medias });
    });
  }

  handleUpload(files) {
    MediaService.create(files).then((media, err) => {
      if (media) {
        MediaService.getAll().then(medias => {
          this.setState({ medias });
        });
      } else if (err) {
        console.error(err);
      }
    });
  }

  render() {
    const { medias } = this.state;
    const { onSelectMedia } = this.props;

    return (
      <div className="min-h-full">
        <ul
          role="list"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          <li className="relative">
            <Upload onUpload={this.handleUpload} />
          </li>
          {medias.map(media => (
            <CardMedia key={media.path} onClick={onSelectMedia} media={media} />
          ))}
        </ul>
      </div>
    );
  }
}

PickerMedia.propTypes = {
  onSelectMedia: PropTypes.func
};

PickerMedia.defaultProps = {
  onSelectMedia: () => {}
};

export default RequireAuth(PickerMedia);
