import React, { useEffect, useState } from "react";
import {Row, Col, InputNumber, Form, Popover, Tooltip } from "antd";
import { CustomSearchWrapper, OrderButton, StyledCard,QuestionButton,PopoverContent,Title } from "./styled";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { isMobile } from "react-device-detect";

interface TemplateSizeProps {
  width: number;
  height: number;
}

const CustomSearch = (props: any) => {
  const MAX_ALLOWED_QUANTITY = 100000;
  const MIN_ALLOWED_SIZE = 48;
  const MAX_ALLOWED_SIZE = 96;
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [maxWidth, setMaxWidth] = useState<number>(MAX_ALLOWED_SIZE);
  const [maxHeight, setMaxHeight] = useState<number>(MAX_ALLOWED_SIZE);
  const [templateSize, setTemplateSize] = useState<TemplateSizeProps>({
    width: 24,
    height: 18,
  });
  const [form] = Form.useForm();
  const [showWidthSuffix, setShowWidthSuffix] = useState<boolean>(false);
  const [showHeightSuffix, setShowHeightSuffix] = useState<boolean>(false);


  const handleQuantityChange = (value: number | undefined): void => {
    if (value === undefined) return;
    setQuantity(value);
    form.setFieldsValue({ quantity: value });
    updateTotalPrice(templateSize, value);
  };

  const updateTotalPrice = (
    templateSize: any,
    quantity: number
  ) => {
    if (!Number.isInteger(quantity) && quantity !== 0) {
      setTotalPrice(0);
      return;
    }
    if (
      quantity > 0 &&
      templateSize.width > 0 &&
      templateSize.height > 0
    ) {
      const isValidVariant = true
      const closestVariant = 1.22;
      const cartQuantity = 1;
      setTotalPrice(4);
    } else {
      setTotalPrice(0);
    }
  };

  const handleSizeChange = (width: number, height: number) => {
    if (!Number.isInteger(width) && width !== 0 && !Number.isInteger(height) && height !== 0) {
      return;
    }
    setTemplateSize && setTemplateSize({ width: width, height: height });
    setMaxWidth(
      height <= MIN_ALLOWED_SIZE ? MAX_ALLOWED_SIZE : MIN_ALLOWED_SIZE
    );
    setMaxHeight(
      width <= MIN_ALLOWED_SIZE ? MAX_ALLOWED_SIZE : MIN_ALLOWED_SIZE
    );
    updateTotalPrice({ width: width, height: height }, quantity);
  };

  const tooltipText =
    "The largest size we can produce is 48 x 96 (width x height) or 96 x 48 in inches.";

  const handleOrderSubmit = () => {
    if (!templateSize.width && !templateSize.height && !quantity) {
      const url = `/custom-mockup/shop/yard-sign/CUSTOM?variant=24x18&qty=1`;
      return (window.location.href = url);
    } else {
      form
        .validateFields()
        .then((values) => {
          const { width, height, quantity } = values;
          window.location.href = `/custom-mockup/shop/yard-sign/CUSTOM?variant=${width}x${height}&qty=${quantity}`;;
        })
        .catch((error) => {
          // console.error("Validation failed:", error);
          // handleValidation(error);
        });
    }
  };

  return (
    <CustomSearchWrapper>
      <StyledCard>
        <Form form={form} onSubmitCapture={handleOrderSubmit} layout="vertical">
          <Row
            justify="center"
            align="middle"
            className="tex-light fw-bold py-2"
            gutter={isMobile ? [8, 8] : [16, 16]}
          >
            <Col xs={8} sm={8} md={6} lg={4}>
              <Tooltip
                title={showWidthSuffix ? tooltipText : ""}
                open={showWidthSuffix}
                onOpenChange={setShowWidthSuffix}
                color="#704d9f"
                overlayStyle={{ fontSize: "12px", width: "200px" }}
              >
                <Form.Item
                  name="width"
                  rules={[{ required: true, message: "Please enter width" }]}
                  status={form.getFieldError("width") ? "error" : ""}
                  help={false}
                  className="input-field"
                  hasFeedback
                >
                  <InputNumber
                    placeholder={isMobile ? "Width (in.)" : "Enter Width (inches)"}
                    min={1}
                    type="text"
                    disabled={props.isLoading}
                    precision={0}
                    inputMode="numeric"
                    max={maxWidth}
                    // maxLength={maxWidth.toString().length}
                    value={templateSize.width}
                    onKeyUp={(e: any) => {
                      setShowWidthSuffix(
                        e.target.value > maxWidth
                      );
                    }}
                    onChange={(value: any) =>
                      handleSizeChange(Number(value), templateSize.height)
                    }
                    onKeyDown={(e: any) => {
                      setShowWidthSuffix(
                        e.target.value > maxWidth
                      );
                      const isNumericInput = /^[0-9\b]+$/;
                      if (
                        !(
                          isNumericInput.test(e.key) ||
                          [
                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                            "Tab",
                            "Enter",
                          ].includes(e.key)
                        )
                      ) {
                        e.preventDefault();
                      }
                      const notAllowedKeys = [".", "e", "-"];
                      if (notAllowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    changeOnWheel={false}
                  />
                </Form.Item>
                <Title>{isMobile ? "Enter Width (in.)" : "Enter Width (inches)"}
                  <Popover
                    placement="bottom"
                    color="#704d9f"
                    overlayStyle={{ fontSize: "12px", width: "200px" }}
                    content={<PopoverContent>{tooltipText}</PopoverContent>}
                  >
                    <QuestionButton
                      shape="circle"
                      icon={<QuestionCircleOutlined />}
                    />
                  </Popover>
                </Title>
              </Tooltip>
            </Col>
            <span className="multiply">x</span>
            <Col xs={8} sm={8} md={6} lg={4}>
              <Tooltip
                title={showHeightSuffix ? tooltipText : ""}
                open={showHeightSuffix}
                onOpenChange={setShowHeightSuffix}
                color="#704d9f"
                overlayStyle={{ fontSize: "12px", width: "200px" }}
              >
                <Form.Item
                  name="height"
                  rules={[{ required: true, message: "Please enter height" }]}
                  status={form.getFieldError("height") ? "error" : ""}
                  help={false}
                  className="input-field"
                  hasFeedback
                >
                  <InputNumber
                    placeholder={isMobile ? "Height (in.)" : "Enter Height (inches)"}
                    disabled={props.isLoading}
                    min={1}
                    precision={0}
                    type="text"
                    inputMode="numeric"
                    max={maxHeight}
                    // maxLength={maxHeight.toString().length}
                    value={templateSize.height}
                    onKeyUp={(e: any) => {
                      setShowHeightSuffix(
                        e.target.value > maxHeight
                      );
                    }}
                    onChange={(value: any) =>
                      handleSizeChange(templateSize.width, Number(value))
                    }
                    onKeyDown={(e: any) => {
                      setShowHeightSuffix(
                        e.target.value > maxHeight
                      );
                      const isNumericInput = /^[0-9\b]+$/;
                      if (
                        !(
                          isNumericInput.test(e.key) ||
                          [
                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                            "Tab",
                            "Enter",
                          ].includes(e.key)
                        )
                      ) {
                        e.preventDefault();
                      }
                      const notAllowedKeys = [".", "e", "-"];
                      if (notAllowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    changeOnWheel={false}
                  />
                </Form.Item>
                <Title>{isMobile ? "Enter Height (in.)" : "Enter Height (inches)"}
                  <Popover
                    placement="bottom"
                    color="#704d9f"
                    overlayStyle={{ fontSize: "12px", width: "200px" }}
                    content={<PopoverContent>{tooltipText}</PopoverContent>}
                  >
                    <QuestionButton
                      shape="circle"
                      icon={<QuestionCircleOutlined />}
                    />
                  </Popover>
                </Title>
              </Tooltip>
            </Col>
            <Col xs={7} sm={7} md={6} lg={4}>
              <Form.Item
                name="quantity"
                rules={[{ required: true, message: "Please enter quantity" }]}
                status={form.getFieldError("quantity") ? "error" : ""}
                help={false}
                hasFeedback
                className="input-field"
              >
                <InputNumber
                  placeholder={isMobile ? "Enter Qty" : "Enter Quantity"}
                  disabled={props.isLoading}
                  min={1}
                  precision={0}
                  type="text"
                  inputMode="numeric"
                  max={MAX_ALLOWED_QUANTITY}
                  onChange={(value: any) => handleQuantityChange(value)}
                  onKeyDown={(e: any) => {
                    const isNumericInput = /^[0-9\b]+$/;
                    if (
                      !(
                        isNumericInput.test(e.key) ||
                        [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                          "Enter",
                        ].includes(e.key)
                      )
                    ) {
                      e.preventDefault();
                    }
                    const notAllowedKeys = [".", "e", "-"];
                    if (notAllowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  changeOnWheel={false}
                />
              </Form.Item>
              <span className="buy-more">Buy More, Save More!</span>
              <span className="bulk-discounts">Bulk Discounts!</span>
            </Col>
            <Col xs={24} sm={12} md={10} lg={3} className="price py-2">
              <h6>
                <i className="fa-solid fa-tags price-tag"></i>
                Price Each:
              </h6>
              <h3>${totalPrice}</h3>
            </Col>
            <Col xs={24} sm={24} md={8} lg={4}>
              <Form.Item>
                <OrderButton
                  type="primary"
                  disabled={props.isLoading}
                  htmlType="button"
                  className="btn btn-custom-search w-100"
                  onClick={handleOrderSubmit}
                >
                  Order Now
                </OrderButton>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </StyledCard>
    </CustomSearchWrapper>
  );
};

export default CustomSearch;
