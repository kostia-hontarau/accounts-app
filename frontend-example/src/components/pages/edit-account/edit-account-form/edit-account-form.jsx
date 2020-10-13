import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";

import accountPropTypes from "../../../common/prop-types/account";
import "./edit-account-form.scss";

const EditAccountForm = ({ onUpdateAccount, account }) => {
  return (
    <Form
      name="basic"
      onFinish={onUpdateAccount}
      className="edit-account-form"
      initialValues={{
        ...account,
        oldPassword: undefined,
        newPassword: undefined,
      }}
    >
      <div className="edit-account-form__inner-container">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="surname"
          rules={[{ required: true, message: "Please input your Surname!" }]}
        >
          <Input placeholder="Surname" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item
          name="city"
          rules={[{ required: true, message: "Please input your city!" }]}
        >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          name="postalCode"
          rules={[
            { required: true, message: "Please input your postal code!" },
          ]}
        >
          <Input placeholder="Postal Code" />
        </Form.Item>

        <Form.Item name="newPassword">
          <Input type="password" placeholder="New Password (Optional)" />
        </Form.Item>

        <Form.Item
          name="oldPassword"
          rules={[
            {
              required: true,
              message:
                "Please input your password to confirm the account update!",
            },
          ]}
        >
          <Input type="password" placeholder="Enter your current password" />
        </Form.Item>

        <Form.Item className="edit-account-form__submit-container">
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

EditAccountForm.propTypes = {
  account: accountPropTypes.isRequired,
  onUpdateAccount: PropTypes.func.isRequired,
};

export default EditAccountForm;
