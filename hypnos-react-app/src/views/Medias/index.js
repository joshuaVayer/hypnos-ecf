import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";

import AuthService from "@Services/Auth";

import RequireAuth from "@Hoc/Auth";
import Footer from "@Display/Footer";
import PanelWelcome from "@Display/Panel/Welcome";
import HeaderDashboard from "@Display/Header/Dashboard";

import PickerMedia from "@Controls/Picker/Media";

const USER_IMG = `${process.env.REACT_APP_UPLOAD_URL}/avatar.png`;

class Medias extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectMedia = this.onSelectMedia.bind(this);

    const { user } = AuthService.getCurrentUser() || {};
    user.role = { name: this.props.role, _id: user.role };

    this.state = { user };
  }

  onSelectMedia(media) {
    // WIP
    console.log(media);
    // Then open modal to confirm deletion
  }

  render() {
    const { user } = this.state;

    if (!user) return null;

    return (
      <div className="min-h-full">
        <HeaderDashboard user={{ ...user, imageUrl: USER_IMG }} />
        <main className="-mt-20 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-1 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <PanelWelcome user={{ ...user, imageUrl: USER_IMG }} />
                <div className="my-2">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {i18next.t("all_medias")}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {i18next.t("medias_description")}
                  </p>
                </div>
                <PickerMedia onSelectMedia={this.onSelectMedia} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Medias.propTypes = {
  role: PropTypes.string
};

export default RequireAuth(Medias, ["manager", "admin"]);
