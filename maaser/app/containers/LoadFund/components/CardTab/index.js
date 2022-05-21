import React, { useState, useEffect } from 'react';
import PopUpTrigger from '../../../../components/PopUpTrigger';
import InputFeild from '../../../../components/Forms/InputFeild';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import LinkedCardContainer from '../LinkedCardContainer';

// antd
import { Modal, Select } from 'antd';
const { Option } = Select;

// proto
import PaymentProto from '../../../../protos/payment_pb';
import AddressProto from '../../../../protos/address_pb';

const CardTabContents = ({
  // values
  cardData,
  cardList,
  // actions
  setCardHolderName,
  setCardNumber,
  setExpiryDate,
  setCVC,
  setStreet,
  setCity,
  setState,
  linkCard,
  linkingStatus,
  setLinkingStatus,
  getCards,
  setCardToEdit,
  updateCard,
  deleteCard,
  // amount
  amount,
  setAmount,
  remarks,
  setRemarks,
  loadAmount,
  successStatus,
  // loading
  loading,
  clearFormData,
}) => {
  // card data
  const {
    cardHolderName,
    cardNumber,
    expiryDate,
    cvc,
    street,
    city,
    state,
  } = cardData;

  // LOAD FUND FROM CARD MODAL
  const [isCardModalVisible, setIsCardModalVisible] = useState(false);

  // card link submit
  function LinkCardSubmit(e) {
    e.preventDefault();
    const cardProtoData = new PaymentProto.Card();
    const address = new AddressProto.Address();
    cardProtoData.setCardholdername(cardHolderName);
    cardProtoData.setCardnumber(cardNumber);
    cardProtoData.setExpirydate(new Date(expiryDate).getTime());
    cardProtoData.setCvc(cvc);
    address.setStreet1(street);
    address.setCity(city);
    address.setState(state);
    cardProtoData.setBillingaddress(address);
    linkCard(cardProtoData);
  }

  // close modal
  useEffect(() => {
    if (linkingStatus === true) {
      setIsCardModalVisible(false);
      setLinkingStatus(false);
    }
  }, [linkingStatus]);

  return (
    <div>
      <p className="c-text linked-title">Linked Cards</p>
      <PopUpTrigger
        onClick={() => {
          setIsCardModalVisible(true);
          clearFormData();
        }}
      />

      {/* linked card containers */}
      <LinkedCardContainer
        cardData={cardData}
        cardList={cardList}
        getCards={getCards}
        loading={loading}
        // for edit
        setCardHolderName={setCardHolderName}
        setCardNumber={setCardNumber}
        setExpiryDate={setExpiryDate}
        setCVC={setCVC}
        setStreet={setStreet}
        setCity={setCity}
        setState={setState}
        setCardToEdit={setCardToEdit}
        updateCard={updateCard}
        deleteCard={deleteCard}
        // amount
        amount={amount}
        setAmount={setAmount}
        remarks={remarks}
        setRemarks={setRemarks}
        loadAmount={loadAmount}
        loadSuccess={successStatus}
        // clear
        clearFormData={clearFormData}
      />

      {/* link new card modal */}
      <div className="add-card-modal">
        <Modal
          className="modal-form add-card-modal"
          title="Link New Card"
          visible={isCardModalVisible}
          onCancel={() => {
            setIsCardModalVisible(false);
            clearFormData();
          }}
          centered
        >
          <form className="c-form" onSubmit={LinkCardSubmit}>
            {/* card holder name */}
            <InputFeild
              className="form-row"
              labelFor="cardHolderName"
              label="Cardholder Name"
              name="cardHolder"
              id="cardHolder"
              type="text"
              required="required"
              value={cardHolderName}
              onChange={e => {
                setCardHolderName(e.target.value);
              }}
            />
            {/* card number */}
            <InputFeild
              className="form-row"
              labelFor="cardNumber"
              label="Card Number"
              name="cardNumber"
              id="cardNumber"
              type="number"
              required="required"
              value={cardNumber}
              onChange={e => {
                setCardNumber(e.target.value);
              }}
            />
            {/* expiry date */}
            <div className="expiry-date-feilds">
              <InputFeild
                className="form-row type-date expiry-date"
                labelFor="expiryDate"
                label="Expiry Date"
                name="expiryDate"
                id="expiryDate"
                type="date"
                required="required"
                value={expiryDate}
                onChange={e => setExpiryDate(e.target.value)}
              />

              {/* cvc */}
              <InputFeild
                className="form-row cvc"
                labelFor="cvc"
                label="CVC"
                name="cvc"
                id="cvc"
                type="number"
                maxLength="3"
                required="required"
                value={cvc}
                onChange={e => setCVC(e.target.value)}
              />
            </div>

            {/* street */}
            <InputFeild
              className="form-row"
              labelFor="street"
              label="Street"
              name="street"
              id="street"
              type="text"
              required="required"
              value={street}
              onChange={e => {
                setStreet(e.target.value);
              }}
            />

            {/* city */}
            <InputFeild
              className="form-row"
              labelFor="city"
              label="City"
              name="city"
              id="city"
              type="text"
              required="required"
              value={city}
              onChange={e => {
                setCity(e.target.value);
              }}
            />

            {/* state */}
            <InputFeild
              className="form-row last"
              labelFor="state"
              label="State"
              name="state"
              id="state"
              type="text"
              required="required"
              value={state}
              onChange={e => {
                setState(e.target.value);
              }}
            />

            {/* submit button */}
            <SubmitBtn value="Link" loading={loading} />
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default CardTabContents;
