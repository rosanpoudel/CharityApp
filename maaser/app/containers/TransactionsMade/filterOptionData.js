import BankIcon from '../../images/bank-icon.svg';
import CardIcon from '../../images/card-icon.svg';
import Internal from '../../images/internal-donation.svg';
import Transaction from '../../images/transactions-blue.svg';
import LocalDb from '../../localStroage';

export const mediumOptions = [
  {
    text: 'All',
    img: Transaction,
    value: '',
  },
  {
    text: 'ACH',
    img: BankIcon,
    value: 1,
  },
  {
    text: 'Card',
    img: CardIcon,
    value: 2,
  },
  {
    text: 'Internal',
    img: Internal,
    value: 3,
  },
];

export const typeOptionsDonor = [
  {
    text: 'All',
    value: '',
  },
  {
    text: 'Load Fund',
    value: 1,
  },
  {
    text: 'Donate',
    value: 2,
  },
];

export const typeOptionsReceiver = [
  {
    text: 'All',
    value: '',
  },
  {
    text: 'Donate',
    value: 2,
  },
  {
    text: 'Withdraw',
    value: 3,
  },
];
