import React from 'react';
import LocalDb from '../../../localStroage';
import InputFeild from '../../../components/Forms/InputFeild';
import SubmitBtn from '../../../components/Forms/SubmitBtn';
import Camera from '../../../images/camera.svg';

const EditProfileContents = ({
  clientType,
  accountType,
  editProfileData,
  setName,
  setStreet,
  setState,
  setCity,
  setBio,
  setZip,
  uploadImage,
  updateClientProfileData,
  updateEmployeeProfileData,
}) => {
  const clientOrEmployee = LocalDb.getSessions().loginaccount.accounttype;
  return (
    <div>
      <div className="profile-conatiner edit-profile-page">
        <div className="get-started">
          {/* image uploader */}
          <div className="profile-image textCenter">
            <div className="imgWrap">
              <img
                src={editProfileData.updateData.profileImagePath}
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
          <form
            className="c-form "
            onSubmit={
              clientOrEmployee === 4
                ? updateEmployeeProfileData
                : updateClientProfileData
            }
          >
            {/* full name */}
            <InputFeild
              className="form-row"
              labelFor="full name"
              label={clientType === 2 ? 'Organization Name' : 'Full Name'}
              name="fullname"
              id="fullname"
              type="text"
              value={editProfileData.updateData.name}
              onChange={e => {
                setName(e.target.value);
              }}
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
                value={editProfileData.updateData.street}
                onChange={e => {
                  setStreet(e.target.value);
                }}
              />

              {/* city */}
              <InputFeild
                className="form-row"
                name="city"
                id="city"
                type="text"
                placeholder="City"
                value={editProfileData.updateData.city}
                onChange={e => {
                  setCity(e.target.value);
                }}
              />

              {/* state */}
              <InputFeild
                className="form-row"
                name="state"
                id="state"
                type="text"
                placeholder="State"
                value={editProfileData.updateData.state}
                onChange={e => {
                  setState(e.target.value);
                }}
              />
            </div>
            <div
              className="address-wrapper"
              style={{ marginTop: '25px', marginBottom: '30px' }}
            >
              <label className="form-label">Zip</label>
              {/* zip code */}
              <InputFeild
                className="form-row"
                name="zipcode"
                id="zipcode"
                type="number"
                placeholder="Zip Code"
                value={editProfileData.updateData.zip}
                onChange={e => {
                  setZip(e.target.value);
                }}
              />
            </div>
            {/* bio */}
            {accountType === 3 ? (
              <div className="bio-wrapper">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  id="bio"
                  className="bio"
                  value={editProfileData.updateData.bio}
                  onChange={e => {
                    setBio(e.target.value);
                  }}
                />
              </div>
            ) : (
              ''
            )}
            {/* submit button */}
            <SubmitBtn value="Update" loading={editProfileData.loading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileContents;
