import React, { useState, useEffect } from 'react';
import LocalDb from '../../../../localStroage';
import { Col, Row, Modal, Popover } from 'antd';
import InputFeild from '../../../../components/Forms/InputFeild';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import VisaCard from '../../../../images/visacard.jpg';
import CardLogo from '../../../../images/card-logo.svg';
import Dots from '../../../../images/dots.svg';
import convertDate from '../../../../utils/helpers/dateConverter';
import EmptyTable from '../../../../components/EmptyTable';
import ConfirmationModalRow from '../../../../components/ConfirmationModalRow';
import formatCurrency from '../../../../utils/helpers/currencyFormatter';

// proto
import PaymentProto from '../../../../protos/payment_pb';
import AddressProto from '../../../../protos/address_pb';

const LinkedCardContainer = ({
  cardData,
  cardList,
  getCards,

  loading,
  // for edit
  setCardHolderName,
  setCardNumber,
  setExpiryDate,
  setCVC,
  setStreet,
  setCity,
  setState,
  setCardToEdit,
  updateCard,
  deleteCard,

  // amount
  amount,
  setAmount,
  remarks,
  setRemarks,
  loadAmount,
  loadSuccess,
  // clear
  clearFormData,
}) => {
  // modal visibility
  const [isAmountModalVisible, setIsLoadAmountModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState('');
  const [loadCardId, setLoadCardId] = useState('');
  const [loadFundModalData, setLoadFundModalData] = useState({});
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  // set card to edit
  function setEditData(e) {
    const cardId = e.target.getAttribute('data-index');
    const editData = cardList.find(data => {
      return data.cardid === cardId;
    });
    setCardToEdit(editData);
  }

  // open edit modal
  function openEditModal(e) {
    setIsEditModalVisible(true);
    setEditData(e);
  }

  // for edit
  function cardUpdateSubmit(e) {
    e.preventDefault();
    const submitType = e.target.getAttribute('submit-type');
    const updateProtoData = new PaymentProto.Card();
    const address = new AddressProto.Address();
    updateProtoData.setCardid(cardData.cardId);
    updateProtoData.setCardholdername(cardData.cardHolderName);
    updateProtoData.setCardnumber(cardData.cardNumber);
    updateProtoData.setExpirydate(new Date(cardData.expiryDate).getTime());
    updateProtoData.setRefid(cardData.refId);

    if (submitType === 'edit') {
      updateProtoData.setCardstatus(1);
    }
    if (submitType === 'delete') {
      updateProtoData.setCardstatus(2);
    }
    // updateProtoData.setCardstatus(1);
    updateProtoData.setCvc(cardData.cvc);
    address.setStreet1(cardData.street);
    address.setCity(cardData.city);
    address.setState(cardData.state);
    updateProtoData.setBillingaddress(address);
    updateCard(updateProtoData, submitType);
  }

  // for card delete
  function openDeleteModal(e) {
    setIsDeleteModalVisible(true);
    setEditData(e);
  }

  // for load amount
  function openLoadAmountModal(e) {
    setIsLoadAmountModalVisible(true);
    clearFormData();
    const selectedCardId = e.target.getAttribute('card-id');
    setLoadCardId(selectedCardId);
    const ModalData = cardList.find(data => {
      return data.cardid === selectedCardId;
    });
    setLoadFundModalData(ModalData);
  }

  // load amount submit
  function loadAmountSubmit(e) {
    e.preventDefault();

    const loadAmountProto = new PaymentProto.Transaction();
    loadAmountProto.setCardid(loadCardId);
    loadAmountProto.setDonoraccountid(accountId);
    loadAmountProto.setAmount(amount);
    loadAmountProto.setRemark(remarks);
    loadAmountProto.setTransactionmedium(PaymentProto.TransactionMedium.CARD);
    loadAmountProto.setTransactiontype(PaymentProto.TransactionType.LOAD_FUND);
    loadAmountProto.setTransactionstatus(
      PaymentProto.TransactionStatus.TRANSACTION_APPROVED,
    );
    loadAmount(loadAmountProto);
  }

  // load amount success
  useEffect(() => {
    if (loadSuccess === true) {
      setIsLoadAmountModalVisible(false);
      setConfirmationVisible(false);
    }
  }, [loadSuccess]);

  // close modal
  function closeModal() {
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
  }

  useEffect(() => {
    closeModal();
  }, [loading]);

  // fetching card list
  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      {cardList.length ? (
        <div className="list-container cards-list">
          <Row gutter={[24, 24]}>
            {cardList.map((detail, index) => {
              const { cardnumber, expirydate, cardholdername } = detail;
              // for time stamp to normal date
              const expiryDate = convertDate(expirydate).slashedDate;

              return (
                <Col
                  className={
                    detail.cardstatus === 2
                      ? 'card-wrapper deleted-card'
                      : 'card-wrapper'
                  }
                  span={7}
                  key={index}
                >
                  <div className="card">
                    <img className="card-img" src={VisaCard} alt="" />
                    <div
                      className="details"
                      card-id={detail.cardid}
                      ref-id={detail.refid}
                      onClick={openLoadAmountModal}
                    >
                      <p className="acc-no">**** **** **** {cardnumber}</p>
                      <p className="acc-name">{cardholdername}</p>
                      <p className="expires">Expires: {expiryDate}</p>
                    </div>

                    {/* edit */}
                    <Popover
                      placement="rightTop"
                      trigger="hover"
                      style={{ paddingLeft: '0' }}
                      content={
                        <div className="dropdown">
                          <p
                            className="dropdown-link"
                            data-index={detail.cardid}
                            onClick={openEditModal}
                          >
                            Edit
                          </p>
                          <p
                            className="dropdown-link"
                            data-index={detail.cardid}
                            onClick={openDeleteModal}
                          >
                            Delete
                          </p>
                        </div>
                      }
                    >
                      <div className="edit-bar">
                        <img src={Dots} alt="dots" className="drop-dots" />
                      </div>
                    </Popover>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      ) : (
        <EmptyTable image={CardLogo} msg="You have not linked any card yet." />
      )}

      {/* load amount modal */}
      <Modal
        className="modal-form load-amount"
        title="Load Fund"
        visible={isAmountModalVisible}
        onCancel={() => {
          setIsLoadAmountModalVisible(false);
          setConfirmationVisible(false);
          clearFormData();
        }}
        centered
      >
        {/* amount modal */}
        <form
          className={confirmationVisible ? 'c-form d-none' : 'c-form'}
          onSubmit={e => {
            e.preventDefault();
            setConfirmationVisible(true);
          }}
        >
          {/* card holder name */}
          <InputFeild
            className="form-row"
            labelFor="cardHolderName"
            label="Cardholder Name"
            name="cardHolder"
            id="cardHolder"
            type="text"
            required="required"
            value={loadFundModalData.cardholdername}
            onChange={e => {
              e.preventDefault();
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
            value={loadFundModalData.cardnumber}
            onChange={e => {
              e.preventDefault();
            }}
          />

          {/* amount */}
          <InputFeild
            className="form-row"
            labelFor="amount"
            label="Amount"
            name="amount"
            id="amount"
            type="number"
            required="required"
            value={amount > 0 ? amount / 100 : ''}
            onChange={e => {
              setAmount(e.target.value * 100);
            }}
          />

          {/* Remarks */}
          <InputFeild
            className="form-row last"
            labelFor="remarks"
            label="Remarks"
            name="remarks"
            id="remarks"
            type="text"
            required="required"
            value={remarks}
            onChange={e => {
              setRemarks(e.target.value);
            }}
          />

          {/* submit button */}
          <SubmitBtn value="Proceed" />
        </form>

        {/* confirmation modal */}
        <form
          className={confirmationVisible ? 'confirmation-modal' : 'd-none'}
          onSubmit={loadAmountSubmit}
        >
          <h3 className="ttl-info c-text">Informartion</h3>
          <ConfirmationModalRow
            label="Card Holder's Name"
            data={loadFundModalData.cardholdername}
          />
          <ConfirmationModalRow
            label="Card Number"
            data={loadFundModalData.cardnumber}
          />

          <ConfirmationModalRow label="Amount" data={formatCurrency(amount)} />
          <ConfirmationModalRow
            label="Date"
            data={convertDate(new Date()).monthDate}
          />
          <ConfirmationModalRow label="Remarks" data={remarks} />

          {/* submit button */}
          <SubmitBtn value="Load Fund" loading={loading} />
        </form>
      </Modal>

      {/* edit card modal */}
      <div className="add-card-modal">
        <Modal
          className="modal-form add-card-modal"
          title="Update Card"
          visible={isEditModalVisible}
          onCancel={() => {
            setIsEditModalVisible(false);
            clearFormData();
          }}
          centered
        >
          <form
            className="c-form"
            submit-type="edit"
            onSubmit={cardUpdateSubmit}
          >
            {/* card holder name */}
            <InputFeild
              className="form-row"
              labelFor="cardHolderName"
              label="Cardholder Name"
              name="cardHolder"
              id="cardHolder"
              type="text"
              required="required"
              value={cardData.cardHolderName}
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
              value={cardData.cardNumber}
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
                value={convertDate(cardData.expiryDate).dashedDate}
                onChange={e => setExpiryDate(e.target.value)}
              />

              {/* cvc */}
              <InputFeild
                className="form-row cvc"
                labelFor="cvc"
                label="CVC"
                name="cvc"
                id="cvc"
                type="text"
                value={cardData.cvc}
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
              value={cardData.street}
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
              value={cardData.city}
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
              value={cardData.state}
              onChange={e => {
                setState(e.target.value);
              }}
            />

            {/* submit button */}
            <SubmitBtn value="Update" loading={loading} />
          </form>
        </Modal>
      </div>

      {/* delete modal */}
      <Modal
        className="modal-form delete-modal"
        title="Confirmation"
        visible={isDeleteModalVisible}
        onCancel={() => {
          setIsDeleteModalVisible(false);
        }}
        centered
      >
        <div className="delete-content">
          <p className="c-text confirm-msg">
            Are you sure you want you want to delete this linked account?
          </p>
          <div className="btns">
            <p
              className="cancel"
              onClick={() => {
                setIsDeleteModalVisible(false);
              }}
            >
              Cancel
            </p>
            <p
              className="btnDanger"
              submit-type="delete"
              onClick={cardUpdateSubmit}
            >
              Yes
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LinkedCardContainer;
