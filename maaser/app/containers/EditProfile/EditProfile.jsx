import React, { useState, useEffect } from 'react';
import LocalDb from '../../localStroage';
import EditProfileContents from './EditProfileContents';

// protos
import AccountProto from '../../protos/account_pb';
import AddressProto from '../../protos/address_pb';

const EditProfile = ({
  setProfileToEdit,
  editProfileData,
  profileData,
  uploadProfileImage,
  setProfileImagePath,
  setName,
  setStreet,
  setCity,
  setState,
  setZip,
  setBio,
  updateProfile,
}) => {
  const accountType = LocalDb.accountType();
  const clientType = LocalDb.clientType();

  // profile image upload
  function uploadImage(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function() {
      uploadProfileImage(reader.result);
      setProfileImagePath(reader.result);
    };
  }

  // update submit for client
  function updateClientProfileData(e) {
    e.preventDefault();

    // proto objects
    const clientData = new AccountProto.Client();
    const accountData = new AccountProto.Account();
    const addressData = new AddressProto.Address();

    // account data
    accountData.setAccountid(profileData.account.accountid);
    accountData.setFullname(editProfileData.updateData.name);
    accountData.setEmail(profileData.account.email);
    accountData.setCountrycode(profileData.account.countrycode);
    accountData.setAccounttype(profileData.account.accounttype);

    // address data
    const AddressList = [];
    addressData.setStreet1(editProfileData.updateData.street);
    addressData.setStreet2(editProfileData.updateData.street);
    addressData.setState(editProfileData.updateData.state);
    addressData.setCity(editProfileData.updateData.city);
    addressData.setZip(editProfileData.updateData.zip);
    addressData.setAddresstype(7);
    AddressList.push(addressData);

    // client data
    clientData.setClientid(profileData.clientid);
    clientData.setClienttype(profileData.clienttype);
    clientData.setProfilepic(editProfileData.updateData.profileImagePath);
    clientData.setBio(editProfileData.updateData.bio);
    clientData.setAccount(accountData);
    clientData.setAddressesList(AddressList);
    updateProfile(clientData);
  }

  // update submit for employee
  function updateEmployeeProfileData(e) {
    e.preventDefault();
    e.preventDefault();

    // proto objects
    const clientData = new AccountProto.Employee();
    const accountData = new AccountProto.Account();
    const addressData = new AddressProto.Address();

    // account data
    accountData.setAccountid(profileData.account.accountid);
    accountData.setFullname(editProfileData.updateData.name);
    accountData.setEmail(profileData.account.email);
    accountData.setCountrycode(profileData.account.countrycode);
    accountData.setAccounttype(profileData.account.accounttype);

    // address data
    const AddressList = [];
    addressData.setStreet1(editProfileData.updateData.street);
    addressData.setStreet2(editProfileData.updateData.street);
    addressData.setState(editProfileData.updateData.state);
    addressData.setCity(editProfileData.updateData.city);
    addressData.setZip(editProfileData.updateData.zip);
    addressData.setAddresstype(7);
    AddressList.push(addressData);

    // client data
    clientData.setEmployeeid(profileData.employeeid);
    // clientData.setClienttype(profileData.clienttype);
    clientData.setProfilepic(editProfileData.updateData.profileImagePath);
    // clientData.setBio(editProfileData.updateData.bio);
    clientData.setAccount(accountData);
    clientData.setAddressesList(AddressList);
    updateProfile(clientData);
  }

  useEffect(() => {
    if (profileData.account) {
      setProfileToEdit(profileData);
    }
  }, [profileData]);

  return (
    <div className="main-contents">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Profile/Edit</div>
      </div>

      {/* edit part */}
      <EditProfileContents
        clientType={clientType}
        accountType={accountType}
        profileData={profileData}
        editProfileData={editProfileData}
        uploadProfileImage={uploadProfileImage}
        setProfileImagePath={setProfileImagePath}
        setName={setName}
        setStreet={setStreet}
        setCity={setCity}
        setState={setState}
        setZip={setZip}
        setBio={setBio}
        uploadImage={uploadImage}
        updateClientProfileData={updateClientProfileData}
        updateEmployeeProfileData={updateEmployeeProfileData}
      />
    </div>
  );
};

export default EditProfile;
