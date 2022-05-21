import React, { useEffect, useState } from 'react';
import { CaptionedTitle } from '../../components/CaptionedTitle';
import Camera from '../../images/camera.svg';
import InputFeild from '../../components/Forms/InputFeild';
import SubmitBtn from '../../components/Forms/SubmitBtn';
import LocalDb from '../../localStroage';
import DummyImage from '../../images/profile-pic.svg';

// protos
import AccountProto from '../../protos/account_pb';
import AddressProto from '../../protos/address_pb';

const LetsGetStarted = ({
  uploadProfileImage,
  onChangeFullName,
  onChangeStreetName,
  onChangeStateName,
  onChangeCityName,
  onChangeZipCode,
  onChangeBio,
  updateUserData,

  // state
  profileImagePath,
  fullName,
  street,
  state,
  city,
  zipCode,
  bio,
  loading,
  clearFormData,
}) => {
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  // const accountType = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accounttype
  //   : '';
  // const clientId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.clientid
  //   : '';
  // const clientType = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.clienttype
  //   : '';

  // account details
  const accountId = LocalDb.accountId();
  const accountType = LocalDb.accountType();
  const clientId = LocalDb.clientId();
  const clientType = LocalDb.clientType();

  const [labelText, setLabel] = useState('Full Name');
  const [descText, setDesc] = useState('you');

  useEffect(() => {
    setTexts();
  }, []);
  useEffect(() => {
    clearFormData();
  }, [loading]);

  // User status
  function setTexts() {
    // individual/ organization
    if (clientType === 1) {
      setLabel('Full Name');
      setDesc('you');
    }
    if (clientType === 2) {
      setLabel('Company Name');
      setDesc('your company');
    }
  }

  // profile image upload
  function uploadImage(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function() {
      uploadProfileImage(reader.result);
    };
  }

  // handle submit
  function handleUpdateSubmit(e) {
    e.preventDefault();
    // const sessionData = LocalDb.getSessions();
    // const emailPhone = sessionData.loginaccount.client
    //   ? sessionData.loginaccount.client.account.email
    //   : sessionData.loginaccount.employee
    //   ? sessionData.loginaccount.employee.account.email
    //   : null;

    // const countryCode = sessionData.loginaccount.client
    //   ? sessionData.loginaccount.client.account.countrycode
    //   : sessionData.loginaccount.employee
    //   ? sessionData.loginaccount.employee.account.countrycode
    //   : null;

    const emailPhone = LocalDb.email();
    const countryCode = LocalDb.countryCode();

    // proto objects
    const accountData = new AccountProto.Account();
    const clientData = new AccountProto.Client();
    const addressData = new AddressProto.Address();

    // account data
    accountData.setAccountid(accountId);
    accountData.setFullname(fullName);
    accountData.setEmail(emailPhone);
    accountData.setCountrycode(countryCode);
    accountData.setAccounttype(accountType);

    // address data
    const AddressList = [];
    addressData.setStreet1(street);
    addressData.setStreet2(street);
    addressData.setState(state);
    addressData.setCity(city);
    addressData.setZip(zipCode);
    addressData.setAddresstype(7);
    AddressList.push(addressData);

    // client data
    clientData.setClientid(clientId);
    clientData.setClienttype(clientType);
    clientData.setProfilepic(profileImagePath);
    clientData.setBio(bio);
    clientData.setAccount(accountData);
    clientData.setAddressesList(AddressList);
    updateUserData(clientData);
  }

  return (
    <div className="get-started centerAll">
      <div>
        <CaptionedTitle
          title="let's get started"
          caption={`Tell us a bit about ${descText}`}
        />
        {/* image uploader */}
        <div className="profile-image textCenter">
          <div className="imgWrap">
            <img
              src={profileImagePath.length ? profileImagePath : DummyImage}
              alt=""
              className="pic"
            />
            <label htmlFor="imageInput" className="imgLabel">
              <img src={Camera} alt="" />
            </label>
          </div>
          <input
            type="file"
            id="imageInput"
            className="imgInput"
            onChange={uploadImage}
            onDoubleClick={uploadImage}
          />
        </div>

        {/* form part */}
        <form className="c-form " onSubmit={handleUpdateSubmit}>
          {/* full name */}
          <InputFeild
            className="form-row"
            labelFor="full name"
            label={labelText}
            name="fullname"
            id="fullname"
            type="text"
            onChange={e => {
              onChangeFullName(e.target.value);
            }}
            value={fullName}
            required="required"
          />

          {/* Address */}
          <div className="address-wrapper">
            <label className="form-label">Address</label>

            {/* street */}
            <InputFeild
              className="form-row"
              name="street"
              id="street"
              type="text"
              placeholder="Street"
              required="required"
              onChange={e => {
                onChangeStreetName(e.target.value);
              }}
              value={street}
            />

            {/* state */}
            <InputFeild
              className="form-row"
              name="state"
              id="state"
              type="text"
              placeholder="State"
              required="required"
              onChange={e => {
                onChangeStateName(e.target.value);
              }}
              value={state}
            />

            <div className="city-code">
              {/* city */}
              <InputFeild
                className="form-row"
                name="city"
                id="city"
                type="text"
                placeholder="City"
                required="required"
                onChange={e => {
                  onChangeCityName(e.target.value);
                }}
                value={city}
              />

              {/* zip code */}
              <InputFeild
                className="form-row"
                name="zipcode"
                id="zipcode"
                type="number"
                placeholder="Zip Code"
                required="required"
                onChange={e => {
                  onChangeZipCode(e.target.value);
                }}
                value={zipCode}
              />
            </div>
          </div>

          {/* bio */}
          {accountType === 3 ? (
            <div className="bio-wrapper">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                id="bio"
                className="bio"
                onChange={e => {
                  onChangeBio(e.target.value);
                }}
                value={bio}
              />
            </div>
          ) : (
            ''
          )}

          {/* submit button */}
          <SubmitBtn value="Save and Continue" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default LetsGetStarted;
