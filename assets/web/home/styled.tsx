import { Button, Card } from "antd";
import styled from "styled-components";

export const CustomSearchWrapper = styled.div`
  .ant-card-bordered {
    border: 0 !important;
    border-radius: 0!important;
  }
  .price-tag {
    transform: rotateZ(90deg);
    margin-right: 2px;
  }
`;

export const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0 10%;
    .ant-row {
      margin: 0 !important;
      background: #ededed;
      /* padding: 10px 0; */
      .ant-input-number,
      .ant-input-number-affix-wrapper {
        width: 100%;
      }
      .ant-input-number-suffix {
        pointer-events: all !important;
        .ant-form-item-feedback-icon {
          display: none !important;
        }
      }
      .ant-input-number-prefix {
      }
      .ant-input-number-input {
        font-size: 16px;
      }
      border-radius: 5px;
    }
    .ant-col {
      .input-field {
        position: relative;
      }
    }
    .ant-form-item {
      margin: 0 !important;
    }
    .ant-form-item-control-input {
      button {
        font-size: 18px !important;
      }
    }
    @media screen and (max-width: 767px) {
      .multiply{
        margin-bottom: 15px;
      }
    }
    .buy-more{
      position:absolute;
      font-size:12px;
      font-weight: 500;
      @media screen and (max-width: 1023px) {
        display: none;
      }
    }
    .bulk-discounts {
      position:absolute;
      font-weight: 500;
      display: none;
      @media screen and (max-width: 767px) {
        display: block;
        font-size: 10px;
        position: initial;
      }
      @media screen and (max-width: 400px) {
        font-size: 10px;
      }
      @media screen and (max-width: 300px) {
        font-size: 8px;
      }
    }
    
    @media screen and (max-width: 768px) {
      svg {
        font-size: 14px;
        pointer-events: none !important;
      }
    }
  }
  .ant-input-number,
  .ant-input-number-affix-wrapper {
    border-color: #704d9f;
    &:hover {
      border-color: #704d9f !important;
    }
    &:focus {
      border-color: #704d9f !important;
    }
    &:active {
      border-color: #704d9f !important;
    }
    &:focus-within {
      border-color: #704d9f !important;
    }
  }
  .price {
    text-align: center;
    color: #704d9f;
    h6 {
      font-size: 0.9rem;
      margin: 0 !important;
    }
    h3 {
      margin: 0;
    }
    @media screen and (max-width: 767px) {
      h6{
        display: inline-block;
        padding-right:4px;
        font-size: 16px;
      }h3{
        display: inline-block;
      }
    }
  }
  
  @media screen and (max-width: 768px) {
    .ant-input-number-affix-wrapper {
      padding-inline-start: 6px;
    }
    .ant-card-body {
      padding: 0 8px;
      .ant-row {
        row-gap: 0 !important;
        .ant-input-number-input {
          font-size: 14px;
        }
      }
      .ant-col {
        margin: 0 !important;
        .quantity {
          padding-top: 0;
        }
      }
      .ant-form-item-control-input {
        text-align: center;
        button {
          font-size: 15px !important;
        }
      }
    }
  }
`;

export const Title = styled.span`
  position:absolute;
  font-size:12px;
  font-weight: 500;
  @media screen and (max-width: 1023px) {
    display: none;
  }
  @media screen and (max-width: 767px) {
    display: block;
    position: initial;
    font-size: 10px;
  }
  @media screen and (max-width: 300px) {
    font-size: 8px;
  }
`;

export const OrderButton = styled(Button)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  background-color: #704d9f !important;
  color: #fff !important;
  border-color: #704d9f !important;
  border: 1px solid #704d9f !important;
  font-weight: 500;
  font-size: 13px;
  border-radius: 5px;
  width: 100%;
  height: auto !important;

  &:hover {
    background-color: #fff !important;
    border: 1px solid #704d9f !important;
    color: #704d9f !important;
  }
  @media (max-width: 768px) {
    padding: 7px 40px !important;
    width: 50% !important;
  }
`;

export const PopoverContent = styled.div`
  color: white;
`;

export const QuestionButton = styled(Button)`
  position: absolute;
  background: #ededed;
  border: none;
  width: 16px !important;
  min-width: 16px !important;
  height: 16px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0 3px;
  font-size: 13px;
  &:hover{
    color: rgb(112, 77, 159) !important;
    border-color: rgb(112, 77, 159) !important;
  }
  &:focus{
    color: black;
    border-color: black;
  }
  @media (max-width: 768px) {
    width: 14px !important;
    min-width: 14px !important;
    font-size: 10px;
  }
  .anticon-question-circle {
    font-size: 14px !important;
    @media (max-width: 768px) {
      svg{
        width:0.7rem;
        height:0.7rem;
      }
    }
  }
`;
