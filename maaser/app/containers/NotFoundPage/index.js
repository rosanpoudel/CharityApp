/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="404-page">
      <Result
        style={{ paddingTop: '150px' }}
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link
            style={{ display: 'inline-flex', width: '200px' }}
            className="btn btnPrimary"
            to="/home"
            type="primary"
          >
            Back Home
          </Link>
        }
      />
    </div>
  );
}
