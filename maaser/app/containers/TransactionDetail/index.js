/**
 *
 * TransactionDetail
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

// screen
import TransactionDetail from './TransactionDetail';

// actions
import { fetchTransactionDetails, downloadReceipt } from './actions';
// selectors
import { makeSelectTransactionDetails } from './selectors';

const mapStateToProps = createStructuredSelector({
  details: makeSelectTransactionDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactionDetails: transactionDetails =>
      dispatch(fetchTransactionDetails(transactionDetails)),
    downloadReceipt: id => dispatch(downloadReceipt(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'transactionDetail', reducer });
const withSaga = useInjectSaga({ key: 'transactionDetail', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(TransactionDetail);
