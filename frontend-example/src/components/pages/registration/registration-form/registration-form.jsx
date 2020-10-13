import React from "react";

import "./registration-form.scss";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";

const RegistrationForm = ({ onRegister }) => {
  return (
    <Form name="basic" onFinish={onRegister} className="registration-form">
      <div className="registration-form__inner-container">
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
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item className="registration-form__submit-container">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

RegistrationForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegistrationForm;
