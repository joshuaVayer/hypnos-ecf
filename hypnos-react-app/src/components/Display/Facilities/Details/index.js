import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowNarrowLeftIcon, XCircleIcon } from "@heroicons/react/outline";

import withRouter from "@Hoc/Router";

import { lines, linesAddress } from "./helper";

import Table from "@Display/Table";
import ButtonDanger from "@Controls/Buttons/Danger";

class FacilityDetails extends React.Component {
  constructor(props) {
    super(props);

    this.resetFields = this.resetFields.bind(this);
    this.handleEditLine = this.handleEditLine.bind(this);

    this.initialState = {
      commonFields: lines(this.props.facility, fieldName => {
        this.setState({
          commonFields: this.handleEditLine(this.state.commonFields, fieldName)
        });
      }),
      addressFields: linesAddress(this.props.facility, fieldName => {
        this.setState({
          addressFields: this.handleEditLine(
            this.state.addressFields,
            fieldName
          )
        });
      })
    };

    this.state = { ...this.initialState, facility: this.props.facility };
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.facility) !== JSON.stringify(this.props.facility)
    ) {
      this.setState({
        facility: this.props.facility,
        commonFields: lines(this.props.facility, fieldName => {
          this.setState({
            commonFields: this.handleEditLine(
              this.state.commonFields,
              fieldName
            )
          });
        }),
        addressFields: linesAddress(this.props.facility, fieldName => {
          this.setState({
            addressFields: this.handleEditLine(
              this.state.addressFields,
              fieldName
            )
          });
        })
      });
    }
  }

  resetFields() {
    this.setState({ ...this.initialState, facility: this.props.facility });
  }

  handleEditLine(fields, fieldName) {
    this.resetFields();

    const safeLines = fields.map(line => {
      if (line.fieldName === fieldName) {
        return {
          ...line,
          name: fieldName,
          editing: true,
          onSubmit: newValue => this.handleSubmit(fieldName, newValue),
          onCancel: () => this.resetFields()
        };
      }
      return line;
    });

    return safeLines;
  }

  handleSubmit(fieldName, newValue) {
    this.props.onFieldUpdate(fieldName, newValue);
    this.resetFields();
  }

  render() {
    const { facility } = this.props;
    const { commonFields, addressFields } = this.state;

    return (
      <React.Fragment>
        <div className="flex flex-row gap-4">
          <Link to="/dashboard/facilities" className="self-center">
            <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer" />
          </Link>
          <div className="flex flex-row justify-between my-4 w-full">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex">
                {facility.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {i18next.t("facilities_edit_description")}
              </p>
            </div>
            <div className="self-center">
              <ButtonDanger
                onClick={() => this.props.onRemoveFacility(facility._id)}
              >
                <div className="flex flex-row align-bottom text-sm gap-2">
                  <p className="font-medium truncate">
                    {i18next.t("remove_facility")}
                  </p>
                  <XCircleIcon className="w-5" />
                </div>
              </ButtonDanger>
            </div>
          </div>
        </div>
        <Table lines={commonFields} />
        <div className="mt-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {i18next.t("facility_details_address")}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {i18next.t("facility_details_address_description")}
          </p>
        </div>
        <Table lines={addressFields} />
      </React.Fragment>
    );
  }
}

FacilityDetails.propTypes = {
  router: PropTypes.object,
  facility: PropTypes.object,
  onRemoveFacility: PropTypes.func.isRequired,
  onFieldUpdate: PropTypes.func
};

FacilityDetails.defaultProps = {
  facility: null,
  onFieldUpdate: () => {}
};

export default withRouter(FacilityDetails);
