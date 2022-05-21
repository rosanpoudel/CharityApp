/**
 *
 * TransactionsMade
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import TransactionsMade from './TransactionsMade';
// selectors
import { makeSelectTransactionsMade } from './selectors';
// actions
import {
  fetchTransactionsMade,
  fetchFilteredTransactions,
  exportData,
} from './actions';

const mapStateToProps = createStructuredSelector({
  transactionsMade: makeSelectTransactionsMade(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactionsMade: () => dispatch(fetchTransactionsMade()),
    fetchFilteredTransactions: (
      start,
      end,
      transactionMedium,
      transactionType,
      search,
    ) =>
      dispatch(
        fetchFilteredTransactions(
          start,
          end,
          transactionMedium,
          transactionType,
          search,
        ),
      ),
    exportData: (
      exportType,
      start,
      end,
      transactionMedium,
      transactionType,
      search,
    ) =>
      dispatch(
        exportData(
          exportType,
          start,
          end,
          transactionMedium,
          transactionType,
          search,
        ),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'transactionsMade', reducer });
const withSaga = useInjectSaga({ key: 'transactionsMade', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(TransactionsMade);
